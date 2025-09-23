# ReadCeipt

OCR-powered mobile app to capture, parse, and organise receipt data. Built with **Expo (React Native + TypeScript)**. Phase 1 is fully on-device (camera/import → parse → save locally); Phase 2 adds a tiny backend to call cloud OCR/LLM safely (no keys in the app).

## Goals
- Take a photo or import a receipt image
- Extract text (on-device first; optional cloud for accuracy)
- Parse into a standard schema (merchant, date, totals, line items)
- Store receipts locally (SQLite) with history & search
- Export selected receipts as CSV/JSON
- Later: cloud “enhanced” mode via a tiny backend proxy

---

## Tech Stack
- **Mobile:** Expo (React Native), TypeScript
- **UI:** NativeWind (Tailwind for RN) + React Native Paper
- **Storage:** expo-file-system + expo-sqlite
- **OCR:** Azure AI Vision
- **LLM (optional):** server-side extraction/validation to strict JSON
- **Server (later):** Cloudflare Worker or Vercel Functions (stores API keys)
