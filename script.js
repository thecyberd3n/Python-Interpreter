

const { python } = "@codemirror/lang-python";

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
      if (event.key === "Enter" && document.activeElement === output) {
        document.removeEventListener("keydown", onKeydown);
        resolve();
      }
    };
    document.addEventListener("keydown", onKeydown);
  });
  
  
function addToOutput(s) {
    output.readOnly = true;
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

function colortext(){
    output.style.color = "red"
}

async function run() {
    output.style.color = "black"
    output.value = ""
    let pyodide = await pyodideReadyPromise;
    async function hasValidPythonSyntax(code) {
        console.log("running check")
        // Use Python's ast module in Pyodide to parse the code
        await pyodide.runPythonAsync(`
            import ast
            def check_syntax(code):
                try:
                    ast.parse(code)
                    return ""
                except SyntaxError as e:
                    return str(e)
        `);

        try {
            
            // Call the Python function defined within Pyodide
            const result = await pyodide.globals.get('check_syntax')(code);
            return result;
        } catch (error) {
            console.error("Error checking Python syntax:", error);
            return "Random Error";
        }

    }

    
    pyodide.setStderr({ batched: (msg) => addToOutput(msg)});
    pyodide.setStdout({ batched: (msg) => addToOutput(msg) });
    //pyodide.setStdin({read(buf) {}});
    //pyodide.setStdin({ error: true });
    console.log("code is "+window.code)
    reformedCode = replaceInputWithAwait(window.code, false)//.replace(/\n/g, '\\n')
    compileCode = replaceInputWithAwait(window.code,true).replace(/\n/g, '\\n')
    testCode = replaceInputWithAwait(window.code, true)
    if (isResourceHeavy(reformedCode)){
        colortext()
        addToOutput("Program is too resourse intensive")
        return
    }

    script = `
import sys
from js import addToOutput
from js import takeInput
from js import getRes
from js import colortext
import asyncio
import ast
def has_valid_syntax(code: str) -> bool:
    try:
        tree = ast.parse(code)
        
        # Check if there's at least one substantial code structure, excluding standalone expressions
        valid_nodes = (ast.FunctionDef, ast.ClassDef, ast.Assign, ast.Expr)
        
        # Check each node to ensure it's not a standalone variable or partial expression
        for node in tree.body:
            if isinstance(node, valid_nodes):
                # For assignments, ensure the right-hand side isn't an undefined or placeholder name
                if isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name) and isinstance(node.value, ast.Name):
                            return False
                # Valid if it has real statements
                return True
        return False
    except SyntaxError:
        return False
class JSStderr:
    def write(self, message):
        addToOutput(message)
    def readline(self):
        return 'reading'
    def flush(self):
        pass 

sys.stderr = JSStderr()
#sys.stdin = JSStderr()
async def input(s):
    takeInput(s)
    while getRes() == "":
        await asyncio.sleep(0.1)
    return getRes()
#25

async def code():
`+ reformedCode +`

error = False
try:
    x = compile("code()","test","exec")
except Exception as e:
    print(e)
    error = True
finally:
    if not error:
        try:
            main = asyncio.create_task(code())
            await main
        except Exception as e:
            colortext()
            print(e)
'''
print(has_valid_syntax('`+ compileCode +`'))
if has_valid_syntax('`+ compileCode +`'):
    async def code():
`+ reformedCode +`

    error = False
    try:
        x = compile("code()","test","exec")
    except Exception as e:
        print(e)
        error = True
    finally:
        if not error:
            try:
                main = asyncio.create_task(code())
                await main
            except Exception as e:
                colortext()
                print(e)
'''
`


    const result = await hasValidPythonSyntax(testCode);
    if (!(result == "")){
        colortext()
        addToOutput("Syntax Error : " + result)
    }
    else{
        try{
            pyodide.runPythonAsync(script)
        }
        catch (error){
            colortext()
            addToOutput("Syntax Error : " + error)
        }
        
    }
    
}





function replaceInputWithAwait(pythonCode, comp) {
    
    // Regular expression to match 'input' function calls
    const regexInput = /\binput\s*\(([^()]*)\)/g;

    // Replace the input function with await input function
    const modifiedCode = pythonCode.replace(regexInput, (match, p1) => {
        return `await input(${p1})`;
    });

    if (!comp) {
        // Split the code into lines, add a tab at the start of each line, then join back
        const indentedLines = modifiedCode.split('\n').map(line => {
            return line ? '    ' + line : line; // Add indent only if line is not empty
        }).join('\n');

        return indentedLines; // Return the indented code without extra leading indent
    }
    return modifiedCode;
}

function isResourceHeavy(pythonCode) {
    // Convert the code to lower case for easier matching
    const code = pythonCode.toLowerCase();

    // Define patterns that typically indicate heavy resource usage
    const patterns = [
        // Check for for loops using a variable that may represent a large number
        /for\s+\w+\s+in\s+range\s*\(\s*\w+\s*\)/, // Loop with variable
        // Check for loops with a numeric range over 1,000,000
        /for\s+\w+\s+in\s+range\(\s*\d{6,}\s*\)/, // Flag loops with a range over 1,000,000
        // Check for int() with large number strings
        /for\s+\w+\s+in\s+range\s*\(\s*int\s*\(\s*"(\d{6,})"\s*\)\s*\)/, // Flag range with int() on large strings
        // Check for int() with variables
        /for\s+\w+\s+in\s+range\s*\(\s*int\s*\(\s*\w+\s*\)\s*\)/, // Loop with int() on a variable
        // Importing known resource-heavy libraries
        /import\s+(numpy|pandas|scipy)/, // Heavy libraries
        // Check for high-frequency print statements
        /(print\s*\(.*?\))\s*[\n\r]+(\1\s*[\n\r]+){9,}/, // 10 or more consecutive print statements
        // Check for any print statements in a loop
        /for\s+\w+\s+in\s+range\s*\(\s*\d+\s*\):\s*\n\s*print\s*\(.*?\)/, // Print inside a loop
        // General function definitions (less strict)
        /\bdef\b\s+\w+\s*\(.*?\)\s*:\s*.*?\n\s*.*?/, // Function definitions
        // Class definitions
        /\bclass\b\s+\w+/ // Class definitions
    ];

    // Check for matches
    for (let pattern of patterns) {
        if (pattern.test(code)) {
            return true; // Resource-heavy code detected
        }
    }

    return false; // No heavy patterns found
}


