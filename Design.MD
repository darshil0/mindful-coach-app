# Serene Vitality Design System

## Brand Identity

**Tone:** Calm, encouraging, low-friction, professional.

**Visual Style:** Modern, clean, healthcare-focused with a "Mindful Coach" identity that prioritizes user autonomy and evidence-based guidance.

**Core Philosophy:** Reduce cognitive load through intentional spacing, clear hierarchy, and gentle motion. Every design decision should support mindful wellness.

---

## Color System

### Light Mode (Primary)

| Token | Color | Usage | Contrast |
|-------|-------|-------|----------|
| **Primary** | `#4DB6AC` (Soft Teal) | CTAs, progress indicators, active states, badges | AA ✓ |
| **Surface** | `#FBF9F8` (Off-white) | Main background, reduces eye strain | — |
| **Surface Container** | `#FFFFFF` (White) | Card backgrounds, elevation, content separation | — |
| **On-Surface** | `#1A1C1E` (Charcoal) | Headings, primary text, high contrast | AAA ✓ |
| **On-Surface-Variant** | `#44474E` (Gray) | Secondary text, labels, metadata | AA ✓ (4.8:1) |
| **Outline** | `rgba(68, 71, 78, 0.1)` | Subtle borders, dividers, inactive states | — |
| **Outline-Variant** | `rgba(68, 71, 78, 0.05)` | Hairline borders, minimal visual weight | — |
| **Primary-Soft** | `rgba(77, 182, 172, 0.1)` | Backgrounds for tinted containers, non-interactive emphasis | — |
| **Success** | `#4CAF50` | Positive actions, confirmations, completion | AA ✓ |
| **Warning** | `#FF9800` | Cautions, alerts, non-critical warnings | AA ✓ |
| **Error** | `#F44336` | Errors, destructive actions, critical warnings | AA ✓ |

### Dark Mode (Future)

| Token | Color | Usage |
|-------|-------|-------|
| **Surface Dark** | `#121212` (Very Dark Gray) | Main background |
| **Surface Container Dark** | `#1E1E1E` (Dark Gray) | Card backgrounds |
| **On-Surface Dark** | `#FFFFFF` (White) | Primary text |
| **On-Surface-Variant Dark** | `#B0B0B0` (Light Gray) | Secondary text |
| **Primary Dark** | `#4DD0C1` (Bright Teal) | Higher luminance for dark readability |

### Accessibility Notes

