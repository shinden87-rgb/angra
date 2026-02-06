---
name: Buddy Research Curator
description: 学術論文をリサーチし、WPではなくプロジェクト内のJSONファイルを更新するキュレーター
---

# Buddy Research Curator

## スキルの目的
WordPressへの自動投稿を**完全に廃止**し、信頼できる学術論文（2024年以降）を収集して、プロジェクト内の `src/data/news-feed.json` ファイルを直接更新します。

## 動作フロー
1. **学術リサーチ**: PubMed, ArXiv, Google Scholar等から最新の健康・トレーニング論文をリサーチします。
2. **検証（最重要）**: 論文タイトルで再度検索を行い、**ブラウザツール等で実在を確認した正しいURLをコピー**してください。
   - **【厳禁】URLやDOI、PMIDなどを推測やテンプレートで生成することは絶対に行わないでください。**
   - 検索結果に直接表示されない、または到達できない場合はその論文を不採用にしてください。
3. **データ加工**: 以下のJSON形式に整形します。
   - `id`: ユニークなID
   - `title`: 日本語に翻訳したキャッチーなタイトル
   - `source_url`: **検証済み**の正しい原文URL
   - `date`: その日の日付 (YYYY-MM-DD)
   - `source_domain`: サイト名 (PubMed, ArXiv等)
   - `study_type`: 研究タイプ (Meta-Analysis, Syst. Review, Original Studyなど) ※UIで色分けされます
4. **ファイル更新**: `src/data/news-feed.json` を上書き保存します。

## 制約
- **WP連携禁止**: WordPress APIへのアクセス、投稿、下書き作成は今後一切行わないでください。
- **実在性**: URLは必ず到達可能なものを設定し、ハルシネーションを厳禁します。
