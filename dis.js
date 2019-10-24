let result = document.querySelector("#result")
let btn = document.querySelector("#a_sumar")
let num1=document.querySelector("#num1")
let num2=document.querySelector("#num2")
let padre=document.querySelector("#padre")
var repImage;
function myFunction() { 
    var retvalue = Math.floor((Math.random() * 10) + 1);
    //de treboles
        switch (retvalue){
            case 1:
                repImage ="<img src='images/JPEG/Trebol/AC.jpg' width='100' height='150'>";
                return repImage;
                break;
            case 2:
                repImage ="<img src='images/JPEG/Trebol/2C.jpg' width='100' height='150'>";
                return repImage;
                break;   
            case 3:
                repImage ="<img src='images/JPEG/Trebol/3C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 4:
                repImage ="<img src='images/JPEG/Trebol/4C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 5:
                repImage ="<img src='images/JPEG/Trebol/5C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 6:
                repImage ="<img src='images/JPEG/Trebol/6C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 7:
                repImage ="<img src='images/JPEG/Trebol/7C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 8:
                repImage ="<img src='images/JPEG/Trebol/8C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 9:
                repImage ="<img src='images/JPEG/Trebol/9C.jpg' width='100' height='150'>";
                return repImage;
                break;    
            case 10:
                repImage ="<img src='images/JPEG/Trebol/10C.jpg' width='100' height='150'>";
                return repImage;
                break;                                                                                  
            default:
                return NO
      
    }
  
    
};
function randombaraja() {
    var randombaraja = Math.floor((Math.random() * 6) + 1);
    switch (randombaraja){
        case 1:
            Imagebaraja ='images/JPEG/barajas/blue_back.jpg'
            return Imagebaraja;
            break;
        case 2:
            Imagebaraja ='images/JPEG/barajas/Gray_back.jpg' 
            return Imagebaraja;
            break;   
        case 3:
            Imagebaraja ='images/JPEG/barajas/Green_back.jpg' 
            return Imagebaraja;
            break;    
        case 4:
            Imagebaraja ='images/JPEG/barajas/purple_back.jpg' 
            return Imagebaraja;
            break;    
        case 5:
            Imagebaraja ='images/JPEG/barajas/Red_back.jpg' 
            return Imagebaraja;
            break;   
        case 6:
            Imagebaraja ='images/JPEG/barajas/Yellow_back.jpg'
            return Imagebaraja;
            break;         
        
        default:
            return NO
  
}
};
btn.addEventListener("click",()=>{
   
    document.getElementById('baraja').src=randombaraja()
    var table = document.getElementById("tablero");
    var cell1 = padre.insertCell(-1);
    cell1.innerHTML = myFunction()
   // cell1.innerHTML=retvalue
})