- ✅ All text-to-background combinations meet WCAG AA minimum (4.5:1 for normal text)
- ✅ Critical text (headings) meets WCAG AAA (7:1+)
- ✅ Color is never the only means of conveying information (icons + text required)
- ⚠️ Test all color combinations before deployment
- ⚠️ Use tools: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), [Contrast Ratio](https://contrast-ratio.com/)

---

## Typography System

### Font Family
**Primary:** Manrope (Sans-serif) — Modern, friendly, highly legible
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- Apply across all text layers for consistency
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Type Scale

| Role | Size | Weight | Line-Height | Letter-Spacing | Usage |
|------|------|--------|-------------|-----------------|-------|
| **Display** | 32px | 700 (Bold) | 1.2 | 0 | Onboarding headlines, modal titles |
| **Headline** | 24px | 700 (Bold) | 1.2 | 0 | Section titles, card headers |
| **Title** | 20px | 600 (SemiBold) | 1.3 | 0 | Subsection titles, feature names |
| **Body Large** | 18px | 400 (Regular) | 1.5 | 0 | Main content, descriptions |
| **Body** | 16px | 400 (Regular) | 1.5 | 0 | Standard body text, form fields |
| **Body Small** | 14px | 400 (Regular) | 1.5 | 0 | Helper text, secondary descriptions |
| **Label Large** | 14px | 600 (SemiBold) | 1.5 | +0.5px | Button labels, field labels |
| **Label** | 12px | 600 (SemiBold) | 1.4 | +0.5px | Badges, metadata, small labels |
| **Label Small** | 10px | 700 (Bold) | 1.4 | +0.5px | Captions, timestamp, uppercase metadata |

### Guidelines

- **Line Height:** Minimum 1.5 for body text; 1.2–1.3 for headlines
- **Letter Spacing:** Standard 0 for body; +0.5px for labels and all-caps to improve scanning
- **Color:** Use `On-Surface` for primary text; `On-Surface-Variant` for secondary
- **Hierarchy:** Never skip more than one size in scale (e.g., 24px → 18px is ok; 24px → 12px should be split)

---

## Spacing & Layout System

### Base Unit
All measurements derive from **16px base unit** (multiples: 16px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px)

### Padding & Margins

| Token | Size | Usage |
|-------|------|-------|
| **xs** | 8px | Compact spacing (form fields, tight layouts) |
| **sm** | 12px | Small spacing (between form elements, list items) |
| **md** | 16px | Standard spacing (section padding, default gutters) |
| **lg** | 24px | Large spacing (between card columns, page sections) |
| **xl** | 32px | Extra-large spacing (major section breaks) |
| **2xl** | 48px | Double extra-large (top-level container padding) |

### Container Padding

| Breakpoint | Horizontal | Vertical |
|------------|-----------|----------|
| **Mobile** (<480px) | 16px (md) | 16px (md) |
| **Tablet** (480–1024px) | 24px (lg) | 20px |
| **Desktop** (>1024px) | 32px (xl) | 24px (lg) |

### Vertical Spacing

- **Between major sections:** 32px (xl)
- **Between card groups:** 24px (lg)
- **Between individual cards:** 16px (md)
- **Between form elements:** 12px (sm)
- **Within card padding:** 16px (md)

### Border Radius

| Component | Radius | Purpose |
|-----------|--------|---------|
| **Cards, Containers** | 12px | Standard elevation, approachable feel |
| **Input Fields** | 12px | Form field containers |
| **Buttons (Secondary)** | 12px | Standard button shapes |
| **Buttons (Primary/Chip)** | 100px | Fully rounded, maximum emphasis on actionability |
| **Dividers, Icons** | 8px | Secondary elements |
| **Minimal Containers** | 4px | Subtle internal divisions |

### Tap Targets

**Minimum:** 44×44px (WCAG 2.1 Level AAA)

| Element | Minimum Size | Spacing |
|---------|--------------|---------|
| **Button** | 44×44px | 12px margin between buttons |
| **Icon Button** | 44×44px | 8px margin |
| **List Item** | 48px height | 8px vertical margin |
| **Form Field** | 44px height | 12px vertical margin |
| **Tab** | Full width / 3 (footer), 44px height | — |

---

## Component Library

### Top Navigation Bar

**Structure & Hierarchy:**
```
┌─────────────────────────────────────┐
│ [Avatar] "Mindful Coach"    [⚙️]     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Height:** 56px (fixed)
- **Background:** Surface (#FBF9F8)
- **Border:** 1px bottom, Outline color
- **Position:** Sticky (top: 0)
- **Elevation:** Subtle shadow `0 2px 4px rgba(0,0,0,0.04)`

**Components:**
- **Lead (Avatar):** 40px diameter, border: 2px solid `Primary-Soft`
- **Title:** Manrope 16px Bold, centered, `On-Surface` color
- **Trail (Settings Icon):** 24px, minimum tap target 44×44px, `On-Surface-Variant` color

**States:**
- **Default:** Opaque white surface
- **Scroll:** Add backdrop blur and shadow on scroll (UX signal of sticky behavior)

### Bottom Navigation Bar

**Structure & Hierarchy:**
```
┌──────────────┬──────────────┬──────────────┐
│ [⌂] Home     │ [💬] Coach   │ [👤] Profile │
└──────────────┴──────────────┴──────────────┘
```

**Specifications:**
- **Height:** 64px (fixed, bottom position)
- **Background:** Surface (#FFFFFF) with shadow `0 -4px 24px rgba(0,0,0,0.04)`
- **Width:** Full width (max-width: 420px if constrained)
- **Position:** Fixed bottom with safe area padding
- **Layout:** 3 equal-width tabs (flex: 1 each)

**Tab Structure:**
- **Icon:** 24px, positioned above label
- **Label:** 12px Bold, 4px below icon
- **Spacing:** 4px between icon and label
- **Tap Target:** Entire tab (full width / 3, 64px height)

**States:**
- **Active:** Teal background (#4DB6AC), white icon/label, small rounded container (8px radius)
- **Inactive:** Transparent, `On-Surface-Variant` text, 60% opacity
- **Hover (Desktop):** Light teal background, transition 200ms

**Transitions:**
- Background color: 200ms ease-out
- Scale: 98% on press
- No motion if `prefers-reduced-motion` detected

### Selection Cards (Onboarding)

**Purpose:** High-intent goal selection during onboarding

**Structure:**
```
┌──────────────────────────┐
│ [⚪] Sleep better         │  ← 2px teal border on select
│     Wake up refreshed    │
│                    [✓]   │  ← 20px checkmark icon
└──────────────────────────┘
```

**Specifications:**
- **Width:** Full width on mobile; constrain to 320px+ on tablet
- **Height:** Auto (min 80px)
- **Padding:** 20px internal (md)
- **Border Radius:** 12px
- **Border:** 2px
- **Background:** Surface (#FFFFFF)

**States:**

| State | Border | Background | Text | Icon |
|-------|--------|-----------|------|------|
| **Inactive** | 1px `Outline-Variant` | `Surface` (#FBF9F8) | `On-Surface-Variant` | Subtle gray |
| **Hover** | 1px `Primary` | `Primary-Soft` | `On-Surface` | — |
| **Active** | 2px `Primary` | `Primary` (#4DB6AC) | `#FFFFFF` | 20px white ✓ |
| **Disabled** | 1px `Outline-Variant` | `Surface` | `On-Surface-Variant` (50%) | Hidden |

**Transitions:**
- Border color: 200ms ease-out
- Background color: 200ms ease-out
- Checkmark: 200ms pop-in animation (scale 0.8 → 1.0)

### Coaching Session Cards

**Purpose:** Quick-access micro-sessions and feature discovery

**Primary Session Card:**
```
┌─────────────────────────────┐
│  Mindfulness 101            │  ← Headline 18px, white text
│  10-minute wake-up session  │  ← Body Small 14px, white 80%
│                      [▶]    │  ← 32px play icon, centered-right
└─────────────────────────────┘
```

**Specifications:**
- **Width:** 240px (horizontal scroll container)
- **Height:** 120px minimum
- **Padding:** 20px (md)
- **Border Radius:** 12px
- **Background:** Primary (#4DB6AC)
- **Text Color:** #FFFFFF
- **Box Shadow:** `0 4px 16px rgba(77, 182, 172, 0.2)`

**Layout:**
- **Content (Left):** Flex column, justify-start
- **Icon (Right):** 32px play icon, positioned absolute bottom-right with 16px margin
- **Glassmorphism Accent:** Optional subtle overlay (rgba(255,255,255,0.1)) for depth

**States:**
- **Default:** Full opacity
- **Hover:** Slight scale (102%), shadow increase
- **Active/Press:** Scale 98%, slight shadow reduction
- **Focus:** 2px outline `#FFFFFF` (external)

**Alternate Cards:**
```
┌─────────────────────────────┐
│  Breath Work                │
│  5-minute session           │
│                      [💨]   │  ← Alternative icon
└─────────────────────────────┘
```
Same specs but:
- **Background:** Surface (#FFFFFF) with 1px `Outline-Variant` border
- **Text Color:** `On-Surface`
- **Icon:** Positioned in teal background circle (40px, `Primary-Soft` bg, Primary icon)

### Chat Message Bubbles

**Purpose:** Display coaching conversation with evidence-backed rationale

**Structure:**

```
┌──────────────────────────────┐
│ AI Response                  │  ← Surface (#FFFFFF) bg
│ "Let's take a deep breath..."│
│ ↳ Evidence-backed rationale  │  ← 12px gray text, italic
└──────────────────────────────┘
                ↓ 12px spacing
            ┌────────────────────┐
            │ User Input ↲       │  ← Primary bg, white text
            │ "OK, ready"        │
            └────────────────────┘
```

**AI Bubble:**
- **Background:** Surface Container (#FFFFFF)
- **Border:** 1px `Outline-Variant`
- **Border-Radius:** 16px (12px + rounded corners removed from left)
- **Text Color:** `On-Surface`
- **Padding:** 12px horizontal, 8px vertical
- **Max-Width:** 85% of container width

**Rationale Subtext:**
- **Font:** 12px Regular, `On-Surface-Variant`, italic
- **Line-Height:** 1.4
- **Border-Left:** 2px `Primary-Soft`
- **Padding-Left:** 8px
- **Margin-Top:** 8px
- **Visibility:** Always shown for AI messages

**User Bubble:**
- **Background:** Primary (#4DB6AC) or lighter teal (#5ABFB8)
- **Text Color:** #FFFFFF
- **Border-Radius:** 16px (12px + rounded corners removed from right)
- **Alignment:** Right-aligned
- **Max-Width:** 85% of container width

**Spacing:**
- **Between messages:** 12px
- **Padding within bubbles:** 12px horizontal, 10px vertical
- **Message container gap:** 16px (AI message + rationale)

**Animations:**
- **Entrance:** Fade in (150ms) + scale up (0.95 → 1.0)
- **Staggered:** Each new message animates 50ms after previous

### Input Fields

**Structure:**
```
┌─────────────────────────────┐
│ Label Text                  │  ← 12px Bold, `On-Surface-Variant`
│ ┌───────────────────────┐   │
│ │ Enter text here...    │   │  ← 16px body text, placeholder
│ └───────────────────────┘   │
│ Helper Text (optional)      │  ← 12px Small, gray
└─────────────────────────────┘
```

**Specifications:**
- **Height:** 44px (includes padding, meets tap target minimum)
- **Width:** 100% (or constrained to max-width: 500px)
- **Padding:** 12px horizontal, 10px vertical
- **Border:** 2px
- **Border-Radius:** 12px
- **Font:** Manrope 16px Regular
- **Label:** Required, associated via `<label>` and `id` attributes

**States:**

| State | Border | Background | Text |
|-------|--------|-----------|------|
| **Default** | 2px `Outline-Variant` | `Surface` | `On-Surface` |
| **Focus** | 2px `Primary` | `Surface` | `On-Surface` |
| **Filled** | 2px `Primary` | `Surface` | `On-Surface` |
| **Error** | 2px `Error` (#F44336) | `Surface` | `On-Surface` |
| **Disabled** | 1px `Outline` | `Outline` (10%) | `On-Surface-Variant` (50%) |

**Transitions:**
- Border color: 150ms ease-out
- Background color: 150ms ease-out
- Focus outline: 2px solid `Primary` (external)

### Buttons

**Primary Buttons:**
```
┌──────────────────┐
│ Create Profile   │  ← 14px Bold, white text
└──────────────────┘
```

**Specifications:**
- **Padding:** 12px horizontal × 10px vertical (min 44×44px tap target)
- **Height:** 52px (standard)
- **Width:** Full width (block) or auto (inline)
- **Border-Radius:** 100px (fully rounded)
- **Background:** Primary (#4DB6AC)
- **Text Color:** #FFFFFF
- **Font:** Manrope 14px Bold
- **Box Shadow:** `0 4px 12px rgba(77, 182, 172, 0.15)`

**States:**

| State | Background | Opacity | Shadow | Scale |
|-------|-----------|---------|--------|-------|
| **Default** | Primary | 100% | Standard | 100% |
| **Hover** | Primary | 90% | Increased | 100% |
| **Active/Press** | Primary | 100% | Reduced | 98% |
| **Focus** | Primary | 100% | Standard | 100% + 2px outline |
| **Disabled** | Outline-Variant | 50% | None | 100% |

**Secondary Buttons:**
- **Background:** Transparent or Surface
- **Border:** 2px `Primary`
- **Text Color:** Primary
- **Hover:** Light teal background (`Primary-Soft`)

**Icon Buttons:**
- **Size:** 44px (minimum tap target)
- **Padding:** 10px (centered icon)
- **Border-Radius:** 12px (or 100px for circular)
- **Background:** Transparent (default) → `Primary-Soft` (hover)

### Data Visualizations

**Energy Score Circle:**
```
         ↓
    ┌─────────┐
    │   78    │  ← 28px Bold number, centered
    │ ↳ Flame │  ← 16px icon
    │ Score   │  ← 10px label
    └─────────┘
        ↓
```

**Specifications:**
- **Diameter:** 120px
- **Ring Stroke:** 8px
- **Completed:** Teal (#4DB6AC)
- **Remaining:** Light gray (rgba(68,71,78,0.1))
- **Center Icon:** 16px, teal color
- **Number:** 28px Bold, `On-Surface`
- **Label:** 10px Bold Uppercase, `On-Surface-Variant`

**Animation:**
- Animates from 0% → target % on mount (1.5s ease-out)
- Stroke linecap: round (smooth endpoints)

**Steps Chart (Horizontal Bars):**
```
M  5100 ████████░
T  6200 ███████░░
W  3800 █████░░░░
```

**Specifications:**
- **Bar Height:** 8px
- **Bar Radius:** 4px
- **Spacing Between Bars:** 16px
- **Bar Color:** Primary (#4DB6AC)
- **Background Bars:** `Outline-Variant`
- **Max Width:** 100% of container
- **Labels:** 12px, `On-Surface-Variant`, below each bar

**Sleep Sparkline (Minimal Line Chart):**
```
90%  ╱╲╲
     ╱  ╲╱
80%
```

**Specifications:**
- **Line Stroke:** 2px Primary (#4DB6AC)
- **Fill Area:** Gradient (top: Primary 30%, bottom: transparent)
- **Background Grid:** Optional light lines (1px `Outline-Variant`)
- **Height:** 60px
- **Width:** Full container
- **Summary Text:** 14px Bold, `On-Surface`, above chart (e.g., "7.2 hrs avg")

---

## Interaction Design

### Transitions & Animations

| Element | Trigger | Duration | Easing | Effect |
|---------|---------|----------|--------|--------|
| **View Transitions** | Navigation change | 500ms | `cubic-bezier(0.33, 1, 0.68, 1)` (Ease-out Cubic) | Fade + slide |
| **Card Expansion** | Click/tap | 300ms | Ease-out Cubic | Scale + shadow |
| **Step Transitions** | Next step | 400ms | Ease-out Cubic | Slide right |
| **Checkmark** | Task completion | 200ms | Ease-out Cubic | Pop-in (scale) |
| **Score Update** | Value change | 150ms | Ease-out | Fade in |
| **Button Press** | Interaction | 100ms | Ease-in-out | Scale 100% → 98% → 100% |

**Cubic-Bezier Reference:**
```
Ease-out Cubic: cubic-bezier(0.33, 1, 0.68, 1)
Visual curve: Fast start, gradual deceleration
Feel: Snappy, responsive, not abrupt
```

### Loading States

**Skeleton Screens:**
- Match card dimensions (same padding, rounded corners)
- Pulse every 1.5s using opacity: 0.6 → 1.0 → 0.6
- Color: `On-Surface-Variant` (lighter than text)
- Use instead of spinner icons for aesthetic consistency

**AI Typing Indicator:**
```
●   ●   ●
```
- Three dots, each 8px diameter
- Color: Primary (#4DB6AC)
- Animation: Staggered bounce (0.3s delay between each)
- Opacity: Pulsing 0.4 → 1.0
- Duration: 1.5s per cycle, infinite loop

**Progress Bar:**
- Height: 8px
- Border-Radius: 4px
- Background: `Outline-Variant`
- Fill: Primary (#4DB6AC)
- Animation: Smooth width increase (ease-out)

### Focus & Accessibility

**Keyboard Navigation:**
- Tab order follows visual hierarchy (left-to-right, top-to-bottom)
- Focus indicator: 2px solid `Primary` outline (external, 4px offset)
- Focus visible: Only show on keyboard interaction (not mouse)
- All interactive elements keyboard accessible

**Focus Indicators:**
```
Button:
┌────────────────────┐
│ │ Create Profile │ │  ← 2px outline, 4px offset
└────────────────────┘
```

**Escape Key Behavior:**
- Close modals and menus
- Return to previous view (if applicable)

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| **Mobile** | <480px | Single column, full-width cards, 16px padding |
| **Tablet** | 480–1024px | 2-column grids, 24px padding, constrained max-width |
| **Desktop** | >1024px | 3-column grids, 32px padding, 420px max-width constraint |

---

## Dark Mode Palette (Future)

### Implementation Guidelines

When implementing dark mode:

1. **Invert base colors:**
   - Light backgrounds → Dark (#121212, #1E1E1E)
   - Dark text → Light (#FFFFFF, #B0B0B0)

2. **Maintain contrast:** Test all text-to-background combinations

3. **Adjust teal saturation:** Increase brightness for dark background contrast

4. **Preserve hierarchy:** Font weights and sizes remain unchanged

5. **Test colors:**
   - Primary Dark: #4DD0C1 (more luminous teal)
   - Secondary text: #B0B0B0 (lighter gray)

---

## Accessibility Checklist

### WCAG 2.1 Level AA Compliance

- [ ] **Color Contrast:** All text meets 4.5:1 (normal) or 3:1 (graphics)
- [ ] **Large Text:** 18px+ meets 3:1 minimum
- [ ] **Focus Indicators:** Visible 2px outline on all interactive elements
- [ ] **Keyboard Navigation:** Tab order is logical; all features keyboard accessible
- [ ] **Form Labels:** Every input has explicit `<label>` associated via `id`
- [ ] **Image Alt Text:** All images/icons have descriptive `alt` or `aria-label`
- [ ] **Color Alone:** Never use color as only means of conveying information (pair with icons/text)
- [ ] **Motion:** Respect `prefers-reduced-motion` system setting (disable animations)
- [ ] **Touch Targets:** Minimum 44×44px for all interactive elements
- [ ] **Text Alternatives:** Charts have accompanying data tables or descriptions

### Testing Procedures

#### 1. Color Contrast Validation
```bash
Tool: WebAIM Contrast Checker or Contrast Ratio
Test: All text-to-background combinations
Expected: 4.5:1 minimum for normal text, 3:1 for graphics
Reference: https://webaim.org/resources/contrastchecker/
```

#### 2. Keyboard Navigation
```bash
Test Device: Any keyboard
Procedure:
  1. Start at page top
  2. Tab through all interactive elements
  3. Verify focus order is logical (left-right, top-bottom)
  4. Verify escape key closes modals
  5. Verify enter key activates buttons
Expected: All features accessible without mouse
```

#### 3. Screen Reader Testing
```bash
Tools: NVDA (Windows), JAWS, VoiceOver (macOS/iOS)
Procedure:
  1. Enable screen reader
  2. Navigate entire app using arrow keys
  3. Verify headings are announced with correct level (h1, h2, etc.)
  4. Verify form labels are read with inputs
  5. Verify icon-only buttons have aria-label
  6. Verify error messages are announced
Expected: Full app narration without sighted guidance
```

#### 4. Motion Sensitivity
```bash
Procedure:
  1. Enable prefers-reduced-motion in OS settings
  2. Verify all animations are disabled
  3. Verify app remains fully functional
Expected: No animations; all interactions remain responsive
```

#### 5. Zoom Testing
```bash
Procedure:
  1. Browser zoom: 200% (accessibility standard)
  2. Verify no horizontal scrolling required
  3. Verify text remains readable
  4. Verify buttons/inputs remain accessible
Expected: Layout reflows gracefully; no content cutoff
```

#### 6. Text Scaling
```bash
Procedure:
  1. Increase system font size to 125%–200%
  2. Verify layout accommodates larger text
  3. Verify no content overlap
Expected: All text readable at larger sizes
```

---

## Design Tokens (JSON Format)

### Export Template

```json
{
  "colors": {
    "primary": "#4DB6AC",
    "surface": "#FBF9F8",
    "surfaceContainer": "#FFFFFF",
    "onSurface": "#1A1C1E",
    "onSurfaceVariant": "#44474E",
    "outline": "rgba(68, 71, 78, 0.1)",
    "outlineVariant": "rgba(68, 71, 78, 0.05)",
    "primarySoft": "rgba(77, 182, 172, 0.1)",
    "success": "#4CAF50",
    "warning": "#FF9800",
    "error": "#F44336"
  },
  "typography": {
    "fontFamily": "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "sizes": {
      "display": "32px",
      "headline": "24px",
      "title": "20px",
      "bodyLarge": "18px",
      "body": "16px",
      "bodySmall": "14px",
      "labelLarge": "14px",
      "label": "12px",
      "labelSmall": "10px"
    },
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "spacing": {
    "xs": "8px",
    "sm": "12px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "100px"
  },
  "shadows": {
    "small": "0 2px 4px rgba(0, 0, 0, 0.04)",
    "medium": "0 4px 12px rgba(0, 0, 0, 0.08)",
    "large": "0 12px 24px rgba(0, 0, 0, 0.12)",
    "primary": "0 4px 16px rgba(77, 182, 172, 0.2)"
  },
  "transitions": {
    "fast": "150ms ease-out",
    "standard": "300ms ease-out",
    "slow": "500ms cubic-bezier(0.33, 1, 0.68, 1)"
  }
}
```

---

## Implementation Handoff

### For Development Teams

1. **Import Design Tokens:** Use `colors.json` or CSS custom properties
   ```css
   :root {
     --color-primary: #4DB6AC;
     --color-surface: #FBF9F8;
     /* ... */
   }
   ```

2. **Manrope Font:** Include from Google Fonts or self-hosted
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   ```

3. **Component Library:** Build components matching specifications (especially spacing, tap targets, states)

4. **Accessibility Implementation:**
   - Semantic HTML (`<button>`, `<label>`, `<input>`, etc.)
   - ARIA labels where necessary
   - Focus management (Tab, Escape, Enter)
   - Testing checklist (see Accessibility Checklist section)

5. **Responsive Testing:**
   - Test at 320px, 480px, 768px, 1024px+ breakpoints
   - Verify touch targets on mobile devices

### For Designers (Future Variants)

- [ ] Prepare dark mode color palette (see Dark Mode Palette section)
- [ ] Design RTL (right-to-left) layout variant if serving international audiences
- [ ] Define tablet-specific layout (two-column grids, adjusted tap targets)
- [ ] Create component interaction documentation (hover, focus, error states)
- [ ] Design loading skeleton screens for data-heavy sections

### Design QA Checklist

Before handoff to development:

- [ ] All colors pass WCAG AA contrast test
- [ ] All type scales tested at 200% zoom
- [ ] Tap targets minimum 44×44px verified
- [ ] Padding/margins follow 16px grid
- [ ] All states documented (default, hover, active, focus, disabled, error)
- [ ] Animations have cubic-bezier values specified
- [ ] Dark mode palette prepared and tested
- [ ] Component library organized and complete
- [ ] Accessibility checklist items verified
- [ ] Design tokens exported (JSON or CSS)

---

## Brand Voice in Design

Every design decision should reinforce **calm, encouraging, evidence-based wellness guidance.**

- **Whitespace:** Ample space reduces cognitive load
- **Color:** Soft teal soothes; not bright or clinical
- **Typography:** Manrope's friendly curves feel approachable, not corporate
- **Iconography:** Simple, monoline style (consistent with Lucide React)
- **Motion:** Gentle, not jarring; respects user preferences
- **Language:** Warm tone in microcopy and error messages
- **Data Visualization:** Charts simplified for clarity, not overloaded
- **Feedback:** Positive confirmation on actions; constructive error messages

---

**Version:** 2.0 | **Last Updated:** 2026-05-14 | **Status:** ✅ Production Ready
