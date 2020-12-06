/*         Calculo de Casos Favorables de ganar en el siguiente turno           */            
let casosfavorables_ganar_siguiente = ()=>
{
        cont                        = 0;                      //contador de casos favorables
    let necesito                    = 21-suma                 //necesito es lo que me falta para llegar a 21
        txt_conqueganas.textContent = 'Buscamos: '+ necesito  //mostramos el texto de cuanto necesitamos
    cartas.forEach(element =>                   //hacemos un for each en la baraja que sobra para ver que nos puede servir
    {
        actual = element.substring(0,1)  //cortamos el elemento a un caracter
        if(necesito==10)                        //si necesitamos 10 son casos unicos
        {
            if (actual=="1"||actual=="J"||actual=="Q"||actual=="K") //si el primer caracter es igual a 1 o J,Q,K  
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont -= -1;  //encontramos una coincidencia sumamos uno al contador
            }
        }
        else if(necesito==1 || necesito==11)//si lo que necesito es 1 o 11 es un casoe special
        {
            if (actual=="A")    //si el valor de la iteracion es igual a A
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont -= -1;  //se suma uno al contador 
            }
        }
        else if(necesito>11) // si necesito mas de lo que una carta da
        {
            cont = 0  // la probabilidad de ganar en la siguiente es de 0 porque no hay carta que haga llegar al 21
        }
        else
        {
            if (necesito==parseInt(actual))//iguala lo que necesito a lo que va encontrando en la lista
            {
                //(cont-=-1 es lo mismo que cont+=1 o cont=cont+1 )
                cont -= -1;  //si lo encuentra suma al contador
            }
        }
    });
    return cont
}
let casosfavorables_Noseguirvivo = ()=>
{
    list_espacio_perder = []  //LISTA PAR MOSTRAR EL ESPACIO MUESTRAL DE PERDER
    cont                = 0;  //CONTADOR DE OCURRENCIAS DE PERDER
    let subelement;                 //VALOR DEL ELEMENTO ACTUAL
    let muerte ;                    //GUARDAMOS CON CUANTO PERDEMOS
    cartas.forEach(element =>       //HACEMOS UN FOR EN LAS CARTAS
    {   
        actual = element.substring(0,1)  //CORTAMOS EL ELEMENTO EN UN CARACTER
        if(actual=="A")                     //VEMOS SI ACTUAL ES IGUAL A "A"
        {
            subelement = 1                //SI ES A EL ELEMENTO TOMA EL VALOR DE 1 (PORQUE ES EL QUE MAS NOS COMBIENE PARA NO PERDER)
            muerte     = suma+subelement  //VEMOS SI EL ELEMENTO MAS LO QUE TENEMOS ES MAYOR A 21 
            if(muerte>21)
            { 
                list_espacio_perder.push(element)//SI ES MAYOR LA SUMA SIGNIFICA QUE ES ESPACIO MUESTRAL DE PERDIDA
                cont -= -1  //SUMAMOS UNO AL CONTADOR 
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")//SI EL CARACTER ES IGUAL A 1 (SUBCARACTER DE 20 ) O A J,Q,K
        {
            subelement = 10               //EL ELEMENTO VALE 10 
            muerte     = suma+subelement  //HACEMOS LA SUMA PARA VER SI SE MUERE
            if(muerte>21) 
            {
                list_espacio_perder.push(element)   //AGREGAMOS AL ESPACIO MUESTRAL DE PERDER
                cont -= -1  //SUMAMOS UNO AL CONTADOR
            }
        }
        else
        {
            muerte = suma+parseInt(element)  //MUERTE ES LA SUMA DEL VALOR Y LO QUE LLEVAMOS
            if(muerte>21)                           //SI ES MAYOR A 21
            {
                list_espacio_perder.push(element)       //SE AGREGA EN EL ESPACIO MUESTRAL DE PERDIDA
                cont -= -1  //SUMAMOS UNO AL CONTADOR
            }
        }
    }
    );
    return cont                                 //RETORNAMOS EL NUMERO DE ESPACIO MUESTRAL EN QUE SE PIERDE
}
/*         Calculo de Casos Favorables de seguir vivo en el siguiente turno            */
let casosfavorables_GanarCualquiera = ()=>
{
    list_espacio_ganar = []  //LISTA ESPACIO MUESTRAL DE GANAR
    cont               = 0;  //CONTADOR DE POSOBILIDADES DE GANAR(NO PERDER)
    let subelement;                         //ELEMENTO PAR ASEGURAR EL EL GANE O SEGUIR JUGANDO
    let vivir ;                             //VARIABLE RESULTADO DE LO QUE SE LLEVA CON LA ITERACION
    cartas.forEach(element =>               //RECORREMOS EL MAZO DE CARTAS
    {
        actual = element.substring(0,1)  //RECORTAMOS EL ELEMENTO DE ITERACION EN 1 CARACTER
        if(actual=="A")                     //CONDICION ESPECIAL DE A
        {
            subelement = 1                //EL SUBELEMENTO VA A VALER 1
            vivir      = suma+subelement  //VIVIR ES LA SUMA DE LO QUE SE LLEVA Y LA ITERACION
            if(vivir<=21)                   //SI VIVIR ES MENOR A 21 
            { 
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL DE GANAR
                cont -= -1  //SE SUMA UNO AL CONTADOR
            }
        }
        else if (actual=="1"||actual=="J"||actual=="Q"||actual=="K")        //OTRO CASO ESPECIAL 1,J,Q,K
        {
            subelement = 10               //ELEMENTO VALDRA 10
            vivir      = suma+subelement  //SE SUMA CON LA SUMA ACTUAL
            if(vivir<=21)                       //SE VERIFICA QUE AUN CON LA SUMA SE PUEDA SEGUIR
            {
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL DE GANAR
                cont -= -1  //SE SUMA EL CONTADOR
            }
        }
        else//SI NO HAY CASOS ESECIALES
        {
            vivir = suma+parseInt(element)  //VIVIR ES IGUAL ALA SUMA DE LO QUE SE LLEVA Y EL VALOR DE LA ITERACION
            if(vivir<=21)                       //SI VIVIR ES MENOR A 21 
            {
                list_espacio_ganar.push(element)        //SE AGREGA AL ESPACIO MUESTRAL
                cont -= -1  //SE SUMA AL CONTADOR
            }
        }
    });
    return cont             //RETORNAMOS CUANTOS CASOS FAVORABLES SON
}