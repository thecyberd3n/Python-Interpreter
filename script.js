let code = 'jprint(input("what is the input:"))'



fetch('script.py')
    .then(response => response.text())
    .then(src => {
        // Run the Python code using Brython
        __BRYTHON__.runPythonSource(src + code);
    })
    .catch(error => {
        console.error('Error loading the Python script:', error);
    });


function myInput(value){
    console.log("hey")
    const textconsole = document.getElementById('console')
    textconsole.value += value
    const text = textconsole.value;
    const newsline = "\n"
    textconsole.removeAttribute('readonly');
    const interval = setInterval(() => {
        if (!(textconsole.value.includes(text))) {
            textconsole.value = text;
        }
        if (textconsole.value.substr(text.length, textconsole.value.length).includes(newsline)){
            window.window.inputrunning = false;
            textconsole.setAttribute('readonly', true);
            clearInterval(interval)
            return textconsole.value.substr(text.length, textconsole.value.length);
        }
    }, 100);
}


function jprint(value){
    console.log(value)
}
