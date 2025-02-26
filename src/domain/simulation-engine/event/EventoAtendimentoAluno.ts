// Importação das classes necessárias para o funcionamento do evento
import { Evento } from "./evento"; // Importa a classe Evento base
import { Aluno } from "../system/aluno"; // Importa a classe Aluno
import { EventoAlunoNaMesa } from "./EventoAlunoNaMesa"; // Importa o evento para quando o aluno vai para a mesa

// Definição da classe EventoAtendimentoAluno que herda de Evento
export class EventoAtendimentoAluno extends Evento {
    aluno: Aluno; // Atributo para armazenar o aluno que será atendido

    // Construtor da classe, que recebe o refeitório, o timestamp do evento, a máquina de eventos e o aluno
    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina); // Chama o construtor da classe pai (Evento)
        this.aluno = aluno; // Atribui o aluno recebido ao atributo aluno
    }

    // Método para processar o evento de atendimento ao aluno
    processaEvento(): void {
        // Exibe no console que o atendimento do aluno está sendo processado
        console.log(`Processando atendimento do aluno ${this.aluno.getMatricula()}`);

        // Verifica se há mesas disponíveis no refeitório
        if (this.refeitorio.getMesas().temMesasDisponiveis()) {
            const tempoServico = this.refeitorio.getTMPSC(); // Obtém o tempo de serviço do refeitório

            // Exibe o tempo de serviço no console
            console.log(`Aluno ${this.aluno.getMatricula()} sendo servido, tempo de serviço: ${tempoServico} segundos.`);

            // Verifica se a máquina de eventos está inicializada
            if (!this.maquinadeeventos) {
                console.error("Erro: máquina de eventos não inicializada.");
                return; // Caso a máquina de eventos não esteja inicializada, o evento é interrompido
            }

            // Agenda o evento para o aluno ir para a mesa após o tempo de serviço
            this.maquinadeeventos.adicionaEvento(new EventoAlunoNaMesa(
                this.refeitorio, // Passa o refeitório
                this.timestamp + tempoServico, // O timestamp do evento é o tempo de atendimento somado ao timestamp original
                this.maquinadeeventos, // Passa a máquina de eventos
                this.aluno // Passa o aluno que foi atendido
            ));

            // Inicia o atendimento do próximo aluno no refeitório
            this.refeitorio.iniciarAtendimentoAluno();

            // Verifica se tanto o refeitório quanto a máquina de eventos estão inicializados
            if (this.refeitorio && this.maquinadeeventos) {
                // Exibe no console que o atendimento do aluno foi finalizado com sucesso
                console.log(`Atendimento do aluno ${this.aluno.getMatricula()} finalizado com sucesso.`);

                // Calcula o tempo médio de espera do aluno
                const tempoMedioEspera = this.aluno.calcularTempoMedioEspera();
                // Observa o tempo médio de espera usando o observador da máquina de eventos
                this.maquinadeeventos.observador.observarTemposDeEspera(tempoMedioEspera);
            }
        } else {
            // Caso não haja mesas disponíveis, informa que o aluno estará aguardando
            console.log(`Aluno ${this.aluno.getMatricula()} aguardando mesa disponível.`);
        }
    }
}
