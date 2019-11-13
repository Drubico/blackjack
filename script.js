/************************************************************************************************** */            
                            /*              VARIABLES               */
/************************************************************************************************** */            
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
let txt_vivirNext=document.querySelector('#vivirNext')
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
/************************************************************************************************** */            
                        /*          Calculos de probabilidad            */
/************************************************************************************************** */            
//Muestra la probabilidad de ganar en la siguiente ronda
let ganarnext=()=>
{
    //retornarvalor->   es los casos favorables
    //cartas.lenght->   son los casos posibles(cartas que aun no salen)
    //tofixed muestra o redondea 4 decimales
    txt_ganarNext.textContent =(casosfavorables_ganar_siguiente())+"/"+ (cartas.length) +
                            " = "+((casosfavorables_ganar_siguiente()/cartas.length).toFixed(2)*100)+"%"
}
//Muestra  las probabilidades de perder en la siguiente ronda
let perdernext=()=>
{
    //casosfavorables_Noseguirvivo cuenta el numero de cartas que al sumar con lo que tengo se pasaria de 21
    //fixed redondea a 2 decimales
    txt_perderNext.textContent =(casosfavorables_Noseguirvivo())+"/"+ (cartas.length) +
    " = "+((casosfavorables_Noseguirvivo()/cartas.length).toFixed(2)*100)+"%"
}
let seguirnext=()=>{
    txt_vivirNext.textContent =(casosfavorables_Seguirvivo())+"/"+ (cartas.length) +
    " = "+((casosfavorables_Seguirvivo()/cartas.length).toFixed(2)*100)+"%"
}
/************************************************************************************************** */
/************************************************************************************************** */
//Retorna la cantidad de elementos cuya suma es nesaria para llegar 21 
let casosfavorables_ganar_siguiente=()=>{
    //cont cuentas las ocaciones que salen numeros con los que puedo ganar
    cont=0;
    //necesito es el numero con el que ganaria en la proxima ronda
    let necesito=21-suma
    //cambia el texto de las cartas que se necesitan para ganar
    txt_conqueganas.textContent ='Conque carta ganas? : '+ necesito
    //recorre el mazo(lista con todas las cartas) y guarda en element el valor que trae en la iteracion
    cartas.forEach(element => {
        //actual es el valor que trae en la iteracion del mazo y substring divide el valor y solo queda la primera letra 
        // por ejemplo las cartas tienen el nombre de AC o AD y substring corta y deja solo A
        actual=element.substring(0,1)
        //Los if preguntan ocaciones especiales
            //si necesitas 10 para ganar hay 4 tipos de cartas que da esa suma 
        if(necesito==10){
            //si necesita 10 solo lo puede dar los siguientes indices 1 (substring de 10 ),J,Q,K
            if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
            {
                //suma al contador una iteracion
                //cont-=-1 es lo mismo que cont +=1
                cont-=-1;
            }
        }
        //si se necesita 1 o se necesita 11 el As es el que cumple con eso
        else if(necesito==1 || necesito==11){
            //Si la carta es A se suma al iterador
            if (actual=="A"){
                cont-=-1;
            }
        }
        //si lo que necesito es mayor a 11 (no se puede en una sola carta )
        //regresa un cero porque no exite esa probabilidad
        else if(necesito>11){
            cont=0
        }
        //si el elemento no tiene un requisito especial
        else{
                //se pregunta si lo que se necesita es igual ala iteracion en el mazo y se suma la iteracion si asi es 
                if (necesito==parseInt(actual)){
                    cont-=-1;
            }
        }
    });
    //retorna todas las ocurrencias que encontro
    return cont
}
let casosfavorables_Noseguirvivo=()=>{
    //contador de ocurrencias
    cont=0;
    //el elemento de iteracion 
    let subelement;
    // variable que determina si la suma con un elemento que recorre la lista se pasa de 21
    let muerte ;
    //recorre la baraja
    cartas.forEach(element => 
    {
        //actual es la primera letra o numero de la palabra en en la baraja que es lo que se necesita
        actual=element.substring(0,1)
        //pregunta si la iteracion trae un As
        if(actual=="A")
        {
            //se toma el as como un 1 
            subelement=1
            //muerte es el resultado que daria si se tomara el elemento dela iteracion actual
            muerte=suma+subelement
            //si muerte es mayor a 21 significa que perderia si se usara ese elemento y es lo que buscamos
            if(muerte>21)
            { 
                //Se suma uno ala probabilidad de morir
                cont-=-1
            }
        }
        // si actual es igual a 1 o J o Q o K  significa que va a sumar 10 por eso se toma como un caso especial
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
        {
            //se toma como 10 el resultado de la iteracion
            subelement=10
            //muerte es la suma que se tiene actualmente y se le suba el elemento 
            muerte=suma+subelement
            //si muerte es mayor a 21 significa que perderia si se usara ese elemento y es lo que buscamos
            if(muerte>21) 
            {
                cont-=-1
            }
        }
        //si no es un caso especial se toma como el numero que es
        else
        {
            //a suma se le adiciona lo que trae el subindice
            muerte=suma+parseInt(element)
            //si se pasa cuenta como una probabilidad de muerte
            if(muerte>21) 
            {
                cont-=-1
            }
        }
    }
    );
    //retorna todas las probabilidades de muerte
    return cont
}

let casosfavorables_Seguirvivo=()=>{
    //contador de ocurrencias
    cont=0;
    //el elemento de iteracion 
    let subelement;
    // variable que determina si la suma con un elemento que recorre la lista es menor a 21
    let vivir ;
    //recorre la baraja
    cartas.forEach(element => 
    {
        //actual es la primera letra o numero de la palabra en en la baraja que es lo que se necesita
        actual=element.substring(0,1)
        //pregunta si la iteracion trae un As
        if(actual=="A")
        {
            //se toma el as como un 1 
            subelement=1
            //vivir es el resultado que daria si se tomara el elemento dela iteracion actual
            vivir=suma+subelement
            //si vivir es menor a 21 significa que podria seguir jugando
            // si se usara ese elemento y es lo que buscamos
            if(vivir<=21)
            { 
                //Se suma uno ala probabilidad de seguir jugando
                cont-=-1
            }
        }
        // si actual es igual a 1 o J o Q o K  significa que va a sumar 10 por eso se toma como un caso especial
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
        {
            //se toma como 10 el resultado de la iteracion
            subelement=10
            vivir=suma+subelement
            if(vivir<=21) 
            {
                cont-=-1
            }
        }
        //si no es un caso especial se toma como el numero que es
        else
        {
            //a suma se le adiciona lo que trae el subindice
            vivir=suma+parseInt(element)
            if(vivir<=21) 
            {
                cont-=-1
            }
        }
    }
    );
    //retorna todas las probabilidades de seguir vivo
    return cont
}

/*          Obtener una carta               */

let getCard = ()=> 
{ 
    console.log(cartas)
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
        seguirnext()
        }
})

btn_carta.addEventListener("click", ()=>
{
    if(suma<21)
    {
        primeramano()
        perdernext()
        ganarnext()
        seguirnext()
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


