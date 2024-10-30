


const output = document.getElementById("console");
const example = `num1 = input("What is number 1? : ")
num2 = input("What is number 2? : ")
print(int(num1) + int(num2))
`


let pyodide
let text
let res = ""



const Enter = () => new Promise(resolve => {
    const onKeydown = (event) => {
      if (event.key === "Enter") {
        document.removeEventListener("keydown", onKeydown);
        resolve();
      }
    };
    document.addEventListener("keydown", onKeydown);
  });
  
  
function addToOutput(s) {
    output.value += s + "\n";
    output.scrollTop = output.scrollHeight;
}
async function takeInput(s){
    res = ""
    output.value += s;
    text = output.value
    output.readOnly = false;
    await Enter();
    output.value += "\n";
    output.readOnly = true;
    res = output.value.substr(text.length, output.value.length)
    return output.value.substr(text.length, output.value.length)
    
}
function getRes(){
    return res
}
async function main() {
    output.value = "Initializing...\n";
    let pyodide = await loadPyodide();
    output.value = ""
    output.value += "Ready!\n";
    return pyodide;
}
let pyodideReadyPromise = main();


document.addEventListener("keydown", function() {
    if (!output.readOnly){
        if (!output.value.includes(text)) {
            output.value = text;
}}});


async function run() {
    output.value = ""
    let pyodide = await pyodideReadyPromise;
    pyodide.setStderr({ batched: (msg) => addToOutput(msg)});
    pyodide.setStdout({ batched: (msg) => addToOutput(msg) });
    //pyodide.setStdin({read(buf) {}});
    //pyodide.setStdin({ error: true });

    pyodide.runPythonAsync(`
import sys
from js import addToOutput
from js import takeInput
from js import getRes
import asyncio


class JSStderr:
    def write(self, message):
        addToOutput(message)
        print('written')
    def readline(self):
        return 'reading'
    def flush(self):
        pass 

#sys.stderr = JSStderr()
#sys.stdin = JSStderr()
async def input(s):
    takeInput(s)
    while getRes() == "":
        await asyncio.sleep(0.1)
    return getRes()



async def code():
    `+ replaceInputWithAwait('pass\n'+code) +`
try:
    await code()

    pass
except Exception as e:
    sys.stderr.write(f"Error: {e}")

`)

}

function replaceInputWithAwait(pythonString) {
    return pythonString.replace(/(?<!["'])(input\s*\(([^()]*|"[^"]*"|'[^']*')*\))(?!"|'|[a-zA-Z])/g, (match) => {
        return match.replace(/input\s*\(/, 'await input(');
    });
}