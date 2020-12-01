const { exec, spawn } = require('child_process');

var options = {
  name: 'Electron',
  icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // optional
};

// Main function for running program shortcuts, rather than individually declared functions it runs
// a single function that checks amongs each program to see which is correct and then begins looking
// for specific values as to whether or not it is a theorem run application or not
function runProgram(type) {
  // Sets default CATIA environment directory
  var direnv = '"C:\\ProgramData\\DassaultSystemes\\CATEnv"';
  var getTheorem = store.get('theorem');
  // Launches 4Tier connected CATIA R29 with Ford settings
  if (type == 'app-catia29-4tier'){
    process.env.TC_PORTAL_ROOT = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede\\portal_4tier";
    process.env.TC_ROOT = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede";
    process.env.TCICV5_DIR = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede\\tcic";
    var env = 'CATIA_V5R29_CAA.FEDE';
    if (getTheorem == true){
      var fileName = 'catia5r29_start.cmd"'
      var filePath = '"' + 'W:' + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B29\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -run "CNEXT.exe"' + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches Loc2 connected CATIA R29 with Ford settings
  if (type == 'app-catia29-loc2'){
    process.env.TC_PORTAL_ROOT = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede_pdcloc2\\portal"
    process.env.TC_ROOT = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede_pdcloc2"
    process.env.TCICV5_DIR = "C:\\Progra~1\\Siemens\\Teamcenter11\\fede_pdcloc2\\tcic"
    var env = 'CATIA_V5R29_CAA.PDCLOC2_FEDE';
    if (getTheorem == true){
      var fileName = 'catia5r29_start.cmd"'
      var filePath = '"' + 'W:' + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B29\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -run "CNEXT.exe"' + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches CATIA R27 with Toyota settings
  if (type == 'app-toyota'){
    var env = 'CATIA_V5R27.TOYOTA';
    if (getTheorem == true){
      var fileName = 'catia5r27_start.cmd"';
      var filePath = '"' + 'W:' + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B27\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -run "CNEXT.exe"' + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the GM Launcher app
  if (type == 'app-gm'){
    var fileName = 'gmlaunch6.1.bat"';
    var filePath = '"R:\\gmlaunch6.1\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the Daimler Start Configurator
  if (type == 'app-daimler'){
    var fileName = 'Daimler.NX.Startconfigurator.exe"';
    var path = '"C:\\Program Files\\Daimler\\NX12_Build18.2.2\\nx_client\\NX120\\Addons\\NXStartconfigurator\\';
    exec(path + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches 4Tier Teamcenter without CATIA
  if (type == 'app-tce-loc1'){
    var fileName = 'portal.bat"';
    var filePath = '"C:\\Program Files\\Siemens\\Teamcenter11\\fede\\portal_4tier\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches Loc2 Teamcenter without CATIA
  if (type == 'app-tce-loc2'){
    var fileName = 'portal.bat"';
    var filePath = '"C:\\Program Files\\Siemens\\Teamcenter11\\fede_pdcloc2\\portal\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the base CATIA V5 R25 with default settings
  if (type == 'app-catia25'){
    var env = 'CATIA.V5-6R2015.B25';
    if (getTheorem == true){
      var fileName = 'catia5r25_start.cmd"';
      var filePath = '"' + oDrive + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B25\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base CATIA V5 R26 with default settings
  if (type == 'app-catia26'){
    var env = 'CATIA.V5-6R2016.B26';
    if (getTheorem == true){
      var fileName = 'catia5r26_start.cmd"';
      var filePath = '"' + oDrive + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B26\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base CATIA V5 R27 with default settings
  if (type == 'app-catia27'){
    var env = 'CATIA.V5-6R2017.B27';
    if (getTheorem == true){
      var fileName = 'catia5r27_start.cmd"';
      var filePath = '"' + oDrive + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B27\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base CATIA V5 R28 with default settings
  if (type == 'app-catia28'){
    var env = 'CATIA.V5-6R2018.B28';
    if (getTheorem == true){
      var fileName = 'catia5r28_start.cmd"';
      var filePath = '"' + oDrive + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B28\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base CATIA V5 R29 with default settings
  if (type == 'app-catia29'){
    var env = 'CATIA.V5-6R2019.B29';
    if (getTheorem == true){
      var fileName = 'catia5r29_start.cmd"';
      var filePath = '"' + oDrive + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName + ' ' + env + ' ' + direnv, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'CATSTART.exe"';
      var filePath = '"C:\\Program Files\\Dassault Systemes\\B29\\win_b64\\code\\bin\\';
      exec(filePath + fileName + ' -env ' + env + ' -direnv ' + direnv + ' -nowindow', (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base CATIA V6 R2020 with default settings
  if (type == 'app-catia2020'){
    var fileName = 'CATSTART.exe"';
    var filePath = '"C:\\Program Files\\Dassault Systemes\\B422_Cloud\\win_b64\\code\\bin\\';
    exec(filePath + fileName + ' -run "3DEXPERIENCE.exe"' + ' -object'+ ' -Url=https://r1132101028056-us1-space.3dexperience.3ds.com:443/enovia' + ' -workbench' + ' CATShapeDesignWorkbench' + ' -MyAppsUrl="https://eu1-apps.3dexperience.3d"', (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the base NX 11 with default settings
  if (type == 'app-nx11'){
    if (getTheorem == true){
      var fileName = 'RunNX11.cmd"';
      var filePath = '"' + oExt + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'ugraf.exe"';
      var filePath = '"C:\\Program Files\\Siemens\\NX 11.0\\NXBIN\\';
      exec(filePath + fileName, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base NX 12 with default settings
  if (type == 'app-nx12'){
    if (getTheorem == true){
      var fileName = 'RunNX12.cmd"';
      var filePath = '"' + oExt + '\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\';
      exec(filePath + fileName, (e, stdout, stderr)=> {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
      });
    } else {
      var fileName = 'ugraf.exe"';
      var filePath = '"C:\\Program Files\\Siemens\\NX 12.0\\NXBIN\\';
      exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
        console.error(e);
        throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
      });
    }
  };

  // Launches the base NX 1855 with default settings
  if (type == 'app-nx1855'){
    var fileName = 'ugraf.exe"';
    var filePath = '"C:\\Program Files\\Siemens\\NX\\NXBIN\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the base NX 1872 with default settings
  if (type == 'app-nx1872'){
    var fileName = 'ugraf.exe"';
    var filePath = '"C:\\Program Files\\Siemens\\NX1872\\NXBIN\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the base NX 1899 with default settings
  if (type == 'app-nx1899'){
    var fileName = 'ugraf.exe"';
    var filePath = '"C:\\Program Files\\Siemens\\NX1899\\NXBIN\\';
    exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  };

  // Launches the base Solidworks with default settings
  if (type == 'app-sldwrks'){
    var fileName = 'SLDWORKS.exe"';
    var filePath = '"C:\\Program Files\\SOLIDWORKS Corp\\SOLIDWORKS\\';
      exec(filePath + fileName, (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log('stdout ', stdout);
      console.log('stderr ', stderr);
    });
  }
};
