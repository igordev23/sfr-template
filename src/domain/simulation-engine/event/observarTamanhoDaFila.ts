// Importa a classe Evento, que serve como base para o evento de observar o tamanho das filas
import { Evento } from "./evento";

// Classe ObservarTamanhoFila, que representa o evento de observar o tamanho das filas
export class ObservarTamanhoFila extends Evento {
    
    // Método para processar o evento de observar o tamanho das filas
    processaEvento(): void {
        // Obtém o tamanho da fila interna do refeitório
        const filaInterna = this.refeitorio.getTamanhoFilaInterna();
        
        // Obtém o tamanho da fila externa do refeitório
        const filaExterna = this.refeitorio.getTamanhoFilaExterna();
        
        // Obtém o número de mesas ocupadas no refeitório
        const mesasOcupadas = this.refeitorio.getMesasOcupadas();
        
        // Obtém o tempo atual da máquina de eventos
        const tempoAtual = this.maquinadeeventos.getInstanteAtual();

        // Chama o observador para registrar ou agir com base nos dados obtidos
        this.maquinadeeventos.observador.observarTamanhoFilas(filaInterna, filaExterna, mesasOcupadas, tempoAtual);
    }
}
