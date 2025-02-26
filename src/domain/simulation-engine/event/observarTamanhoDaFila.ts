import { Evento } from "./evento";

export class ObservarTamanhoFila extends Evento {
    processaEvento(): void {
        const filaInterna = this.refeitorio.getTamanhoFilaInterna();
        const filaExterna = this.refeitorio.getTamanhoFilaExterna();
        const mesasOcupadas = this.refeitorio.getMesasOcupadas();
        const tempoAtual = this.maquinadeeventos.getInstanteAtual();

        this.maquinadeeventos.observador.observarTamanhoFilas(filaInterna, filaExterna, mesasOcupadas, tempoAtual);
    }
}
