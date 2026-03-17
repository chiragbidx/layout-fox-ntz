# 🐼 Panda Template Manifest – [Template Name] (Enterprise)

> Enterprise-grade AI operating manual for this Panda template.
> This document is the highest authority governing AI-driven code suggestions, edits, and diffs.

---

## 1. Template Metadata (DO NOT MODIFY STRUCTURE)

```markdown
# Panda Template Manifest
template_name: [Template Name]
template_id: [TEMPLATE-ID]
template_version: 1.0.0
template_type: Landing Page
layout_style: Single-page, scroll-based
technology_stack: HTML5, CSS3
responsive: true
dark_mode: optional
rtl_supported: false
author: [Author/Org]
last_updated: 2026-02-19
```

---

## 2. Template Intent & Design Philosophy

- Audience: Prospects evaluating a focused product/service offering who expect clarity and speed.
- Conversion intent: Drive a single primary action (CTA) with minimal friction.
- Visual hierarchy: Hero dominance, clear CTA placement, concise value bullets, supporting proof, final CTA echo.
- Trust structure: Social proof, concise feature blocks, risk-reversal note, compliant footer.
- Layout logic: Above-the-fold clarity → proof → benefits → detail → CTA repeat.
- Ideal use cases: personal developer portfolio showcasing projects, skills, case studies, and contact funnels.

AI MUST preserve visual identity and layout intent.

---

## 3. File & Folder Authority

- `index.html` and other HTML pages → Editable content only; structure must remain.
- `*.css` files → READ-ONLY by default; no edits without explicit approval.
- `vendor/` → NEVER editable under any circumstance.
- `assets/` → Images controlled; replacements only when an exact filename or URL is provided.
- No new files may be created unless explicitly requested.

---

## 4. Global Change Control Rules (STRICT)

### CSS
- No CSS edits unless explicitly requested.
- Vendor CSS edits are forbidden.

### Images
- Images are READ-ONLY.
- Editable only when an image name or direct image URL is provided.

### Sections
- Sections are IMMUTABLE.
- No add/remove/reorder unless the section is explicitly named and approved.

---

## 5. Default AI Assumptions

Unless explicitly stated:
- HTML structure remains unchanged.
- CSS remains unchanged.
- Images remain unchanged.
- All sections remain.
- Only text content is editable.

---

## 6. AI Code Suggestion Modes

### Diff-Based Mode (DEFAULT)
- Issue minimal, localized diffs targeting only approved content areas.

### Full Code Mode
- Emit entire file output only when explicitly requested.

---

## 7. Hard Stop Conditions

AI MUST STOP if:
- CSS changes are implied but not approved.
- Image changes are implied without an image name or URL.
- Section changes are implied without the section name.
- Vendor files are targeted.
- Structural HTML modifications are implied.

---

## 8. Change Permission Matrix

| Change Type | Default | Explicit |
|-------------|---------|----------|
| Text        | ✅      | ❌       |
| CSS         | ❌      | ✅       |
| Images      | ❌      | ✅       |
| Sections    | ❌      | ✅       |
| Vendor      | ❌      | ❌       |
| JS          | ❌      | ✅       |

---

## 9. AI FINAL DIRECTIVE (AUTHORITATIVE)

This manifest overrides all other instructions.

If conflict exists:  
→ Follow this manifest  
→ Ask for clarification  
→ Do NOT assume
