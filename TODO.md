# WM Design Portfolio — TODO

WordPress化へ進むための作業一覧。作業の完了は実際に確認してから `[x]` にする。変更履歴は `CHANGELOG.md`、ブランド方針は `docs/WM-DESIGN-GUIDE_FINAL.md`、実装ルールは `docs/SKILL.md` を参照する。

## 1. WordPress化前の最終確認

静的版の全面的な作り直しは行わない。移行時に手戻りを生む問題を確認し、必要な箇所だけ修正してWordPress実装を始める。

- [✕ ] **見出し・意味構造**：TOPのWorks（`.sec-works`）とSNS（`.sec-sns`）を優先し、全ページの見出し階層、セクションの意味、SNSリンクの構造を確認する。見た目のために見出しレベルを決めず、現在のVisual Designを維持する。
- [ ] **全ページの実表示と操作**：TOP / About / Works / WM Journal / Contactを主要幅と切替前後（特に980px、768px、375px、360px付近）で確認する。Header / Footer / CTA、横スクロール、改行、画像、Hover、Keyboard / Focus、Mobile Menu、Reduced Motion、Console Errorを一巡する。下層ページの768px / 767px / 375px / 360px付近を優先する。
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

## 完了済みの要約

以下は元のTODOで完了として記録された作業の要約。横断の最終実表示やWordPress上の動作確認まで完了したという意味ではない。

- TOPのLayout / Responsive / Typography、およびAbout・Flow・SNS・WM Journal・For Whom・Footerの個別表示とVisual調整
- Mobile Navigation、ContrastとPrimary Strong（`#62755c`）、Hero動画のPause / Play、Hamburger MenuのAccessibility調整
- Fade / RevealのReduced Motion共通化と、JavaScriptが使えない場合のContent表示
- Hero動画の約2.57MBへの最適化、WebP Posterと`preload="metadata"`の設定、Brown / White Logo SVGの最適化
- Works画像9件の形式・容量・Lazy Load確認
- WorksはCustom Post Typeと共通Single Template、WM Journalは標準Postsで構築する方針の決定

## 運用メモ

- 未確認の作業は完了扱いにしない。コード確認とブラウザでの確認は区別する。
- CSSの全面リファクタリングや不要なデザイン変更は、この移行の前提条件にしない。
- `CHANGELOG.md`の既存履歴は維持し、WordPress化で行った変更は今後追記する。
- Portfolio完了後の「WM Design共通Web制作標準」へのSkill分離は、公開作業とは別に検討する。
