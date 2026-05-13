# Changelog

All notable changes to the Mindful Coach project will be documented in this file.

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
