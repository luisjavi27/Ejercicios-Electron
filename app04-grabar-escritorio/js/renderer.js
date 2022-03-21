const { remote} = require('electron');
const {writeFile} = require('fs');
const {dialog, Menu} = remote;

const { ipcRenderer } = require('electron')



async function obtenerSelecionarFuenteVideo(){
    // const fuentesEntrada = await desktopCapturer.getSources({types: ['window', 'screen']});

    const fuentesEntrada = {
        getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
      }

    const menuFuentesEntrada = Menu.buildFromTemplate(
        fuentesEntrada.map(fuentesEntrada => {
            return{
                label: fuenteEntrada.name,
                click: () => selecionarFuente(fuenteEntrada)
            };
        })
    );

    menuFuentesEntrada.popup();
}

try {
    async function selecionarFuente(fuenteEntrada) {
        seleccionarFuenteVideo.innerText = fuenteEntrada.name;
    
        const opcionesCaptura = {
            audio: false,
            video: {
                mandatory:{
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: fuenteEntrada.id
                }
            }
        };
    
        const stringCaptura = await navigator.mediaDevices.getUserMedia(opcionesCaptura);
    
        visualizacionCaptura.srcObject = stringCaptura;
        visualizacionCaptura.play();
    
        const opcionesFormato = {mimeType: 'video/webm; codecs=vp9'}
        grabadorMultimedia = new MediaRecorder(stringCaptura, opcionesFormato);
    
        grabadorMultimedia.ondataavailable=procesarDatos;
        grabadorMultimedia.onstop = detenerGrabacion;
    }
}
catch (e) {
    console.error("Error: " + e);
}

function procesarDatos(evento){
    partesGrabacion.push(evento.data);
}

async function detenerGrabacion(evento){
    const blob = new Blob(partesGrabacion, {type:'video/webm; codecs=vp9'});

    const buffer = new Buffer.from(await blob.arrayBuffer());

    const {filePath} = await dialog.showSaveDialog({
         buttonLabel: 'Guardar video',
         defaultPath: `video-${Dato.now()}.webm`
    });

    if(filePath){
        writeFile(filePath, buffer, () => {
            alert('Se ha guradado tu video.');
        })
    }
}

let grabadorMultimedia;
const partesGrabacion = [];

let visualizacionCaptura = document.getElementById('visualizacionCaptura');
let seleccionarFuenteVideo = document.getElementById('seleccionarFuenteVideo');
let grabar = document.getElementById('grabar');
let detener = document.getElementById('detener');

selecionarFuenteVideo.onClick = obtenerSelecionarFuenteVideo;

grabar.addEventListener('click', () =>{
    grabadorMultimedia,start();
    grabar.disabled = true;
});

detener.addEventListener('click', () =>{
    grbaadorMultimedia,onstop();
    grabar.disabled = false;
});