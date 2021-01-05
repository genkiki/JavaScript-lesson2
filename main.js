let disp_string = "0";
let input_num = "0";
let input_type = "number";
let numbers = [];
let formulas = [];
let dispResultFlg = 0;

document.getElementById("1").onclick = function() {
    updateInput("1");
};
document.getElementById("2").onclick = function() {
    updateInput("2");
};
document.getElementById("3").onclick = function() {
    updateInput("3");
};
document.getElementById("4").onclick = function() {
    updateInput("4");
};
document.getElementById("5").onclick = function() {
    updateInput("5");
};
document.getElementById("6").onclick = function() {
    updateInput("6");
};
document.getElementById("7").onclick = function() {
    updateInput("7");
};
document.getElementById("8").onclick = function() {
    updateInput("8");
};
document.getElementById("9").onclick = function() {
    updateInput("9");
};
document.getElementById("0").onclick = function() {

    if(disp_string === "0") {
        return;
    } else if(dispResultFlg === 1) {
        disp_string = "0";
        input_num = "0";
    } else {
        disp_string += "0";
        input_num += "0";
    }
    document.getElementById("result-area").textContent = disp_string;
    input_type = "number";
};
document.getElementById("00").onclick = function() {
    if(disp_string === "0"){
        return;
    } else if(dispResultFlg === 1) {
        disp_string = "0";
        input_num = "0";
    } else {
        disp_string += "00";
        input_num += "00";
    }
    document.getElementById("result-area").textContent = disp_string;
    input_type = "number";
};
document.getElementById("+").onclick = function() {
    addFormulas("+");
};

document.getElementById("-").onclick = function() {
    addFormulas("-");
};
document.getElementById("*").onclick = function() {
    addFormulas("*");
};
document.getElementById("/").onclick = function() {
    addFormulas("/");
};
document.getElementById(".").onclick = function() {
    if(input_type === "number"){
        if(input.indexOf('.') === -1){
            disp_string += ".";
            console.log("not exist");
        } else {
            console.log("exist");
            return
        }
        input_type = "formula";
        document.getElementById("result-area").textContent = disp_string;
    }
};
document.getElementById("ac").onclick = function() {
    disp_string = "0";
    input_num = "0";
    numbers = [0];
    formulas = [];
    input_type = "number";
    document.getElementById("result-area").textContent = "0";
};
document.getElementById("equal").onclick = function() {

    console.log("pushed equal !!!");

    numbers.push(Number(input_num));

    console.log(numbers);
    console.log(formulas);

    if(input_type === "formula") {
        return;
    }

    //掛け算、割り算
    console.log("formulas.length:"+formulas.length);

    for(let i = 0; i <= formulas.length-1; i++){
        console.log("start loop");
        if ((formulas[i] === "*") ||
            (formulas[i] === "/")) {
                console.log("if true");
                numbers[i] = calc(numbers[i], numbers[i+1], formulas[i]);
                numbers.splice(i+1, 1); //計算済みの数字と式を削除
                formulas.splice(i, 1);
                i -= 1;//削除した文の反復回数調整
        }
        console.log("*/ numbers:"+numbers);
        console.log("*/ formulas:"+formulas);
    }

    //足し算、引き算
    if(formulas.length > 0) {//掛け算、割り算のみの式だった場合は省略
        for(let i = 0; i <= formulas.length-1; i++){
            if ((formulas[i] === "+") ||
                (formulas[i] === "-")) {
                    numbers[i] = calc(numbers[i], numbers[i+1], formulas[i]);
                    numbers.splice(i+1, 1); //計算済みの数字と式を削除
                    formulas.splice(i, 1);
                    i -= 1;//削除した文の反復回数調整
            }
            console.log("+- numbers:"+numbers);
            console.log("+- formulas:"+formulas);
        }
    }

    disp_string = numbers[0];
    console.log("end numbers:"+numbers);
    document.getElementById("result-area").textContent = numbers[0];
    dispResultFlg = 1;
    console.log("!!!!!!!!end calc!!!!!!!!");
};

function updateInput(str) {
    if((disp_string === "0") ||
        (dispResultFlg === 1)){
        disp_string = str;
        input_num = str;

    } else {
        disp_string += str;
        input_num += str;
    }
    input_type = "number";
    document.getElementById("result-area").textContent = disp_string;
}

function addFormulas(str) {
    if(input_type === "number"){
        disp_string += str;
        if(dispResultFlg !== 1) {
            numbers.push(Number(input_num));
        }
        formulas.push(str);
        input_num = "";
        console.log("addFormulas numbers:"+numbers);
        console.log("addFormulas formulas:"+formulas);
        input_type = "formula";
    }
    dispResultFlg = 0;
    document.getElementById("result-area").textContent = disp_string;
}

function calc(x, y, ope) {
    switch(ope){
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        default:
            return '';
    }
}