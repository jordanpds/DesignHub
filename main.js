// Modules to control application life and create native browser window
const electron  = require('electron');
const {app, Menu, BrowserWindow, remote, dialog, webContents} = require('electron');
const ipc = require('electron').ipcMain;
const path = require('path');
const windowStateKeeper = require('electron-window-state');
require('electron-reload')(__dirname);
const pkg = require('./package.json');
const Store = require('electron-store');

// Module to control application life. (this variable should already exist)
const apps = electron.app

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(apps)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
function createMainWindow() {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    file: 'index.js',
    defaultWidth: 850,
    defaultHeight: 650,
  });

  // Create the window using the state information
  mainWindow = new BrowserWindow({
    'minwidth': 850,
    'minheight': 650,
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    icon:app.getAppPath()+'/assets/img/logo.ico',
    maximizable: false,
    resizable: true,
    webPreferences: {
      preload: 'file://'+app.getAppPath()+'\\preload.js',
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webviewTag: true
    }
  });

  // Set the default maximum and minimum size of mainWindow
  mainWindow.setMinimumSize(850, 650);
  // mainWindow.setMaximumSize(850, 650);

  // and load the index.html of the app
  mainWindow.loadFile('src/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Let us register listerners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximied or full screen state
  mainWindowState.manage(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  });
};

// Run create window function
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createMainWindow();
});

// Hide security warning when working in the electron application
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// Change depreciated value of allowRendererProcessReuse to true;
app.allowRendererProcessReuse = true;

// Create about information as part for Window Menu
var showAbout = function (){
  const about = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Version Information',
    message: pkg.description + '\r\n' + '\r\n'+ 'Version: ' + pkg.version + '\r\n' + 'Authors: ' + pkg.author + '\r\n' + 'Electron: ' + pkg.devDependencies.electron.replace('^',''),
  }
  dialog.showMessageBox(mainWindow, about);
};

// Show Maintenance Confirmation dialog
ipc.on('dialog-prompt', (event, arg) => {
  let response = dialog.showMessageBoxSync(mainWindow, arg)
  mainWindow.webContents.send('dialog-reply', response);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      { role: 'toggledevtools' },
      { role: 'quit' },
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label:'About',
        click: function() { showAbout(); }
      }
    ]
  }
]);

// Apply menu template to mainWindow
Menu.setApplicationMenu(menu)


function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }
  const ChildProcess = require('child_process');
  const path = require('path');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
  const spawn = function(command, args) {
    let spawnedProcess, error;
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) {}
    return spawnedProcess;
  };
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
    // Optionally do things such as:
    // - Add your .exe to the PATH
    // - Write to the registry for things like file associations and
    //   explorer context menus
    // Install desktop and start menu shortcuts
    spawnUpdate(['--createShortcut', exeName]);
    setTimeout(application.quit, 1000);
    return true;
    case '--squirrel-uninstall':
    // Undo anything you did in the --squirrel-install and
    // --squirrel-updated handlers
    // Remove desktop and start menu shortcuts
    spawnUpdate(['--removeShortcut', exeName]);
    setTimeout(application.quit, 1000);
    return true;
    case '--squirrel-obsolete':
    // This is called on the outgoing version of your app before
    // we update to the new version - it's the opposite of
    // --squirrel-updated
    application.quit();
    return true;
  }
};
