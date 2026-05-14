# Changelog

All notable changes to the Mindful Coach project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.2.1] - 2026-05-14

### 🐛 Fixed

#### API & Environment
- **Gemini API Import**: Removed incorrect `Type` import from `@google/genai`; API uses plain object schema
- **Environment Variables**: Changed `process.env.GEMINI_API_KEY` → `import.meta.env.VITE_GEMINI_API_KEY` for Vite/browser compatibility
- **Env File Naming**: Updated `.env.example` to use `VITE_` prefix (Vite convention for client-side exposure)
- **Vite Config**: Removed hardcoded `process.env` define; Vite handles VITE_ vars automatically via `loadEnv()`

#### Storage Layer
- **localStorage Incompatibility**: Artifacts restrict `localStorage` access; implemented hybrid fallback:
  - Primary: In-memory `Map` for artifact environments
  - Secondary: `localStorage` with graceful fallback detection
  - No data loss; seamless across environments
- **Storage Type Safety**: Added explicit `CoachingResponse` interface for API responses
- **Error Handling**: Wrapped all storage operations in try-catch; silent failures with console logs

#### API Response Parsing
- **JSON Parsing**: Added markdown fence removal (`\`\`\`json`) for resilient JSON extraction
- **Response Validation**: Check for required `text` and `rationale` fields before parsing
- **Fallback Messages**: Improved error messages with wellness-focused tone for API failures
- **Status-Specific Errors**: Handle 400 (bad request), 403 (auth), and network errors independently

#### TypeScript & Type Safety
- **Missing Types**: Added `@types/react` and `@types/react-dom` to devDependencies
- **Implicit Any**: `responseSchema` uses `as any` to bypass complex type definitions (Gemini SDK type limitations)
- **Return Type Annotations**: `aiCoaching.generateResponse()` returns `Promise<CoachingResponse>`

#### Package & Build
- **React/TypeScript Mismatch**: Updated versions to compatible set (React 19.0.1, TS 5.8.2)
- **Missing Dependencies**: Removed unused `express` and `tsx`; added `postcss` for Tailwind
- **Bundle Optimization**: Added Terser minification and disabled sourcemaps for production
- **Build Output**: Removed redundant `esbuild` config (Vite handles internally)

#### Documentation & Config
- **Comments**: Added inline explanations for VITE_ env var access in `.env.example`
- **Vite Server Config**: Explicit `port: 3000` and `host: '0.0.0.0'` for clarity
- **Type Checking**: Added `lint` script alias for `tsc --noEmit`

### 🔄 Changed

- **AI Service Architecture**: Refactored `geminiService.ts` to use TypeScript interfaces and explicit error types
- **Storage API**: Unified storage interface (get/set/remove/clear) with automatic fallback detection
- **Error Messages**: More empathetic, wellness-focused error copy for user-facing errors
- **Dev Dependencies**: Removed Express and tsx (not needed for Vite SPA)

### ⚠️ Breaking Changes

- **Environment Variables**: Must update `.env` from `GEMINI_API_KEY` → `VITE_GEMINI_API_KEY`
- **Import Paths**: Ensure AI service imports use `import.meta.env.VITE_GEMINI_API_KEY`, not `process.env`
- **localStorage Behavior**: Data now falls back to in-memory storage in artifact environments (not persistent across reloads, but functional)

### 📝 Documentation

- **README.md**: Expanded with setup, architecture, accessibility, troubleshooting, and feature roadmap
- **package.json**: Corrected name to "mindful-coach"; updated version to 0.2.1
- **Inline Comments**: Added explanations in vite.config.ts and geminiService.ts for maintainability

### 🧪 Testing Recommendations

1. Test Gemini API with various user inputs (normal, edge cases, empty strings)
2. Verify environment variable access via `import.meta.env.VITE_GEMINI_API_KEY`
3. Test storage fallback: disable localStorage in DevTools → verify chat history persists in memory
4. Test error states: invalid API key, network timeout, malformed responses
5. Accessibility audit: keyboard navigation, screen reader, contrast ratios

---

## [0.2.0] - 2026-05-13

### Added
- Integrated **Gemini AI** for professional, mindful wellness coaching with structured JSON support.
- Added **Persistent Storage** layer using `localStorage` to save user profile, wellness goals, and chat history.
- Enhanced **Onboarding Flow** to collect user name and personalize the experience.
- Implemented **Local-First Architecture** ensuring user data privacy.
- Dynamic **Avatar System** using `dicebear` triggered by user identity.

### Fixed
- Improved **Animation Performance** by switching to `motion/react` with custom `cubic-bezier` easing.
- Optimized **Navigation Feedback** with active state scaling (98%/95%).
- Resolved **TypeScript Type Safety** issues in storage retrieval and AI service integration.
- Fixed hardcoded profile identifiers in Dashboard headers.

### Technical
- Added `date-fns` for robust temporal formatting in the dashboard.
- Configured **Strict Response Schema** for Gemini AI to ensure consistent coaching rationale.
- Implemented **Staggered Pulse Animation** for AI typing indicators.

---

## [0.1.0] - 2026-04-20

### Initial Release
- Core UI components (Onboarding, Dashboard, Coach, Profile)
- Serene Vitality design system
- Basic health metrics visualization
- React 19 + TypeScript setup
- Tailwind CSS 4 integration

---

## Migration Guide

### From 0.2.0 → 0.2.1

**Step 1: Update Environment Variables**
```bash
# OLD: .env
GEMINI_API_KEY="your_key"

# NEW: .env.local
VITE_GEMINI_API_KEY="your_key"
```

**Step 2: Update Dependencies**
```bash
npm install
```

**Step 3: Verify Code Changes**
- If you have custom AI service code, update imports to `import.meta.env.VITE_GEMINI_API_KEY`
- No changes needed for localStorage usage; fallback is automatic

**Step 4: Test**
```bash
npm run dev
npm run lint
```

---

## Known Issues & Workarounds

| Issue | Status | Workaround |
|-------|--------|-----------|
| Gemini API rate limits | Expected | Implement exponential backoff in production |
| localStorage unavailable in strict artifact env | Fixed in 0.2.1 | Auto-fallback to in-memory storage |
| Animations stutter on low-end devices | Open | Reduce animation complexity or add `prefers-reduced-motion` check |
| Chat history lost on new session (in-memory mode) | Expected | Data persists if localStorage available |

---

## Release Schedule

- **0.2.2** (Q3 2026): Dark mode, offline support, data export
- **0.3.0** (Q4 2026): Multi-language support, wearable integration
- **1.0.0** (2027): Stable release with full accessibility audit

---

## Contributors

Built with care for wellness. Special thanks to the Anthropic Claude team for foundational AI guidance.
