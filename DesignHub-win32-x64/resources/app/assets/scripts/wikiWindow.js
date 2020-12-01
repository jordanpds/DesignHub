// Modules to control application life and create native browser window
const { remote } = require('electron');
var path = require('path');
const windowStateKeeper = require('electron-window-state');
const windowInstance = remote.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let wikiWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
function createWikiWindow() {
  // Load the previous state with fallback to defaults
  let wikiWindowState = windowStateKeeper({
    file: '../assets/scripts/wikiWindow.js',
    defaultWidth: 850,
    defaultHeight: 650
  });

  // Create the window using the state information
  wikiWindow = new windowInstance({
    'minwidth': 850,
    'minheight': 650,
    'x': wikiWindowState.x,
    'y': wikiWindowState.y,
    'width': wikiWindowState.width,
    'height': wikiWindowState.height,
    maximizable: true,
    resizable: true,
    // frame: false,
    icon:'./assets/img/logo.png',
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  wikiWindow.setMinimumSize(850, 650);
  // and oad the index.html of the app
  wikiWindow.loadFile('src/kbindex.html');

  // Open the DevTools.
  // wikiWindow.webContents.openDevTools();

  // Let us register listerners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximied or full screen state
  wikiWindowState.manage(wikiWindow);

  // Emitted when the window is closed.
  wikiWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    wikiWindow = null
  });
};
