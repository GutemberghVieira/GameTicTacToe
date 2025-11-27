const Body = document.querySelector("body");

const DaddyContainer = document.querySelector(".Container");

const chooseYourPlace = document.querySelectorAll(".Place");

const ButtonStandard = document.querySelectorAll(".Standard");
const ButtonX = document.querySelector(".X-Option");
const ButtonO = document.querySelector(".O-Option");
const getBox  = document.querySelectorAll(".BoxForMarks");

const Heading = document.querySelector(".HeadingMenu");
const Span = document.querySelector("span");

const ImgX = document.querySelector(".imgX");
const ImgO = document.querySelector(".imgO");

const CallContainer = document.querySelector(".NotYet");
const SubContainer = document.querySelector(".SubContainerButtons")
const getYeaNotButton = document.querySelectorAll(".yea-not");
const ParagraphConvite = document.querySelector(".ParagraphConvite");
const TextRestart  = document.querySelector(".None");
const MostraResultadoFinal = document.querySelector(".Nothing");
const FlowerButton = document.querySelector(".FlowerButton");
const OFlowerButton = document.querySelector(".OtherFlowerButton"); 

const ContainerSub = document.querySelector(".SubDificulty")

const PlacarNumberPlayer = document.querySelector(".PlacarPlayer");
const PlacarNumberRobo = document.querySelector(".PlacarRobot");

const GameContainer = document.querySelector(".Game");
const OptionContainer = document.querySelector(".Container-Options");

const Seta = document.querySelector(".SetaImg");
const BotaoDeLevel = document.querySelectorAll(".ClickLevel");

const imgHumano = document.querySelector(".Humano");
const imgRobo   = document.querySelector(".Robo");

let Dificuldade = "Impossível";
let Alternar = "Abrir";

/**Nó de elemento Botão de Resetar*/
const ButtonReset = document.querySelector(".ButtonReset");

let L = ["Facil","Medio","Dificil","Impossível"];

/**Seta para abrir o menu */
Seta.addEventListener("click",() => {

if(Alternar === "Abrir")
{
Seta.classList.add("RotateForRight");
Seta.classList.remove("RotateForLeft");

ContainerSub.classList.add("Tr");
ContainerSub.classList.remove("NoTr");

/**Deixa somente o que foi escolhido e elimina o restante */
L.forEach(v => {
v !== Dificuldade ?
BotaoDeLevel.forEach(el => v === el.value ? el.classList.add("RemoveLevel") : "")
:
''
});

Alternar = "Fechar";    
}
else 
{

ContainerSub.classList.remove("Tr");
ContainerSub.classList.add("NoTr");

/**Deixa visivel todos os níveis novamente*/
L.forEach(v => {
v !== Dificuldade ?
BotaoDeLevel.forEach(el => el.classList.remove("RemoveLevel"))
: 
''
});

Alternar = "Abrir";
Seta.classList.remove("RotateForRight");
Seta.classList.add("RotateForLeft");
}

});


const HiddenDiv = (LevelInText) => {
 
BotaoDeLevel.forEach((val) => {

if(val.value !== LevelInText)
{
val.classList.add("RemoveLevel");
Alternar = "Fechar";
Seta.classList.add("RotateForRight");
Seta.classList.remove("RotateForLeft");
ContainerSub.classList.add("Tr")
ContainerSub.classList.remove("NoTr")
}

})

}

BotaoDeLevel.forEach((v,n) => {

const CoresImg = [
"./D-PlanilhaDeLevel/Menu_Green_Ease.png",
"./D-PlanilhaDeLevel/Menu_GreenYellow_Midium.png",
"./D-PlanilhaDeLevel/Menu_Orange_Anger.png",
"./D-PlanilhaDeLevel/Menu_Red_Impossible.png",
];

L.forEach(txt => {


v.addEventListener("click",() => {
if(txt === v.value)
{
Dificuldade = v.value;

ContainerSub.classList.add("Tr");
ContainerSub.classList.remove("NoTr");

v.classList.remove("RemoveLevel");
Seta.src = CoresImg[n];
}
HiddenDiv(Dificuldade)
})
  
})
})


let Tabuleiro = [
null,null,null,
null,null,null,
null,null,null
];

let Profundidade = 3;
let PintarDivVencedora = '';
let MudarImagem = ''

let JogadorAlvo;
let JogoAtivo = false;

let EscolhaDoUsuario;
let EscolhaDoPersonoid;
let YouReadyStart;
let Yes = "Sim";
let Not = "Não";

let PointRobot = 10;
let PointUser = -10;
let Empate = 0;

let JogadasDisponíveis = 9;

let f = 0;

let contador = 0;
let TempoRevisao = null;

let QuemPontua = "";
let PontuacaoHumano = 0;
let PontuacaoPersonoid = 0;
 
