let btn = document.querySelector("#baraja")
let padre=document.querySelector("#padre")
let resultado=document.querySelector('#Resultado')
let bienvenida=document.querySelector('#bienvenida')
let suma=0;    
var repImage;   
let tablero=document.querySelector('#tabla-juego')
let mazo=[];

function CrearMazo(){
    for (i=1;i<53;i++){
        mazo[i]=i
    }
}
CrearMazo()

function nombre(){
    var txt;
    var person = prompt("Hola ,como Te llamas? ");
    if(suma>=21){
        suma=0
        if (person == null || person == "") {
            window.setInterval(  location.reload(true),300000)
            person = "Legolas";
            bienvenida.textContent="Bienvenido al Casino "+person
            if (window.getComputedStyle(tablero).visibility === "hidden") {
                tablero.style.visibility = "visible";
              }
              
            primeramano()
            primeramano()

        } else {
            window.setInterval(  location.reload(true),300000)
            bienvenida.textContent="Bienvenido al Casino "+person
            if (window.getComputedStyle(tablero).visibility === "hidden") {
                tablero.style.visibility = "visible";
              }
              

            primeramano()
            primeramano()
        }
    }else{
        if (person == null || person == "") {
            person = "Legolas";
            bienvenida.textContent="Bienvenido al Casino "+person
            if (window.getComputedStyle(tablero).visibility === "hidden") {
                tablero.style.visibility = "visible";
              }
              

            primeramano()
            primeramano()

        } else {
            bienvenida.textContent="Bienvenido al Casino "+person
            if (window.getComputedStyle(tablero).visibility === "hidden") {
                tablero.style.visibility = "visible";
              }
              

            primeramano()
            primeramano()
        }
    }

   
   
}
function primeramano(){
    document.getElementById('baraja').src=randombaraja()
    var table = document.getElementById("tablero");
    var cell1 = padre.insertCell(-1);
    cell1.innerHTML = myFunction()
    resultado.textContent=suma
}
function myFunction() { 
    var retvalue = Math.floor((Math.random() * mazo.length) + 0);
    //if()
    //Treboles
    console.log(retvalue) 

        switch (retvalue){
            case 1:
                
                repImage ="<img src='images/JPEG/Trebol/AC.jpg' width='100' height='150'>";
                suma-=-1;
                return repImage;    
            case 2:
                repImage ="<img src='images/JPEG/Trebol/2C.jpg' width='100' height='150'>";
                suma-=-2;
                return repImage;
            case 3:
                repImage ="<img src='images/JPEG/Trebol/3C.jpg' width='100' height='150'>";
                suma-=-3;
                return repImage;
            case 4:
                repImage ="<img src='images/JPEG/Trebol/4C.jpg' width='100' height='150'>";
                suma-=-4;
                return repImage;
            case 5:
                repImage ="<img src='images/JPEG/Trebol/5C.jpg' width='100' height='150'>";
                suma-=-5;
                return repImage;
            case 6:
                repImage ="<img src='images/JPEG/Trebol/6C.jpg' width='100' height='150'>";
                suma-=-6;
                return repImage;
            case 7:
                repImage ="<img src='images/JPEG/Trebol/7C.jpg' width='100' height='150'>";
                suma-=-7;
                return repImage;
            case 8:
                repImage ="<img src='images/JPEG/Trebol/8C.jpg' width='100' height='150'>";
                suma-=-8;
                return repImage;
            case 9:
                repImage ="<img src='images/JPEG/Trebol/9C.jpg' width='100' height='150'>";
                suma-=-9;
                return repImage;
            case 10:
                repImage ="<img src='images/JPEG/Trebol/10C.jpg' width='100' height='150'>";
                suma-=-10;
                return repImage;
            default:
                repImage ="<img src='images/JPEG/Trebol/10C.jpg' width='100' height='150'>";
                return repImage;
    }
  
    
};

btn.addEventListener("click",()=>{
    if(suma<21){
        document.getElementById('baraja').src=randombaraja()
        var table = document.getElementById("tablero");
        var cell1 = padre.insertCell(-1);
        cell1.innerHTML = myFunction()
        resultado.textContent=suma
    }
    else if(suma==21){
        if (confirm("Felicidades as ganado !!!! \n Jugar de nuevo?")) {
            window.setInterval(  location.reload(true),300000)

        } else {
          //Mostrar estadisticas!
        }

    }
    else{
        var txt;
        if (confirm("Lo sentimos perdiste !!!! \n Jugar de nuevo?")) {
            window.setInterval(  location.reload(true),300000)

        } else {
          //Mostrar estadisticas!
        }
      ;
            
    }
   
})



function randombaraja() {
    var randombaraja = Math.floor((Math.random() * 6) + 1);
    switch (randombaraja){
        case 1:
            Imagebaraja ='images/JPEG/barajas/blue_back.jpg'
            return Imagebaraja;
        case 2:
            Imagebaraja ='images/JPEG/barajas/Gray_back.jpg' 
            return Imagebaraja;
        case 3:
            Imagebaraja ='images/JPEG/barajas/Green_back.jpg' 
            return Imagebaraja;
        case 4:
            Imagebaraja ='images/JPEG/barajas/purple_back.jpg' 
            return Imagebaraja;
        case 5:
            Imagebaraja ='images/JPEG/barajas/Red_back.jpg' 
            return Imagebaraja;
        case 6:
            Imagebaraja ='images/JPEG/barajas/Yellow_back.jpg'
            return Imagebaraja;
        
        default:
            return NO
  
}
};