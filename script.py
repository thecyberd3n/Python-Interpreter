'''from browser import *
import sys


class MyOutput:
    def __init__(self):
        self.console = document["console"]

    def write(self, text):
        document["console"].text += text

sys.stdout = MyOutput()
'''
from browser import *


def myPrint(value):
    document["console"] <= value
print = myPrint
def myInput(value):
    
    window.myInput()

input = myInput
jprint = window.jprint

