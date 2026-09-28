# WM Design Portfolio — TODO

WordPress化へ進むための作業一覧。作業の完了は実際に確認してから `[x]` にする。変更履歴は `CHANGELOG.md`、ブランド方針は `docs/WM-DESIGN-GUIDE_FINAL.md`、実装ルールは `docs/SKILL.md` を参照する。

## 1. WordPress化前の最終確認

静的版の全面的な作り直しは行わない。移行時に手戻りを生む問題を確認し、必要な箇所だけ修正してWordPress実装を始める。

- [x] **TOP Works・SNSの見出し・意味構造**：Works（`.sec-works`）とSNS（`.sec-sns`）のHeading Structure確認はユーザー確認済み。
- [x] **その他の見出し・意味構造**：残りのTOPセクションとAbout / Works / WM Journal / Contactの見出し階層、セクションの意味、見出しIDと`aria-labelledby`の対応、SNSリンク構造を確認。見出しレベルの飛び・ID重複・`aria-labelledby`の参照切れはなく、現在のVisual Designを維持したまま構造を確認済み。
- [x] **全ページの実表示確認**：TOP / About / Works / WM Journal / Contactをユーザーが目視確認済み。Responsive表示も確認済み。
- [ ] **全ページの操作・状態確認**：全ページのHTML / CSS / JavaScriptを静的に確認済み。Tab / Shift + Tab、Enter / Space、ラジオボタンの矢印キー、Escape、Focus表示はユーザー確認済み。About CTAのFocus / Reduced Motion修正とContactの6つの選択肢のマウスカーソルも確認済み。
  - **Footer Logoの枠線**：公開中のTOPで比較。マウスだけで重ねた場合は枠なし、TabでFocusした後にポインターを重ねると枠が表示された。CSSの独自Hover枠線ではなく、ブラウザー標準のFocus輪郭（computed style: `outline-style: auto`）と確認。二重のCSS指定ではない。今回の確認環境では輪郭は濃色に見え、ユーザー環境で白く見える色の差は未確認。キーボード操作時のFocus表示は維持する。
  - **Console**：「Lazy-loaded images should have explicit dimensions」と404を確認。Drive上および公開中TOPのLazy-loaded画像にはwidth / height属性が設定されている。今回のブラウザー確認ではサイト由来の同警告・404を再現できず、404の対象URLも未特定。ファビコン一式はDrive上の全5ページのheadと`site.webmanifest`へ設定済みだが、公開サイトにはまだファビコン参照が反映されていない。更新を公開後、ユーザー環境で対象URLと状態を再確認する。Console調査が残るため、この項目は未完了。
- [ ] **Typographyと読みやすさ**：10〜13pxの情報として読む文字、切替前後の文字サイズ、ブラウザの文字サイズ設定、200% Zoomを確認する。必要なfont-sizeのみrem化やサイズ調整を検討し、Brand Typographyと見出しの強弱を保つ。
- [ ] **WordPress移行設計**：採用するテーマ構成、Header / Footer / CTA等の共通部品と更新単位を整理する。WorksのCustom Post Type・分類・必要な入力項目・共通Single、WM Journalの標準Posts・Archive / Single・4カテゴリ、必要なPattern、Contact FormとPrivacy Policy固定ページの方針を決める。入力項目や独自Blockを増やしすぎない。

上記を確認したらWordPress化へ進む。公開URLを要する確認やWordPressで生成される要素は、静的版では完了を待たない。

## 2. WordPress化

### Themeと固定ページ

- [ ] Themeの基本構成、共通Template Parts、CSS / JavaScript / 画像を移行し、既存デザイン・動作を再現する。共通コードの重複や未使用処理は移行中に必要な範囲で整理する。
- [ ] TOP / About / Contactを実装し、Header / Footer / Navigation / CTAなどの共通表示とページ間導線を接続する。
- [ ] Privacy Policyを固定ページとして作成し、Contact Formのリンクと同意項目を接続する。

### Works

- [ ] WorksをCustom Post Typeとして登録し、必要なTaxonomyと入力項目を決める。作品ごとにTarget、担当範囲、制作内容、Design Intent、Implementation、課題と対応などを必要な範囲で管理する。
- [ ] Works Archive / 共通Single Templateを実装し、一覧カードとTOPのWorksから各投稿のPermalinkへ接続する。静的な詳細ページを作品数だけ複製しない。
- [ ] 既存9件を移行し、実績の内容・画像・分類・リンクを確認する。

