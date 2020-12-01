var fs = require('fs');
var path = require('path');

const directoryPath = path.join(__dirname, 'articles');

const webview = document.getElementById('article-frame');

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  const loadPage = () => {
    webview.loadURL(path.join(__dirname, 'articles/'+files[0]));
    // webview.setAttribute('src', path.join(__dirname, 'articles/'+files[0]));
    webview.removeEventListener('dom-ready', loadPage);
  };
  webview.addEventListener('dom-ready', loadPage)

});
