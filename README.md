# Mindful Coach

A calm, minimalist health coaching application designed for mindful wellness, goal tracking, and AI-powered health insights. Built with React 19, TypeScript, and Gemini AI.

## ✨ Features

- **Personalized Onboarding**: Select primary wellness goals (Sleep, Stress, Energy, Weight) and customize your experience with your name
- **Daily Energy Score**: Visual circular progress indicator tracking your wellness state throughout the day
- **AI-Powered Coaching**: Real-time conversation with Gemini AI providing evidence-backed wellness guidance and psychological rationale
- **Interactive Micro-Sessions**: Quick-access guided sessions (Mindfulness 101, Breath Work, etc.)
- **Health Metrics Dashboard**: Track and visualize:
  - Daily step counts with 7-day trend chart
  - Sleep quality and duration with sleep cycle visualization
  - Energy levels and wellness insights
- **Local-First Architecture**: All user data (profile, goals, chat history) stored locally for privacy
- **Responsive Design**: Mobile-first interface using the Serene Vitality design system
- **Accessibility**: WCAG 2.1 AA compliant with focus management, keyboard navigation, and semantic HTML

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript 5.8
- **Styling**: Tailwind CSS 4 with custom theme tokens
- **Animations**: Motion (framer-motion fork) with cubic-bezier easing
- **Icons**: Lucide React (546+ icons)
- **Data Visualization**: Recharts (bar charts, area charts)
- **AI Integration**: Google Gemini 3 Flash with structured JSON responses
- **Bundler**: Vite 6.2 with optimizations for artifact environments
- **Storage**: Hybrid localStorage + in-memory fallback for artifact compatibility

## 📐 Design System

The application follows the **Serene Vitality** design system (see `Design.md`):

| Aspect | Details |
|--------|---------|
| **Tone** | Calm, encouraging, professional, low-friction |
| **Primary Color** | Soft Teal (#4DB6AC) for CTAs and active states |
| **Background** | Off-white (#FBF9F8) for reduced eye strain |
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
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your Gemini API key to .env.local
VITE_GEMINI_API_KEY="your_api_key_here"

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build    # Creates optimized dist/ folder
npm run preview  # Test production build locally
```

## 🏗 Architecture

### Data Flow

1. **Onboarding**: User sets wellness goal + name → stored in local storage
2. **Dashboard**: Displays health metrics, energy score, and coaching sessions
3. **Coach**: User message → Gemini AI (with context) → structured JSON response → displayed with rationale
4. **Profile**: User stats, achievements, preferences, and data management

### State Management

- **Local Storage**: User profile, wellness goals, chat history (hybrid fallback for artifact environments)
- **React State**: View navigation, chat messages, onboarding progress, typing indicators
- **In-Memory Cache**: AI responses and UI state during session

### API Integration

**Gemini AI Service** (`src/services/geminiService.ts`):
- Model: `gemini-3-flash-preview` (fast, cost-effective)
- Request: User message + wellness context (name, goal)
- Response: JSON with `text` (advice) + `rationale` (science-backed explanation)
- Error Handling: Graceful fallbacks for API failures, auth issues, and malformed responses

### Key Components

| Component | Purpose |
|-----------|---------|
| `Onboarding` | 2-step goal selection + profile creation with progress bar |
| `Dashboard` | Main view container with bottom tab navigation |
| `HomeView` | Energy score, metrics, micro-session cards, AI insights |
| `CoachView` | Scrollable chat interface with session shortcuts and input |
| `ProfileView` | User avatar (dicebear), stats, preferences, data management |

## 🔐 Privacy & Security

- **Local-First**: No personal health data sent to servers except AI coaching requests
- **Minimal API Surface**: Only user message + wellness context sent to Gemini
- **No Tracking**: No analytics, cookies, or telemetry
- **Browser Storage**: Data persists locally; clearing browser cache removes all user data
- **Environment Variables**: API key never exposed in source code

## ♿ Accessibility

- ✅ Keyboard navigation (Tab order follows visual flow)
- ✅ Screen reader support (semantic HTML, ARIA labels)
- ✅ Color contrast: 4.8:1 (On-Surface-Variant on Off-white)
- ✅ Focus indicators: 2px teal outline
- ✅ Touch targets: Minimum 44×44px
- ✅ Motion: `prefers-reduced-motion` respected (animations disabled for users)
- ✅ Form labels: Explicit labels associated via `<label>` and `id`

## 📱 Responsive Design

- **Mobile First**: Optimized for 320px+ screens
- **Tablet**: Cards scale to 320px+ width; spacing increases
- **Desktop**: Constrained to 420px max-width for focused experience
- **Bottom Navigation**: Sticky 64px footer with icon + label tabs

## 🔄 State Persistence

Chat history and user profile auto-save after every interaction. Data survives page reloads but is cleared on browser cache clear.

```typescript
// Automatic persistence pattern
useEffect(() => {
  storage.set(STORAGE_KEYS.CHAT_MESSAGES, messages);
}, [messages]);
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not defined" | Check `.env.local` contains `VITE_GEMINI_API_KEY` |
| Chat not responding | Verify Gemini API quota/billing in Google Cloud Console |
| Animations stuttering | Enable GPU acceleration; check for heavy renders |
| Data not persisting | Check browser localStorage is enabled (or use in-memory mode) |

## 📚 Documentation

- `Design.md` — Complete design system specification, colors, typography, components
- `CHANGELOG.md` — Version history, features, fixes, and technical improvements
- `package.json` — Dependency versions and build scripts

## 🎯 Future Enhancements

- **Dark Mode**: Inverted palette for low-light environments
- **Offline Mode**: Service workers for offline coach access
- **Export Data**: CSV/PDF export of health metrics and coaching history
- **Multi-Language**: Hindi, Gujarati, and Spanish support
- **Wearable Integration**: Sync with fitness trackers (Apple Health, Google Fit)
- **Advanced Analytics**: Trend analysis, correlation insights, habit tracking

## 📄 License

This project is provided as-is for educational and wellness purposes.

## 🤝 Contributing

Feedback and contributions welcome. Please report issues with:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS information
- Console errors (if any)

---

Built with ❤️ using React 19, TypeScript, and Gemini AI. Designed for calm, evidence-based wellness guidance.
