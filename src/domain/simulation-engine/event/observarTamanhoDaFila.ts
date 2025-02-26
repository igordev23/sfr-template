import { Evento } from "./evento";

export class ObservarTamanhoFila extends Evento {
    processaEvento(): void {
        const filaInterna = this.refeitorio.getTamanhoFilaInterna(); // Chamando como método
        const filaExterna = this.refeitorio.getTamanhoFilaExterna(); // Chamando como método
        const mesasOcupadas = this.refeitorio.getMesasOcupadas(); // Chamando como método
        const tempoAtual = this.maquinadeeventos.getInstanteAtual(); // Supondo que há um método para obter o tempo atual

        this.maquinadeeventos.observador.observarTamanhoFilas(filaInterna, filaExterna, mesasOcupadas, tempoAtual);
    }
}
