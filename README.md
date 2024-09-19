# mermaid-azure README

Mermaid-Azure は、Mermaid を使用して Azure の構成図を作成するための Visual Studio Code 拡張機能です。


## Features

- Azureの構成図を Mermaid のフローチャートで簡単に作成できます。
- ハブ＆スポークの構成、サブスクリプションやリソースグループの階層構成など、Azure の主要な構成パターンをサポートしています。
- 以下のコマンドを用意しています
    - `Architecture` : Mermaid の Architecture に対応しています
    - `Flowchart` : Mermaid の Flowchart に対応しています

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">ブログ書きながらもっかい GitHub Copilot Extension (Chat Extension?) を試してる<br>これは GPT-4 を指定した場合 <a href="https://t.co/4jU4AxyChU">pic.twitter.com/4jU4AxyChU</a></p>&mdash; Kento (@kenakay01) <a href="https://twitter.com/kenakay01/status/1801304366437306574?ref_src=twsrc%5Etfw">June 13, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Requirements

以下を参考にしてください
[Chat extensions | Visual Studio Code Extension API](https://code.visualstudio.com/api/extension-guides/chat#prerequisites)


## Extension Settings

以下を参考にしてください
[GitHub Copilot Extensions (Chat Extention？) を自作し隊 – クラウドを勉強し隊](https://www.kentsu.website/ja/posts/2024/copilot_extension/)

## Known Issues

見つけたら教えてください

## Release Notes

### 0.0.1
- ブログ用に作成

### 0.1.0
- Mermaid の Architecture Diagram に対応
    - アイコンの使い方は以下を参考にしてください
    - [Mermaid で Azure アイコンを使ったアーキテクチャを書き隊 – クラウドを勉強し隊](https://www.kentsu.website/ja/posts/2024/iconfy_mermaid/) 
- モデルを gpt4o に変更しました
- chatParticipants と command を見直しました

| | 変更前 | 変更後 |
| --- | --- | --- |
| chatParticipants | mermaid | mermaid-azure |
| command | azure-figure | Flowchart |
| command | - | Architecture |


以下はデフォルトのまま
---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
