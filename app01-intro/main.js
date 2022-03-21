const {app, BrowserWindow} = require('electron');
const path = require('path');

function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);

// para mac, cuando se de click en cerrar termine la application

app.on('window.close', function(){
    if(process.plataform === 'darwin'){
        app.quit();
    }
});// script para cerrar en linux

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length===0){
        crearVentanaPrincipal();
    }
});// script para cerrar en mac
