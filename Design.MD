# Serene Vitality Design System

## Brand Identity

Tone: Calm, encouraging, low-friction, professional. Visual style: Modern, clean, healthcare-focused with a "Mindful Coach" identity that prioritizes user autonomy and evidence-based guidance.

## Colors

**Primary:** `#4DB6AC` (Soft Teal) — Used for primary CTAs, progress indicators, and active states.

**Surface:** `#FBF9F8` (Off-white) — Main background color for a clean, non-clinical feel.

**Surface Container:** `#FFFFFF` (White) — Card backgrounds for clear elevation and content separation.

**Headings:** `#1A1C1E` (Charcoal/Dark Gray) — High contrast for clear information hierarchy.

**On-Surface-Variant:** `#44474E` (Gray) — Used for secondary text and labels.

**Accessibility Notes:** All text-to-background combinations must meet WCAG AA (4.5:1) for body text and WCAG AAA (7:1) for small text. Test #44474E on #FBF9F8 (ratio: 4.8:1) before deployment on light backgrounds.

## Typography

**Font Family:** Manrope (Sans-serif) — Applied across all text layers.

**Headlines:** 24–32px, Bold weight, Charcoal (#1A1C1E). Use consistently for section titles and card headers.

**Body:** 16–18px, Regular weight, Charcoal or On-Surface-Variant depending on hierarchy. Maintain 1.5 line-height for readability.

**Labels & Captions:** 12–14px, Regular weight, On-Surface-Variant. Used for metadata, field labels, and tertiary information.

**Line Height:** 1.5 minimum for body text; 1.2 for headlines. Ensures adequate whitespace for cognitive load reduction.

**Letter Spacing:** 0 for body text; +0.5px for labels and all-caps text to improve scanning.

## Layout & Spacing

**Grid System:** 16px base unit. All measurements (padding, margins, sizes) derive from multiples of 16px (16px, 24px, 32px, 48px, etc.) for rhythm and consistency.

**Container Padding:** 16px horizontal on mobile; scale to 24px on tablet and 32px on desktop.

**Vertical Spacing:** 24px between major sections; 16px between cards; 12px between form elements.

**Corner Radius:** 12px for cards, containers, and input fields. 100px (fully rounded) for primary buttons and chip badges to emphasize actionability.

**Tap Targets:** Minimum 44×44px for all interactive elements (buttons, links, toggles) to meet WCAG 2.1 Level AAA.

## Components

### Top Navigation Bar

**Type:** Small, center-aligned header (56px height recommended).

**Lead:** User profile avatar (40px diameter) with border treatment.

**Title:** "Mindful Coach" brand mark, center-positioned for visual hierarchy.

**Action:** Settings icon (24px) as trailing element with tap target of 44×44px.

**Background:** Surface color (#FBF9F8) with subtle 1px bottom border in On-Surface-Variant for definition.

### Bottom Navigation Bar

**Style:** Label + Icon stacked vertically, equal weight distribution.

**Destinations:** Home, Coach, Profile — three equal-width tabs spanning full width.

**Icon Size:** 24px; Label size: 12px, positioned 4px below icon.

**Active State:** Teal container background (#4DB6AC) with white icon and label; inactive state uses On-Surface-Variant text.

**Height:** 64px to accommodate icon + label + adequate touch padding.

### Selection Cards

**Structure:** Large vertical tiles (full width on mobile, constrained to 320px+ on larger screens) for high-intent actions such as onboarding goals.

**Padding:** 20px internal padding; 12px border radius.

**Feedback:** 2px teal border on selection; white checkmark icon (20px) in top-right corner.

**Inactive State:** Off-white background with dark gray border; minimal visual emphasis.

**Active State:** Teal background with white text and visible checkmark.

### Coaching Cards

**Session Card:** Teal background (#4DB6AC) with white text, play icon (32px) positioned center-right. Minimum 120px height for touch safety. Include session duration subtitle in 14px body text.

**AI Conversation:** Message bubbles alternate left (AI) and right (user). AI bubbles use Surface Container background (#FFFFFF) with charcoal text; user bubbles use light teal background with white text. Include "Evidence-backed" or similar rationale subtext in 12px On-Surface-Variant beneath message.

**Spacing:** 12px between consecutive messages; 16px padding within bubbles.

### Data Visualizations

**Energy Score:** Circular progress ring (120px diameter recommended) with center-positioned icon and numerical value. Teal fill for completed progress; light gray for remaining. Use 12px body text for label below.

**Metrics — Steps:** Horizontal bar chart with teal fills, 8px bar height, 16px spacing between bars. Label each bar with day-of-week abbreviation (12px) below.

**Metrics — Sleep:** Sparkline (simplified line chart) with subtle teal stroke (2px) over light gray background. Show 7-day trend. Add numerical summary (e.g., "7.2 hrs avg") in 14px body text above chart.

## Interaction Design

**Transitions:** View switches (e.g., onboarding to dashboard) use a 500ms fade + slide with `cubic-bezier(0.33, 1, 0.68, 1)` (Ease-out Cubic). Step transitions and card expansions animate over 400ms and 300ms respectively. Avoid motion for users with `prefers-reduced-motion` system setting.

**Feedback:** All interactive elements reduce to 98% scale on active press (95% for footer tabs). Checkmark animations appear on task completion (200ms pop-in effect). Score updates include brief number-change animation (fade in 150ms).

**Loading States:** Use subtle skeleton screens matching card dimensions rather than spinner icons. Skeleton elements pulse every 1.5s using opacity shift (0.6–1.0) on On-Surface-Variant color. AI typing indicator uses a staggered bounce for presence.

## Accessibility Checklist

- All interactive elements (buttons, links, form fields) must have visible focus indicators (outline: 2px solid #4DB6AC or equivalent).
- Color should never be the only means of conveying information; pair teal states with icons or text labels.
- Form fields must have explicit labels (not placeholder-only); labels must be associated via `<label>` and `id` attributes.
- Images and icons must have descriptive `alt` text or ARIA labels.
- Ensure sufficient color contrast between all text and backgrounds (minimum 4.5:1 for normal text, 3:1 for graphics/UI components).
- Test navigation with keyboard only; tab order must follow logical flow (top-to-bottom, left-to-right).
- Provide text alternatives for all data visualizations (e.g., tabular data beneath charts).

## Handoff Notes

**Implementation:** Native-first implementation using React Native (iOS/Android) or Flutter for consistent behavior across platforms. Prioritize local-first data storage using SQLite or Realm to minimize server dependency and improve offline resilience.

**Design Tokens:** Export colors, typography, and spacing as CSS custom properties or design tokens file (JSON format) for seamless handoff to development teams.

**Testing:** Conduct accessibility audits using WCAG 2.1 Level AA as baseline. Test with screen readers (NVDA, JAWS on Windows; VoiceOver on macOS/iOS). Validate color contrast with tools like Contrast Ratio or WebAIM.

**Variants:** Prepare dark mode palette (inverted backgrounds, lighter text) for future expansion. Plan for RTL (right-to-left) layout support if serving international audiences.
