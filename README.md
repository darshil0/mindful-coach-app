# Mindful Coach

A calm, minimalist health coaching application designed for mindful wellness, goal tracking, and AI-powered health insights. Built with React 19, TypeScript, and Gemini AI.

## ✨ Features

- **Personalized Onboarding**: Select primary wellness goals (Sleep, Stress, Energy, Weight) and customize your experience with your name
- **Daily Energy Score**: Visual circular progress indicator tracking your wellness state throughout the day
- **AI-Powered Coaching**: Real-time conversation with Gemini AI (gemini-3-flash-preview) providing evidence-backed wellness guidance and psychological rationale
- **Interactive Micro-Sessions**: Quick-access guided sessions including:
  - Mindfulness 101: Foundational meditation techniques
  - Breath Work: Guided breathing exercises for stress relief
  - Energy Boost: 5-minute energizing routines
  - Sleep Focus: Evening wind-down practices
- **Health Metrics Dashboard**: Track and visualize:
  - Daily step counts with 7-day trend chart
  - Sleep quality and duration with sleep cycle visualization
  - Energy levels and wellness insights
- **Local-First Architecture**: All user data (profile, goals, chat history) stored locally for privacy
- **Responsive Design**: Mobile-first interface (320px+) using the Serene Vitality design system
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation, semantic HTML, and screen reader support

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript 5.8 (strict mode enabled)
- **Styling**: Tailwind CSS 4 with custom theme tokens (CSS variables)
- **Animations**: Motion library with optimized easing functions
- **Icons**: Lucide React (546+ icons)
- **Data Visualization**: Recharts (bar charts, area charts)
- **AI Integration**: Google Gemini 3 Flash (gemini-3-flash-preview) with structured JSON responses and schema validation
- **Bundler**: Vite 6.2 with optimizations for artifact environments
- **Minification**: Terser 5.36+ for production code optimization
- **Storage**: Hybrid localStorage + in-memory fallback for artifact compatibility
- **Build & Development**: Full TypeScript support with strict type checking

## 📐 Design System

The application follows the **Serene Vitality** design system (see `Design.md`):

