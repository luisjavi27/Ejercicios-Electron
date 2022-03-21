const {ipcRenderer} = require('electron');

function agregarProducto(evento){
    evento.preventDefault();

    // let nombreProducto = document.querySelector('#nombreProducto').value;
    let nombreProducto = document.getElementById('nombreProducto').value;

    if(nombreProducto){
        document.querySelector('#nombreProducto').value ='';
        ipcRenderer.send('producto:agregar', nombreProducto);
    
    }
}


// document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);
document.getElementById('frmAgregarProducto').addEventListener('submit', agregarProducto);
