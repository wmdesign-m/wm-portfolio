# WM Design Implementation Skill

## 1. Skill Purpose

このファイルは、Codex、Claude Code、ChatGPT、CursorなどのAIが、WM Designのポートフォリオサイトや関連サイトを安全かつ一貫して編集するための実装ルールです。

ブランド全体の方針は `WM-DESIGN-GUIDE.md` を参照してください。

主な対象：

- HTML
- CSS
- JavaScript
- Motion
- WordPress
- Gutenberg
- Responsive Design
- Accessibility
- Performance
- AIによるコード修正手順

---

## 2. Required Reading Order

作業前に以下の順番で確認してください。

1. `WM-DESIGN-GUIDE.md`
2. 対象ページのHTML
3. 対象ページ専用CSS
4. 共通CSS
5. 関連するJavaScript
6. 他ページの共通コンポーネント
7. ユーザーからの最新指示

最新の明示的な指示を最優先します。

既存コードを読まずに、一般論だけでコードを追加しないでください。

---

## 3. Core Implementation Principles

- デザインと実装を分離して考えない
- WordPress化を前提にする
- コンポーネント単位で再利用できる構造にする
- セマンティックHTMLを使用する
- 固定高さを極力避ける
- 余白は原則としてpaddingとgapで管理する
- 内容量に応じて自然に伸びる設計にする
- CSS変数を優先して使用する
- 既存の命名規則を維持する
- 不要なwrapperを増やさない
- インラインstyleを残さない
- 未使用CSSを放置しない
- 表示速度とアクセシビリティを維持する
- 動きのあるサイトを目指しつつ、過剰演出を避ける

---

## 4. HTML Rules

### Semantic Structure

適切な要素を使用します。

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `h1`から`h6`
- `ul`、`ol`
- `button`
- `a`

### Heading Rules

- 1ページに`h1`は原則1つ
- 見出し階層を飛ばさない
- 見た目のサイズ調整を理由に見出しレベルを変更しない
- セクションの役割が分かる見出しを付ける

### Links and Buttons

- ページ遷移は`a`
- 操作は`button`
- 空の`href="#"`を完成版に残さない
- 仮リンクの場合は理由を作業メモで明示する
- SVGアイコンが装飾用の場合は`aria-hidden="true"`

### Images

- 内容を伝える画像には適切な`alt`
- 装飾画像は空の`alt=""`
- widthとheight、またはaspect-ratioを設定する
- `object-fit`と`object-position`を意図的に指定する
- 過剰に大きい画像をそのまま読み込まない

### Inline Code

以下は原則禁止です。

- インラインstyle
- インラインJavaScript
- ページごとの場当たり的なCSS

既存にある場合は、対象ページのCSSまたは共通CSSへ移動します。

---

## 5. CSS Architecture

### File Responsibility

- `style.css`：全ページ共通
- `index.css`：TOP専用
- `about.css`：About専用
- `works.css`：Works専用
- `blog.css`：Blog専用
- `contact.css`：Contact専用

対象ファイルの役割を超えた変更をしないでください。

共通化が必要な場合は、既存ページへの影響を確認してから`style.css`へ移動します。

### Naming

BEM風の命名を基本とします。

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

既存の命名規則がある場合は、それを優先します。

### CSS Variables

色、余白、角丸、影、コンテナ幅、フォントは、既存のCSS変数を優先します。

新しい値を追加する前に、既存変数で表現できないか確認してください。

### Layout

優先：

- Flexbox
- CSS Grid
- `gap`
- `min()`
- `max()`
- `clamp()`
- `aspect-ratio`
- `min-height`

避ける実装：

- 内容に依存する固定height
- 不要なabsolute配置
- 大量のnegative margin
- 見た目を合わせるためだけのtransform
- 無意味な`overflow: hidden`
- 同じ値の重複定義

### Spacing

- セクションの縦余白はpaddingで管理
- 子要素間はgapまたはmarginで整理
- PC、Tablet、Mobileで余白のリズムを維持
- 余白調整のためだけに空要素を追加しない

### Card

- `height`を固定しない
- 必要な場合は`min-height`
- テキスト量が増えても崩れない
- 同じ役割のカードは共通クラス化
- Hoverがなくても情報を理解できるようにする

---

## 6. Responsive Rules

基本ブレークポイントの目安：

- 980px前後
- 767px
- 599px
- 360px

既存プロジェクトのブレークポイントがある場合は、それを優先します。

確認項目：

- 文字が不自然に折り返されない
- ボタンのタップ領域が十分
- 横スクロールが出ない
- 画像がつぶれない
- カードの高さが固定されていない
- ナビゲーションが操作できる
- Hoverに依存した情報がない
- 360px前後でも成立する

767px以下の左右余白は40pxを基準としつつ、実際の画面幅と既存コンテナ設計に合わせて調整します。

---

## 7. JavaScript Rules

JavaScriptの使用は禁止しません。

ブランド表現とUX向上のため、必要に応じて積極的に使用します。

### Suitable Uses

