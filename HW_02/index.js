document.addEventListener("DOMContentLoaded", () => {

    pageLoaded();

});

let txt1;
let txt2;
let btn;
let lblRes;
let opSelector;
function pageLoaded() {
    txt1 = document.getElementById('txt1');
    txt2 = document.querySelector('#txt2');
    btn = document.getElementById('btnCalc');
    lblRes = document.getElementById('lblRes');
    opSelector = document.getElementById('opSelector');
    btn.addEventListener('click', () => {
        calculate();
    });


}

function calculate() {
    let txt1Text = txt1.value;
    let num1 = parseInt(txt1Text); 

    let txt2Text = txt2.value;
    let num2 = parseInt(txt2Text);


    if (isNaN(num1)) {
        txt1.classList.add("is-invalid"); 
        txt1.classList.remove("is-valid");
    } else {
        txt1.classList.add("is-valid");   
        txt1.classList.remove("is-invalid");
    }

    if (isNaN(num2)) {
        txt2.classList.add("is-invalid");
        txt2.classList.remove("is-valid");
    } else {
        txt2.classList.add("is-valid");
        txt2.classList.remove("is-invalid");
    }


    if (isNaN(num1) || isNaN(num2)) {
        lblRes.innerText = "please enter valid numbers";
        return; 
    }


    let operation = opSelector.value;
    let res;

    switch (operation) {
        case "+": res = num1 + num2; break;
        case "-": res = num1 - num2; break;
        case "*": res = num1 * num2; break;
        case "/": res = num1 / num2; break;
        default: res = "Error";
    }

    lblRes.innerText = res;


    let logMessage = `${num1} ${operation} ${num2} = ${res}`;
    print(logMessage, true);
}




const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", () => {
    print("btn2 clicked :" + btn2.id + "|" + btn2.innerText);
});



function print(msg, isAppend = false) {
    
    const ta = document.getElementById("output");

    if (ta) {
        if (isAppend) {
  
            ta.value = ta.value + "\n" + msg;
        } else {
      
            ta.value = msg;
        }
    } else {
        console.log(msg);
    }
}



// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x => x * 2).join(", ");

    // Functions as variables
    const add = function (a, b) { return a + b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3, 4);

    // Callback
    function calc(a, b, fn) {
        return fn(a, b);

    }
    const result = calc(10, 20, (x, y) => x + y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;

    //Print to Log
    print(out);
}