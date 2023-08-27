import * as vscode from 'vscode'
import { getAIPoweredBotResponse } from './aiIntegration'




//Typing Effect

async function typeTextInEditor(editor: vscode.TextEditor, text: string){
	for(let i=0; i<text.length; i++){
		//adjust the delay of text
		await new Promise(resolve =>setTimeout(resolve, 50))
		editor.edit(editBuilder =>{
			editBuilder.insert(editor.selection.active, text[i])
		})
	}
}

//Handle user input
async function handleUserInput(){
	const prompt = await vscode.window.showInputBox({
		prompt: "Please Enter in your promt"
	})

	//If user cancels the input
	if(prompt === undefined){
		return;
	}

	//Get active text editor
	const editor = vscode.window.activeTextEditor

	if(!editor){
		return
	}

	// Display loading message
	editor.edit( editBuilder =>{
		editBuilder.insert(editor.selection.active, 'Fetching Response ...')
	})

	//Fetch Bot Response
	const botResponse = await getAIPoweredBotResponse(prompt)

	//Remove loading message
	const loadingMessageLength = 'Fetching Response ...'.length

	editor.edit(editBuilder=>{
		editBuilder.delete(
			new vscode.Range(
				editor.selection.active.translate(0, -loadingMessageLength),
				editor.selection.active
			)
		)
	})

	//simulate typing effect for the bot Response
	await typeTextInEditor(editor, botResponse)

	//display completion
	vscode.window.showInformationMessage('Response Recieved and Typed')

}

export function activate(context: vscode.ExtensionContext){
	 
	let disposable = vscode.commands.registerCommand('extension.getAIPoweredBotResponse', async ()=>{
		await handleUserInput()
	})
	context.subscriptions.push(disposable)
}