- ハンバーガーメニュー
- アコーディオン
- タブ
- モーダル
- スクロール連動
- Intersection Observer
- GSAP
- SVG Animation
- Canvas
- フィルター
- WordPressの動的UI
- フォーム補助

### Implementation Rules

- CSSで十分な場合はCSSを優先
- JavaScriptを使う場合は目的を明確にする
- DOMが存在しないページでもエラーを出さない
- 要素取得後に存在確認を行う
- グローバル変数を増やさない
- 同じイベントリスナーを重複登録しない
- スクロールイベントは負荷を考慮する
- 必要に応じて`requestAnimationFrame`を使用
- 外部ライブラリは必要なものだけ読み込む
- `main.js`へ追加する際は他ページへの影響を確認する

### Error Safe Pattern

```js
const target = document.querySelector(".target");

if (target) {
  // 処理
}
```

---

## 8. Motion Rules

### Motion Purpose

- 視線誘導
- 状態変化の理解
- ブランドの心地よさ
- 操作への反応
- 情報の段階的な提示

### Preferred Motion

- Fade
- Translate
- Mask Reveal
- Clip Path
- 小さなScale変化
- Hover Transition
- Scroll Reveal
- SVG Line Animation
- GSAP Timeline
- 必要に応じたParallax

### Timingの目安

- Hover：150msから300ms
- UI状態変化：200msから400ms
- Scroll Reveal：500msから900ms

既存の`--ease-out`などの変数がある場合は優先します。

### Avoid

- 強い点滅
- 大きなバウンド
- 読む前に要素が動き続ける
- 操作を阻害するローディング演出
- 複数方向から無秩序に現れるアニメーション
- 全要素への過剰なアニメーション
- モバイルで重い演出
- 意味のない常時ループ

### Reduced Motion

`prefers-reduced-motion`に対応します。既存の共通CSSに同等設定がある場合は重複追加しません。

- JavaScriptによるスクロールアニメーションでは、`prefers-reduced-motion`を確認する
- `prefers-reduced-motion: reduce`の場合は、アニメーションのためだけの`IntersectionObserver`や不要なイベント処理を原則生成しない
- Reduced Motion時でもコンテンツを非表示にせず、最初から閲覧可能な状態にする
- CSSとJavaScriptのReduced Motion対応を一致させる
- 同じサイト内のページ固有JSと共通JSでMotion方針をできるだけ統一する

---

## 9. GSAP and External Libraries

GSAPを使用して構いません。

導入前の確認：

- CSSだけでは実現しにくい表現か
- ブランド体験に必要か
- 読み込みコストに見合うか
- モバイルでも滑らかか
- Reduced Motionへ対応できるか
- WordPress化後も管理できるか

同じ目的のライブラリを複数導入しません。

---

## 10. Accessibility Rules

- キーボード操作可能
- フォーカス表示を消さない
- 十分なコントラスト
- ボタンとリンクの役割を区別
- メニュー開閉状態に`aria-expanded`
- 開閉対象に`aria-controls`
- 装飾SVGに`aria-hidden="true"`
- Formのlabelを省略しない
- エラー内容を文字でも伝える
- Motionを減らす設定に対応

Hoverは補助表現です。Hoverしないと内容や操作方法が分からない設計は禁止します。

---

## 11. Performance Rules

- 画像を適切な形式とサイズにする
- WebPやAVIFを検討
- Lazy Loadを適切に使う
- Heroなど最初に必要な画像を遅延させすぎない
- 不要なライブラリを削除
- 未使用CSSを削除
- 同じCSSを重複させない
- JavaScriptを必要なページだけで読み込むことを検討
- 長時間のMain Threadブロックを避ける
- CLSを抑える
- フォント数とウェイト数を増やしすぎない

アニメーションは`transform`と`opacity`を中心に検討します。

---

## 12. WordPress Implementation Rules

### General

- クライアントが更新する単位を先に考える
- 再利用する部分はテンプレートパーツ化
- 必要な箇所はブロック、パターン、カスタム投稿へ分ける
- 管理画面の入力項目を増やしすぎない
- 更新方法を説明できる構造にする

### Gutenberg

- コアブロックを優先
- 必要に応じてブロックパターン
- 再利用可能なセクションをパターン化
- クライアントが崩しにくい構造
- 不要な独自ブロックを増やさない

### Theme Direction

以下のどれかに固定しません。

- SWELLなどの既存テーマ
- 子テーマ
- オリジナルテーマ
- ハイブリッド構成

案件要件、予算、更新頻度、保守性に応じて選択します。

### Dynamic Content

必要に応じて使用：

- Custom Post Type
- Taxonomy
- Custom Fields
- ACF
- Query Loop
- Reusable Blocks
- Block Patterns

導入する場合は、本当に更新性が上がるかを確認します。

---

## 13. Content and Branding Checks

コード修正だけを依頼された場合でも、以下の明確な矛盾があれば報告します。

