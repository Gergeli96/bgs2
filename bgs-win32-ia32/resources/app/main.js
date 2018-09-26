const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;


const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;


let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1000, height: 650});

  // and load the index.html of the app.
  win.loadFile('./homepage/home.html')
}

app.on('ready', createWindow)

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './homepage/home.html'),
  //   protocol: 'file',
  //   slashes: true
  // }));





