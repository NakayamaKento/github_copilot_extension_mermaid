// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as path from 'path';               // 追加
/** アクティブなファイルの内容を取得して返す */
function getCurrentFileContext():
    | { fileName: string; content: string }
    | null {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const doc = editor.document;
        return { fileName: doc.fileName, content: doc.getText() };
    }
    return null;
}

const BASE_PROMPT =
	'GitHub Copilot Agent は、Microsoft Azure のアーキテクチャ構成図を Mermaid 言語で作成するために動作し、ユーザーが指定したサービスやコンポーネントを理解しやすく整理された図として出力できるように支援します。Mermaid の構文に基づき、`graph TD` 形式を使用してサービス間の関係を視覚的に整理し、`subgraph` を活用してリソースグループやネットワークの階層構造を表現します。Azure の主要コンポーネントとして、コンピュート(VM, Azure Functions, App Services)、ストレージ(Blob Storage, SQL Database, Cosmos DB)、ネットワーク(VNet, Load Balancer, Firewall)、アイデンティティ(Azure AD, Managed Identities)、その他(Logic Apps, API Management, Key Vault)をサポートします。ユーザーの要件に適応し、具体的なサービス構成が指定された場合は適切なノードとリンクを作成し、関係性が不明な場合は一般的な接続パターンを提供し、`style` を使用して異なるサービスの視覚的な強調を行います。コードの可読性を重視し、コメントを付与して図の目的や各ノードの役割を説明し、インデントや改行を適切に使い明瞭なコード構造を実現します。これらの指示を含めることで、GitHub Copilot Agent がユーザーの意図に沿った Mermaid 形式の Azure 構成図を生成できるようになります。';

const Flowchart_PROMPT =
	'GitHub Copilot Agent は、Microsoft Azure のアーキテクチャ構成図を Mermaid 言語で作成するために動作し、ユーザーが指定したサービスやコンポーネントを理解しやすく整理された図として出力できるように支援します。Mermaid の構文に基づき、`graph TD` 形式を使用してサービス間の関係を視覚的に整理し、`subgraph` を活用してリソースグループやネットワークの階層構造を表現します。Azure の主要コンポーネントとして、コンピュート(VM, Azure Functions, App Services)、ストレージ(Blob Storage, SQL Database, Cosmos DB)、ネットワーク(VNet, Load Balancer, Firewall, vWAN)、アイデンティティ(Azure AD, Managed Identities)、その他(Logic Apps, API Management, Key Vault)をサポートします。ユーザーの要件に適応し、具体的なサービス構成が指定された場合は適切なノードとリンクを作成し、関係性が不明な場合は一般的な接続パターンを提供し、`style` を使用して異なるサービスの視覚的な強調を行います。ネットワーク系(VNet, Load Balancer, Firewall, vWAN)は緑色、PaaS 系(Azure Functions, App Services, Logic Apps)はオレンジ色、データベース系(Blob Storage, SQL Database, Cosmos DB)は青色、セキュリティ関連(Azure AD, Managed Identities, Key Vault)は赤色とし、その他のコンポーネントには適切な色を設定します。さらに、仮想ネットワークや vWAN などのネットワークリソースに属するサービスは `subgraph` を活用し、適切なグループ化を行うことで可読性と理解しやすさを向上させます。コードの可読性を重視し、コメントを付与して図の目的や各ノードの役割を説明し、インデントや改行を適切に使い明瞭なコード構造を実現します。これらの指示を含めることで、GitHub Copilot Agent がユーザーの意図に沿った、色分けとネットワークリソースのグループ化が施された Mermaid 形式の Azure 構成図を生成できるようになります。';

const Architecture_PROMPT =
	'あなたは経験豊富なクラウドアーキテクトかつMermaid Architecture記法のエキスパートです。https://mermaid.js.org/syntax/architecture.html のドキュメントとサンプル「architecture-beta group api(cloud)[API] service db(database)[Database] in api service disk1(disk)[Storage] in api service disk2(disk)[Storage] in api service server(server)[Server] in api db:L -- R:server disk1:T -- B:server disk2:T -- B:db」の文法（group: "group {group id}({icon name})[{title}]"、service: "service {service id}({icon name})[{title}]"（in {parent id} は任意）、edge: "{serviceId}:{T|B|L|R} {<}?--{>}? {T|B|L|R}:{serviceId}"）を厳守し、group や service のidにハイフン(-)を含めず、出力結果の冒頭に必ず ```architecture-beta を含めたGitHub Markdownのコードブロック形式で、group を仮想ネットワークやサブネット、リソースグループに、service を Azure のリソース（Azure Virtual Machines, Azure App Services, Azure SQL Database, Azure Blob Storage, Azure Functions など）に対応させたAzure構成図のMermaidコードとして出力してください。'

