import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Toggle className functionality", async () => {
    // 1. Create a new document
    const document = await vscode.workspace.openTextDocument({
      content: `<div class="text-center"></div>`,
    });

    // 2. Open the document in the editor
    const editor = await vscode.window.showTextDocument(document);

    // 3. Run the command (replace `extension.toggleClassNames` with your command ID)
    await vscode.commands.executeCommand("extension.toggleClassNames");

    // 4. Check if `className` was toggled (e.g., hidden with /*hidden*/)
    const expectedContent = `<div class="/*hidden*/text-center"></div>`;
    assert.strictEqual(editor.document.getText(), expectedContent);

    // 5. Toggle back to the original state
    await vscode.commands.executeCommand("extension.toggleClassNames");

    // 6. Verify it reverts to the original content
    const revertedContent = `<div class="text-center"></div>`;
    assert.strictEqual(editor.document.getText(), revertedContent);
  });

  test("Command registration test", async () => {
    const commandList = await vscode.commands.getCommands(true);
    assert.ok(commandList.includes("extension.toggleClassNames"), "Command not registered");
  });
});