const CombinacoesVitorias = [
[0,1,2],[3,4,5],[6,7,8], //Vencer Horizontal
[0,3,6],[1,4,7],[2,5,8], //Vencer Vertical
[0,4,8],[2,4,6] //Vencer Diagonal
];

let CombinacaoDeCelula = [
'','','',
'','','',
'','','',
];

const Close = document.querySelector(".ContainerX");

/**Se Clicar em fechar ele tem a função de Resetar todo O jogo */
const CloseAndReset = () => { 
Tabuleiro = [
null,null,null,
null,null,null,
null,null,null,
];

CombinacaoDeCelula = [
'','','',
'','','',
'','','',
];

YouReadyStart = "";

DivDificulty.classList.remove("EliminateElement");
PlacarNumberPlayer.classList.remove("AnimateNumber");
PlacarNumberRobo.classList.remove("AnimateNumber");

ButtonX.style.zIndex = 3;
ButtonO.style.zIndex = 3;

EscolhaDoUsuario = '';
EscolhaDoPersonoid = '';
Yes = "Sim";
Not = "Não";
f = 0;

OptionContainer.classList.remove("RemoveContainerOptions")
GameContainer.classList.remove("TurnDisplay");

CallContainer.classList.remove("AnimationStart");
SubContainer.style.display = "flex";

getYeaNotButton.forEach(val => {
if(val.classList.contains("Yea") == true)
{
val.innerHTML = "Sim";
}

if(val.classList.contains("Not") == true)
{
val.innerHTML = "Não";
}

val.removeEventListener("click",CallPermission);
})

chooseYourPlace.forEach(val => {
val.classList.remove("X-White-Win");   
val.classList.remove("O-White-Win");   
});

getBox.forEach(val => {
val.classList.remove(`Paint-X`);
val.classList.remove(`Paint-O`);
});

chooseYourPlace.forEach(val => {
val.classList.remove("X");
val.classList.remove("O");
val.classList.remove("Balls");
ButtonX.classList.remove("DisabledButtonX");  
ButtonO.classList.remove("DisabledButtonO"); 
})

Heading.innerHTML = "Qual marcação você escolhe?";
Span.innerHTML = "";
Span.classList.remove("TextXStyle");
Span.classList.remove("TextOStyle");

if(ButtonX.classList.contains("ClickX") == false)
{
ButtonX.classList.add("ClickX");
}

if(ButtonO.classList.contains("ClickO") === false)
{
ButtonO.classList.add("ClickO");
}

ButtonX.style.zIndex = 3;
ButtonO.style.zIndex = 3;
}

Close.removeEventListener("click",CloseAndReset);
Close.addEventListener("click",CloseAndReset);

ButtonReset.removeEventListener("click",CloseAndReset);
ButtonReset.addEventListener("click",CloseAndReset);


/**
 * Retorna o Tabuleiro para Verificar o vencedor da partida
 *@param {string[]} TABULEIRO - Retorna o estado atual do tabuleiro
 *@param {string} JOGADOR - Retorna a escolha de um dos jogadores
*/

/**Sistema Vencedor da partida */
const vencedorDaPartida = (TABULEIRO,JOGADOR) => {

for(let i = 0; i < CombinacoesVitorias.length; i++)
{

const [a,b,c] = CombinacoesVitorias[i];

if(
TABULEIRO[a] == JOGADOR && 
TABULEIRO[b] == JOGADOR && 
TABULEIRO[c] == JOGADOR
)
{
return true;    
}

}

return false;
}

const avaliarPartida = (TABULEIRO,PROFUNDIDADE,PERSONOID,HUMAN) =>
{

if(vencedorDaPartida(TABULEIRO,PERSONOID))
{
return PointRobot - PROFUNDIDADE;/**Robo Vence a Partida*/
}

if(vencedorDaPartida(TABULEIRO,HUMAN))
{
return PointUser + PROFUNDIDADE; /**Humano Vence a Partida*/
}

const CasasVazias = TABULEIRO.filter(v => v === null).length;
if(CasasVazias === 0)
{
return Empate; /**Empate De Jogo*/
}
return null;
}
    
/**  
 *Estado do Tabuleiro, Quantas Jogadas Estão sendo Simuladas, é a vez de Quem?
 *@param {Array<string>} MapaDoTabuleiro - Retorna o estado atual do mapa do tabuleiro.
 *@param {number} Profundidade - Quantas Jogadas Estão sendo Simuladas?
 *
 *@param {boolean} Turno - É a Vez de qual Jogador (IA|US)?
 *@returns {number}  o melhor valor de pontuação encontrado para o jogo
 */

