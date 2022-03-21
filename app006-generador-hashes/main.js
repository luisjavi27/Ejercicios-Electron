const {app, BrowserWindow} = require('electron');

let ventanaPrincipal = null;

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().lenght === 0 ){
        crearVentanaPrincipal();
    }
});