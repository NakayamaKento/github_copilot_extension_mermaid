// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { system_prompt_flowchart } from './system_prompt_flowchart';
import { system_prompt_architecture } from './system_prompt_architecture';

const CHAT_PARTICIPANT_ID = 'mermaid-azure.chat';
const MERMAID_NAMES_COMMAND_ID = 'mermaid.namesInEditor';
const MODEL_SELECTOR: vscode.LanguageModelChatSelector = { vendor: 'copilot', family: 'gpt-4o' };


interface ICatChatResult extends vscode.ChatResult {
    metadata: {
        command: string;
    }
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Chat の処理を行う関数 
	const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {
		// To talk to an LLM in your subcommand handler implementation, your
		// extension can use VS Code's `requestChatAccess` API to access the Copilot API.
		// The GitHub Copilot Chat extension implements this provider.
		if (request.command == 'Architecture') {	// コマンドが Architecture コマンドの場合
			stream.progress('Mermaid の図を考えています...');	// プログレスバーを表示
			try {
				const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);	// モデルを取得
				if (model) {	// モデルが取得できた場合
					const messages = [	// メッセージを作成
						vscode.LanguageModelChatMessage.User(system_prompt_architecture),	// システムプロンプトを追加
						vscode.LanguageModelChatMessage.User(request.prompt)	// ユーザーの入力を追加
					];

					const chatResponse = await model.sendRequest(messages, {}, token);	// モデルにリクエストを送信

					stream.markdown('```\n');	// マークダウンのコードブロックを開始
					for await (const fragment of chatResponse.text) {	// レスポンスのテキストを取得
						stream.markdown(fragment);		// マークダウンに追加
					}
					stream.markdown('\n```');	// マークダウンのコードブロックを終了
				}
			} catch (err) {	// エラーが発生した場合
				handleError(err, stream);
			}

			return { metadata: { command: 'Architecture' } };	// メタデータを返す
		} else if (request.command == 'Flowchart'){	// コマンドが Flowchart コマンドの場合
			stream.progress('Mermaid の図を考えています...');	// プログレスバーを表示
			try {
				const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);	// モデルを取得
				if (model) {	// モデルが取得できた場合
					const messages = [	// メッセージを作成
						vscode.LanguageModelChatMessage.User(system_prompt_flowchart),	// システムプロンプトを追加
						vscode.LanguageModelChatMessage.User(request.prompt)	// ユーザーの入力を追加
					];

					const chatResponse = await model.sendRequest(messages, {}, token);	// モデルにリクエストを送信

					stream.markdown('```\n');	// マークダウンのコードブロックを開始
					for await (const fragment of chatResponse.text) {	// レスポンスのテキストを取得
						stream.markdown(fragment);		// マークダウンに追加
					}
					stream.markdown('\n```');	// マークダウンのコードブロックを終了
				}
			} catch (err) {	// エラーが発生した場合
				handleError(err, stream);
			}

			return { metadata: { command: 'Flowchart' } };	// メタデータを返す
		} 
		else {	// それ以外の場合
			try {
				const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);	// モデルを取得
				if (model) {	// モデルが取得できた場合
					const messages = [	// メッセージを作成
						vscode.LanguageModelChatMessage.User(`あなたは Mermaid を使って図を書くことが得意です。`),
						vscode.LanguageModelChatMessage.User(request.prompt)
					];

					const chatResponse = await model.sendRequest(messages, {}, token);	// モデルにリクエストを送信
					for await (const fragment of chatResponse.text) {	// レスポンスのテキストを取得
						// Process the output from the language model
						stream.markdown(fragment);
					}
				}
			} catch (err) {
				handleError(err, stream);	// エラーが発生した場合
			}

			return { metadata: { command: '' } };	// メタデータを返す
		}
	};

	// Chat participants appear as top-level options in the chat input
	// when you type `@`, and can contribute sub-commands in the chat input
	// that appear when you type `/`.
	const mermaid = vscode.chat.createChatParticipant(CHAT_PARTICIPANT_ID, handler);	// ChatParticipantを作成
	mermaid.iconPath = vscode.Uri.joinPath(context.extensionUri, 'azure_mermaid.jpg');	// アイコンを設定
	mermaid.followupProvider = {	// フォローアッププロバイダーを設定
		provideFollowups(result: ICatChatResult, context: vscode.ChatContext, token: vscode.CancellationToken) {	// フォローアップを提供
			return [{	// フォローアップを返す
				prompt: 'create a figure',	// プロンプトを設定
				label: vscode.l10n.t('Create the figure'),	// ラベルを設定
				command: 'azure_figure'	// コマンドを設定
			} satisfies vscode.ChatFollowup];	// ChatFollowupを返す
		}
	};

	// よくわからないので ほとんどコピペ
	context.subscriptions.push(	// ChatParticipantを登録
		mermaid,	// ChatParticipantを登録
		// 
		vscode.commands.registerTextEditorCommand(MERMAID_NAMES_COMMAND_ID, async (textEditor: vscode.TextEditor) => {	// テキストエディタコマンドを登錻
			// Get the text from the editor
			const text = textEditor.document.getText();

			let chatResponse: vscode.LanguageModelChatResponse | undefined;	// ChatResponseを初期化
			try {
				const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4' });	// モデルを取得
				if (!model) {	// モデルが取得できない場合
					console.log('Model not found. Please make sure the GitHub Copilot Chat extension is installed and enabled.')
					return;
				}

				const messages = [	// メッセージを作成
					vscode.LanguageModelChatMessage.User(`You are a cat! Think carefully and step by step like a cat would.
				Your job is to replace all variable names in the following code with funny cat variable names. Be creative. IMPORTANT respond just with code. Do not use markdown!`),
					vscode.LanguageModelChatMessage.User(text)
				];
				chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);

			} catch (err) {	// エラーが発生した場合
				if (err instanceof vscode.LanguageModelError) {	// エラーが LanguageModelError の場合
					console.log(err.message, err.code, err.cause)
				} else {	// それ以外の場合
					throw err;
				}
				return;
			}

			// Clear the editor content before inserting new content
			await textEditor.edit(edit => {	// エディタの内容をクリア
				const start = new vscode.Position(0, 0);
				const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
				edit.delete(new vscode.Range(start, end));
			});

			// Stream the code into the editor as it is coming in from the Language Model
			try {
				for await (const fragment of chatResponse.text) {	// レスポンスのテキストを取得
					await textEditor.edit(edit => {
						const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
						const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
						edit.insert(position, fragment);
					});
				}
			} catch (err) {	// エラーが発生した場合
				// async response stream may fail, e.g network interruption or server side error
				await textEditor.edit(edit => {	
					const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
					const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
					edit.insert(position, (<Error>err).message);
				});
			}
		}),
	);
}

function handleError(err: any, stream: vscode.ChatResponseStream): void {
    // making the chat request might fail because
    // - model does not exist
    // - user consent not given
    // - quote limits exceeded
    if (err instanceof vscode.LanguageModelError) {
        console.log(err.message, err.code, err.cause);
        if (err.cause instanceof Error && err.cause.message.includes('off_topic')) {
            stream.markdown(vscode.l10n.t('I\'m sorry, I can only explain computer science concepts.'));
        }
    } else {
        // re-throw other errors so they show up in the UI
        throw err;
    }
}

// This method is called when your extension is deactivated
export function deactivate() { }
