var ipc = require('electron').ipcRenderer;
var sudo = require('sudo-prompt');

var options = {
  name: 'Electron',
  icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // optional
};

var delayInMiliseconds = 1000;
let windowMain;

function dialogWindow (dialogOptions) {
  return new Promise(function(resolve, reject) {
    ipc.send('dialog-prompt', dialogOptions);
    ipc.on('dialog-reply', (event, reply) => {
      resolve(reply);
    })
  })
}

function runMaintenance(app) {

  if (app == 'clean-temp') {
    const dialogOptions = {
      type: 'warning',
      buttons: ['Yes', 'No'],
      title: 'Clean Temp Files',
      message: "Clean Temp Files?",
      detail: "Running this process will delete all temporary files.",
      defaultId: 1,
      cancelId: 1,
    };
    dialogWindow(dialogOptions).then(function(reply) {
      if (reply == 0) {
        var cmdRm = [
          'for \/d %%x in (%TEMP%\\*) do if not ["%%x"]==["%TEMP%\\PDS"] if not ["%%x"]==["%TEMP%\\FEDE"] (@rd \/s \/q "%%x")',
        ];
        var cmdMk = [];
        cleanFiles(cmdRm.join('\n'), cmdMk.join('\n'));
      } else if (reply == 1) {
        const dialogOptions = {
          type: 'warning',
          buttons: ['Ok'],
          title: 'Clean Temp Files',
          message: "Process was cancelled by user",
          defaultId: 1,
          cancelId: 1,
        };
        dialogWindow(dialogOptions);
      }
    });
  };

  if (app == 'clean-teamcenter') {
    const dialogOptions = {
      type: 'warning',
      buttons: ['Yes', 'No'],
      title: 'Clean Teamcenter Files',
      message: "Clean All Teamcenter Files?",
      detail: "Running this process will delete all temporary Teamcenter files and will require you to resync the next time you login to Teamcenter.",
      defaultId: 1,
      cancelId: 1,
    };
    dialogWindow(dialogOptions).then(function(reply) {
      if (reply == 0) {
        var cmdRm = [
          'if exist %TEMP%\\FEDE (del \/q %TEMP%\\FEDE)',
          'if exist %TEMP%\\FEDE (for \/d %%x in (%TEMP%\\FEDE) do (@rd \/s \/q "%%x"))',
          'if exist %PUBLIC%\\NG\\tmp (del \/q %PUBLIC%\\NG\\tmp)',
          'if exist %PUBLIC%\\NG\\tmp (for \/d %%x in (%PUBLIC%\\NG\\tmp) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\.TcIC (del \/q %USERPROFILE%\\.TcIC)',
          'if exist %USERPROFILE%\.TcIC (for \/d %%x in (%USERPROFILE%\.TcIC) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\.*_lock_* (del \/q %USERPROFILE%\\.*_lock_*)',
          'if exist %USERPROFILE%\\.*_lock_* (for \/d %%x in (%USERPROFILE%\\.*_lock_*) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\FCCCache (del \/q %USERPROFILE%\\FCCCache)',
          'if exist %USERPROFILE%\\FCCCache (for \/d %%x in (%USERPROFILE%\\FCCCache) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\Teamcenter (del \/q %USERPROFILE%\\Teamcenter)',
          'if exist %USERPROFILE%\\Teamcenter (for \/d %%x in (%USERPROFILE%\\Teamcenter) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\Siemens (del \/q %USERPROFILE%\\Siemens)',
          'if exist %USERPROFILE%\\Siemens (for \/d %%x in (%USERPROFILE%\\Siemens) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\TcEng4CATIA (del \/q %USERPROFILE%\\TcEng4CATIA)',
          'if exist %USERPROFILE%\\TcEng4CATIA (for \/d %%x in (%USERPROFILE%\\TcEng4CATIA) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\.pcookies (del \/q %USERPROFILE%\\.pcookies)',
          'if exist %USERPROFILE%\\.pcookies (for \/d %%x in (%USERPROFILE%\\.pcookies) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\.log (del \/q %USERPROFILE%\\.log)',
          'if exist %USERPROFILE%\\.log (for \/d %%x in (%USERPROFILE%\\.log) do (@rd \/s \/q "%%x"))',
          'if exist %USERPROFILE%\\FEDE (del \/q %USERPROFILE%\\FEDE)',
          'if exist %USERPROFILE%\\FEDE (for \/d %%x in (%USERPROFILE%\\FEDE) do (@rd \/s \/q "%%x"))',
          'if exist C:\\FEDE (del \/q C:\\FEDE)',
          'if exist C:\\FEDE (for \/d %%x in (C:\\FEDE) do (@rd \/s \/q "%%x")',
        ];
        var cmdMk = [
          'mkdir %TEMP%\\FEDE',
        ];
        cleanFiles(cmdRm.join('\n'), cmdMk.join('\n'));
      } else if (reply == 1) {
        const dialogOptions = {
          type: 'warning',
          buttons: ['Ok'],
          title: 'Teamcenter Clean',
          message: "Process was cancelled by user",
          defaultId: 1,
          cancelId: 1,
        };
        dialogWindow(dialogOptions);
      }
    });
  };

  if (app == 'clean-catia') {
    const dialogOptions = {
      type: 'warning',
      buttons: ['Yes', 'No'],
      title: 'Reset Catia Settings',
      message: "Reset All Catia Settings?",
      detail: "Running this process will reset all Catia settings to default.",
      defaultId: 1,
      cancelId: 1,
    };
    dialogWindow(dialogOptions).then(function(reply) {
      if (reply == 0) {
        var cmdRm = [
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATCache\\* (del \/q %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATCache\\*)',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATCache\\* (for \/d %%x in (%USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATCache\\*) do @rd \/s \/q "%%x")',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATTemp\\CATShape\\* (del \/q %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATTemp\\CATShape\\*)',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATTemp\\CATShape\\*(for \/d %%x in (%USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATTemp\\CATShape\\*) do @rd \/s \/q "%%x")',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATEnv\\CATSettings\\* (del \/q %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATEnv\\CATSettings\\*)',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATEnv\\CATSettings\\* (for \/d %%x in (%USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATEnv\\CATSettings\\*) do @rd \/s \/q "%%x")',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATSettings\\* (del \/q %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATSettings\\*)',
          'if exist %USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATSettings\\* (for \/d %%x in (%USERPROFILE%\\AppData\\Local\\DassaultSystemes\\CATSettings\\*) do @rd \/s \/q "%%x")',
          'if exist %USERPROFILE%\\AppData\\Roaming\\DassaultSystemes\\* (del \/q %USERPROFILE%\\AppData\\Roaming\\DassaultSystemes\\*)',
          'if exist %USERPROFILE%\\AppData\\Roaming\\DassaultSystemes\\* (for \/d %%x in (%USERPROFILE%\\AppData\\Roaming\\DassaultSystemes\\*) do @rd \/s \/q "%%x")',
        ];
        var cmdMk = [];
        cleanFiles(cmdRm.join('\n'), cmdMk.join('\n'));
      } else if (reply == 1) {
        const dialogOptions = {
          type: 'warning',
          buttons: ['Ok'],
          title: 'Reset Catia Settings',
          message: "Process was cancelled by user",
          defaultId: 1,
          cancelId: 1,
        };
        dialogWindow(dialogOptions);
      }
    });
  }
}

function cleanFiles (cmdRm, cmdMk){
  let x, i;
  x = i = 0;
  for (let i = 0; i < cmdRm.length; i++) {
    sudo.exec(cmdRm[i], options,
    function(err, stdout, stderr) {
      if (err) throw err;
    });
  }
  if (i = cmdRm.length) {
    setTimeout(function() {
      for (let x = 0; x < cmdMk.length; i++) {
        sudo.exec(cmdMk[x], options,
        function(err, stdout, stderr) {
          if (err) throw err;
        });
      }
    }, delayInMiliseconds);
  }
  if (x = cmdMk.length) {
    setTimeout(function() {
      sudo.exec('for \/d %%x in (%TEMP%\\PDS\\*) do (@rd \/s \/q "%%x")', options,
      function(err, stdout, stderr) {
        if (err) throw err;
      });
    }, delayInMiliseconds);
  }
}
