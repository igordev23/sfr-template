import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoLiberacaoMesa } from "./EventoLiberacaoMesa";

export class EventoAlunoNaMesa extends Evento {
    aluno: Aluno;

    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} sentou-se para comer.`);

        // Verificar se o método de distribuição está corretamente implementado
        if (typeof this.refeitorio.getTMPNM !== "function") {
            console.error("Erro: Método getTMPNM não está definido no refeitório.");
            return;
        }

        const tempoPermanencia = this.refeitorio.getTMPNM();

        if (!this.maquinadeeventos) {
            console.error("Erro: máquina de eventos não inicializada.");
            return;
        }

        // Agendar a liberação da mesa após o tempo de permanência
        this.maquinadeeventos.adicionaEvento(new EventoLiberacaoMesa(
            this.refeitorio, 
            this.timestamp + tempoPermanencia, 
            this.maquinadeeventos, 
            this.aluno
        ));
    }
}
