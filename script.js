
let standardcode = 'from browser import window\nwindow.__BRYTHON__.debug = 0\nprint = window.myPrint\njprint = window.jprint\n'
codeinput.value = 'print("This is my calculator; Enter 2 numbers to multiply them")\nnum1 = int(input("What is num1? :"))\nnum2 = int(input("What is num2? :"))\nanswer = str(num1 * num2)\nprint("Your number is : " + answer)'
let code = 'print("This is my calculator; Enter 2 numbers to multiply them")\nnum1 = int(input("What is num1? :"))\nnum2 = int(input("What is num2? :"))\nanswer = str(num1 * num2)\nprint("Your number is : " + answer)'

const textconsole = document.getElementById('console')
window.textconsole
let codelist = []
let inputvals = []
window.inputvals
finalcode = standardcode + code
let inputi = 0
window.inputi
__BRYTHON__.runPythonSource(finalcode);

let text = textconsole.value;
for (let step = 0; step < inputvals.length; step++) {
    if (inputvals[step] == "waiting⽏"){
        const newsline = "\n"
        const interval1 = setInterval(() => {
            if (!(textconsole.value.includes(text))) {
                textconsole.value = text;
            }
            if (textconsole.value.substr(text.length, textconsole.value.length).includes(newsline)){
                textconsole.setAttribute('readonly', true);
                inputvals[step] = (textconsole.value.substr(text.length, textconsole.value.length)).replace(newsline, '')
                clearInterval(interval1)
            }
        }, 100);
        const interval2 = setInterval(() => {
            if (inputvals[step] !== "waiting⽏"){
                inputi = 0
                textconsole.value = 'Python Console:\n';
                __BRYTHON__.runPythonSource(standardcode + code);
                text = textconsole.value;
                clearInterval(interval2)
            }
        }, 100);

    }
}
function jprint(value){
    console.log(value)
}
function myPrint(value){
    if (!inputvals.includes("waiting⽏") || inputi == 0){
        textconsole.value += String(value) + '\n';
    }
}

