import { Evento } from "./evento";
import { Aluno } from "../system/aluno";
import { EventoAlunoNaMesa } from "./EventoAlunoNaMesa";

export class EventoAtendimentoAluno extends Evento {
    aluno: Aluno;

    constructor(refeitorio, timestamp, maquina, aluno) {
        super(refeitorio, timestamp, maquina);
        this.aluno = aluno;
    }

    processaEvento(): void {
        console.log(`Processando atendimento do aluno ${this.aluno.getMatricula()}`);
    
        // Verificar se há mesas disponíveis
        if (this.refeitorio.getMesas().temMesasDisponiveis()) {
            const tempoServico = this.refeitorio.getTMPSC(); // Garantir que TMPSC está correto
    
            console.log(`Aluno ${this.aluno.getMatricula()} sendo servido, tempo de serviço: ${tempoServico} segundos.`);
    
            // Verificar se a máquina de eventos está definida
            if (!this.maquinadeeventos) {
                console.error("Erro: máquina de eventos não inicializada.");
                return;
            }
    
            // Agendar o aluno indo para a mesa
            this.maquinadeeventos.adicionaEvento(new EventoAlunoNaMesa(
                this.refeitorio, 
                this.timestamp + tempoServico, 
                this.maquinadeeventos, 
                this.aluno
            ));
    
            // Iniciar o atendimento do próximo aluno no refeitório
            this.refeitorio.iniciarAtendimentoAluno();
    
            if (this.refeitorio && this.maquinadeeventos) {

                console.log(`Atendimento do aluno ${this.aluno.getMatricula()} finalizado com sucesso.`);

                const tempoMedioEspera = this.aluno.calcularTempoMedioEspera();
                this.maquinadeeventos.observador.observarTemposDeEspera(tempoMedioEspera);
            }
        } else {
            console.log(`Aluno ${this.aluno.getMatricula()} aguardando mesa disponível.`);
        }
    }
    
}
