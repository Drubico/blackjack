let btn_carta = document.querySelector("#baraja")
let tb_padre=document.querySelector("#padre")
let btn_empezar = document.querySelector('#empezar')
let txt_resultado=document.querySelector('#Resultado')
let txt_bienvenida=document.querySelector('#bienvenida')
let txt_nombre = document.querySelector('#nombre')
let txt_cartasresult = document.querySelector('#cartas')
let div_tablero=document.querySelector('#tabla-juego')
let txt_ganarNext=document.querySelector('#GanarNext')
let txt_perderNext=document.querySelector('#PerderNext')
let suma=0;    
let suma_cartas=0;
var repImage;  
let AS=0;
let manoActual = [];
let cartas = ["AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
    "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
    "2H","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
    "2S","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]

let ganarnext=()=>{
    txt_ganarNext.textContent = (cartas.length)+"/"+("cartaparallear a 21")

}
let perdernext=()=>{
    txt_perderNext.textContent = (cartas.length)+"/"+("cartas extra ")

}


btn_empezar.addEventListener("click", ()=>{
    if(suma>=21||(suma_cartas==5 && suma<21)){
        location.reload();
    }else{
        set_name()
        btn_empezar.style.visibility = 'hidden'
      
        start()
        perdernext()
        ganarnext()
    }
    
})
btn_carta.addEventListener("click", ()=>{
    if(suma<21){
        primeramano()
        perdernext()
        ganarnext()
    }
    else if(suma==21 || (suma_cartas==5 && suma<21) || (suma_cartas==2 && suma == 11)){
        txt_resultado.textContent = "Ganaste con : "+suma
        btn_empezar.style.visibility = 'visible'

    }
    else if (suma>21){
        txt_resultado.textContent = "Perdiste con :"+suma
        btn_empezar.style.visibility = 'visible'

    }
    
})

let start = ()=>{
    div_tablero.style.visibility = 'visible'
    primeramano()
    primeramano()
}
let set_name = ()=>{
       if(txt_nombre.textContent == ""){
        txt_nombre.textContent = prompt("Hola ,como Te llamas? ","Legolas");
        if (txt_nombre.textContent == ""||null) {
            txt_nombre.textContent= "Legolas"
        }else{
        }
    }
}

let primeramano = ()=>{
    var cell1 = tb_padre.insertCell(-1);
    cell1.innerHTML = getCard()
    txt_resultado.textContent = suma
}

let getCard = ()=> { 
    var rdm_card = Math.floor((Math.random() * cartas.length));
    let card_aux= cartas.indexOf(cartas[rdm_card])
    let card = cartas[rdm_card]
    cartas.splice(card_aux, 1); 
    let sum_card = card.substring(0,1)
    manoActual.push(sum_card)
    if(sum_card == "J" || sum_card == "Q" || sum_card == "K" || sum_card == "1"){
        suma-=-10
        suma_cartas-=-1
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)
    }
    else if(sum_card == "A"){
        if((suma+11)<=21){
            suma -=-11
            suma_cartas-=-1
            txt_cartasresult.textContent="Cartas : "+(suma_cartas)
            AS-=-1
        }else if((suma)>21 && AS>=1){
            if(AS==1){
                suma-=-10
                AS-=-1
            }else if(AS==2){
                suma-=-21
                AS-=-1
            }else if(AS==3){
                suma-=-32
                AS-=-1
            }else if(AS==4){
                suma-=-41
                AS-=-1
            }
        }
        
        else{
            suma -=-1
            suma_cartas-=-1
            txt_cartasresult.textContent="Cartas : "+(suma_cartas)
        }
      
    }
    else{
        suma = suma + parseInt(sum_card)
        suma_cartas-=-1
        txt_cartasresult.textContent="Cartas : "+(suma_cartas)

    }

    return `<img src='images/JPEG/Cartas/${card}.jpg' width='100' height='150'>`    
};

