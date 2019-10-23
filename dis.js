let result = document.querySelector("#result")

let btn = document.querySelector("#a_sumar")

let num1=document.querySelector("#num1")
let num2=document.querySelector("#num2")




btn.addEventListener("click",()=>
{


    result.textContent=(parseInt(num1.value)+parseInt(num2.value))

    document.getElementById('imagenresult').src="./images/JPEG/Trebol/10C.jpg"

    

}

)