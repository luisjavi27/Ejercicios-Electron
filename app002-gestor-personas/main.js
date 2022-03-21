const {app, BrowserWindow, Menu} = require('electron');

let ventanaPrincipal;

let menuAplicacionPlantila= [
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'Acerca de',
                click: () =>{
                    abrirVentaAcercaDe();
                }
            },
            {
                label: "Toggle Dev Tools",
                accelerator: "F12",
                click: () => {
                  ventanaPrincipal.webContents.toggleDevTools();
                }
            }

        ]
    }
];

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({   
        width: 800,
            height:7800,
            webPreferences:{
                nodeIntegration:true,
                contextIsolation : false
            }
    });
    
    ventanaPrincipal.loadFile('index.html');

    let menu=Menu.buildFromTemplate(menuAplicacionPlantila);
    ventanaPrincipal.setMenu(menu);

     ventanaPrincipal.on('closed', () =>{
         ventanaPrincipal = null;
     });
}

function abrirVentaAcercaDe(){ 
    let ventanaAcercaDe = new BrowserWindow({
        parent: ventanaPrincipal,
        modal: true,
        show: false,
        width: 400,
        height: 250
    });

    ventanaAcercaDe.loadFile('acerca-de.html');
    ventanaAcercaDe.setMenu(null);
    ventanaAcercaDe.once('ready-to-show', () => {
        ventanaAcercaDe.show();
    });
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){// MAC
        app.quit();
    }
});

app.on('activate', () => {
    if (ventanaPrincipal === null){
        crearVentanaPrincipal(); 
    }
});