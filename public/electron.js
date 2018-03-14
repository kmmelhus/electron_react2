const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let settingsWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    settingsWindow = new BrowserWindow({
        title: "Ekstra-vindu",
        frame: true,
        height: 500,
        resizable: false,
        width: 500
    });

    settingsWindow.loadURL('https://github.com')
    settingsWindow.on('closed', () => settingsWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});