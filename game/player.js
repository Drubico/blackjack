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
     console.log("######################################################################")
 
 }