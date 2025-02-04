/**
 * Representa um aluno com horário de chegada e tempo de atendimento.
 */
export class Aluno {
    /** 
     * O horário de chegada do aluno. 
     * Este valor é somente leitura após a inicialização.
     */
    private arrivalTime: number;

    /** 
     * O tempo que o aluno foi atendido (em segundos). 
     */
    private attendedTime: number;

    /**
     * Cria uma nova instância de aluno.
     * @param arrivalTime - O horário de chegada do aluno (padrão: horário atual).
     * @param attendedTime - O tempo de atendimento do aluno (padrão: 0 segundos).
     */
    constructor(arrivalTime: number = Date.now(), attendedTime: number = 0) {
        this.arrivalTime = arrivalTime;
        this.attendedTime = attendedTime;
    }

    /**
     * Obtém o horário de chegada do aluno como timestamp.
     * @returns O horário de chegada em milissegundos desde 1970.
     */
    public getArrivalTime(): number {
        return this.arrivalTime;
    }

    /**
     * Obtém o horário de chegada do aluno como um objeto Date.
     * @returns O horário de chegada como um objeto Date.
     */
    public getArrivalDate(): Date {
        return new Date(this.arrivalTime);
    }

    /**
     * Obtém o tempo de atendimento do aluno.
     * @returns O tempo de atendimento em segundos.
     */
    public getAttendedTime(): number {
        return this.attendedTime;
    }

    /**
     * Define o tempo de atendimento do aluno.
     * @param attendedTime - O tempo de atendimento em segundos. Deve ser um número positivo.
     * @throws Lança um erro se um valor inválido for fornecido.
     */
    public setAttendedTime(attendedTime: number): void {
        if (attendedTime < 1) {
            throw new Error(`O tempo de atendimento não pode ser zero ou negativo. Valor recebido: ${attendedTime}`);
        }
        this.attendedTime = attendedTime;
    }

    /**
     * Calcula o tempo médio de atendimento de um grupo de alunos.
     * @param alunos - Um array de instâncias da classe Aluno.
     * @returns O tempo médio de atendimento em segundos.
     */
    public calcularTempoMedio(alunos: Aluno[]): number {
        if (alunos.length === 0) {
            return 0; // Retorna 0 se não houver alunos na lista para evitar divisão por zero.
        }

        // Soma todos os tempos de atendimento dos alunos.
        let totalTempo = alunos.reduce((soma, aluno) => soma + aluno.getAttendedTime(), 0);

        // Retorna a média do tempo de atendimento.
        return totalTempo / alunos.length;
    }
}