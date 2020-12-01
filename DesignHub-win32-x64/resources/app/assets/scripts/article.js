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
  var latestNews = getNewestFile(files, directoryPath);
  const loadPage = () => {
    webview.loadURL(path.join(__dirname, 'articles/'+files[0]));
    webview.removeEventListener('dom-ready', loadPage);
  };
  webview.addEventListener('dom-ready', loadPage)

});

function getNewestFile(files, path) {
    var out = [];
    files.forEach(function(file) {
        var stats = fs.statSync(path + "/" +file);
        if(stats.isFile()) {
            out.push({"file":file, "mtime": stats.mtime.getTime()});
        }
    });
    out.sort(function(a,b) {
        return b.mtime - a.mtime;
    })
    return (out.length>0) ? out[0].file : "";
}
