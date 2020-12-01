var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    appDirectory: './DesignHub-win32-x64',
    outputDirectory: './DesignHub-installers',
    authors: 'DesignHub',
    exe: './DesignHub.exe',
    iconURL: 'https://github.com/jordanpds/DesignHub/blob/master/assets/img/logo.ico',
    setupExe: 'Setup.exe',
    setupIcon: './assets/img/logo.ico'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});
