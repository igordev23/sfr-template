import { Aluno } from "./aluno";
import { Refeitorio } from "./refeitorio";

/**
 * Classe Atendimento
 *
 * Responsável por gerenciar o fluxo de atendimento dos alunos dentro do refeitório.
 * Coordena a entrada de alunos para pegar comida, sua ocupação nas mesas e a liberação das mesmas.
 */
export class Atendimento {
    constructor(private refeitorio: Refeitorio) {} // Recebe uma instância de Refeitorio para gerenciar o atendimento.

    /**
     * Inicia o atendimento de um aluno, verificando se há alunos na fila interna
     * e se há mesas disponíveis no refeitório.
     */
    public iniciarAtendimentoAluno(): void {
        if (this.refeitorio.getFilaInterna().quantidadeAtual() > 0 && this.refeitorio.getMesas().temMesasDisponiveis()) {
            this.processarAtendimento();
        }
    }

    /**
     * Processa o atendimento de um aluno, removendo-o da fila interna e simulando o tempo
     * necessário para pegar a comida. Se não houver mesas disponíveis, pausa o atendimento.
     */
    public processarAtendimento(): void {
        if (!this.refeitorio.getMesas().temMesasDisponiveis()) {
            console.log("Todas as mesas estão ocupadas. Atendimento pausado.");
            return;
        }

        const aluno = this.refeitorio.getFilaInterna().removerAluno(); // Remove um aluno da fila interna para atendimento.
        if (aluno) {
            const tempoServico = this.refeitorio.getTMPNM(); // Obtém o tempo médio de atendimento do refeitório.

            // Simula o tempo que o aluno leva para pegar a comida
            setTimeout(() => {
                if (this.refeitorio.getMesas().ocuparMesa()) {
                    console.log(`Aluno ${aluno.getMatricula()} pegou comida e está indo para a mesa.`);
                    this.processarSaidaDaMesa(aluno); // Inicia o processo de saída do aluno da mesa após a refeição.
                }
            }, tempoServico * 1000);
        }
    }

    /**
     * Processa a saída do aluno da mesa após ele terminar sua refeição.
     * Simula o tempo de permanência do aluno na mesa antes de liberá-la.
     * Após liberar a mesa, verifica se há novos alunos para atender.
     */
    public processarSaidaDaMesa(aluno: Aluno): void {
        const tempoPermanencia = this.refeitorio.getTMPNM(); // Obtém o tempo médio que um aluno permanece na mesa.

        setTimeout(() => {
            this.refeitorio.getMesas().liberarMesa(); // Libera uma mesa após o aluno terminar a refeição.
            console.log(`Aluno ${aluno.getMatricula()} terminou sua refeição e liberou uma mesa.`);

            this.iniciarAtendimentoAluno(); // Tenta iniciar o atendimento do próximo aluno na fila.
            this.refeitorio.tentarLiberarCatraca(); // Verifica se a catraca pode ser liberada para novos alunos.
        }, tempoPermanencia * 1000);
    }
}
