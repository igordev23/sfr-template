import { MaquinaEventos } from "./maquinadeeventos";
import { Evento } from "./event/evento";

export class Refeitorio {
    private filaExterna: number = 0;
    private filaInterna: number = 0;
    private mesasOcupadas: number = 0;
    private readonly LFI: number; // Limite da fila interna
    private readonly LM: number;  // Limite de mesas
    private readonly QAL: number; // Quantidade de alunos para liberar a catraca
    private maquinaEventos: MaquinaEventos;

    constructor(LFI: number, LM: number, QAL: number, maquinaEventos: MaquinaEventos) {
        this.LFI = LFI;
        this.LM = LM;
        this.QAL = QAL;
        this.maquinaEventos = maquinaEventos;
    }

    chegadaAluno(): void {
        this.filaExterna++;
        this.maquinaEventos.adicionaEvento(
            new EventoCatraca(this, this.maquinaEventos.instanteDaSimulacao + 1, this.maquinaEventos)
        );
    }

    processaCatraca(): void {
        if (this.filaInterna < this.LFI) {
            this.filaExterna--;
            this.filaInterna++;
            this.maquinaEventos.adicionaEvento(
                new EventoAtendimento(this, this.maquinaEventos.instanteDaSimulacao + 1, this.maquinaEventos)
            );
        }
    }

    processaAtendimento(): void {
        if (this.mesasOcupadas < this.LM) {
            this.filaInterna--;
            this.mesasOcupadas++;
            this.maquinaEventos.adicionaEvento(
                new EventoLiberarMesa(this, this.maquinaEventos.instanteDaSimulacao + 1, this.maquinaEventos)
            );
        }
    }

    processaLiberacaoMesa(): void {
        this.mesasOcupadas--;
        if (this.filaInterna >= this.QAL) {
            this.maquinaEventos.adicionaEvento(
                new EventoCatraca(this, this.maquinaEventos.instanteDaSimulacao + 1, this.maquinaEventos)
            );
        }
    }
}

class EventoCatraca extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    processaEvento(): void {
        this.refeitorio.processaCatraca();
    }
}

class EventoAtendimento extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    processaEvento(): void {
        this.refeitorio.processaAtendimento();
    }
}

class EventoLiberarMesa extends Evento {
    constructor(refeitorio: Refeitorio, timestamp: number, maquina: MaquinaEventos) {
        super(refeitorio, timestamp, maquina);
    }

    processaEvento(): void {
        this.refeitorio.processaLiberacaoMesa();
    }
}
