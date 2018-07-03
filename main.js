const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  win = new BrowserWindow({ width: 600, height: 600 });

  win.loadFile('view/index.html');

  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});