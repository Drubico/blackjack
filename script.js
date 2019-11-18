/************************************************************************************************** */            
                                /*              VARIABLES               */
/************************************************************************************************** */            
                                /*              BOTONES               */
let btn_carta           =   document.querySelector("#baraja")
let btn_empezar         =   document.querySelector('#empezar')
                                /*              DIV Y TABLA               */
let div_info            =   document.querySelector('#Espacios-div')
let div_tablero         =   document.querySelector('#tabla-juego')
let div_probabilidad    =   document.querySelector('#div-probabilidad')
let tb_padre            =   document.querySelector("#padre")
                                /*              TEXTOS               */
let txt_resultado       =   document.querySelector('#Resultado')
let txt_bienvenida      =   document.querySelector('#bienvenida')
let txt_nombre          =   document.querySelector('#nombre')
let txt_cartasresult    =   document.querySelector('#cartas')
let txt_ganarNext       =   document.querySelector('#GanarNext')
let txt_perderNext      =   document.querySelector('#PerderNext')
let txt_ganarcualquiera =   document.querySelector('#GanarCualquiera')
let txt_conqueganas     =   document.querySelector('#Falta')
                                /*              VARIABLES INTERNAS               */
let suma        =   0;    
let suma_cartas =   0;
var repImage        ;  
var nueva           ;
//                          Variables Booleanas
var info                =   false; 
var bool_jugar          =   true;
                                /*              LISTAS               */
let ases                =   [];
let manoActual          =   [];
let list_espacio_perder =   [];
let list_espacio_ganar  =   [];
let cartas              =   [
    "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
    "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
    "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
    "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"];
/************************************************************************************************** */
                        /*          BOTONES            */
/************************************************************************************************** */
btn_empezar.addEventListener("click", ()=>
{
    if(bool_jugar==false){  location.reload();      }
    else{jugador_name()}
})
btn_carta.addEventListener("click", ()=>
{
    if(bool_jugar==true)
    {
        nuevaCarta()
        actualizaprobabilidades()
        resultado()
    }
})

/************************************************************************************************** */            
                        /*          Calculos de probabilidad            */
/************************************************************************************************** */ 
let ganarnext=()=>
{
    txt_ganarNext.textContent =
    (casosfavorables_ganar_siguiente())+"/"+ (cartas.length) +
    " = "+((casosfavorables_ganar_siguiente()/cartas.length).toFixed(2)*100)+"%"
}
let perdernext=()=>
{
    txt_perderNext.textContent =(casosfavorables_Noseguirvivo())+"/"+ (cartas.length) +
    " = "+((casosfavorables_Noseguirvivo()/cartas.length).toFixed(2)*100)+"%"
}
let GanarCualquiera=()=>{
    txt_ganarcualquiera.textContent =(casosfavorables_GanarCualquiera())+"/"+ (cartas.length) +
    " = "+((casosfavorables_GanarCualquiera()/cartas.length).toFixed(2)*100)+"%"
}

/************************************************************************************************** */
/************************************************************************************************** */            
                        /*         Calculo de Casos Favorables            */
