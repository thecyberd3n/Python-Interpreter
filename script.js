window.inputrunning = false;
window.inputval= ""
function getinput(){
    window.inputrunning = true
    console.log("hey")
    const textconsole = document.getElementById('console')
    const text = textconsole.value;
    console.log(text)
    const newsline = "\n"
    textconsole.removeAttribute('readonly');
    console.log(textconsole.hasAttribute("readonly"))
    
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



function waitUntilCondition(callback) {
    const interval2 = setInterval(() => {
        // Simulate a condition check that eventually becomes true
        if (callback){
            clearInterval(interval2)
        }
    }, 100);  // Wait for 5 seconds
}