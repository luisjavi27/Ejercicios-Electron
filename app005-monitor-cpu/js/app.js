const os = require('os');

/**
 * clase principal para monitorear la actividad de las cpu
 */

class MonitorActividadCpu {
    constructor(){ 
        this.grafico = null;
        this.medidasRecientesCpu = [];

        this.obtenerMedidasRecientesCpu(os.cpus());
        this.generarVisualizacion();
    }

        /**
         *obtiene los tiempos de una cpu 
         * @param {*} cpu CPU sobre la que se consulta el tiempo
         */
    obtenerMedidasRecientesCpu(cpus){
        for(let i=0; i<cpus.length; i++){
            this.medidasRecientesCpu[i] = this.obtenerMedidasRecientesCpu(cpus[i]);
        }
    }

        obtenerTiemposCpu(cpu) {
        return [
            cpu.times.user,
            cpu.times.sys,
            cpu.times.idle
        ];
    }

    /**
     * 
     * lee los datos de cada CPU para visualizarlos en un grafico
     */    
    obtenerConjuntoDatos(){
        let datos = [];
        const cpus = os.cpus();

        for(let i = 0; i < cpus.length; i++){
            const cpu = cpus[i];

            let datosCpu ={
                data: this.obtenerTiemposCpu(cpu),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 255, 1)',
                    'rgba(255, 206, 86, 1)'
                ]
            }
            datos.push(datosCpu);
        }

        return datos;
    }

    /**
     * Actualiza de forma recurrente los datos que se  visualizan en la grafica
     */
    actualizarConjuntoDatos(){
        const cpus = os.cpus();

        for (let i = 0; i < cpus.length; i++){
            const cpu = cpus[i];

            this.grafico.data.datasets[i].data = this.obtenerTiemposCpu(cpu);
            this.grafico.data.datasets[i].data[0] -= this.medidasRecientesCpu[i][0];
            this.grafico.data.datasets[i].data[1] -= this.medidasRecientesCpu[i][1];
            this.grafico.data.datasets[i].data[2] -= this.medidasRecientesCpu[i][2];
        }

        this.grafico.update();
        this.obtenerMedidasRecientesCpu(cpus);
    }

    generarVisualizacion(){
        this.grafico = new Chart($('#monitorCpuCanvas'),{
            type: 'doughnut',
            data:{
                labels: ['Tiempo de usuario (ms)', 'Tiempo de sistema (ms)', 'Tiempo libre (ms)'],
                datasets: this.obtenerConjuntoDatos()
            },
            options: {
                maintainAspectRatio: false,
                title:{
                    display: true,
                    text: 'Actividad CPU',
                    fontColor: 'rgb(250, 250, 250)',
                    fontsize: 19
                },
                legend:{
                    display: true,
                    labels:{
                        fontColor: 'rgb(250, 250, 250)',
                        fontsize: 12
                    }
                }

            }
        });

        setInterval(this.actualizarConjuntoDatos, 1000);

    }
}

$(() => {
    new MonitorActividadCpu();
});