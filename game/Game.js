let getCard = ()=> 
{ 
    var rdm_card = Math.floor((Math.random() * cartas.length));         //DA UN NUMERO AL AZAR
    let card_aux= cartas.indexOf(cartas[rdm_card])                      //CARTA AUXILIAR SERA EL INDICE DE LA CARTA SI ELEGIMOS LA POSICION AL AZAR
    let card = cartas[rdm_card]                                         //CARTA SERA LA CARTA EN LA POSICION ALEATORIA 
    cartas.splice(card_aux, 1);                                         //QUITA LA CARTA DE LA BARAJA
    manoActual.push(card)                                               //AGREGAMOS AL MAZO ACTUAL LA CARTA QUE SE QUITO PREVIAMENTE
    let sum_card = card.substring(0,1)                                  //AGARRAMOS ES PRIMER CARACTER
    /*          Despues de todo pregunta que carta sale para sumar al total     */
    if(sum_card == "J" || sum_card == "Q" || sum_card == "K" || sum_card == "1")//SI ES UN CASO ESPECIAL:(OJO ES 1 PORQUE ES SUBCARACTER DE 10)
    {
        suma-=-10                   //SUMAMOS 10 AL CONTADOR
        suma_cartas-=-1             //SUMAMOS 1 ALA CANTIDAD DE CARATS
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)//CAMBIAMOS LA CANTIDAD DE CARTAS
        validadeAs()                    //FUNCION QUE VALIDA EL AS
    }
    else if(sum_card == "A")    //SI ES EL OTRO CASO ESPECIAL DE LAS AS
    {
        suma+=11                        //SE SUMA 11 POR DEFAULT
        agregarAs("A")                  //SE AGREGA ALA LISTA DE AS
        validadeAs()                    //SE VALIDA
    }
    else    //SI NO ES CASO ESPECIAL
    {
        suma = suma + parseInt(sum_card)        //SE SUMA AL CONTADOR DE LA SUMA EL VALOR DE LA CARTA
        suma_cartas-=-1                         //SE SUMA EN 1 AL CONTADOR DE CARTAS EN EL MAZO
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)  //SE CAMBIA LA SUMA DE LAS CARTAS 
        validadeAs()                            //SE VALIDA EL AS
    }
    return `<img src='images/JPEG/Cartas/${card}.jpg' width='120' height='180'>`    
};
/*      Obtener un As                       */
let agregarAs = (as)=>          //FUNCION PARA AGREGAR UN AS ALA LISTA DE AS
{
    ases.push(as)
}
let validadeAs =()=>        //FUNCION PARA HACER EL CAMBIO DEL AS DE 1 A 11
{
    if(ases.length != 0)    //SI HAY POR LO MENOS UN AS
    {
        if(suma > 21)           //SI LA SUMA ES MAYOR A 21(CON EL AS VALIENDO 11)
        {
            suma-=10            //SE LE RESTA 10 ALA SUMA PARA HACER VALER 1 AL AS
            ases.pop()          //SE BORRA EL AS QUE TOMAMOS
        }
    }
}
let nuevaCarta = ()=>   //AGREGA UNA CARTA  ALA TABLA DE JUEGO
{
    var nueva = tb_padre.insertCell(-1);//AGREGA UNA NUEVA COLUMA ALA TABLA
    nueva.innerHTML = getCard() //LE ASIGNA LA IMAGEN QUE TRAE GETCARD()
    txt_resultado.textContent = suma    //SE MUESTRA EL RESULTADO DE LA SUMA
}
let resultado=()=>      //SE VERIFICA CADA VES SI GANAMOS O PERDEMOS
{
    
    if(suma==21 || (suma<21 && suma_cartas==5)||((suma==11 && suma_cartas==2))) //SEGUN REGLAS SI LA SUMA ES IGUAL A 21 O LLEGAMOS A 5 CARTAS Y NO HEMOS PERDIDO
    {
        bool_jugar=false                        //YA NO SE PUEDE JUGAR
        txt_resultado.textContent ="Ganaste con : "+suma        //GANAMOS CON LA SUMA QUE HICIMOS
        btn_empezar.style.visibility = 'visible'                //HACEMOS VISIBLE EL BOTON DE VOLVER A JUGAR

    }
    else if (suma>21)               //SI LA SUMA ES MAYOR A 21
    {
        bool_jugar=false            //YA NO PODEMOS JUGAR
        txt_resultado.textContent ="Perdiste con : "+suma       //EL RESULTADO DE LE AGREGA AL PERDISTE
        btn_empezar.style.visibility = 'visible'                //HACEMOS VISIBLE EL BOTON DE JUGAR DE NUEVO 

    }else if(bool_jugar==false&&(suma<21 && suma>sumabanco)){
        txt_resultado.textContent ="Ganaste con : "+suma        //GANAMOS CON LA SUMA QUE HICIMOS
        btn_empezar.style.visibility = 'visible'  
    }
    else if(bool_jugar==false&&(suma<21 && suma<sumabanco)){
        txt_resultado.textContent ="Perdiste con : "+suma       //EL RESULTADO DE LE AGREGA AL PERDISTE
    btn_empezar.style.visibility = 'visible'  
    }
    else if(bool_jugar==false&&(suma<21 && suma==sumabanco)){
        txt_resultado.textContent ="Empate con : "+suma       //EL RESULTADO DE LE AGREGA AL PERDISTE
        btn_empezar.style.visibility = 'visible'  
    }
}
let jugador_name=()=>{  //PARA AGREGAR EL NOMBRE DEL USUARIO
        if(txt_nombre.textContent == "")
        {
            txt_nombre.textContent =", "+ prompt("Hola ,cual es tu nombre? ","");
            if (txt_nombre.textContent == ", "||null) 
            {
                txt_nombre.textContent= ", Usuario"
            }
        }    
}
let primeramano=()=>{       //PARA TIRAR LA PRIMERA MANO
    mostrar_oculto()
    cartas_banco()
    nuevaCarta()
    nuevaCarta()
    resultado()
    actualizaprobabilidades()
    if(bool_jugar==true){
        btn_empezar.style.visibility = 'hidden'
    }
}