const ArchitectureAzureIcon_PROMPT =
	`あなたは経験豊富なクラウドアーキテクトかつMermaid Architecture記法のエキスパートです。https://mermaid.js.org/syntax/architecture.html のドキュメント、サンプル「architecture-beta group api(azure:resource-groups)[API] service db(azure:sql-database)[Database] in api service disk1(azure:storage-accounts)[Storage] in api service disk2(azure:storage-accounts)[Storage] in api service server(azure:virtual-machine)[Server] in api db:L -- R:server disk1:T -- B:server disk2:T -- B:db」および文法（group: "group {group id}({icon name})[{title}]"、service: "service {service id}({icon name})[{title}]" （in {parent id}は任意）、edge: "{serviceId}:{T|B|L|R} {<}?--{>}? {T|B|L|R}:{serviceId}"）を厳守し、group や service の id にはハイフン(-)を含めず、さらにオリジナルアイコンとして npm パッケージ「azureiconkento」（https://www.npmjs.com/package/azureiconkento?activeTab=versions）で提供されるアイコン（例: azure:sql-database, azure:storage-accounts, azure:virtual-machine など）を利用するよう指定し、出力結果の冒頭に必ず「architecture-beta」を含めた GitHub Markdown のコードブロック形式で、group を仮想ネットワークやサブネット、リソースグループに、service を Azure Virtual Machines, Azure App Services, Azure SQL Database, Azure Blob Storage, Azure Functions などに対応させた Azure 構成図の Mermaid コードとして出力してください。`

	// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// define a chat handler
	const handler: vscode.ChatRequestHandler = async (
		request: vscode.ChatRequest,
		context: vscode.ChatContext,
		stream: vscode.ChatResponseStream,
		token: vscode.CancellationToken
	) => {
		// initialize the prompt
		let prompt = BASE_PROMPT;

		if (request.command === 'flowchart') {
			prompt = Flowchart_PROMPT;
		} else if (request.command === 'architecture') {
			prompt = Architecture_PROMPT;
		} else if (request.command === 'architecture-azureicon') {
			prompt = ArchitectureAzureIcon_PROMPT;
		}

		// initialize the messages array with the prompt
		const messages = [vscode.LanguageModelChatMessage.User(prompt)];


		// ★ アクティブ・ファイルの内容を追加 ★
        const fileCtx = getCurrentFileContext();
        if (fileCtx) {
            messages.push(
                vscode.LanguageModelChatMessage.User(
                    `現在編集中のファイル ${path.basename(
                        fileCtx.fileName
                    )} の内容です:\n\`\`\`\n${fileCtx.content}\n\`\`\``
                )
            );
        }

		// get all the previous participant messages
		const previousMessages = context.history.filter(
			h => h instanceof vscode.ChatResponseTurn
		);

		// add the previous messages to the messages array
		previousMessages.forEach(m => {
			let fullMessage = '';
			m.response.forEach(r => {
				const mdPart = r as vscode.ChatResponseMarkdownPart;
				fullMessage += mdPart.value.value;
			});
			messages.push(vscode.LanguageModelChatMessage.Assistant(fullMessage));
		});

		// add in the user's message
		messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

		// send the request
		const chatResponse = await request.model.sendRequest(messages, {}, token);

		// stream the response
		for await (const fragment of chatResponse.text) {
			stream.markdown(fragment);
		}

		return;
	};

	// create participant
	const mermaid = vscode.chat.createChatParticipant('mermaid-azure', handler);

	// add icon to participant
	mermaid.iconPath = vscode.Uri.joinPath(context.extensionUri, 'azure_mermaid.jpg');
}

// This method is called when your extension is deactivated
export function deactivate() { }
