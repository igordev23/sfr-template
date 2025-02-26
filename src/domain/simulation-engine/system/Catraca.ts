
/**
 * Classe que representa uma Catraca, responsável por controlar a passagem de alunos.
 */
export class Catraca {
    private status: boolean = true;

    public getStatus(): boolean {
        return this.status;
    }

    public liberarCatraca(): void {
        this.status = true;
    }

    public bloquearCatraca(): void {
        this.status = false;
    }
}