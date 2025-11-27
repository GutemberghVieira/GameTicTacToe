
const CallContent = document.querySelector(".Container");
const ContainerGame =  document.querySelector(".GameContainer");

const OpenGamingButton = document.querySelector(".OpenGaming");
const CloseX = document.querySelector(".ContainerX");
const DivDificulty = document.querySelector(".Dificulty");


OpenGamingButton.addEventListener("click",(e) => 
{
e.preventDefault();

CloseX.classList.add("RemoverPorEnquanto");
ContainerGame.classList.add("RemoverPorEnquanto");

CallContent.classList.add("AnimationLinear");
CallContent.classList.remove("RemoveAnimationLinear");

let EspereDepoisExecute = setInterval(() => 
{

if(n < 2)
{
n++
}
else 
{
clearInterval(EspereDepoisExecute);

CloseX.classList.add("CallChild");
CloseX.classList.remove("RemoveCallChild");
CloseX.classList.remove("RemoverPorEnquanto");

ContainerGame.classList.add("CallChild");
ContainerGame.classList.remove('RemoveCallChild');
ContainerGame.classList.remove("RemoverPorEnquanto");

DivDificulty.classList.add("CallChild");
DivDificulty.classList.remove("RemoveCallChild");
DivDificulty.classList.remove("RemoverPorEnquanto");

n = 0
}

},900);
});


let n = 0;

CloseX.addEventListener("click",(e) => 
{
e.preventDefault();
CallContent.classList.remove("AnimationLinear");
CallContent.classList.add("RemoveAnimationLinear");

CloseX.classList.remove("CallChild");
CloseX.classList.add('RemoveCallChild');

ContainerGame.classList.remove('CallChild');
ContainerGame.classList.add("RemoveCallChild"); 

DivDificulty.classList.remove("CallChild");
DivDificulty.classList.add("RemoveCallChild");

});
 