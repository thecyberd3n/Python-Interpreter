
from browser import run_script
pythonscript = '''print(input("whats your name? : "))'''

runscript = '''
from browser import *
from browser import window

console = document['console']

def custom_print(prompt):
    console <= str(prompt)
print = custom_print

def custom_input(prompt):
    print(prompt)
    return str(window.getinput()).replace('<Javascript undefined>', '')

input = custom_input


'''+pythonscript
    
    # Run the script
    #if not window.inputrunning:
run_script(runscript)
