/*              VARIABLES               */
//Guarda  los botones
let btn_carta = document.querySelector("#baraja")
let btn_empezar = document.querySelector('#empezar')
//div y tb nuevos
let div_tablero=document.querySelector('#tabla-juego')
let tb_padre=document.querySelector("#padre")
//Textos que cambian
let txt_resultado=document.querySelector('#Resultado')
let txt_bienvenida=document.querySelector('#bienvenida')
let txt_nombre = document.querySelector('#nombre')
let txt_cartasresult = document.querySelector('#cartas')
let txt_ganarNext=document.querySelector('#GanarNext')
let txt_perderNext=document.querySelector('#PerderNext')
let txt_conqueganas=document.querySelector('#Falta')
//Variables internas
let suma=0;    
let suma_cartas=0;
var repImage;  
var nueva ;
//Listas
let ases =[]
let manoActual = [];
let cartas = [
    "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
    "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
    "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
    "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]
    
/*          Calculos de probabilidad            */


let ganarnext=()=>
{
    txt_ganarNext.textContent =(retornavalor())+"/"+ (cartas.length) +" = "+(retornavalor()/cartas.length).toFixed(4)

}
let perdernext=()=>
{
    txt_perderNext.textContent = (cartas.length)+"/"+("cartas extra ")
}
//Retorna la cantidad de elementos cuya suma es nesaria para llegar 21 
let retornavalor=()=>{
    cont=0;
    let necesito=21-suma
    txt_conqueganas.textContent ='Conque carta ganas? : '+ necesito
    cartas.forEach(element => {
        if(necesito==10){
            if ("1"==element.substring(0,1)||"J"==element.substring(0,1)||"Q"==element.substring(0,1)||"K"==element.substring(0,1)){
                cont-=-1;
            }
        }
        else if(necesito==1 || necesito==11){
            if ("A"==element.substring(0,1)){
                cont-=-1;
            }
        }
        else if(necesito>11){
            cont=0
        }
        else{
                if (necesito==element.substring(0,1)){
                    cont-=-1;
            }
        }
    });
    return cont
}


/*          Obtener una carta               */

let getCard = ()=> 
{ 
    //da un numero random
    var rdm_card = Math.floor((Math.random() * cartas.length));
    //regresa la poscicion del elemento
    let card_aux= cartas.indexOf(cartas[rdm_card])
    //selecciona una carta en la posicion 
    let card = cartas[rdm_card]
    //separa el mazo y lo une sin la carta que se eligio
    cartas.splice(card_aux, 1); 
    //selecciona la primera letra o numero de la carta y lo guarda
    let sum_card = card.substring(0,1)
    //agrega la carta que se tiene al mazo nuevo
    manoActual.push(sum_card)
    /*          Despues de todo pregunta que carta sale para sumar al total     */
    if(sum_card == "J" || sum_card == "Q" || sum_card == "K" || sum_card == "1")
        {
        suma-=-10
        suma_cartas-=-1
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)
        validadeAs()
        }
    else if(sum_card == "A")
        {
        suma+=11
        agregarAs("A")
        validadeAs()
        }
    else
        {
        suma = suma + parseInt(sum_card)
        suma_cartas-=-1
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)
        validadeAs()

        }

    return `<img src='images/JPEG/Cartas/${card}.jpg' width='100' height='150'>`    
};
/*      Obtener un As                       */
let agregarAs = (as)=>{
    ases.push(as)
}

let validadeAs =()=>{
    if(ases.length != 0){
        if(suma > 21){
            suma-=10
            ases.pop()
        }
    }
}
/*          Comienzo            */

btn_empezar.addEventListener("click", ()=>
{
    if(suma>=21||(suma_cartas==5 && suma<21))
        {
        location.reload();
        }
    else
        {
        set_name()
        btn_empezar.style.visibility = 'hidden'
        start()
        perdernext()
        ganarnext()
        }
})

btn_carta.addEventListener("click", ()=>
{
    if(suma<21)
    {
        primeramano()
        perdernext()
        ganarnext()
        if(suma==21 || (suma_cartas==5 && suma<21) || (suma_cartas==2 && suma == 11))
        {
            resultado("Ganaste")
        }
        else if (suma>21)
        {
            resultado("Perdiste")
        }
    }
    
})
//      funciones ejecutadas por los botones
//hace el tablero visible y da 2 cartas al usuario
let start = ()=>
{
    div_tablero.style.visibility = 'visible'
    primeramano()
    primeramano()
    if(suma==21)
    {
        resultado("Ganaste")
    }
}
// pregunta el nombre del usuario
let set_name = ()=>
{
    if(txt_nombre.textContent == "")
    {
    txt_nombre.textContent = prompt("Hola ,como Te llamas? ","Legolas");
    if (txt_nombre.textContent == ""||null) 
        {
        txt_nombre.textContent= "Legolas"
        }
    }
}
//agrega una carta en la baraja y muestra el valor de la suma
let primeramano = ()=>
{
    var nueva = tb_padre.insertCell(-1);
    nueva.innerHTML = getCard()
    txt_resultado.textContent = suma
}
//  Cuando termina muestra la suma y el boton de comenzar de nuevo
let resultado=(resultadopartida)=>{
    txt_resultado.textContent =resultadopartida+ " con : "+suma
    btn_empezar.style.visibility = 'visible'
}


