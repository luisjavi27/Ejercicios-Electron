const {app, BrowserWindow, Menu, ipcMain} = require('electron');

let ventanaPrincipal;
let ventanaNuevoProducto;

let menuPrincipalPlantilla = [
    {
        label: 'Archivo',
        submenu:[
            {
                label: 'Agregar producto',
                click(){
                crearVentanaAgregarProducto()
                }
            },

            {
                label: 'Eliminar productos',
                click(){
                ventanaPrincipal.webContents.send('productos:eliminar')
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform=== 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                app.quit();
                }
            }
        ]

    }
];

function crearVentanaAgregarProducto(){
    ventanaNuevoProducto = new BrowserWindow({
        parent: ventanaPrincipal, // indica la ventana padre
        modal: true, // no permite interaccion con la ventana padre mientras esta está abierta 
        width: 300,
        height: 200,
        title: "Agregar producto",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation : false
        }
    })

    ventanaNuevoProducto.loadFile('agregar-producto.html');

    ventanaNuevoProducto.setMenu(null);

    ventanaNuevoProducto.on('close', function() {
        ventanaNuevoProducto= null;
    });
    
}

function crearVentanaPrincipal() {
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation : false
        }
    });

    ventanaPrincipal.loadFile('index.html');

    let menuPrincipal = Menu.buildFromTemplate(menuPrincipalPlantilla);
    ventanaPrincipal.setMenu(menuPrincipal);
    //ventanaPrincipal.webContents.openDevTools(); // llama las herramientas de desarollador

}

app.whenReady().then(crearVentanaPrincipal);

ipcMain.on('producto:agregar', function (evento, nombreProducto){
    ventanaPrincipal.webContents.send('producto:agregar', nombreProducto);
})