/**Lógica do minimax ela serve para ver os futuros a frente e escolher a melhor jogada para ia */
const IA_Strategy_Win = (MapaDoTabuleiro,Profundidade,Turno,Personoid,Human) => {

let score = avaliarPartida(MapaDoTabuleiro,Profundidade,Personoid,Human);
if(score !== null)
{
/**Se o score é zero significa que alguém empatou se for difrente de zero significa que alguém venceu e se a profundidade for 0 o jogo termina imediatamente para avaliação*/
return score;
}

/**Vez do Maximizador Robo*/
if(Turno)
{
let melhorValor = -Infinity;    

for(let i =0; i < MapaDoTabuleiro.length; i++)
{

if(MapaDoTabuleiro[i] == null)
{
const novoTabuleiro = [...MapaDoTabuleiro];
novoTabuleiro[i] = Personoid;

let PersonoidValue = IA_Strategy_Win(novoTabuleiro,Profundidade - 1,false,Personoid,Human);
melhorValor = Math.max(melhorValor,PersonoidValue);
}
}
return melhorValor;

}
/**Vez do Minimizador Humano */
else 
{
let melhorValor = Infinity;

for(let i = 0; i < MapaDoTabuleiro.length; i++)
{

if(MapaDoTabuleiro[i] == null)
{
let novoTabuleiro = [...MapaDoTabuleiro];
novoTabuleiro[i] = Human;
let HumanValue = IA_Strategy_Win(novoTabuleiro,Profundidade - 1,true,Personoid,Human);
melhorValor = Math.min(melhorValor,HumanValue);
}

}
return melhorValor;
} 

}

/** 
* Verifica o estado do tabuleiro atual,  
*@param {Array<string>} TabuleiroInicial - Retorna o estado em cada turno de partida
*@param {number} ProfundidadeMaxima - a Profundidade que o robo ira olhar
*@returns {number} - Retorna número de uma jogada
*/

const handleResultado = () => {
CallContainer.classList.remove("NotYet");
CallContainer.classList.remove("AnimationStart");
CallContainer.classList.remove("ContainerConvite");
CallContainer.classList.add("softness");
ContainerSub.classList.add("Desabilitar");
ButtonReset.classList.add("Desabilitar")
CallContainer.style.zIndex = -3;
controleDeTempo = "Pare";
contador = 0;
ButtonX.style.zIndex = -3;
ButtonO.style.zIndex = -3;
Close.style.zIndex = -3;
}

/** 
 *@returns {Array<{indice:number,melhorPontuacao:number}>} - Coleção de Objetos retorna indice e melhor pontuação por jogada
 */

const DificuldadeDaPartida = (novoTabuleiro,Profundidade,Turno,Personoid,Usuario) => {

let ColecaoDeJogadas = [];
let newTabuleiro = [...novoTabuleiro];

for(let i = 0; i < novoTabuleiro.length; i++)
{   

if(novoTabuleiro[i] === null)
{
newTabuleiro[i] = Personoid;
let PontuacaoAtualizada = IA_Strategy_Win(newTabuleiro,Profundidade,Turno,Personoid,Usuario);
newTabuleiro[i] = null;
ColecaoDeJogadas.push({indice:i,melhorPontuacao:PontuacaoAtualizada});
}

}

const OrdenaJogadas = ColecaoDeJogadas.sort((a,b) => b.melhorPontuacao - a.melhorPontuacao);
return OrdenaJogadas
}

