let perdernext=()=>
{
    //probabilidad de ganar en la siguiente es casos favorables entre posibles
    let perder_proba=((casosfavorables_Noseguirvivo()/cartas.length))
    //NOTA: casosfavorables_Noseguirvivo() Retorna de su contador el numero de opciones donde perdemos
    let espacio_perder=(casosfavorables_Noseguirvivo())
    txt_perderNext.textContent =(espacio_perder)+"/"+ (cartas.length) +
    " = "+(perder_proba.toFixed(2)*100).toFixed(0)+"%"
}