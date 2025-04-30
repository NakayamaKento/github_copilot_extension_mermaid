# mermaid-azure README

Mermaid-Azure は、Mermaid を使用して Azure の構成図を作成するための Visual Studio Code 拡張機能です。


## Features

- Azureの構成図を Mermaid のフローチャートで簡単に作成できます。
- ハブ＆スポークの構成、サブスクリプションやリソースグループの階層構成など、Azure の主要な構成パターンをサポートしています。
- 以下のコマンドを用意しています
    - `Architecture` : Mermaid の Architecture に対応しています
    - `Flowchart` : Mermaid の Flowchart に対応しています
    - `architecture-azureicon`: Architecture で Azure アイコンを使用します
      - [Mermaid で Azure アイコンを使ったアーキテクチャを書き隊 – クラウドを勉強し隊](https://www.kentsu.website/ja/posts/2024/iconfy_mermaid/)
      - [VS Code でも Mermaid で Azure アイコンを使ったアーキテクチャを書き隊 - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2024/11/20/120544)

## 動作イメージ
下記の内容で動作確認を行いました

### ハブ＆スポークの構成
プロンプト：ハブ＆スポークの構成です。ハブには FW があります。スポークは2つでそれぞれに VM があります。

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">この拡張機能の更新してみてる<br>まずは今まで通りの機能<br>①Mermaid の Flowchart で構成図 <a href="https://t.co/qRRG7GzYVq">pic.twitter.com/qRRG7GzYVq</a></p>&mdash; Kento (@kenakay01) <a href="https://twitter.com/kenakay01/status/1917499226491347229?ref_src=twsrc%5Etfw">April 30, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### チャット履歴を参照
プロンプト：スポーツにサブネットを追加して、その中に VM を追加してください。またサブネットには NSG を入れてください

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">続いて新機能<br>②チャットの履歴を参照できるようにした<br><br>作成した構成図の修正が簡単になったー <a href="https://t.co/GGquVRNTRc">pic.twitter.com/GGquVRNTRc</a></p>&mdash; Kento (@kenakay01) <a href="https://twitter.com/kenakay01/status/1917500270667522411?ref_src=twsrc%5Etfw">April 30, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### チャット履歴を参照 & コマンドでの使い分け
プロンプト：先ほどと同じものを作成してください
少し文法的に正しくない部分がありましたが、概ね正しい構成図を生成してくれました

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">次は新機能って感じじゃないけど<br>③プロンプトを見直して architecture-beta に対応させてみた<br><br>文法が守れていない部分が若干あるけど、修正するだけやから下書きとしては OK（と思ってる） <a href="https://t.co/T8re0l5bQv">pic.twitter.com/T8re0l5bQv</a></p>&mdash; Kento (@kenakay01) <a href="https://twitter.com/kenakay01/status/1917501020579717415?ref_src=twsrc%5Etfw">April 30, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### コンテキストを参照
プロンプト：このファイルでデプロイされる構成図を書いてください

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">最後の新機能<br>個人的に一番実現したかったところ<br><br>④コンテキストの対応<br>これで Bicep ファイルから構成図の作成 とかが簡単になるはず！！ <a href="https://t.co/7CPLJSGxHR">pic.twitter.com/7CPLJSGxHR</a></p>&mdash; Kento (@kenakay01) <a href="https://twitter.com/kenakay01/status/1917501728142025127?ref_src=twsrc%5Etfw">April 30, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
## Requirements

以下を参考にしてください
[Chat extensions | Visual Studio Code Extension API](https://code.visualstudio.com/api/extension-guides/chat#prerequisites)


## Extension Settings

以下を参考にしてください
[GitHub Copilot Extensions (Chat Extention？) を自作し隊 – クラウドを勉強し隊](https://www.kentsu.website/ja/posts/2024/copilot_extension/)

## Known Issues

見つけたら教えてください

## Release Notes

### 0.2.0
- プロンプトを見直しました
- コマンド [architecture-azureicon] を追加しました
- チャット履歴を参照できるようになりました
- コンテキストを参照できるようになりました
[GitHub Copilot Chat のエージェントを更新し隊 – クラウドを勉強し隊](https://www.kentsu.website/ja/posts/2025/githubcopilot_extenstion/)

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


### 0.0.1
- ブログ用に作成

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