const ExpressionImg = (elemento,Player,Pontuacao) => {

/**Comparações De Vitória do Personoid */
if(Player === EscolhaDoUsuario && Pontuacao > 0 && Pontuacao <= 1 && PontuacaoHumano > PontuacaoPersonoid)
{
elemento.src = `A-HumanExpression/GirlHappy_${Player}.png`;
}
else if(Player === EscolhaDoUsuario && Pontuacao >= 2 && Pontuacao <= 3 && PontuacaoHumano > PontuacaoPersonoid)
{
elemento.src = `A-HumanExpression/GirlLove_${Player}.png`;
}
else if(Player === EscolhaDoUsuario && Pontuacao >= 4 && PontuacaoHumano > PontuacaoPersonoid)
{
elemento.src = `A-HumanExpression/GirlSuperHappy_${Player}.png`
}

/**Comparações De Vitória do robo */
if(Player === EscolhaDoPersonoid && Pontuacao > 0 && Pontuacao <= 1 && PontuacaoPersonoid > PontuacaoHumano)
{
elemento.src = `B-Robot-Expression/Robot_Happy_${Player}.png`;
}
else if(Player === EscolhaDoPersonoid && Pontuacao >= 2 && Pontuacao <= 3 && PontuacaoPersonoid > PontuacaoHumano)
{
elemento.src = `B-Robot-Expression/Robot_Amazed_${Player}.png`;
}
else if(Player === EscolhaDoPersonoid && Pontuacao >= 4 && PontuacaoPersonoid > PontuacaoHumano)
{
elemento.src = `B-Robot-Expression/Robot_SuperHappy_${Player}.png`;
}

/**Comparação empate */
if(PontuacaoHumano === PontuacaoPersonoid)
{
imgHumano.src = `A-HumanExpression/GirlHappy_${EscolhaDoUsuario}.png`;
imgRobo.src = `B-Robot-Expression/Robot_Happy_${EscolhaDoPersonoid}.png`
}

/**Comparações de tristeza do robo*/
if(Player !== EscolhaDoPersonoid && PontuacaoHumano > 0 && PontuacaoHumano <= 1 && PontuacaoHumano > PontuacaoPersonoid)
{
imgRobo.src = `B-Robot-Expression/Robot_Why_${EscolhaDoPersonoid}.png`;
}
else if(Player !== EscolhaDoPersonoid && PontuacaoHumano >= 2 && PontuacaoHumano <= 3 && PontuacaoHumano > PontuacaoPersonoid)
{
imgRobo.src = `B-Robot-Expression/Robot_Anger_${EscolhaDoPersonoid}.png`;
}
else if(Player !== EscolhaDoPersonoid && PontuacaoHumano >= 4 && PontuacaoHumano > PontuacaoPersonoid)
{
imgRobo.src = `B-Robot-Expression/Robot_Sad_${EscolhaDoPersonoid}.png`;
}

/**Comparações de tristeza do usuário*/
if(Player !== EscolhaDoUsuario && PontuacaoPersonoid > 0 && PontuacaoPersonoid <= 1 && PontuacaoPersonoid > PontuacaoHumano)
{
imgHumano.src = `A-HumanExpression/GirlWhy_${EscolhaDoUsuario}.png`;
}
else if(Player !== EscolhaDoUsuario && PontuacaoPersonoid >= 2 && PontuacaoPersonoid <= 3 && PontuacaoPersonoid > PontuacaoHumano)
{
imgHumano.src = `A-HumanExpression/GirlAnger_${EscolhaDoUsuario}.png`
}
else if(Player !== EscolhaDoUsuario && PontuacaoPersonoid >= 4 && PontuacaoPersonoid > PontuacaoHumano)
{
imgHumano.src = `A-HumanExpression/GirlSad_${EscolhaDoUsuario}.png`;
}
 
imgHumano.classList.add("soft");
imgRobo.classList.add("soft");
}
 
//Escolhe melhor caminho para o personoid jogar
const EscolhaMelhorCaminho = (TabuleiroInicial,ProfundidadeMaxima,Turno,Personoid,Human) => {   

let melhorMovimento = -1;

const Pontuacao = DificuldadeDaPartida(TabuleiroInicial,ProfundidadeMaxima,Turno,Personoid,Human);

if(Pontuacao.length === 0)
{
return -1;
}

if(Dificuldade === "Impossível")
{
melhorMovimento = Pontuacao[0].indice;
}
 
if(Dificuldade === "Dificil")
{

let ErrorJogada = Math.random();
if(ErrorJogada > 0.90)
{
const IndiceDeErro = Math.min(1,Pontuacao.length - 1);
melhorMovimento = Pontuacao[IndiceDeErro].indice; 
}
else 
{
melhorMovimento = Pontuacao[0].indice
}

}

if(Dificuldade === "Medio")
{
let SixEscolha = Math.min(6,Pontuacao.length);
let EscolhaAgora = Math.floor(Math.random() * SixEscolha);
melhorMovimento = Pontuacao[EscolhaAgora].indice;
}

if(Dificuldade === "Facil")
{
let Aleatoriedade = Math.floor(Math.random() * Pontuacao.length);
melhorMovimento = Pontuacao[Aleatoriedade].indice;
}

return melhorMovimento;
}


let controleDeTempo = "Contar";

const RenderMove = (position,player) => {
const cellElement = document.querySelector(`.Place[data-position="${position}"]`);
if(player == "X")
{
cellElement.classList.add("X");
}
else if(player == "O") 
{
cellElement.classList.add("O");
}
cellElement.classList.remove("Balls");
}

