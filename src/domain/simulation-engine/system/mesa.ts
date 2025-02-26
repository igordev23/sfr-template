import { ReceiptRussianRuble } from "lucide-react";
import { Aluno } from "./aluno";


/**
 * Classe Table representa uma mesa onde alunos podem se sentar.
 */
export class Mesas {
    private mesasOcupadas: number = 0;

    constructor(private limiteMesas: number) {}

    public ocuparMesa(): boolean {
        if (this.mesasOcupadas < this.limiteMesas) {
            this.mesasOcupadas++;
            return true;
        }
        return false;
    }

    public liberarMesa(): void {
        if (this.mesasOcupadas > 0) {
            this.mesasOcupadas--;
        }
    }

    public temMesasDisponiveis(): boolean {
        return this.mesasOcupadas < this.limiteMesas;
    }
    public getMesasOcupadas(){
        return this.mesasOcupadas;
    }
}