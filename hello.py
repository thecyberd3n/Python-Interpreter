from browser import *

def custom_input(prompt=None):
    # Your custom code here
    if prompt:
        print(prompt, end='skib')
    custom_response = "This is a custom input response"
    return custom_response


def custom_print(prompt=None):
    document['console'] <= "prompt"

input = custom_input
print = custom_print


#user_input = input("Please enter something: ")
print("hello world")