const RetornaJogadaVencedora = (Celula,Jogador) => {
    
const RetirarLinha = [];
const RetirarCorDaImagem = [];

const ColorsBoxes = [];
const ColorsIMG = [];

getBox.forEach(val => {
ColorsBoxes.push(val);
});

chooseYourPlace.forEach(val => {
ColorsIMG.push(val);
});

const EstilosAlinhados = [
//Linhas se Vencer na horizontal
Celula[0] === Jogador && Celula[1] === Jogador && Celula[2] === Jogador ? [ColorsBoxes[0],ColorsBoxes[1],ColorsBoxes[2]] : "",
Celula[3] === Jogador && Celula[4] === Jogador && Celula[5] === Jogador ? 
[ColorsBoxes[3],ColorsBoxes[4],ColorsBoxes[5]] : "",
Celula[6] === Jogador && Celula[7] === Jogador && Celula[8] === Jogador ? 
[ColorsBoxes[6],ColorsBoxes[7],ColorsBoxes[8]] :"",

//Linhas se Vencer na Vertical
Celula[0] === Jogador && Celula[3] === Jogador && Celula[6] === Jogador ? 
[ColorsBoxes[0],ColorsBoxes[3],ColorsBoxes[6]] : "",
Celula[1] === Jogador && Celula[4] === Jogador && Celula[7] === Jogador ? 
[ColorsBoxes[1],ColorsBoxes[4],ColorsBoxes[7]] : "",
Celula[2] === Jogador && Celula[5] === Jogador && Celula[8] === Jogador ? 
[ColorsBoxes[2],ColorsBoxes[5],ColorsBoxes[8]] : "",

//Linhas se Vencer na Diagonal
Celula[0] === Jogador && Celula[4] === Jogador && Celula[8] === Jogador ? 
[ColorsBoxes[0],ColorsBoxes[4],ColorsBoxes[8]] : "",
Celula[2] === Jogador && Celula[4] === Jogador && Celula[6] === Jogador ? 
[ColorsBoxes[2],ColorsBoxes[4],ColorsBoxes[6]] : "",
];

EstilosAlinhados.filter(val => { 
val !== ""&&RetirarLinha.push(val);
});

const CorDaImagem = [
//Mudar Cor Das Imagens do vencedor Horizontal
Celula[0] === Jogador && Celula[1] === Jogador && Celula[2] === Jogador ? [ColorsIMG[0],ColorsIMG[1],ColorsIMG[2]] : "",
Celula[3] === Jogador && Celula[4] === Jogador && Celula[5] === Jogador ? 
[ColorsIMG[3],ColorsIMG[4],ColorsIMG[5]] : "",
Celula[6] === Jogador && Celula[7] === Jogador && Celula[8] === Jogador ? 
[ColorsIMG[6],ColorsIMG[7],ColorsIMG[8]] :"",

//Mudar Cor Das Imagens do Vencedor Vertical
Celula[0] === Jogador && Celula[3] === Jogador && Celula[6] === Jogador ? 
[ColorsIMG[0],ColorsIMG[3],ColorsIMG[6]] : "",
Celula[1] === Jogador && Celula[4] === Jogador && Celula[7] === Jogador ? 
[ColorsIMG[1],ColorsIMG[4],ColorsIMG[7]] : "",
Celula[2] === Jogador && Celula[5] === Jogador && Celula[8] === Jogador ? 
[ColorsIMG[2],ColorsIMG[5],ColorsIMG[8]] : "",

//Mudar Cor Das Imagens do Vencedor Diagonal
Celula[0] === Jogador && Celula[4] === Jogador && Celula[8] === Jogador ? 
[ColorsIMG[0],ColorsIMG[4],ColorsIMG[8]] : "",
Celula[2] === Jogador && Celula[4] === Jogador && Celula[6] === Jogador ? 
[ColorsIMG[2],ColorsIMG[4],ColorsIMG[6]] : "",
];

CorDaImagem.filter(val => {
val !== ""&&RetirarCorDaImagem.push(val);
});
 
return [RetirarLinha,RetirarCorDaImagem]
}

/**
 * @param {Array} tabuleiro - Recebe o estado do tabuleiro principal
 * @param {string} Vencedor - Texto de quem foi o vencedor da partida
 * @param {Array} PecaVencedora - Retorna uma linha vencedora
 */

