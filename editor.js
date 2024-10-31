import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python} from '@codemirror/lang-python';
import {tags} from "@lezer/highlight"
import {HighlightStyle,syntaxHighlighting} from "@codemirror/language"
const example = `num1 = input("What is number 1? : ")
num2 = input("What is number 2? : ")
print(int(num1) + int(num2))`

let code


let baseTheme = EditorView.baseTheme({
  ".cm-o-replacement": {
    display: "inline-block",
    width: "50",
    height: "100",
    borderRadius: ".25em"
  },
  "&light .cm-o-replacement": {
    backgroundColor: "#04c"
  },
  "&dark .cm-o-replacement": {
    backgroundColor: "#5bf"
  }
})

let highlight = HighlightStyle.define([
  {tag: tags.keyword, color: "#090909"},
  {tag: tags.comment, color: "#435ea8", fontStyle: "italic"},
  {tag: tags.string, color: "#436aa8"},
  {tag: tags.name, color: "#00784e"},
  {tag: tags.propertyName, color: "#77784e"},
  {tag: tags.integer, color: "#964763"},
  {tag: tags.bool, color: "#966147"},
])



let theme = EditorView.theme({
  ".cm-content, .cm-gutter": {
    minHeight: "100%",
    minWidth: "20%"
  },
  "&": {
    height: "300px"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#ffffff",
    borderWidth: "3px",
    borderRadius: "2px"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "hsl(267, 30%, 41%)"
  },
  ".cm-gutters": {
    backgroundColor: "#2c2f33",
    color: "#000000",
    border: "none"
  },
  // Scrollbar styles
  "& ::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "#2c2f33"
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "hsl(267, 30%, 41%)", // Purple color
    borderRadius: "10px"
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "hsl(267, 50%, 41%)" // Darker purple on hover
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#2c2f33"
  }
}, { dark: true });



const state = EditorState.create({
  doc: example+`\n\n\n\n\n\n\n\n\n`,
  extensions: [basicSetup, python(), theme, baseTheme, syntaxHighlighting(highlight)] 
});

const view = new EditorView({
    state,
    parent: document.getElementById("editor")

});

document.addEventListener('keydown', function() {
  code = view.state.doc.toString()
  window.code = code
});

function run(){
  code = view.state.doc.toString()
  window.code = code
}
code = view.state.doc.toString()
window.code = code
let last = code

async function myAsyncLoop() {
  while (true) {
    if (view.state.doc.length <= 1500){
      code = view.state.doc.toString()
      window.code = code
      last = code
    }
    else{
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: last }
      });
      code = view.state.doc.toString()
      window.code = code
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}


// Start the loop
myAsyncLoop();