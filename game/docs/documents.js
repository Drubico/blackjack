/************************************************************************************************** */            
/*              VARIABLES               */
/************************************************************************************************** */            
/*              BOTONES               */
let btn_carta           =   document.querySelector("#baraja")               //boton para pedir una carta
let btn_empezar         =   document.querySelector('#empezar')              //boton de empezar y pedir nombre
let btn_info            =   document.querySelector('#info')
let btn_quedarse        =   document.querySelector('#quedarse')
let btn_ganarComenzar   =   document.querySelector('#info-ganar')
/*              DIV Y TABLA               */
let div_resultado       =   document.querySelector('#tabla-resultado')          //division de tablero
let div_tablero         =   document.querySelector('#tabla-juego')          //division de tablero
let div_probabilidad    =   document.querySelector('#div-probabilidad')     //division de las probabilidades
let tb_padre            =   document.querySelector("#padre")     

            //tabla donde se agregan los hijos
                                /*              TEXTOS               */
let txt_resultado       =   document.querySelector('#Resultado')            //txt que dice si ganaste o perdiste y cuanto suma 
let txt_bienvenida      =   document.querySelector('#bienvenida')           //txt que da la bienvenida y el nombre
let txt_nombre          =   document.querySelector('#nombre')               //txt con el nombre del jugador
let txt_cartasresult    =   document.querySelector('#cartas')               //txt con el numero de cartas en la mesa
let txt_ganarNext       =   document.querySelector('#GanarNext')            //txt que dice si ganas en la siguiente  (la probabilidad)
let txt_perderNext      =   document.querySelector('#PerderNext')           //txt que dice si perdes en la siguiente (la probabilidad)
let txt_ganarcualquiera =   document.querySelector('#GanarCualquiera')      //txt que dice que probabilidad hay de ganar
let txt_conqueganas     =   document.querySelector('#Falta')                //txt que te dice con que carta ganas 
//BANCO
let div_banco           =   document.querySelector('#banco')
let img_cartas_banco    =   document.querySelector(".class_banco")
let img_banco1          =   document.querySelector("#b_carta1")
let img_banco2          =   document.querySelector("#b_carta2")
let resultado_banco     =   document.querySelector('#resultado_banco')
let primera_vez      =  true;
let imagen_banco1,imagen_banco2;
let as_banco        =   0;

/*              VARIABLES INTERNAS               */
let suma        =   0;    //suma los valores de las cartas
let sumabanco=0;
let suma_cartas =   0;    //suma el numero de cartas
var repImage        ;     //la imagen de la carta
var nueva           ;     //el nuevo hijo (la carta nueva) de la tabla
//                          Variables Booleanas
var bool_jugar          =   true;   //booleano que controla si estamos jugando 
var bool_quedarse       =   false;
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