//Retorna Quem Venceu 
const QuemVenceu = (tabuleiro,Jogador,PlayerVencedor,ElementoDiv) => {

//Ganhador da partida 
if(vencedorDaPartida(tabuleiro,Jogador))
{
    
JogoAtivo = false;
PintarDivVencedora = ElementoDiv;
 
for(let i = 0; i < 3; i++)
{
PintarDivVencedora[0][0][i].classList.add(`Paint-${Jogador}`);
ElementoDiv[1][0][i].classList.add(`${Jogador}-White-Win`);
}

if(QuemPontua === "Humano")
{
PlacarNumberPlayer.classList.add("AnimateNumber");
PlacarNumberPlayer.innerHTML = ++PontuacaoHumano;

ExpressionImg(imgHumano,EscolhaDoUsuario,PontuacaoHumano)
}
else 
{
PlacarNumberRobo.classList.add("AnimateNumber");
PlacarNumberRobo.innerHTML = ++PontuacaoPersonoid;

ExpressionImg(imgRobo,EscolhaDoPersonoid,PontuacaoPersonoid)
}

if(Jogador === "X")
{
FlowerButton.src = "./LogoTipoJogoDaVelhaX.jpg";
OFlowerButton.src = "./LogoTipoJogoDaVelhaX2.jpg";
Body.classList.add("Red");
Body.classList.remove("Blue");
}
else if(Jogador === "O")
{
FlowerButton.src = "./LogoTipoJogoDaVelhaO.png";
OFlowerButton.src = "./LogoTipoJogoDaVelhaO2.png";
Body.classList.add("Blue");
Body.classList.remove("Red");
}

chooseYourPlace.forEach(val => {
val.style.zIndex = -3;
})

CallContainer.classList.add("ContainerConvite");
CallContainer.classList.remove("AnimationStart");
CallContainer.classList.remove("NotYet");
CallContainer.style.zIndex = 5;
ParagraphConvite.innerHTML = PlayerVencedor;

SubContainer.classList.add("Restart");
TextRestart.classList.add("PlayAgain");
TextRestart.innerHTML = "Você quer jogar novamente?";
YouReadyStart = "";

TempoRevisao = setInterval(() => {
if(contador >= 10 && controleDeTempo === "Pare")
{
controleDeTempo = "Contar";
CallContainer.classList.remove("NotYet");
CallContainer.classList.remove("AnimationStart");
CallContainer.classList.remove("softness");
CallContainer.classList.add("ContainerConvite");
CallContainer.style.zIndex = 3;
}
else if(contador === 10)
{
contador;
}
else 
{
contador++
}
return contador   
},1000);


//Botão de Continuar
getYeaNotButton.forEach(val => {
//Adiciona um estilo e um texto para o botão de ver prévia do jogo
MostraResultadoFinal.classList.add("ResultadoFinalDeJogo");
MostraResultadoFinal.innerHTML = "Ver Resultado";

//Remove e Adiciona click por rodada para não acumular listeners
MostraResultadoFinal.removeEventListener("click",handleResultado);
MostraResultadoFinal.addEventListener("click",handleResultado);

if(val.classList.contains("Yea") === true)
{   
val.innerHTML = "Continuar";

val.removeEventListener("click",CallPermission);
val.addEventListener("click",CallPermission);
//Remove o Listener Antigo
val.removeEventListener("click",ContinuarHandleClick);
//Adiciona o Novo Listener
val.addEventListener("click",ContinuarHandleClick);
}
else 
{
val.innerHTML = "";
val.style.display = "none";
//Remove qualquer Listener Repetido 
val.removeEventListener("click",ContinuarHandleClick);
val.removeEventListener("click",CallPermission);
}
 
})

}
//Verifica se houve empate
else if(Tabuleiro.filter(v => v === null).length === 0)
{
JogoAtivo = false;

chooseYourPlace.forEach(val => {
val.style.zIndex = -3;
})

CallContainer.classList.add("ContainerConvite");
CallContainer.classList.remove("AnimationStart");
CallContainer.classList.remove("NotYet");
CallContainer.style.zIndex = 5;
ParagraphConvite.innerHTML = "Empataram!"

SubContainer.classList.add("Restart");
TextRestart.classList.add("PlayAgain");
TextRestart.innerHTML = "Você Quer Jogar Novamente?";
YouReadyStart = "";

TempoRevisao = setInterval(() => {
if(contador >= 10 && controleDeTempo === "Pare")
{
controleDeTempo = "Contar";
CallContainer.classList.remove("NotYet");
CallContainer.classList.remove("AnimationStart");
CallContainer.classList.remove("softness");
CallContainer.classList.add("ContainerConvite");
CallContainer.style.zIndex = 3;
}
else if(contador == 10)
{
contador;
}
else 
{
contador++
}
    
},1000);

getYeaNotButton.forEach(val => {

MostraResultadoFinal.classList.add("ResultadoFinalDeJogo");
MostraResultadoFinal.innerHTML = "Ver Resultado";
MostraResultadoFinal.removeEventListener("click",handleResultado);
MostraResultadoFinal.addEventListener("click", handleResultado);

if(val.classList.contains("Yea") === true)
{   
val.innerHTML = "Continuar";
val.removeEventListener("click",CallPermission);
val.addEventListener("click",CallPermission);
val.removeEventListener("click",ContinuarHandleClick);
val.addEventListener("click",ContinuarHandleClick);
}
else 
{
val.innerHTML = "";
val.style.display = "none";
val.removeEventListener("click",CallPermission);
val.removeEventListener("click",ContinuarHandleClick);
}

})

return;
}
return null;
}

