let getCard_banco=()=>{
    var rdm_card = Math.floor((Math.random() * cartas.length));  //DA UN NUMERO AL AZAR
    let card     = cartas[rdm_card]
    let card_aux = cartas.indexOf(cartas[rdm_card])              //CARTA AUXILIAR SERA EL INDICE DE LA CARTA SI ELEGIMOS LA POSICION AL AZAR
    cartas.splice(card_aux, 1);
    let sum_card = card.substring(0,1)  //AGARRAMOS ES PRIMER CARACTER
    if(sum_card == "J" || sum_card == "Q" || sum_card == "K" || sum_card == "1")//SI ES UN CASO ESPECIAL:(OJO ES 1 PORQUE ES SUBCARACTER DE 10)
    {
        sumabanco += 10
        if(as_banco!=0 && sumabanco>21){
            sumabanco -= 10
        }
    }
    else if(sum_card == "A")    //SI ES EL OTRO CASO ESPECIAL DE LAS AS
    {
        sumabanco += 11
        if(as_banco!=0 && sumabanco>21){
            sumabanco -= 10
        }
    }
    else    //SI NO ES CASO ESPECIAL
    {
        sumabanco += parseInt(card)
        if(as_banco!=0 && sumabanco>21){
            sumabanco -= 10
        }
    }
    return `<img src='images/JPEG/Cartas/${card}.jpg' width='100' height='160'>`    
}
let cartas_banco=()=>{
    if(primera_vez==true){
        imagen_banco1 = getCard_banco()
        imagen_banco2 = getCard_banco()
        primera_vez   = false;
    }
    if(bool_jugar==false){
        resultado_banco.textContent = 'Banco : '+sumabanco
        img_banco1.innerHTML        = imagen_banco1
        img_banco2.innerHTML        = imagen_banco2
    }
}