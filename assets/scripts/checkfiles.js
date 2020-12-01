var Store = require('electron-store');
var fs = require('fs');
var path = require('path');

let userPrefs = {
  theorem: {
    type: 'boolean',
    default: 'false'
  }
};

let getUserPref = new Store({userPrefs});

var apps = [
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B25\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia25'},
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B26\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia26'},
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B27\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia27'},
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B28\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia28'},
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B29\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia29'},
 {filePath: 'C:\\Program Files\\Dassault Systemes\\B422_Cloud\\win_b64\\code\\bin\\CATSTART.exe', name: 'app-catia2020'},
 {filePath: 'C:\\Program Files\\Siemens\\NX 11.0\\NXBIN\\ugraf.exe', name: 'app-nx11'},
 {filePath: 'C:\\Program Files\\Siemens\\NX 12.0\\NXBIN\\ugraf.exe', name: 'app-nx12'},
 {filePath: 'C:\\Program Files\\Siemens\\NX\\NXBIN\\ugraf.exe', name: 'app-nx1855'},
 {filePath: 'C:\\Program Files\\Siemens\\NX1872\\NXBIN\\ugraf.exe', name: 'app-nx1872'},
 {filePath: 'C:\\Program Files\\Siemens\\NX1899\\NXBIN\\ugraf.exe', name: 'app-nx1899'},
 {filePath: 'C:\\Program Files\\SOLIDWORKS Corp\\SOLIDWORKS\\SLDWORKS.exe', name: 'app-sldwrks'},
 {filePath: 'C:\\Program Files\\Siemens\\Teamcenter11\\fede_pdcloc2\\portal\\portal.bat', name: 'app-tce-loc1'},
 {filePath: 'C:\\Program Files\\Siemens\\Teamcenter11\\fede\\portal_4tier\\portal.bat', name: 'app-tce-loc2'}
]

function onChange(e){
  var chk = document.getElementsByClassName('chkTheorem');

  if (e.checked) {
    for (var i = 0; i < chk.length; i++){
      chk[i].checked = true;
      getUserPref.set('theorem', true);
    }
  } else {
    for (var i = 0; i < chk.length; i++){
      chk[i].checked = false;
      getUserPref.set('theorem', false);
    }
  }
  checkDriveConnect(e.checked);
};

function checkFiles() {
  for (var i = 0; i < apps.length; i++)
  {
    checkFileStatus(apps[i].filePath, apps[i].name);
  }
};

function checkDriveConnect(chk) {
  var wDrive = 'W:\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\Unified_Interface.cmd';
  var xDrive = 'X:\\PROCEDURES\\STANDARDS\\THEOREM\\bin\\Unified_Interface.cmd';
  try {
    if (chk == true){
      if (fs.existsSync(wDrive) || fs.existsSync(xDrive)){
        var theo = document.getElementsByClassName('theorem');
        var notheo = document.getElementsByClassName('notheorem');
        enableButtons(theo);
        checkFiles();
        disableButtons(notheo)
      } else {
        var theo = document.getElementsByClassName('theorem');
        var notheo = document.getElementsByClassName('notheorem');
        disableButtons(theo)
        disableButtons(notheo)
      }
    } else {
      var theo = document.getElementsByClassName('theorem');
      var notheo = document.getElementsByClassName('notheorem');
      enableButtons(theo);
      enableButtons(notheo);
      checkFiles();
    }
  } catch (err) {
    console.error(err);
  }
};

function checkFileStatus(filepath, ver) {
  try {
    if(fs.existsSync(filepath)) {
        var x = document.getElementsByClassName(ver);
        enableButtons(x);
    } else {
      var y = document.getElementsByClassName(ver);
      disableButtons(y);
    }
  } catch (err) {
    console.error(err);
  }
};

function disableButtons(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].style.pointerEvents = "none";
    x[i].style.opacity = "0.5";
  }
}

function enableButtons(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].style.pointerEvents = "auto";
    x[i].style.opacity = "1";
  }
}