const ContinuarHandleClick = (e) => {

if(TempoRevisao !== null)
{
clearInterval(TempoRevisao);
TempoRevisao = null;
contador = 0;
}

/**Botão de Continuar Reseta o Game para jogar novamente */
if(e.target.classList.contains("Yea") === true)
{

ContainerSub.classList.remove("Desabilitar");
ButtonReset.classList.remove("Desabilitar");

imgHumano.classList.remove("soft");
imgRobo.classList.remove("soft");

getBox.forEach(val => {
val.classList.remove(`Paint-X`)
val.classList.remove(`Paint-O`)
});


HiddenDiv(Dificuldade);

DivDificulty.classList.remove("EliminateElement");
PlacarNumberPlayer.classList.remove("AnimateNumber");
PlacarNumberRobo.classList.remove("AnimateNumber");

//Limpa o Tabuleiro e todas as marcações do usuário/personoid
chooseYourPlace.forEach(val => 
{

val.classList.remove(EscolhaDoUsuario);
val.classList.remove(EscolhaDoPersonoid);
val.classList.remove(`${EscolhaDoUsuario}-White-Win`);
val.classList.remove(`${EscolhaDoPersonoid}-White-Win`);
 
Tabuleiro = [
null,null,null,
null,null,null,
null,null,null,
];

CombinacaoDeCelula = [
'','','',
'','','',
'','','',
];

ButtonX.style.zIndex = -3;
ButtonO.style.zIndex = -3;
Close.style.zIndex = 3;
})

if(YouReadyStart === "Não")
{
JogoAtivo = true;
JogadorAlvo = EscolhaDoPersonoid
AiPlayer();
}
else 
{
JogoAtivo = true;
JogadorAlvo = EscolhaDoUsuario;
}

return;
}

}

const FActiveGame = (AtiveOrDesative) => {
return chooseYourPlace.forEach((val,num) => {Tabuleiro[num] == null ? val.style.zIndex = AtiveOrDesative : ""});
} 

//Registra Click do usuário
const handleClick = (event) => {

const celula = event.target;

celula.style.zIndex = -3;

const Position = parseInt(celula.getAttribute("data-position"));

if(!JogoAtivo && Tabuleiro[Position] !== null && JogadorAlvo !== EscolhaDoUsuario)
{
return;
}

DivDificulty.classList.add("EliminateElement");

Tabuleiro[Position] = EscolhaDoUsuario;
if(JogadorAlvo === EscolhaDoUsuario && JogoAtivo === true)
{
RenderMove(Position,EscolhaDoUsuario);
CombinacaoDeCelula[Position] = EscolhaDoUsuario;
}
HiddenDiv(Dificuldade);

/**Função Que Desativa os botões para o usuário não jogar rápido quebrando o jogo*/
FActiveGame(-3);

//Retorna o estilo da linha vencedora X
let QualJogadorVenceu = RetornaJogadaVencedora(CombinacaoDeCelula,EscolhaDoUsuario);

if(JogoAtivo === true)
{
QuemPontua = "Humano";
//Verifica quem foi o vencedor da partida
QuemVenceu(Tabuleiro,EscolhaDoUsuario,"Você Venceu Parábens!",QualJogadorVenceu);
}

JogadorAlvo = EscolhaDoPersonoid;

//Impede o usuário de escolher uma posição na vez do personoid
chooseYourPlace.forEach((val,num) => {
if(Tabuleiro[num] !== null)
{
val.style.zIndex = -3;
}

})

setTimeout(AiPlayer,500);
}

chooseYourPlace.forEach((element) => {
element.addEventListener("click",handleClick);
});

/**Monitora a Jogada da IA */
const AiPlayer = () => 
{

if(!JogoAtivo || JogadorAlvo !== EscolhaDoPersonoid)
{
return;
} 

const MelhorPosicao = EscolhaMelhorCaminho(Tabuleiro,JogadasDisponíveis,false,EscolhaDoPersonoid,EscolhaDoUsuario);

if(JogadorAlvo === EscolhaDoPersonoid && JogoAtivo === true)
{
Tabuleiro[MelhorPosicao] = EscolhaDoPersonoid;
RenderMove(MelhorPosicao,EscolhaDoPersonoid);
}
HiddenDiv(Dificuldade);

/**Depois que o personoid jogar os botões voltam a ficar ativos novamente */
FActiveGame(3);

CombinacaoDeCelula[MelhorPosicao] = EscolhaDoPersonoid;
let QualJogadorVenceu = RetornaJogadaVencedora(CombinacaoDeCelula,EscolhaDoPersonoid);

//Verifica se o Usuário/Robo clicou em alguma parte específica, Se um dos dois clicou na casa 0 e 3, eles não poderão mais clicar nelas só do 1,2,4 até 8
chooseYourPlace.forEach((e,i) => {
if(Tabuleiro[i] !== null)
{
e.style.zIndex = -3;
}

if(e.classList.contains("Balls") === false && Tabuleiro[i] !== EscolhaDoPersonoid && Tabuleiro[i] !== EscolhaDoUsuario)
{
e.classList.add("Balls");
}

});

if(JogoAtivo === true)
{
QuemPontua = "Robo"
//Verificar se o robo venceu
QuemVenceu(Tabuleiro,EscolhaDoPersonoid,"O Personoid Foi o Vencedor! Tente Novamente!",QualJogadorVenceu);
}

return JogadorAlvo = EscolhaDoUsuario;
}

