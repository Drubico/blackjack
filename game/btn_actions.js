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
        btn_ganarComenzar.style.visibility='hidden'
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
        cartas_banco()
    }
})
btn_ganarComenzar.addEventListener("click",()=>
{
    alert("La probabilidad de ganar en la primera mano es de :   \n"+
    "Casos Favorables/Casos posibles = \n 4x16(Probabilidad que se las cartas sumen 21)\n / 52C2(Espacio de las 2 cartas juntas) \n =0.05")
})

btn_info.addEventListener("click", ()=>
{
    window.open("info_datos/info.html");
})

btn_quedarse.addEventListener("click", ()=>
{
    bool_jugar=false;
    actualizaprobabilidades()           //actualiza las listas de las probabilidades
    resultado()                         //muestra el resultado si es que se gano o perdio
    cartas_banco()
})