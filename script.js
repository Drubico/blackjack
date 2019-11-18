/************************************************************************************************** */            
                                /*              VARIABLES               */
/************************************************************************************************** */            
                                /*              BOTONES               */
let btn_carta           =   document.querySelector("#baraja")               //boton para pedir una carta
let btn_empezar         =   document.querySelector('#empezar')              //boton de empezar y pedir nombre
                                /*              DIV Y TABLA               */
let div_tablero         =   document.querySelector('#tabla-juego')          //division de tablero
let div_probabilidad    =   document.querySelector('#div-probabilidad')     //division de las probabilidades
let tb_padre            =   document.querySelector("#padre")                //tabla donde se agregan los hijos
                                /*              TEXTOS               */
let txt_resultado       =   document.querySelector('#Resultado')            //txt que dice si ganaste o perdiste y cuanto suma 
let txt_bienvenida      =   document.querySelector('#bienvenida')           //txt que da la bienvenida y el nombre
let txt_nombre          =   document.querySelector('#nombre')               //txt con el nombre del jugador
let txt_cartasresult    =   document.querySelector('#cartas')               //txt con el numero de cartas en la mesa
let txt_ganarNext       =   document.querySelector('#GanarNext')            //txt que dice si ganas en la siguiente  (la probabilidad)
let txt_perderNext      =   document.querySelector('#PerderNext')           //txt que dice si perdes en la siguiente (la probabilidad)
let txt_ganarcualquiera =   document.querySelector('#GanarCualquiera')      //txt que dice que probabilidad hay de ganar
let txt_conqueganas     =   document.querySelector('#Falta')                //txt que te dice con que carta ganas 
                                /*              VARIABLES INTERNAS               */
let suma        =   0;    //suma los valores de las cartas
let suma_cartas =   0;    //suma el numero de cartas
var repImage        ;     //la imagen de la carta
var nueva           ;     //el nuevo hijo (la carta nueva) de la tabla
//                          Variables Booleanas
var bool_jugar          =   true;   //booleano que controla si estamos jugando 
                                /*              LISTAS               */
let ases                =   [];     //lista de Ases
let manoActual          =   [];     //lista donde esta la mano actual
let list_espacio_perder =   [];     //Lista del espacio para perder
let list_espacio_ganar  =   [];     //Lista del espacio para Ganar
//Todas las cartas (OJO : son las direciones de la imagen)
//  C ES DE  CLUBS//TREBOL
//  D ES DE  DIAMONDS//DIAMANTES
//  H ES DE  HEARTS//CORAZONES
//  S ES DE  SPADES //ESPADAS
let cartas              =   [
    "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
    "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
    "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
    "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"];

/************************************************************************************************** */            
                        /*          Calculos de probabilidad            */
/************************************************************************************************** */ 
let ganarnext=()=>
{   
     //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let ganarNext_proba=(casosfavorables_ganar_siguiente()/cartas.length)
    //NOTA: casosfavorables_ganar_siguiente() retorna lo que el contador determina posible para ganar en un movimiento
    txt_ganarNext.textContent =             //igualamos el texto a:
    (casosfavorables_ganar_siguiente())+"/"+ (cartas.length) +
    " = "+(ganarNext_proba.toFixed(2)*100)+"%"
}
let perdernext=()=>
{
    //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let perder_proba=((casosfavorables_Noseguirvivo()/cartas.length))
    //NOTA: casosfavorables_Noseguirvivo() Retorna de su contador el numero de opciones donde perdemos
    let espacio_perder=(casosfavorables_Noseguirvivo())
    txt_perderNext.textContent =(espacio_perder)+"/"+ (cartas.length) +
    " = "+(perder_proba.toFixed(2)*100)+"%"
}
let GanarCualquiera=()=>{
     //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let ganar_proba=(1-((casosfavorables_Noseguirvivo()/cartas.length))).toFixed(2)*100
    //NOTA:Encontramos el complemento de  la probabilidad de perder 
    let espacio_ganar=(cartas.length-casosfavorables_Noseguirvivo())
    txt_ganarcualquiera.textContent =(espacio_ganar)+"/"+ (cartas.length) +
    " = "+(ganar_proba)+"%"
    //
    //                  SI QUEREMOS CALCULAR EL VALOR DE GANAR SIN OCUPAR EL  COMPLEMENTO
    //
    // txt_ganarcualquiera.textContent =(casosfavorables_GanarCualquiera())+"/"+ (cartas.length) +
    // " = "+((casosfavorables_GanarCualquiera()/cartas.length).toFixed(2)*100)+"%"
}

/************************************************************************************************** */
/************************************************************************************************** */            
                        /*         Calculo de Casos Favorables            */