const AperteUmDosNoveBotoes = (EscolhaMarca) => {
EscolhaDoUsuario = EscolhaMarca;
EscolhaDoPersonoid = EscolhaDoUsuario == "X" ? "O" : "X";
 
JogoAtivo = true;

chooseYourPlace.forEach((event) => {
event.style.zIndex = 3;
event.classList.add("Balls");
})
 
if(YouReadyStart == "Não")
{
 
JogadorAlvo = EscolhaDoPersonoid;
AiPlayer();
}
else 
{
JogadorAlvo = EscolhaDoUsuario;
}

}

/**Função retorna Escolha entre os botões X e O*/
const EscolhaBotao = (BotaoRemovido,TextoRemovido,Desabilitado,Heading,TextoHeading,Span,TextoSpan,TextoStyle,TextoEscolha,ChamaContainer) => {

BotaoRemovido.classList.remove(TextoRemovido);
BotaoRemovido.disabled = true;
BotaoRemovido.classList.add(Desabilitado);
Heading.innerHTML = TextoHeading;
Span.innerHTML = TextoSpan;
Span.classList.add(TextoStyle);

EscolhaDoUsuario = TextoEscolha;
if(EscolhaDoUsuario == TextoEscolha && f == 0)
{
f = 1;
ChamaContainer.classList.add("ContainerConvite");
ChamaContainer.classList.remove("NotYet");
ChamaContainer.style.zIndex = '';
ButtonX.style.zIndex = -3;
ButtonO.style.zIndex = -3;
ParagraphConvite.innerHTML = "Você quer começar?";

getYeaNotButton.forEach(val => {

if(val.classList.contains("Yea") === true)
{
val.innerHTML = "Sim";
}

if(val.classList.contains("Not") === true)
{
val.innerHTML = "Não";
val.style.display = "block";
}

val.classList.add("Apareca");
val.removeEventListener("click",ContinuarHandleClick);
val.removeEventListener("click",CallPermission);
val.addEventListener("click", CallPermission);
})

}

}

/**Função que pergunta se ele quer começar ou não */
const CallPermission = (e) => {

if(e.target.classList.contains("Yea") == true)
{
CallContainer.classList.add("NotYet");
CallContainer.classList.add("AnimationStart");
CallContainer.classList.remove("ContainerConvite");
ParagraphConvite.classList.add("MoveParagraph");
SubContainer.classList.remove("Restart")
ParagraphConvite.innerHTML = "Começou";
TextRestart.classList.remove("PlayAgain");
TextRestart.innerHTML = "";

DivDificulty.classList.add("EliminateElement");
MostraResultadoFinal.classList.remove("ResultadoFinalDeJogo");

OptionContainer.classList.add("RemoveContainerOptions");
GameContainer.classList.add("TurnDisplay");
HiddenDiv(Dificuldade);

Tabuleiro = [
null,null,null,
null,null,null,
null,null,null,
];

CombinacaoDeCelula = [
'','','',
'','','',
'','','',
];

if(Yes == "Sim")
{
Not = "";
}
YouReadyStart = Yes == "" ? "Não" : "Sim";
}
 
if(e.target.classList.contains("Not") === true)
{
CallContainer.classList.add("NotYet");
CallContainer.classList.add("AnimationStart");
CallContainer.classList.remove("ContainerConvite");
ParagraphConvite.classList.add("MoveParagraph");
SubContainer.classList.remove("Restart");
ParagraphConvite.innerHTML = "Começou";
TextRestart.classList.remove("PlayAgain");
DivDificulty.classList.add("EliminateElement");
TextRestart.innerHTML = "";
HiddenDiv(Dificuldade);

Tabuleiro = [
null,null,null,
null,null,null,
null,null,null,
];

CombinacaoDeCelula = [
'','','',
'','','',
'','','',
];

OptionContainer.classList.add("RemoveContainerOptions");
GameContainer.classList.add("TurnDisplay");

MostraResultadoFinal.classList.remove("ResultadoFinalDeJogo");

if(Not == "Não")
{
Yes = "";
}

YouReadyStart = Not == "" ? "Sim" : "Não";
}

let i = 0;
SubContainer.style.display = "none";

let ContarPorUmSegundo = setInterval(() => {
i++
if(i <= 1)
{
CallContainer.style.zIndex = -3;
clearInterval(ContarPorUmSegundo);
ParagraphConvite.innerHTML = "";
}
},1000);

AperteUmDosNoveBotoes(EscolhaDoUsuario);
} 

/**Monitoramento de Evento de click de Escolha entre X e O */
ButtonStandard.forEach((val) => {

val.addEventListener("click",() => 
{  
if(val.classList.contains("ClickX") == true)
{
EscolhaBotao(ButtonO,"ClickO","DisabledButtonO",Heading,"Você Joga Com o",Span,"X","TextXStyle","X",CallContainer);  
};

if(val.classList.contains("ClickO") == true)
{
EscolhaBotao(ButtonX,"ClickX","DisabledButtonX",Heading,"Você Joga Com a",Span,"O","TextOStyle","O",CallContainer);
};
}
)});


