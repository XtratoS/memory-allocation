const { app, BrowserWindow, Menu, MenuItem, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

require('@electron/remote/main').initialize();

function createWindow() {
  const window = new BrowserWindow({
    width: 960,
    height: 720,
    webPreferences: {
      enableRemoteModule: true
    }
  })

  window.loadURL(
    isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  );
}

app.on('ready', createWindow);