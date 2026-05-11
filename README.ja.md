# fukui-spot

このリポジトリは、福井県の観光スポットに関するオープンデータを集約し提供しています。データは公式観光サイトからスクレイピングされ、さまざまな形式に処理された後、毎月自動的に更新されます。

## デモとオープンデータ

このプロジェクトでは、複数のデータセットとそれに対応するウェブベースの可視化を生成しています。

| カテゴリ | 可視化 | オープンデータ形式 |
|---|---|---|
| **福井県のすべてのスポット** | [一覧](https://code4fukui.github.io/fukui-spot/) / [地図](https://code4fukui.github.io/fukui-spot/map.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot.csv) / [JSON-LD](https://code4fukui.github.io/fukui-spot/fuku-e-spot.jsonld) |
| **恐竜テーマのスポット** | [地図](https://code4fukui.github.io/fukui-spot/dinomap.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-dino.csv) |
| **位置情報が欠落しているスポット** | [一覧](https://code4fukui.github.io/fukui-spot/errdata.html) | (メインのCSVからフィルタリング) |

### 多言語データ

データは「ENJOY FUKUI」サイトから取得され、複数の言語でも提供されています。

| 言語 | 可視化 | オープンデータ形式 |
|---|---|---|
| **英語** | [一覧](https://code4fukui.github.io/fukui-spot/list-eng.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-eng.csv) |
| **簡体字中国語** | [一覧](https://code4fukui.github.io/fukui-spot/list-chi-CN.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-chi-CN.csv) |
| **繁体字中国語** | [一覧](https://code4fukui.github.io/fukui-spot/list-chi-TW.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-chi-TW.csv) |

## 自動化

データは `.github/workflows/scheduled-fetch.yml` で定義されたGitHub Actionsのワークフローを通じて最新の状態に保たれます。
- ワークフローは毎月1日に自動実行されます。
- `/deno` ディレクトリ内のDenoスクリプトを実行し、ソースサイトから最新情報をスクレイピングします。
- スクリプトは更新されたCSVおよびJSON-LDファイルを生成します。
- ワークフローは新しいデータをこのリポジトリにコミットします。

## 手動でのデータ更新

データ更新プロセスを手動で実行するには、Deno v1.xがインストールされている必要があります。

以下のコマンドを実行すると、スクレイピングしたHTMLページのローカルキャッシュ（`src`
