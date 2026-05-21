# Changelog

All notable changes to the Mindful Coach project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.2.2] - 2026-05-22

### 🛠 Fixed - Gemini SDK & Build Issues

#### Gemini AI Service
- **Model Update**: Switched to `gemini-1.5-flash` for better performance and compatibility.
- **API Fix**: Ensured proper property access for Gemini SDK response object.

#### TypeScript Configuration
- **Environment Types**: Fixed `import.meta.env` typing by correctly placing `src/vite-env.d.ts`.

### 🔄 Changed - Architecture Refactor

#### Component Modularization
- **Refactored `App.tsx`**: Extracted UI sections into granular components in `src/components/` (`Onboarding`, `HomeView`, `CoachView`, `ProfileView`, `Dashboard`).
- **Utility Extraction**: Moved `cn` helper to `src/utils/cn.ts`.

### ✨ Added - Accessibility Features

- **Form Labels**: Added proper `id` and `htmlFor` associations in onboarding.
- **ARIA Labels**: Improved screen reader support for chat inputs.
- **Motion Control**: Implemented `prefers-reduced-motion` support across all animated components using `useReducedMotion`.

### ⚠️ Breaking Changes

- **Project Structure**: Components are now located in `src/components/` instead of being co-located in `App.tsx`.
- **API Key Access**: Ensure `src/vite-env.d.ts` is present for TypeScript to recognize `import.meta.env`.

### 🧪 Enhanced Testing Recommendations

1. **TypeScript Compilation**: Verify `npm run lint` passes without errors
2. **Production Build**: Test `npm run build` completes successfully with terser minification
3. **Type Checking**: Verify strict mode doesn't break any existing custom code or extensions
4. **Event Handlers**: Test all form inputs (onboarding name, coach chat input) for proper event handling
5. **Environment Variables**: Verify `import.meta.env.VITE_GEMINI_API_KEY` is accessible in services
6. **Animations**: Verify all transition animations work smoothly with new easing configuration
7. **Artifact Environment**: Test in artifact environments to ensure localStorage fallback works

### 📋 Dependencies Updated

**Added**:
- `terser ^5.36.0` - JavaScript minification for production

**No changes to**: React, TypeScript, Vite, Tailwind, or other core dependencies

---

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
- Dynamic **Avatar System** using `dicebear` API triggered by user identity.

### Fixed
- Improved **Animation Performance** by switching to `motion/react` with optimized easing.
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

## Migration Guides

### From 0.2.1 → 0.2.2

**Step 1: Update TypeScript Configuration**
```bash
# tsconfig.json should now have these settings:
{
  "compilerOptions": {
    "jsxImportSource": "react",  # NEW
    "strict": true,               # NEW
    "esModuleInterop": true       # NEW
  },
  "include": ["src"],             # NEW
  "exclude": ["node_modules", "dist"]  # NEW
}
```

**Step 2: Add Vite Environment Type Definitions**
```bash
# Create src/vite-env.d.ts with:
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**Step 3: Update Event Handler Types** (if you have custom code)
```typescript
// Change event handlers from:
onChange={(e) => setState(e.target.value)}

// To:
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { /* ... */ }}
```

**Step 4: Update Animation Easing** (if using custom animations)
```typescript
// Change from:
transition={{ ease: [0.33, 1, 0.68, 1] }}

// To:
transition={{ ease: "easeOut" }}
```

**Step 5: Install Updated Dependencies**
```bash
npm install
# This adds terser and updates other packages as needed
```

**Step 6: Verify Changes**
```bash
npm run lint   # Should pass with 0 errors
npm run build  # Should succeed with terser minification
npm run dev    # Should start without type errors
```

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

## Dependency Compatibility Matrix

| Package | 0.2.0 | 0.2.1 | 0.2.2 | Notes |
|---------|-------|-------|-------|-------|
| react | 19.0.1 | 19.0.1 | 19.0.1 | React 19 with new JSX transform |
| typescript | 5.8.2 | 5.8.2 | 5.8.2 | Strict mode compatible |
| vite | 6.2.3 | 6.2.3 | 6.2.3 | All features compatible |
| tailwindcss | 4.1.14 | 4.1.14 | 4.1.14 | CSS variable support |
| motion | 12.23.24 | 12.23.24 | 12.23.24 | Uses string easing |
| terser | - | - | 5.36.0 | **NEW**: Required for build |
| @types/react | - | 19.0.1 | 19.0.1 | **ADDED**: 0.2.1 |
| @types/react-dom | - | 19.0.1 | 19.0.1 | **ADDED**: 0.2.1 |

---

## Known Issues & Workarounds

| Issue | Status | Workaround | Added |
|-------|--------|-----------|-------|
| Gemini API rate limits | Expected | Implement exponential backoff in production | 0.2.1 |
| localStorage unavailable in artifact env | Fixed | Auto-fallback to in-memory storage | 0.2.1 |
| Animations stutter on low-end devices | Open | Reduce animation complexity or add `prefers-reduced-motion` support | 0.2.0 |
| Chat history lost on new session (in-memory mode) | Expected | Data persists if localStorage available | 0.2.1 |
| Large JS bundle (794 KB) | Optimization | Route-based code splitting can reduce size | 0.2.2 |
| TypeScript strict mode breaking changes | Fixed | Update event handler types and tsconfig | 0.2.2 |

---

## Release Schedule

- **0.2.2** (May 2026): TypeScript strict mode, event handler typing, animation fixes ✅
- **0.2.3** (Q2 2026): Dark mode, `prefers-reduced-motion` support, offline capabilities
- **0.3.0** (Q3 2026): Multi-language support, wearable integration, data export
- **1.0.0** (2027): Stable release with full accessibility audit and production monitoring

---

## Contributors

Built with care for wellness. Special thanks to:
- Anthropic Claude team for foundational AI guidance
- Community feedback and bug reports
- Healthcare professionals for wellness domain expertise

To contribute, please submit pull requests with:
- Clear commit messages
- Tests for new features
- Updated documentation
- Attribution in this file

---

## Questions or Issues?

Please file issues on the GitHub repository with:
- Detailed reproduction steps
- Expected vs actual behavior
- Environment details (browser, OS, Node version)
- Relevant error messages or screenshots

For security concerns, please email the maintainers privately instead of filing public issues.

---

**Last Updated**: May 21, 2026
**Current Version**: 0.2.2 (in development)
**Status**: Production-ready with strict TypeScript checking