/************************************************************************************************** */
/************************************************************************************************** */
/*         Calculo de Casos Favorables de ganar en el siguiente turno           */            
let casosfavorables_ganar_siguiente=()=>
{
    cont=0;
    let necesito=21-suma
    txt_conqueganas.textContent ='Buscamos: '+ necesito
    cartas.forEach(element => 
    {
        actual=element.substring(0,1)
        if(necesito==10)
        {
            if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
            {
                cont-=-1;
            }
        }
        else if(necesito==1 || necesito==11)
        {
            if (actual=="A")
            {
                cont-=-1;
            }
        }
        else if(necesito>11)
        {
            cont=0
        }
        else
        {
            if (necesito==parseInt(actual))
            {
                cont-=-1;
            }
        }
    });
    return cont
}
let casosfavorables_Noseguirvivo=()=>
{
    list_espacio_perder=[]
    cont=0;
    let subelement;
    let muerte ;
    cartas.forEach(element => 
    {
        actual=element.substring(0,1)
        if(actual=="A")
        {
            subelement=1
            muerte=suma+subelement
            if(muerte>21)
            { 
                list_espacio_perder.push(element)
                cont-=-1
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
        {
            subelement=10
            muerte=suma+subelement
            if(muerte>21) 
            {
                list_espacio_perder.push(element)
                cont-=-1
            }
        }
        else
        {
            muerte=suma+parseInt(element)
            if(muerte>21) 
            {
                list_espacio_perder.push(element)
                cont-=-1
            }
        }
    }
    );
    return cont
}
 /*         Calculo de Casos Favorables de seguir vivo en el siguiente turno            */
let casosfavorables_GanarCualquiera=()=>
{
    list_espacio_ganar=[]
    cont=0;
    let subelement;
    let vivir ;
    cartas.forEach(element => 
    {
        actual=element.substring(0,1)
        if(actual=="A")
        {
            subelement=1
            vivir=suma+subelement
            if(vivir<=21)
            { 
                list_espacio_ganar.push(element)
                cont-=-1
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")
        {
            subelement=10
            vivir=suma+subelement
            if(vivir<=21) 
            {
                list_espacio_ganar.push(element)
                cont-=-1
            }
        }
        else
        {
            vivir=suma+parseInt(element)
            if(vivir<=21) 
            {
                list_espacio_ganar.push(element)
                cont-=-1
            }
        }
    });
    return cont
}
 /*        Actualizar Probabilidades y cambiar espacios          */
let actualizaprobabilidades=()=>
{
    perdernext()
    ganarnext()
    GanarCualquiera()
    console.log("Mazo actual : "+manoActual)
    console.log("Espacio Muestral :"+cartas)
    console.log("Lista de espacio para Perder :"+list_espacio_perder)
    console.log("Lista espacio para Ganar : "+list_espacio_ganar  )  
}
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/*          Obtener una carta               */
let getCard = ()=> 
{ 
    var rdm_card = Math.floor((Math.random() * cartas.length));
    let card_aux= cartas.indexOf(cartas[rdm_card])
    let card = cartas[rdm_card]
    cartas.splice(card_aux, 1); 
    let sum_card = card.substring(0,1)
    manoActual.push(card)
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
    return `<img src='images/JPEG/Cartas/${card}.jpg' width='120' height='180'>`    
};
/*      Obtener un As                       */
let agregarAs = (as)=>
{
    ases.push(as)
}
let validadeAs =()=>
{
    if(ases.length != 0)
    {
        if(suma > 21)
        {
            suma-=10
            ases.pop()
        }
    }
}
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
//agrega una carta en la baraja y muestra el valor de la suma
let nuevaCarta = ()=>
{
    var nueva = tb_padre.insertCell(-1);
    nueva.innerHTML = getCard()
    txt_resultado.textContent = suma
}
//  Cuando termina muestra la suma y el boton de comenzar de nuevo
let resultado=()=>
{
    if(suma==21 || (suma<21 && suma_cartas==5))
    {
        bool_jugar=false
        txt_resultado.textContent ="Ganaste con : "+suma
        btn_empezar.style.visibility = 'visible'

    }
    else if (suma>21)
    {
        bool_jugar=false
        txt_resultado.textContent ="Perdiste con : "+suma
        btn_empezar.style.visibility = 'visible'

    }
}
//Extras Para nada
let jugador_name=()=>{
   
        if(txt_nombre.textContent == "")
        {
            txt_nombre.textContent = prompt("Hola ,como Te llamas? ","Usuario");
            if (txt_nombre.textContent == ""||null) 
            {
                txt_nombre.textContent= "Usuario"
            }
        }
        div_tablero.style.visibility = 'visible'
        div_probabilidad.style.visibility = 'visible'
        nuevaCarta()
        nuevaCarta()
        resultado()
        actualizaprobabilidades()
        btn_empezar.style.visibility = 'hidden'

    
}