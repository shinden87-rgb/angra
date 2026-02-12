---
name: Academic Research Curator
description: 指定されたトピックに関する最新の学術論文（メタ分析・システマティックレビュー）をリサーチし、検証の上でJSON形式のデータを作成するスキル。
---

# Academic Research Curator Skill

ユーザーが「〜に関する論文を探して」「〜系の文献を探して」と依頼した際に実行する。

## Workflow

1.  **トピック分析**
    *   ユーザーの入力から検索キーワードを抽出する（例: "クレアチン", "睡眠", "メンタルヘルス"）。
    *   **既存データの確認 (Check Duplicates)**:
        *   必ず `src/data/news-feed.json` を読み込み、過去に同じテーマや同じ論文が登録されていないか確認する。
        *   既に存在する論文（同じタイトル、同じURL、または酷似した内容）は除外する。
    *   **対象期間**: 原則として「現在から2年以内」の最新論文を対象とする。
    *   **優先順位**: Meta-Analysis, Systematic Review, Large-scale RCT。

2.  **Web検索 (Search)**
    *   信頼できる学術データベース（PubMed, Frontiers, BMJ, Nature, Science, Sports Medicine等）を対象に検索を行う。
    *   クエリ例: `"[Topic]" meta-analysis systematic review 2024 2025`

3.  **厳密な検証 (Critical Verification)** - **最重要**
    *   検索結果のタイトルと要約だけで判断しないこと。
    *   必ず **`read_url_content`** または **`browser_subagent`** を使用して、論文の **正式なタイトル**、**発行日**、**URL** が正しいか確認する。
    *   **禁止事項**:
        *   URLを推測で作成すること（例: IDを適当に当てはめる）。
        *   別の論文のIDを流用すること。
        *   実在確認が取れない論文をリストに含めること。
    *   万が一、URLにアクセスできない場合は、その論文は除外して別の論文を探す。

4.  **データ作成 (JSON Formatting)**
    *   検証済みの論文情報を、プロジェクトの `src/data/news-feed.json` の形式に合わせてJSONオブジェクトを作成する。
    *   **Format**:
        ```json
        {
          "id": "new-YYYY-topic-keyword",
          "title": "日本語訳タイトル（学術的に正確かつ魅力的に）",
          "source_url": "https://verified-url...",
          "date": "YYYY-MM-DD",
          "source_domain": "Journal Name (e.g., Frontiers, PubMed)",
          "study_type": "Meta-Analysis / Syst. Review",
          "category": "One of: [Health, Training, Nutrition, Psychology, Recovery, Mindset, Behavior, Tech]"
        }
        ```


5.  **提案 (Proposal)**
    *   作成したJSONデータを `implementation_plan.md` 等にまとめ、ユーザーに提案する。
    *   「以下の論文が見つかりました（検証済み）。追加しますか？」と確認を求める。

6.  **Phase 2: 公開・デプロイ (Publishing)**
    *   ユーザーが承認、または修正指示（「1番を除外して」など）を出した際に実行する。
    *   **Selection & Filtering**:
        *   ユーザーの指示に基づき、提案リストから対象データを確定する。
    *   **File Update**:
        *   `src/data/news-feed.json` の先頭（または適切な位置）に対象データを追加する。
    *   **Deployment**:
        *   Gitコマンドを実行して変更をプッシュする。
        *   `git add src/data/news-feed.json`
        *   `git commit -m "feat: Add verified research papers ([Topic])"`
        *   `git push origin main`
    *   **Notification**:
        *   「更新とプッシュが完了しました」とユーザーに報告する。

## Trigger Phrases
- "○○に関する論文探して"
- "○○系の文献探して"
- "最新の論文リサーチして"
- "これでアップして"
- "これでサイトを更新して"
- "承認。デプロイまでやって"
- "〇〇を除外してアップしておいて"
