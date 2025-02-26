import { MaquinaEventos } from "./domain/simulation-engine/maquina-de-eventos/maquinadeeventos";
import { Refeitorio } from "./domain/simulation-engine/system/refeitorio";
import { GaussianRandom } from "./domain/simulation-engine/util/random-generators";
import { ResultadosSimulacao, Simulacao, Simulador, SimulationParameters } from "./domain/simulator";


// Criar parâmetros da simulação
const parametros = new SimulationParameters(
    50,  // internalQueueLimit
    20,  // tableLimit
    5,   // registrationTime
    10,  // servingTime
    15,  // tableTime
    3,   // turnstileLimit
    100, // studentCount
    2,   // serviceInterval
    "normal" // arrivalDistribution
);

// Criar objeto para armazenar os resultados
const resultados = new ResultadosSimulacao([], [], [], 0, 0, 0, 0, 0, 0);

// Criar a simulação
const simulacao = new Simulacao(parametros, resultados);

// Criar a máquina de eventos
const maquinaEventos = new MaquinaEventos();

// Criar o refeitório com os valores necessários
const refeitorio = new Refeitorio(
    parametros.internalQueueLimit, // LFI (Limite da fila interna)
    5,  // QAL (Quantidade de alunos liberados por vez)
    parametros.tableLimit, // LM (Limite de mesas)
    7,  // TMDM (Tempo médio de mesa)
    3,  // TMPSC (Tempo médio para se sentar)
    4,  // TMPNM (Tempo médio para o próximo movimento)
    [new GaussianRandom()] // Geradores aleatórios
);

// Criar o simulador com a configuração correta do refeitório
const simulador = new Simulador(refeitorio, maquinaEventos, simulacao);

// Executar a simulação
simulador.executarSimulacao();

// Exibir os resultados no console
console.log("Resultados da Simulação:");
console.log(simulacao.resultados);