- Shopifyが主要サービスとして強調されている
- Blocksy専用制作者に見える
- Coding、WordPress、Designの順番が崩れている
- 女性向けだけに限定して見える
- 未確認の実績が書かれている
- 古いコピーライトが残っている
- `WM Design`と`WM Design`の使い分けが不自然
- 英語サービス名が不要にALL CAPSになっている

ただし、依頼範囲外の箇所を勝手に変更しません。

---

## 14. AI Editing Workflow

### Step 1: Inspect

- 対象ファイルを読む
- 関連ファイルを読む
- 共通クラスを確認
- 重複定義を検索
- 未使用クラスを確認
- JavaScriptとの依存関係を確認

### Step 2: Define Scope

- 変更対象
- 変更しないファイル
- 削除対象
- 追加対象
- 既存機能への影響

を整理します。

### Step 3: Edit Minimally

- 指定範囲を優先
- 不要なリファクタリングをしない
- クラス名を不用意に変更しない
- 見た目を保ちながら整理
- 変更理由がない箇所は触らない

### Step 4: Validate

- HTML構造
- CSS重複
- 未使用CSS
- JavaScriptエラー
- Responsive
- Accessibility
- Hover
- Focus
- Reduced Motion
- WordPress化のしやすさ

### Step 5: Report

レビューを求められた場合は以下の2視点で報告します。

1. デザイン・UX
2. 実装・WordPress・パフォーマンス

---

## 15. Change Safety Rules

### Do

- 現在のコードを確認する
- 既存変数を使う
- 変更前後の依存関係を確認
- 同名クラスの使用箇所を検索
- 削除前にHTMLとJSの参照を確認
- 完成後に重複や未使用を確認

### Do Not

- ファイル全体を勝手に作り直す
- 指示外のページを変更する
- 新しいライブラリを無断で追加する
- 未確認の文章や実績を追加する
- 動作確認なしでクラス名を一括変更する
- `overflow: hidden`だけで崩れを隠す
- `!important`で問題を押さえ込む
- 固定heightで見た目だけ合わせる
- JavaScriptの存在確認をせず削除する
- WordPress化を考慮せず静的専用の構造にする

---

## 16. Output Rules for AI

ユーザーの指定を最優先します。

### 完成コードを求められた場合

- ファイル名を明記
- 省略しない
- ファイル全体を出力
- 各ファイルを別コードブロック
- 不要な説明を付けない

### 修正箇所だけを求められた場合

- 削除箇所
- 追加箇所
- 置換箇所
- 挿入位置

を明確にします。

### プロンプト作成を求められた場合

- プロジェクト背景
- ブランド方針
- 修正目的
- 対象ファイル
- 変更内容
- 変更禁止事項
- 確認事項
- 出力形式

を含めます。AIが過去の会話を知らない前提で、必要な背景を省略しません。

---

## 17. Page-Specific Direction

### TOP

- Coding、WordPress、Designを主軸にする
- Shopifyを前面に出さない
- ToolsはFigma、Photoshop、Canva、VS Code
- Works、Blog、SNS、Contactへ自然に誘導

### About

- 数値スキルバーを使用しない
- 価値観、制作姿勢、専門性、人柄を伝える
- BlocksyやGutenbergだけに限定しない
- Shopify経験はHistoryで活用
- 「この人なら任せられそう」と感じる構成

### Works

- ターゲット
- イメージ
- 担当
- 制作期間
- 制作ツール
- 制作ポイント
- 課題と解決

を整理して見せる。

### Blog

- 心地よく働き、心地よく暮らす
- Web制作、学び、道具、暮らしを扱う
- 記事カードの再利用性を考える
- WordPress投稿一覧へ移行しやすい構造

### Contact

- 安心感
- 返信目安
- 必要な入力項目
- プライバシーポリシー
- フォームのアクセシビリティ
- WordPressフォームプラグインへの移行

を考慮する。

---

## 18. Final Checklist

### Design

- WM Designらしい上品さがある
- 余白が窮屈ではない
- セクションの役割が分かる
- 装飾が過剰ではない
- Motionに統一感がある

### HTML

- h1は1つ
- 見出し階層が正しい
- セマンティック
- altが適切
- SVGのaria設定
- インラインstyleなし

### CSS

- 重複なし
- 未使用クラスなし
- 固定heightの乱用なし
- 既存変数を使用
- Responsive確認
- HoverとFocus確認

### JavaScript

- Console Errorなし
- 要素存在確認
- 重複イベントなし
- Reduced Motion配慮
- モバイル負荷確認
- 未使用JavaScriptなし

### Accessibility

- Keyboard操作確認

### Performance

- 画像形式・容量の最適化確認
- 画像のwidth / height、またはaspect-ratio確認
- Lazy Loading確認（ファーストビューの画像を遅延させない）
- CLS確認

### WordPress

- 更新単位が明確
- 再利用可能
- テンプレート化しやすい
- 管理画面が複雑になりすぎない

### Brand

- Coding、WordPress、Designの順番
- 特定テーマに限定していない
- Shopifyを前面に出していない
- 未確認の実績を追加していない
- 信頼、丁寧、心地よさが伝わる
