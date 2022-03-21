const {app, BrowserWindow} = require('electron');

const path = require('path');

const { ipcMain, desktopCapturer } = require('electron')

ipcMain.handle(
  'DESKTOP_CAPTURER_GET_SOURCES',
  (event, opts) => desktopCapturer.getSources(opts)
)

const crearVentanaPrincipal = () => {
    let ventanaPrincipal = new BrowserWindow({
        width: 700,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    ventanaPrincipal.loadFile(path.join(__dirname, 'index.html'));

};

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', () =>{
    if(process.plataform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(BrowserWindow.getAllWindows().lenght===0){
        crearVentanaPrincipal();
    }
});