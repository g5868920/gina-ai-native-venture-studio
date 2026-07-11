# TWINKO_VENTURE_STUDIO_HANDOFF

> Purpose：Provide concise portfolio-level context for the `Gina AI-Native Venture Studio` Project.  
> Status：Pre-build consolidation / product definition。  
> This handoff does not replace the Twinko product-level source files.

## Venture Summary

Twinko is an intended commercial native iOS AI digital companion centered on a cute star character. The product aims to give young adults a low-pressure place to talk, reflect and calm down through a unified companion experience spanning Chat, Tarot, Astrology and Meditation. Historical concepts also include Music, bedtime stories, proactive check-ins and gamified character customization, but the first release must be deliberately constrained.

The product is not validated yet and must not be positioned as therapy, diagnosis or deterministic fortune-telling.

## Current Product Stage

- High-level concept and early user / feature hypotheses exist。
- Rough onboarding and brand direction exist。
- Latest direction is native iOS rather than no-code production。
- `TWINKO_MARKET_BUSINESS_GAMIFICATION_CONSOLIDATION.md` now provides detailed market、business model、unit-economics、partnership、gamification and ethical-engagement hypotheses。
- The supplement is **not market validation**；pricing、WTP、retention、competitor superiority and gamification effectiveness remain unvalidated。
- Primary user wedge and first-value moment are now the immediate gating decisions；naming follows them。
- Formal scope freeze、design system、technical validation、safety policy、codebase、content and beta release are not confirmed complete。

## Strategic Role in the Venture Studio

Twinko serves two roles：

1. **Consumer venture**：Validate whether a character-first AI companion can create repeat emotional value and a sustainable business。
2. **Internal dogfooding venture**：Act as the first real customer for the AI-Native PM Workflow, generating authentic product, design, engineering, risk, launch and analytics inputs。

## Relationship to the AI-Native PM Workflow

Twinko should eventually feed the workflow with：

- Product brief, PRDs and roadmap。
- Decisions, assumptions and open questions。
- Research notes、interview evidence and competitor observations。
- Figma / design status and screenshots。
- GitHub issues, PRs, commits, tests and build signals。
- Bugs, risks and dependencies。
- Launch criteria and App Store readiness。
- Beta feedback、analytics、cost and safety signals。

### Immediate dogfood slice：Discovery-to-Decision

The first bounded workflow slice should：

1. Ingest discovery questions、interview notes、concept-test results、competitor observations and founder hypotheses。
2. Distinguish observation、participant statement、founder assumption、AI inference and evidence gap。
3. Generate a segment evidence matrix and first-value option comparison。
4. Produce a source-linked founder decision memo。
5. Update the decision log、risk register、scope recommendation and next experiment after human approval。

The workflow is useful only if it saves founder time, preserves traceability, exposes conflicts and avoids turning a small discovery sample into false market validation。Full engineering / launch automation is later scope。

## Current Seven-Day Objective

Complete a **Discovery-to-Decision Gate v1** focused on market / problem validation：

1. Define candidate primary wedges and first-value moments。
2. Recruit and interview relevant target users。
3. Document current alternatives, trigger moments, trust concerns and switching criteria。
4. Test Chat-first、reflection-first、daily-insight-first and calming-first concepts as appropriate。
5. Use the PM Workflow to classify evidence and surface conflicts / gaps。
6. Build an initial unit-economics skeleton without selecting price。
7. Founder decides or explicitly defers the primary wedge and first-value moment。

Naming、full v1 scope and visual lock follow this gate rather than lead it。

## Next Major Milestone

**Build Readiness Gate v1**, preceded by the immediate **Discovery-to-Decision Gate v1**。

Build Readiness is complete when the founder can hand an engineering agent an approved, bounded vertical-slice specification with：

- Evidence-supported target user wedge and first-value use case。
- Screen flow and acceptance criteria。
- Safety rules。
- Architecture working direction。
- Data model draft。
- LLM benchmark plan。
- Repository / review workflow。
- Analytics and unit-economics measurement draft。
- Explicit out-of-scope list, including complex gamification。
- Beta progression plan limited to none or one low-cost mechanic。

## Shared-Team Needs

### Product and PM Operations

- Run market / problem discovery before scope lock。
- Select one primary user wedge and first-value moment。
- Convert evidence into one-page specs only after founder decision。
- Maintain decision、risk、assumption and source traceability。
- Define activation、meaningful retention and beta criteria without claiming validated benchmarks。
- Keep complex gamification out of launch-critical scope。

### UI/UX and Design

- Create an original Twinko character system。
- Define Home and onboarding around the selected first-value flow。
- Resolve Twinko vs TwinkoTalk after wedge / positioning is clearer。
- Build accessible design tokens and motion rules。
- Limit first release to a small number of signature interactions。
- If beta tests progression, create only one low-cost unlock / milestone asset set。

### Engineering

