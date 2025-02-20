import { FilaInterna } from "../system/filaInterna";
import { Atendimento } from "../system/atendimento";
import { Aluno } from "../system/aluno";
import { MaquinaEventos } from "../maquinadeeventos";

export class EventoFilaInterna {
    private filaInterna: FilaInterna;
    private atendimentos: Atendimento[];
    private maquinaEventos: MaquinaEventos;

    constructor(capacidadeFila: number, numMesas: number, maquinaEventos: MaquinaEventos) {
        this.filaInterna = new FilaInterna(capacidadeFila);
        this.atendimentos = Array.from({ length: numMesas }, () => new Atendimento());
        this.maquinaEventos = maquinaEventos;
    }

    adicionarAlunoFila(aluno: Aluno): void {
        try {
            this.filaInterna.adicionarAluno(aluno);
            console.log(`Aluno ${aluno.getArrivalTime()} entrou na fila.`);
        } catch (error) {
            console.error(error.message);
        }
    }

    iniciarAtendimento(): void {
        if (this.filaInterna.getQuantidadeAtual() === 0) {
            console.warn("Nenhum aluno na fila para ser atendido.");
            return;
        }

        const atendimentoDisponivel = this.atendimentos.find(a => !a.status);
        if (!atendimentoDisponivel) {
            console.warn("Todas as mesas estão ocupadas. Aguarde a liberação de uma mesa.");
            return;
        }

        const aluno = this.filaInterna.removerAluno();
        if (aluno) {
            atendimentoDisponivel.adicionarAluno(aluno);
            const tempoAtendimento = this.maquinaEventos.simularTempoAtendimento();
            aluno.setAttendedTime(tempoAtendimento);
            atendimentoDisponivel.setTempoMedio(tempoAtendimento);
            atendimentoDisponivel.mudarStatus(false);
            console.log(`Atendimento iniciado para aluno com chegada às ${aluno.getArrivalDate().toLocaleTimeString()}. Tempo estimado: ${tempoAtendimento} minutos.`);
            
            setTimeout(() => this.finalizarAtendimento(atendimentoDisponivel, aluno), tempoAtendimento * 1000);
        }
    }

    finalizarAtendimento(atendimento: Atendimento, aluno: Aluno): void {
        const tempoPermanencia = (Date.now() - aluno.getArrivalTime()) / 1000;
        aluno.setTempoPermanencia(tempoPermanencia);
        atendimento.finalizarAtendimento(aluno);
        console.log(`Atendimento finalizado para aluno com chegada às ${aluno.getArrivalDate().toLocaleTimeString()}. Tempo total de permanência: ${tempoPermanencia} segundos. Mesa liberada.`);
    }
}
