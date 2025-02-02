/**
 * Representa um aluno com horário de chegada e tempo de atendimento.
 */
export class Aluno {
    /** O horário de chegada do aluno. Este valor é somente leitura e não pode ser alterado após a inicialização. */
    private arrivalTime: Date;

    /** O tempo que o aluno foi atendido (em minutos). */
    private attendedTime: number;

    /**
     * Cria uma nova instância de aluno.
     * @param arrivalTime - O horário de chegada do aluno (padrão: horário atual).
     * @param attendedTime - O tempo de atendimento do aluno (padrão: 0 minutos).
     */
    constructor(arrivalTime: Date = new Date(), attendedTime: number = 0) {
        this.arrivalTime = arrivalTime;
        this.attendedTime = attendedTime;
    }

    /**
     * Obtém o horário de chegada do aluno.
     * @returns O horário de chegada como um objeto Date.
     */
    public getArrivalTime(): Date {
        return this.arrivalTime;
    }

    /**
     * Obtém o tempo de atendimento do aluno.
     * @returns O tempo de atendimento em minutos.
     */
    public getAttendedTime(): number {
        return this.attendedTime;
    }

    /**
     * Define o tempo de atendimento do aluno.
     * @param attendedTime - O tempo de atendimento em minutos. Deve ser um número não negativo.
     * @throws Lança um erro se um valor negativo for fornecido.
     */
    public setAttendedTime(attendedTime: number): void {
        if (attendedTime < 0) {
            throw new Error(`O tempo de atendimento não pode ser negativo. Valor recebido: ${attendedTime}`);
        }
        this.attendedTime = attendedTime;
    }
}