### WM Journal

- [ ] WordPress標準Postsを使い、WM Journalトップ、Category Archive、Single、記事カード、Paginationを実装する。関連記事は必要性を判断する。
- [ ] 正式カテゴリを **Workspace / Lifestyle / Review / Workstyle** の4つで設定する。Web & WordPressやLearningはカテゴリに戻さず、必要なら記事の内容に応じてWorkstyle等へ分類する。
- [ ] Cover Story等の編集棚と記事の更新方法を決め、Gutenbergで編集・追加できることを確認する。

### Contact

- [ ] フォームの送信機能、サーバー側の入力検証、エラーと完了表示、管理者通知、Spam対策を実装する。自動返信の必要性を判断する。
- [ ] Privacy Policyへの同意導線、通知先、実送信・エラー時の動作を確認する。

## 3. WordPress化後の公開前確認

- [ ] **全ページ表示・操作**：主要幅と切替前後、Chrome / Edge / 確認可能なSafari・iOS Safari、200% Zoomで表示を確認する。Keyboard / Focus、Menu、Works FilterとEmpty State、フォーム、Reduced Motion、動画、Console Errorも確認する。
- [ ] **内容と導線**：全ページのテキスト・画像・alt・見出し、実績と記事のArchive / Single、Pagination、内部リンク、SNS URL、Privacy Policy、存在しないリンクと404表示を確認する。
- [ ] **速度と安定性**：Hero動画とPoster、WordPressが生成する画像サイズ・srcset、画像の遅延読み込み、フォント、レイアウトのずれ、不要なCSS / JavaScriptを実環境で確認する。
- [ ] **SEOと公開設定**：各ページのtitle / description、canonical、OGP画像と各種OGP・X Card、favicon / apple-touch-icon、robots・index / noindex、HTTPS、本番URL、HTTP Status、OGP Previewを確認する。
- [ ] **更新性**：Worksと記事を各1件追加・編集し、分類・一覧・詳細・TOPへの反映を確認する。必要な操作手順を残す。

## 2026-09-28の反映内容

- ファビコン一式（PNG / SVG / ICO / Web App Manifest）を`images/favicon/`に配置。
- TOP / About / Works / Blog / Contactの全5ページのheadにファビコン、Apple Touch Icon、manifestの参照を追加。GitHub Pagesのサブパスでも読み込めるよう、`images/favicon/...`の相対パスを使用。
- `site.webmanifest`内のアプリアイコン参照も、同じフォルダ内で解決する相対パスに変更。
- 変更はDrive上の静的サイトソースに反映済み。公開後に各アイコンの読み込みとConsoleの404が解消したかを確認する。公開確認まではConsole確認を完了扱いにしない。
## 完了済みの要約

以下は元のTODOで完了として記録された作業の要約。横断の最終実表示やWordPress上の動作確認まで完了したという意味ではない。

- TOPのLayout / Responsive / Typography、およびAbout・Flow・SNS・WM Journal・For Whom・Footerの個別表示とVisual調整
- Mobile Navigation、ContrastとPrimary Strong（`#62755c`）、Hero動画のPause / Play、Hamburger MenuのAccessibility調整
- Fade / RevealのReduced Motion共通化と、JavaScriptが使えない場合のContent表示
- Hero動画の約2.57MBへの最適化、WebP Posterと`preload="metadata"`の設定、Brown / White Logo SVGの最適化
- Works画像9件の形式・容量・Lazy Load確認
- WorksはCustom Post Typeと共通Single Template、WM Journalは標準Postsで構築する方針の決定
- TOP / About / Works / WM Journal / Contactのレスポンシブ表示を全ページ目視確認

## 運用メモ

- 未確認の作業は完了扱いにしない。コード確認とブラウザでの確認は区別する。
- CSSの全面リファクタリングや不要なデザイン変更は、この移行の前提条件にしない。
- `CHANGELOG.md`の既存履歴は維持し、WordPress化で行った変更は今後追記する。
- Portfolio完了後の「WM Design共通Web制作標準」へのSkill分離は、公開作業とは別に検討する。


