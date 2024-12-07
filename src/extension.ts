import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Tailwind ClassName Hider is now activated!");

  let disposable = vscode.commands.registerCommand("extension.toggleClassNames", () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("No active editor found!");
      return;
    }

    const document = editor.document;
    const text = document.getText();
    const classRegex = /(class(Name)?="[^"]*")/g;

    editor.edit((editBuilder) => {
      let match;
      while ((match = classRegex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        // 해당 부분을 공백으로 대체
        editBuilder.replace(range, "");
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log("Tailwind ClassName Hider deactivated!");
}
