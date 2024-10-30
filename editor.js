import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
const example = `num1 = input("What is number 1? : ")
num2 = input("What is number 2? : ")
print(int(num1) + int(num2))`

let code

const Theme = EditorView.theme({ "&": { class: "cm-theme-github-dark" } })

const state = EditorState.create({
  doc: example+`\n\n\n\n\n\n\n\n\n`,
  extensions: [basicSetup, python(), Theme]  // Apply the custom theme
});

const view = new EditorView({
    state,
    parent: document.getElementById("editor")

});

document.addEventListener('keydown', function() {
  code = view.state.doc.toString()
  window.code = code
});

code = view.state.doc.toString()
window.code = code