Current working stack：

- Swift / SwiftUI / Xcode。
- Claude Code with Fable。
- Cursor。
- GitHub。
- Supabase subject to validation。
- Independent coding review。
- Xcode Simulator and real-device testing。

Immediate needs：

- Validate maintainability for a non-technical solo founder。
- Run spikes for auth、RLS、LLM proxy、structured output、motion and selected audio needs。
- Establish small-PR / test / independent-review gates。
- Track cost per meaningful session from early beta。

### Marketing and Growth

- Select a beachhead segment through research rather than broad 18-35 targeting。
- Test positioning and first-value promise before a full launch campaign。
- Use competitor names as research references, not unsupported superiority claims。
- Prepare waitlist / TestFlight recruitment after wedge selection。
- Avoid unsupported mental-health、prediction、retention or effectiveness claims。

### Legal, Privacy, and Trust

- Define AI disclosure、emotional-safety boundary and crisis fallback。
- Adopt ethical engagement guardrails：no guilt、exclusivity、absence punishment、distress paywall or opaque reward mechanics。
- Minimize chat and birth-data collection。
- Prepare privacy policy and terms with qualified review。
- Track licenses for character、font、tarot art、music、TTS and third-party tools。

### Finance and Operations

- Build cost model for LLM、backend、storage、audio、design、legal、content and Apple fees。
- Calculate cost per active user / meaningful session before setting free quota or price。
- Compare monetization models only after recurring value and retention signals exist。
- Test willingness to pay after product experience。
- Use partners only for launch-critical quality、trust、rights or capability gaps before validation。

## Cross-Venture Dependencies

- **AI-Native PM Workflow**：Twinko needs a lightweight governance system; the workflow needs real Twinko data。
- **AI Self-Learning**：LLM architecture, evaluation, agent use and safety learning should be applied directly to Twinko。
- **Portfolio / Proof of Work**：Twinko may become credible proof only after the founder can explain decisions, tradeoffs and actual evidence; public portfolio work must not expose user data or overclaim product progress。

## Decisions Requiring Founder-Level Review

1. Primary target-user wedge。
2. Primary first-value moment。
3. Integrated experience vs narrower v1 wedge。
4. Launch market and language。
5. Exact v1 scope and explicit deferrals。
6. Safety / crisis / fortune-content / ethical-engagement policy。
7. No gamification vs one low-cost beta progression mechanic。
8. Twinko vs TwinkoTalk naming。
9. Account、birth-data and memory model。
10. LLM provider and Supabase approval after spikes。
11. Beta cohort、success criteria and meaningful-retention definition。
12. Monetization decision timing and unit-economics threshold；not price selection yet。
13. Launch-critical partner gaps and budget / weekly founder capacity。

## Top Risks

- No validated primary wedge or first-value moment。
- Small discovery samples may be overstated as market validation。
- Scope is too broad for a solo non-technical founder。
- Character and motion quality may require specialized support。
- AI emotional responses can create safety and trust failures。
- Complex gamification may increase scope, reduce trust or mask weak core value。
- Pricing、WTP、retention、competitor superiority and gamification effectiveness are unvalidated。
- Sensitive user / research data may be over-collected or poorly governed。
- AI-generated code may become unmaintainable or insecure。
- LLM cost / latency may undermine unit economics。
- Visual inspiration may drift too close to protected IP。
- Early partnerships may create unnecessary dependency。
- PM Workflow dogfooding may distract from discovery unless kept bounded。

## Current Resource Priorities

1. Target-user access and founder interview time。
2. Discovery-to-Decision PM Workflow evidence schema and decision template。
3. Founder decision bandwidth for wedge and first value。
4. Lightweight concept / prototype assets for comparison。
5. Unit-economics benchmark inputs。
6. Safety / legal review planning。
7. Original character / product designer support after wedge selection。
8. SwiftUI / architecture review capacity for Build Readiness。
9. Minimal PM Workflow integration, not full automation。

## Key Documents in the Twinko Project

- `TWINKO_PRODUCT_OPERATING_BRIEF.md` — main product source of truth。
- `TWINKO_CURRENT_STATUS.md` — current execution status and immediate milestone。
- `TWINKO_DECISION_LOG.md` — decision history, conflicts and pending items。
- `TWINKO_MARKET_BUSINESS_GAMIFICATION_CONSOLIDATION.md` — detailed domain supplement; not market validation。
- `TWINKO_INCREMENTAL_RECONCILIATION_SUMMARY.md` — change and handoff summary for this reconciliation。
- `TWINKO_VENTURE_STUDIO_HANDOFF.md` — portfolio-level venture context。
- Recovered historical TwinkoTalk Project Management brief — original concept, users, features, flow and visual references。
- Current Twinko Product Master Consolidation directive — commercial iOS and AI-Native PM Workflow context。
- Historical task / schedule files — reference only; not current milestone plan。
