/**
 * Classe Mesas representa um conjunto de mesas em um refeitório onde alunos podem se sentar.
 * Gerencia a ocupação e liberação das mesas.
 */
export class Mesas {
    private mesasOcupadas: number = 0; // Contador do número de mesas atualmente ocupadas.

    constructor(private limiteMesas: number) {} // Define o número máximo de mesas disponíveis.

    /**
     * Tenta ocupar uma mesa. Se houver mesas disponíveis, aumenta o contador de mesas ocupadas e retorna `true`.
     * Se todas as mesas estiverem ocupadas, retorna `false`.
     */
    public ocuparMesa(): boolean {
        if (this.mesasOcupadas < this.limiteMesas) {
            this.mesasOcupadas++;
            return true;
        }
        return false;
    }

    /**
     * Libera uma mesa, diminuindo o contador de mesas ocupadas, desde que haja pelo menos uma mesa ocupada.
     */
    public liberarMesa(): void {
        if (this.mesasOcupadas > 0) {
            this.mesasOcupadas--;
        }
    }

    /**
     * Verifica se há mesas disponíveis para ocupação.
     * Retorna `true` se houver mesas livres e `false` caso contrário.
     */
    public temMesasDisponiveis(): boolean {
        return this.mesasOcupadas < this.limiteMesas;
    }

    /**
     * Retorna o número atual de mesas ocupadas.
     */
    public getMesasOcupadas(): number {
        return this.mesasOcupadas;
    }
}
