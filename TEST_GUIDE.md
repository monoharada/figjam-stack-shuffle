# Figmaプラグイン テスト手順

## ビルドシステムの変更
- **変更前**: Webpack + ts-loader
- **変更後**: esbuild（より高速でシンプル）

## テスト手順

### 1. プラグインのビルド確認
```bash
npm run build
```

生成されるファイル：
- `dist/code.js` - プラグインメインコード
- `dist/ui.js` - UI用JavaScript（外部ファイル）
- `dist/ui.html` - UIのHTML（ui.jsを読み込み）

### 2. Figmaでのテスト

1. **Figmaを開く**
2. **プラグインをリロード**
   - Plugins → Development → 該当プラグインを選択

3. **動作確認ポイント**
   - [ ] プラグイン起動時にコンソールに以下が表示される
     - "Plugin started. Initial selection: X"
     - "UI Script loaded and executing"
     - "UI: Initializing..."
   - [ ] 要素を選択するとUIが更新される
   - [ ] 2つ以上の要素を選択するとボタンが有効になる
   - [ ] Stack Elementsボタンで要素が中央に重なる
   - [ ] Randomize Positionsボタンで要素がランダム配置される

### 3. 開発モード
```bash
npm run dev
# または
npm run watch
```
ファイル変更を監視して自動ビルド

## トラブルシューティング

### UIスクリプトが実行されない場合
1. コンソールで`ui.js`の読み込みエラーを確認
2. `dist/ui.html`に`<script src="ui.js"></script>`タグが含まれているか確認
3. Figmaプラグインをリロード

### ボタンが反応しない場合
1. コンソールでエラーメッセージを確認
2. 要素が2つ以上選択されているか確認
3. プラグイン側とUI側の通信を確認

## 技術詳細

### esbuildの利点
- **高速**: Webpackより10-100倍高速
- **シンプル**: 設定ファイルが簡潔
- **TypeScript対応**: ネイティブサポート
- **保守性**: 外部ファイル化により保守が容易

### ビルド設定
- `build.js`: プロダクションビルド
- `watch.js`: 開発用監視モード
- IIFE形式でバンドル（Figma環境に最適）