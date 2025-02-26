/**
 * Classe que representa uma Catraca, responsável por controlar a passagem de alunos.
 */
export class Catraca {
    // Propriedade privada que define o status da catraca (aberta ou fechada).
    // true indica que a catraca está liberada, false indica que está bloqueada.
    private status: boolean = true;

    /**
     * Obtém o status atual da catraca.
     * @returns {boolean} true se a catraca estiver liberada, false se estiver bloqueada.
     */
    public getStatus(): boolean {
        return this.status;
    }

    /**
     * Libera a catraca para passagem, definindo o status como true.
     */
    public liberarCatraca(): void {
        this.status = true;
    }

    /**
     * Bloqueia a catraca, impedindo a passagem, definindo o status como false.
     */
    public bloquearCatraca(): void {
        this.status = false;
    }
}
