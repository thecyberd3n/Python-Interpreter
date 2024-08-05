const codeinput = document.getElementById('codeinput');
const textconsole = document.getElementById('console');
const standardcode = 'from browser import window\nwindow.__BRYTHON__.debug = 0\nprint = window.myPrint\njprint = window.jprint\n';
let inputvals = [];
let inputi = 0;
let stop = true
window.inputvals
window.inputi

window.textconsole
codeinput.value = 'print("This is my calculator; Enter 2 numbers to multiply them")\nnum1 = int(input("What is num1? :"))\nnum2 = int(input("What is num2? :"))\nanswer = str(num1 * num2)\nprint("Your number is : " + answer)'


document.getElementById("run").onclick = function(){
    console.log("ran")
    console.log(stop)
    document.getElementById("run").value = "clicked"
    if (stop){
        document.getElementById("run").value = "stop"
        stop = true
        runcode()
    }
    else{
        document.getElementById('run').value = "run1"
        stop = true
        textconsole.value = ""
    }
};


function runcode(){
    stop = false
    textconsole.value = "Python Console:\n"
    let code = codeinput.value;

    inputvals = [];
    inputi = 0;

    function jprint(value) {
        console.log(value);
    }

    function myPrint(value) {
        if (!inputvals.includes("waiting⽏") || inputi == 0) {
            textconsole.value += String(value) + '\n';
        }
    }

    window.jprint = jprint;
    window.myPrint = myPrint;

    __BRYTHON__.runPythonSource(standardcode + code);

    let text = textconsole.value;
    for (let step = 0; step < inputvals.length; step++) {
        if (inputvals[step] == "waiting⽏") {
            const newsline = "\n";
            const interval1 = setInterval(() => {
                if (!(textconsole.value.includes(text))) {
                    textconsole.value = text;
                }
                if (textconsole.value.substr(text.length, textconsole.value.length).includes(newsline)) {
                    textconsole.setAttribute('readonly', true);
                    inputvals[step] = (textconsole.value.substr(text.length, textconsole.value.length)).replace(newsline, '');
                    clearInterval(interval1);
                }
                if (stop){
                    textconsole.value = "Python Console:\n"
                    clearInterval(interval1);
                }
            }, 100);
            const interval2 = setInterval(() => {
                if (inputvals[step] !== "waiting⽏") {
                    inputi = 0;
                    textconsole.value = 'Python Console:\n';
                    __BRYTHON__.runPythonSource(standardcode + code);
                    text = textconsole.value;
                    clearInterval(interval2);
                }
                if (stop){
                    textconsole.value = "Python Console:\n"
                    clearInterval(interval1);
                }
            }, 100);
        }
    }

}