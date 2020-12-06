
/************************************************************************************************** */
                        /*          BOTONES            */
/************************************************************************************************** */
/*      boton de empezar        */
btn_empezar.addEventListener("click", ()=>
{
    // onload="checkCookie()"
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_cookie_username
    // https://www.w3schools.com/js/js_cookies.asp
    if(bool_jugar==false)
    {
        location.reload()
    }
    else
    {
        jugador_name();
        txt_nombre.innerHTML = checkCookie();
        primeramano()    
        btn_ganarComenzar.style.visibility = 'hidden'
    }
    //name = checkCookie();
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
btn_BorrarCookies.addEventListener("click", ()=>
{
    var user = getCookie("username");
        setCookie("username", "", 30);
    
})
btn_quedarse.addEventListener("click", ()=>
{
    bool_jugar = false;
    actualizaprobabilidades()           //actualiza las listas de las probabilidades
    resultado()                         //muestra el resultado si es que se gano o perdio
    cartas_banco()
})