| Aspect | Details |
|--------|---------|
| **Tone** | Calm, encouraging, professional, low-friction |
| **Primary Color** | Soft Teal (#4DB6AC via CSS var `--color-primary`) |
| **Background** | Off-white (#FBF9F8 via CSS var `--color-background`) |
| **Typography** | Manrope (sans-serif) with 1.5 line-height for readability |
| **Spacing** | 16px base unit grid for consistent rhythm |
| **Corner Radius** | 12px cards, 100px (fully rounded) buttons |
| **Accessibility** | WCAG AA minimum (4.5:1 contrast), 44×44px touch targets |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Gemini API key (get from [Google AI Studio](https://aistudio.google.com))

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template (choose one based on your project)
cp .env.example .env.local
# OR
cp env.example .env.local

# 3. Add your Gemini API key to .env.local
VITE_GEMINI_API_KEY="your_api_key_here"

# 4. Start development server
npm run dev
```

The app will be available at `http://localhost:3000` (port configured in vite.config.ts).

### Build for Production

```bash
npm run build    # Creates optimized dist/ folder with terser minification
npm run preview  # Test production build locally at http://localhost:3000
```

## 🏗 Architecture

### Data Flow

1. **Onboarding**: User sets wellness goal + name → stored in local storage/memory
2. **Dashboard**: Displays health metrics, energy score, and micro-sessions
3. **Coach**: User message → Gemini AI (with structured schema) → JSON response with `text` + `rationale` → displayed with scientific reasoning
4. **Profile**: User stats, achievements, preferences, and data management

### State Management

- **Local Storage**: User profile, wellness goals, chat history (with graceful fallback to in-memory storage in artifact environments)
- **React State**: View navigation, chat messages, onboarding progress, typing indicators
- **In-Memory Cache**: AI responses and UI state during session
- **Note**: Data persists across page reloads if localStorage is available; in artifact environments, data survives the session but not browser refresh

### API Integration

**Gemini AI Service** (`src/services/geminiService.ts`):
- Model: `gemini-3-flash-preview` (fast, cost-effective inference)
- Request Format: User message + wellness context (name, goal) with structured schema
- Response Format: JSON with `text` (coaching advice) + `rationale` (science-backed explanation)
- Schema Validation: Uses `responseSchema` and `responseMimeType: "application/json"` for structured output
- Error Handling: Graceful fallbacks for API failures, auth issues (403), bad requests (400), and malformed responses

### Key Components

| Component | Purpose |
|-----------|---------|
| `Onboarding` | 2-step flow: goal selection + profile creation with animated progress bar and accessibility |
| `Dashboard` | Main view container with sticky top nav and sticky bottom tab navigation (64px height) |
| `HomeView` | Energy score circle, health metrics charts, micro-session cards, AI coaching insights |
| `CoachView` | Scrollable chat interface with session shortcuts, typing indicators, and message input |
| `ProfileView` | User avatar (dicebear API), stats cards (streak, tasks, points), preferences, data management |

## 🔐 Privacy & Security

- **Local-First**: No personal health data sent to servers except AI coaching requests
- **Minimal API Surface**: Only user message + wellness context sent to Gemini (no health history)
- **No Tracking**: No analytics, cookies, or telemetry
- **Browser Storage**: Data persists locally in localStorage or in-memory; clearing browser cache removes all user data
- **Environment Variables**: API key stored in `.env.local` (never in source code or .env.example)
- **TypeScript Strict Mode**: All code uses strict type checking to prevent security-related type errors

## ♿ Accessibility

- ✅ Keyboard navigation (Tab order follows visual flow)
- ✅ Screen reader support (semantic HTML, ARIA labels on buttons)
- ✅ Color contrast: 4.8:1 (On-Surface-Variant on Off-white background)
- ✅ Focus indicators: 2px teal outline on interactive elements
- ✅ Touch targets: Minimum 44×44px (buttons, tabs, form inputs)
- ✅ Form labels: Explicit `<label>` elements associated via `id` attribute
- ✅ Semantic HTML: Proper use of `<main>`, `<nav>`, `<header>`, `<footer>` elements
- ✅ Motion: `prefers-reduced-motion` support implemented using `useReducedMotion` hook

## 📱 Responsive Design

- **Mobile First**: Optimized for 320px+ screens (tested on common phone sizes)
- **Tablet**: Cards and spacing scale responsively; width adjusts with screen size
- **Desktop**: Constrained to 448px max-width (Tailwind's `max-w-md`) for focused, calm reading experience
- **Bottom Navigation**: Sticky 64px footer with icon + label tabs (Home, Coach, Profile)
- **Top Navigation**: Sticky 64px header with profile avatar, title, and settings button
- **Viewport**: Entire app fits within max-width container centered on larger screens

## 🔄 State Persistence

Chat history and user profile auto-save after every interaction.

```typescript
// Automatic persistence pattern
useEffect(() => {
  storage.set(STORAGE_KEYS.CHAT_MESSAGES, messages);
}, [messages]);
```

**Persistence behavior:**
- **With localStorage available**: Data survives page reloads and browser restarts
- **In artifact environments**: Data uses in-memory fallback; persists during session but not across refreshes
- **Data clearing**: User can clear all data via Profile → Clear All Data button; also cleared when browser cache is cleared

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not defined" | Ensure `.env.local` file exists in project root with `VITE_GEMINI_API_KEY="your_key"` |
| Chat not responding | Verify Gemini API quota and billing status in Google Cloud Console; check API is enabled for your project |
| Type errors on build | Ensure TypeScript 5.8.2+ is installed; run `npm install` to get latest types; check `tsconfig.json` has `jsxImportSource: "react"` |
| Animations stuttering | Enable GPU acceleration in browser; check Performance tab in DevTools for heavy renders; reduce animation complexity if needed |
| Data not persisting | Check browser localStorage is enabled in settings; some browsers disable it in private mode; fallback to in-memory storage is automatic |
| Build fails with "terser not found" | Run `npm install` again; ensure `terser` is in devDependencies in package.json |

## 📚 Documentation

- `Design.md` — Complete design system specification, color tokens, typography scale, component guidelines
- `CHANGELOG.md` — Version history, features, fixes, breaking changes, and migration guides
- `package.json` — Dependency versions, build scripts, and project metadata
- `tsconfig.json` — TypeScript configuration with strict mode and React 19 JSX settings
- `vite.config.ts` — Vite bundler configuration with React plugin and optimizations

## 🎯 Future Enhancements

- **Dark Mode**: Inverted palette and CSS variable theme switching for low-light environments
- **Offline Mode**: Service workers for offline coach access and chat history sync
- **Export Data**: CSV/PDF export of health metrics, coaching history, and insights
- **Multi-Language**: Hindi, Gujarati, and Spanish localization support
- **Wearable Integration**: Sync with fitness trackers (Apple Health, Google Fit, Wear OS)
- **Advanced Analytics**: Trend analysis, correlation insights, habit tracking with graphs
- **Reduced Motion Support**: Respect `prefers-reduced-motion` media query for users with motion sensitivity

## 🧪 Testing

Recommended test coverage:
- **Unit Tests**: Storage layer, Gemini API service, utility functions
- **Integration Tests**: Onboarding flow, chat interactions, navigation
- **E2E Tests**: Full user journeys (onboard → set goal → chat → profile)
- **Accessibility Audit**: WAVE, Axe, or NVDA screen reader testing
- **Performance**: Lighthouse audits for mobile and desktop

## 📄 License

This project is provided as-is for educational and wellness purposes.

## 🤝 Contributing

Feedback and contributions welcome. Please report issues with:

- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS information and versions
- Console errors (if any)
- Screenshots/screen recordings for UI issues

---

Built with ❤️ by Darshil. Designed for calm, evidence-based wellness guidance.

**Last Updated**: May 21, 2026  
**Version**: 0.2.2 (in development)  
**Status**: Production-ready with TypeScript strict mode
