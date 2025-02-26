// Aluno.ts
export class Aluno {
    private tempoMedioEspera: number = 0;

    constructor(private matricula: number, private arrivalTime = Date.now()) {}

    public getMatricula(): number {
        return this.matricula;
    }

    public calcularTempoMedioEspera(): number {
        this.tempoMedioEspera = Date.now() - this.arrivalTime;
        return this.tempoMedioEspera;
    }

    public getArrivalTime(): number {
        return this.arrivalTime;
    }

    public getTempoMedioEspera(): number {
        return this.tempoMedioEspera;
    }

    public setTempoMedioEspera(tempo: number): void {
        this.tempoMedioEspera = tempo;
    }
}