/************************************************************************************************** */
/************************************************************************************************** */
/*         Calculo de Casos Favorables de ganar en el siguiente turno           */            
let casosfavorables_ganar_siguiente=()=>
{
    cont=0;                                     //contador de casos favorables
    let necesito=21-suma                        //necesito es lo que me falta para llegar a 21
    txt_conqueganas.textContent ='Buscamos: '+ necesito //mostramos el texto de cuanto necesitamos
    cartas.forEach(element =>                   //hacemos un for each en la baraja que sobra para ver que nos puede servir
    {
        actual=element.substring(0,1)           //cortamos el elemento a un caracter
        if(necesito==10)                        //si necesitamos 10 son casos unicos
        {
            if (actual=="1"||actual=="J"||actual=="Q"||actual=="K") //si el primer caracter es igual a 1 o J,Q,K  
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont-=-1; //encontramos una coincidencia sumamos uno al contador
            }
        }
        else if(necesito==1 || necesito==11)//si lo que necesito es 1 o 11 es un casoe special
        {
            if (actual=="A")    //si el valor de la iteracion es igual a A
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont-=-1;       //se suma uno al contador 
            }
        }
        else if(necesito>11) // si necesito mas de lo que una carta da
        {
            cont=0          // la probabilidad de ganar en la siguiente es de 0 porque no hay carta que haga llegar al 21
        }
        else
        {
            if (necesito==parseInt(actual))//iguala lo que necesito a lo que va encontrando en la lista
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont-=-1;               //si lo encuentra suma al contador
            }
        }
    });
    return cont
}
let casosfavorables_Noseguirvivo=()=>
{
    list_espacio_perder=[]          //LISTA PAR MOSTRAR EL ESPACIO MUESTRAL DE PERDER
    cont=0;                         //CONTADOR DE OCURRENCIAS DE PERDER
    let subelement;                 //VALOR DEL ELEMENTO ACTUAL
    let muerte ;                    //GUARDAMOS CON CUANTO PERDEMOS
    cartas.forEach(element =>       //HACEMOS UN FOR EN LAS CARTAS
    {   
        actual=element.substring(0,1)       //CORTAMOS EL ELEMENTO EN UN CARACTER
        if(actual=="A")                     //VEMOS SI ACTUAL ES IGUAL A "A"
        {
            subelement=1                    //SI ES A EL ELEMENTO TOMA EL VALOR DE 1 (PORQUE ES EL QUE MAS NOS COMBIENE PARA NO PERDER)
            muerte=suma+subelement          //VEMOS SI EL ELEMENTO MAS LO QUE TENEMOS ES MAYOR A 21 
            if(muerte>21)
            { 
                list_espacio_perder.push(element)//SI ES MAYOR LA SUMA SIGNIFICA QUE ES ESPACIO MUESTRAL DE PERDIDA
                cont-=-1                        //SUMAMOS UNO AL CONTADOR 
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")//SI EL CARACTER ES IGUAL A 1 (SUBCARACTER DE 20 ) O A J,Q,K
        {
            subelement=10                   //EL ELEMENTO VALE 10 
            muerte=suma+subelement          //HACEMOS LA SUMA PARA VER SI SE MUERE
            if(muerte>21) 
            {
                list_espacio_perder.push(element)   //AGREGAMOS AL ESPACIO MUESTRAL DE PERDER
                cont-=-1                            //SUMAMOS UNO AL CONTADOR
            }
        }
        else
        {
            muerte=suma+parseInt(element)           //MUERTE ES LA SUMA DEL VALOR Y LO QUE LLEVAMOS
            if(muerte>21)                           //SI ES MAYOR A 21
            {
                list_espacio_perder.push(element)       //SE AGREGA EN EL ESPACIO MUESTRAL DE PERDIDA
                cont-=-1                                //SUMAMOS UNO AL CONTADOR
            }
        }
    }
    );
    return cont                                 //RETORNAMOS EL NUMERO DE ESPACIO MUESTRAL EN QUE SE PIERDE
}
/*         Calculo de Casos Favorables de seguir vivo en el siguiente turno            */
let casosfavorables_GanarCualquiera=()=>
{
    list_espacio_ganar=[]                   //LISTA ESPACIO MUESTRAL DE GANAR
    cont=0;                                 //CONTADOR DE POSOBILIDADES DE GANAR(NO PERDER)
    let subelement;                         //ELEMENTO PAR ASEGURAR EL EL GANE O SEGUIR JUGANDO
    let vivir ;                             //VARIABLE RESULTADO DE LO QUE SE LLEVA CON LA ITERACION
    cartas.forEach(element =>               //RECORREMOS EL MAZO DE CARTAS
    {
        actual=element.substring(0,1)       //RECORTAMOS EL ELEMENTO DE ITERACION EN 1 CARACTER
        if(actual=="A")                     //CONDICION ESPECIAL DE A
        {
            subelement=1                    //EL SUBELEMENTO VA A VALER 1
            vivir=suma+subelement           //VIVIR ES LA SUMA DE LO QUE SE LLEVA Y LA ITERACION
            if(vivir<=21)                   //SI VIVIR ES MENOR A 21 
            { 
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL DE GANAR
                cont-=-1                                //SE SUMA UNO AL CONTADOR
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")        //OTRO CASO ESPECIAL 1,J,Q,K
        {
            subelement=10                       //ELEMENTO VALDRA 10
            vivir=suma+subelement               //SE SUMA CON LA SUMA ACTUAL
            if(vivir<=21)                       //SE VERIFICA QUE AUN CON LA SUMA SE PUEDA SEGUIR
            {
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL DE GANAR
                cont-=-1                                //SE SUMA EL CONTADOR
            }
        }
        else//SI NO HAY CASOS ESECIALES
        {
            vivir=suma+parseInt(element)             //VIVIR ES IGUAL ALA SUMA DE LO QUE SE LLEVA Y EL VALOR DE LA ITERACION
            if(vivir<=21)                       //SI VIVIR ES MENOR A 21 
            {
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL
                cont-=-1                                //SE SUMA AL CONTADOR
            }
        }
    });
    return cont             //RETORNAMOS CUANTOS CASOS FAVORABLES SON
}

 /*        Actualizar Probabilidades y cambiar espacios          */
let actualizaprobabilidades=()=>
{
    perdernext()            //MANDA A LLAMAR LA FUNCION DE PERDER EN LA SIGUIENTE
    ganarnext()             //MANDA A LLAMAR LA FUNCION DE GANAR EN LA SIGUIENTE
    GanarCualquiera()       //MANDA A LLAMAR LA FUNCION DE GANAR EN CUALQUIERA
    //TODO LO IMPRIME EN LA CONSOLA SI DE SEA VER :
    //CLICK DERECHO -> Inspeccionar
    //EN LA VENTANA QUE SE GENERO DIRIGIRSE A console()
    console.log("######################################################################")
    console.log("Mazo actual : "+manoActual)
    console.log("Espacio Muestral :"+cartas)
    console.log("Lista de espacio para Perder :"+list_espacio_perder)
    console.log("Lista espacio para Ganar : "+list_espacio_ganar  )  
    console.log("######################################################################")

}
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/************************************************************************************************** */
/*          Obtener una carta               */
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
/************************************************************************************************** */
                        /*          BOTONES            */
/************************************************************************************************** */
/*      boton de empezar        */
btn_empezar.addEventListener("click", ()=>
{
    if(bool_jugar==false){location.reload();}  //SI EL BOOLEANO DE JUGAR ES FALSO ES PORQUE YA ACABO EL JUEGO Y
    // EL BOTON SIRVE PARA RECARGAR LA PAGINA
    else{ //SI EL BOOLEANO DE JUGAR ESTA EN VERDADERO EL BOTON DE EMPEZAR SIRVE PARA PONER EL NOMBRE Y DA 2 CARTAS
        jugador_name()              //Pide el nombre con una ventana emergente(Linea )
        primeramano()               //da la primera mano (Linea )
    }
})
/*      boton que pide una nueva carta        */
btn_carta.addEventListener("click", ()=>
{
    if(bool_jugar==true)
    {
        nuevaCarta()                        //pide una nueva carta
        actualizaprobabilidades()           //actualiza las listas de las probabilidades
        resultado()                         //muestra el resultado si es que se gano o perdio
    }
})
/************************************************************************************************** */
/********                          FUNCIONES EXTRA                                         ********* */
/************************************************************************************************** */
let nuevaCarta = ()=>   //AGREGA UNA CARTA  ALA TABLA DE JUEGO
{
    var nueva = tb_padre.insertCell(-1);//AGREGA UNA NUEVA COLUMA ALA TABLA
    nueva.innerHTML = getCard() //LE ASIGNA LA IMAGEN QUE TRAE GETCARD()
    txt_resultado.textContent = suma    //SE MUESTRA EL RESULTADO DE LA SUMA
}
let resultado=()=>      //SE VERIFICA CADA VES SI GANAMOS O PERDEMOS
{
    if(suma==21 || (suma<21 && suma_cartas==5)) //SEGUN REGLAS SI LA SUMA ES IGUAL A 21 O LLEGAMOS A 5 CARTAS Y NO HEMOS PERDIDO
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

    }
}
let jugador_name=()=>{  //PARA AGREGAR EL NOMBRE DEL USUARIO
        if(txt_nombre.textContent == "")
        {
            txt_nombre.textContent = prompt("Hola ,como Te llamas? ","Usuario");
            if (txt_nombre.textContent == ""||null) 
            {
                txt_nombre.textContent= "Usuario"
            }
        }    
}
let primeramano=()=>{       //PARA TIRAR LA PRIMERA MANO
    div_tablero.style.visibility = 'visible'
    div_probabilidad.style.visibility = 'visible'
    nuevaCarta()
    nuevaCarta()
    resultado()
    actualizaprobabilidades()
    btn_empezar.style.visibility = 'hidden'
}