var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    appDirectory: './DesignHub-win32-x64',
    outputDirectory: './DesignHub-installers',
    authors: 'Jordan Marentette',
    exe: './DesignHub.exe',
    iconURL: 'https://productivedesignservices-my.sharepoint.com/personal/jordan_productivedesign_com/Documents/Electron/logo.ico',
    setupExe: 'Setup.exe',
    setupIcon: './assets/img/logo.ico'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});
