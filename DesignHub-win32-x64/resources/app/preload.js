const electron = require('electron');
const { readFileSync, fs } = require('fs');
const { exec, execFile, spawn } = require('child_process');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
