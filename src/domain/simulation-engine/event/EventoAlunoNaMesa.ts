import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoLiberacaoMesa } from "./EventoLiberacaoMesa";

/**
 * Classe que representa o evento de um aluno sentando-se para comer em uma mesa.
 * Esse evento ocorre quando um aluno se acomoda no refeitório após passar pela catraca.
 */
export class EventoAlunoNaMesa extends Evento {
    aluno: Aluno;

    /**
     * Construtor da classe EventoAlunoNaMesa.
     * @param refeitorio - Referência ao refeitório onde o evento ocorre.
     * @param timestamp - Momento em que o evento acontece.
     * @param maquina - Máquina responsável pelo agendamento de eventos futuros.
     * @param aluno - Objeto Aluno que está se acomodando na mesa.
     */
    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    /**
     * Processa o evento de um aluno se sentando para comer.
     * Exibe mensagens no console e agenda o evento de liberação da mesa após um tempo determinado.
     */
    processaEvento(): void {
        console.log(`Aluno ${this.aluno.getMatricula()} sentou-se para comer.`);

        // Verifica se o método getTMPNM (Tempo Médio de Permanência na Mesa) está definido no refeitório
        if (typeof this.refeitorio.getTMPNM !== "function") {
            console.error("Erro: Método getTMPNM não está definido no refeitório.");
            return;
        }

        // Obtém o tempo médio que um aluno permanece na mesa
        const tempoPermanencia = this.refeitorio.getTMPNM();

        // Verifica se a máquina de eventos foi inicializada
        if (!this.maquinadeeventos) {
            console.error("Erro: máquina de eventos não inicializada.");
            return;
        }

        // Agendar a liberação da mesa após o tempo de permanência do aluno
        this.maquinadeeventos.adicionaEvento(new EventoLiberacaoMesa(
            this.refeitorio,                   // Referência ao refeitório
            this.timestamp + tempoPermanencia, // Tempo atualizado com a permanência na mesa
            this.maquinadeeventos,             // Máquina de eventos que agenda esse novo evento
            this.aluno                         // Objeto Aluno que estava na mesa
        ));
    }
}

