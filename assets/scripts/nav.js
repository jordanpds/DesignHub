function nav(nav, name){
  var cont = ["news", "apps"];
  for (var i = 0; i < cont.length; i++) {
    var x = cont[i]+'-container';
    if (nav == cont[i]) {
      document.getElementById(x).style.display = "block";
    } else {
      document.getElementById(x).style.display = "none";
    }
  }
  var news = document.getElementsByName(cont[0])[0];
  var apps = document.getElementsByName(cont[1])[0];
  if (nav == cont[0]) {
    news.style.borderBottom = "1px solid rgba(175, 175, 175, 0.2)";
    apps.style.borderBottom = "none";
  } else {
    apps.style.borderBottom = "1px solid rgba(175, 175, 175, 0.2)";
    news.style.borderBottom = "none";
  }
  if (nav == "apps") {
    startupApp(name);
    startupDefaults();
  }
}

function startupApp(app){
  var apps = ["oem", "native", "fix"];
  var i;
  for (i = 0; i < apps.length; i++) {
    if (app == apps[i]) {
      document.getElementById(apps[i]+'-apps').style.display = "block";
      document.getElementById(apps[i]+'-info-container').style.display = "block";
    } else {
      document.getElementById(apps[i]+'-apps').style.display = "none";
      document.getElementById(apps[i]+'-info-container').style.display = "none";
    }
  }
  sidebarApps(app, 'info')
}

function sidebarApps(app, name) {
  var oem = ["info", "ford", "gm", "toyota", "daimler" ];
  var native = ["info", "catia", "nx", "other" ];
  var fix = ["info", "tce", "catia" ];
  var i; var x;

  switch (app) {
  case 'oem': x = oem
    break
  case 'native': x = native
    break
  case 'fix': x = fix
    break
  }
  for (i = 0; i < x.length; i++) {
    if (name == x[i]) {
      document.getElementById(app+'-'+x[i]+'-container').style.display = "block";
    } else {
      document.getElementById(app+'-'+x[i]+'-container').style.display = "none";
    }
  }
}

function startupDefaults(){
  var getTheorem = store.get('theorem');
  var chk = document.getElementsByClassName('chkTheorem');

  if (getTheorem == true) {
    for (var i = 0; i < chk.length; i++){
      chk[i].checked = true;
      var e = true;
    }
  } else {
    for (var i = 0; i < chk.length; i++){
      chk[i].checked = false;
      var e = false;
    }
  }
  checkFiles();
  checkDriveConnect(e);
};
