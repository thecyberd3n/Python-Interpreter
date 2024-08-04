let standardcode

fetch('script.py')
    .then(response => response.text())
    .then(src => {
        standardcode = src
    })
    .catch(error => {
        console.error('Error loading the Python script:', error);
    });

let code = 'print(input("What should I print? : "))'
const textconsole = document.getElementById('console')
window.textconsole
let codelist = []
let inputval = ""
window.inputval
finalcode = standardcode + code
//__BRYTHON__.runPythonSource(standardcode + code);
__BRYTHON__.runPythonSource(code);
console.log("done with code")
console.log(inputval)
if (inputval == "waiting⽏"){
    console.log("if passed")
    const text = textconsole.value;
    const newsline = "\n"

    const interval1 = setInterval(() => {
        if (!(textconsole.value.includes(text))) {
            textconsole.value = text;
        }
        
        if (textconsole.value.substr(text.length, textconsole.value.length).includes(newsline)){
            window.inputrunning = false;
            textconsole.setAttribute('readonly', true);
            clearInterval(interval1)
            console.log(textconsole.value.substr(text.length, textconsole.value.length))
            inputval = textconsole.value.substr(text.length, textconsole.value.length)
        }
    }, 100);

    const interval2 = setInterval(() => {
        console.log(inputval)
        console.log(inputval !== "waiting⽏")
        if (inputval !== "waiting⽏"){
            console.log("entered")

            __BRYTHON__.runPythonSource(standardcode + code);
            clearInterval(interval2)
        }
    }, 100);

}


/*
fetch('script.py')
    .then(response => response.text())
    .then(src => {
        __BRYTHON__.runPythonSource(src + code);
        console.log("done with code")
        console.log(inputval)
        if (inputval == "waiting⽏"){
            console.log("if passed")
            const interval = setInterval(() => {
                console.log(inputval)
                console.log(inputval !== "waiting⽏")
                if (inputval !== "waiting⽏"){
                    console.log("entered")
                    __BRYTHON__.runPythonSource(src + code);
                    clearInterval(interval)
                }
            }, 100);
        }
        
        
    
    })
    .catch(error => {
        console.error('Error loading the Python script:', error);
    });*/

/*
fetch('script.py')
    .then(response => response.text())
    .then(src => {
        codelist = toList(src + code)
        console.log(codelist)
        for (let i = 0; i < codelist.length; i++) {
            __BRYTHON__.runPythonSource(codelist[i]);
        }
        //__BRYTHON__.runPythonSource(src + code);
        //console.log(src + code)
    })
    .catch(error => {
        console.error('Error loading the Python script:', error);
    });
*/

function myInput(value){
    console.log("hey")
    window.inputrunning = true;
    textconsole.value += value
    const text = textconsole.value;
    const newsline = "\n"
    textconsole.removeAttribute('readonly');
    const interval = setInterval(() => {
        if (!(textconsole.value.includes(text))) {
            textconsole.value = text;
        }
        if (textconsole.value.substr(text.length, textconsole.value.length).includes(newsline)){
            window.inputrunning = false;
            textconsole.setAttribute('readonly', true);
            clearInterval(interval)
            console.log(textconsole.value.substr(text.length, textconsole.value.length))
            return textconsole.value.substr(text.length, textconsole.value.length);
        }
    }, 100);
}


function jprint(value){
    console.log(value)
}
function myPrint(value){
    textconsole.value += value;
}

function toList(code){
    line = ""
    codelist =[]
    for (let i = 0; i < code.length; i++) {
        

        line += code[i]

        if (line.includes("\n") && !line.substring(0, line.length) == ""){

            codelist.push(line.substring(0, line.length-2));
            line = ""
        }
      }
      return codelist
}