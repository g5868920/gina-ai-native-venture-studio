# Studio → PM Workflow:Control Tower Prototype 執行 Handoff

Date: 2026-07-12
From: Gina AI-Native Venture Studio(CEO,依 Chairwoman directive 2026-07-12)
To: AI-Native PM Workflow product repository(implementation owner)
Priority: **Primary** — 全 portfolio 第一優先
Milestone 記錄:`memory/milestones/2026-07-12-fast-track-product-delivery.md`

---

## Objective

在 PM Workflow 獨立 repo 交付 polished、demo-ready 的 **Control Tower prototype**,可作為 portfolio 展示與 demo story 載體。

## Expected Outcome(Chairwoman 指定,照錄)

1. Active project portfolio
2. My Reviews queue
3. Project Registry
4. Project detail
5. 12-module workflow board
6. Module detail 與 simulated human review
7. Source traceability
8. Artifact Studio
9. Non-canonical draft preview 與 download
10. Portfolio-ready demo story

## Context(來自 venture 自身 canonical 記錄,必須遵守)

- 12 modules 的編號與名稱不可改(PMW-004);portal/export 是 review/presentation 層,不是 truth(PMW-007/008)。
- Static portal 不得加入 approval、sign-off、run-workflow、live-sync 行為(PMW-009)— **simulated human review 必須明確標示為 simulated**,不可暗示真實 approval 狀態。
- Review 有 5 個 statuses 且不自動等於 approval(PMW-012);action gates 阻擋 commitment-sensitive 使用(PMW-013/014)。
- 所有展示內容維持 synthetic 標示(PMW-002、PMW-020);demo story 不得含外部商業驗證聲稱(PMW-022)。
- v1 baseline 已凍結(PMW-042)— prototype 建議作為新的展示層工作,不重寫已凍結的歷史 artifacts。

## Boundaries

Implementation(架構、框架、程式碼、視覺)完全由 product repo 決定與擁有。Studio 不修改 product repo。Prototype 屬 demo/presentation 層 — 不引入 backend、auth、真實 persistent state 或 live orchestration(那是另一個 product phase,PMW-043)。

## 回報

以每週 venture update(`templates/venture-update.md` 格式,引用 product repo 內證據路徑)回報進度、風險、blockers 與需要 Gina 的決策;完成時提供 demo 錄影/截圖與 demo story 供 portfolio evidence。

## Open questions(需 Gina,見 milestone 記錄)

本 directive 與 venture handoff 七天優先序(勿 polish 舊 artifacts、先做 real-data dogfood)的取捨範圍;dogfood(D2D vs weekly loop)是否暫停或並行。
