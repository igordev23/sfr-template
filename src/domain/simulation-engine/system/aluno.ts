// Definição da classe Aluno
export class Aluno {
    // Propriedade privada para armazenar o tempo médio de espera (inicialmente 0)
    private tempoMedioEspera: number = 0;

    /**
     * Construtor da classe Aluno
     * @param matricula - Número da matrícula do aluno
     * @param arrivalTime - Momento da chegada do aluno (por padrão, usa o timestamp atual)
     */
    constructor(private matricula: number, private arrivalTime = Date.now()) {}

    /**
     * Obtém a matrícula do aluno.
     * @returns O número da matrícula do aluno.
     */
    public getMatricula(): number {
        return this.matricula;
    }

    /**
     * Calcula o tempo médio de espera do aluno com base no tempo atual e no momento de chegada.
     * @returns O tempo médio de espera em milissegundos.
     */
    public calcularTempoMedioEspera(): number {
        this.tempoMedioEspera = Date.now() - this.arrivalTime;
        return this.tempoMedioEspera;
    }

    /**
     * Obtém o momento de chegada do aluno.
     * @returns Timestamp da chegada do aluno.
     */
    public getArrivalTime(): number {
        return this.arrivalTime;
    }

    /**
     * Obtém o tempo médio de espera do aluno.
     * @returns O tempo médio de espera armazenado.
     */
    public getTempoMedioEspera(): number {
        return this.tempoMedioEspera;
    }

    /**
     * Define manualmente o tempo médio de espera do aluno.
     * @param tempo - Tempo médio de espera em milissegundos.
     */
    public setTempoMedioEspera(tempo: number): void {
        this.tempoMedioEspera = tempo;
    }
}
