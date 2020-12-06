let ganarnext=()=>
{   
    //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let ganarNext_proba=(casosfavorables_ganar_siguiente()/cartas.length)
    //NOTA: casosfavorables_ganar_siguiente() retorna lo que el contador determina posible para ganar en un movimiento
    txt_ganarNext.textContent =             //igualamos el texto a:
    (casosfavorables_ganar_siguiente())+"/"+ (cartas.length) +
    " = "+(ganarNext_proba.toFixed(2)*100).toFixed(0)+"%"
}
    
let GanarCualquiera=()=>
{
    //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let ganar_proba=(1-((casosfavorables_Noseguirvivo()/cartas.length))).toFixed(2)*100
    //NOTA:Encontramos el complemento de  la probabilidad de perder 
    let espacio_ganar=(casosfavorables_Noseguirvivo())
    txt_ganarcualquiera.textContent ="1 -("+(espacio_ganar)+"/"+ (cartas.length) +") = "+(ganar_proba).toFixed(0)+"%";
    //
    //                  SI QUEREMOS CALCULAR EL VALOR DE GANAR SIN OCUPAR EL  COMPLEMENTO
    //
    // txt_ganarcualquiera.textContent =(casosfavorables_GanarCualquiera())+"/"+ (cartas.length) +
    // " = "+((casosfavorables_GanarCualquiera()/cartas.length).toFixed(2)*100)+"%"
}