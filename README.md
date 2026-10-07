# Dataset Doctor — Frontend

This repository presents the frontend design of Dataset Doctor. The project's frontend will follow this visual style, layout and report presentation.

Responsive landing page with content in 30 languages, including Arabic, Hebrew and Persian RTL layouts, light/dark themes and sample dataset diagnostics. Report values are illustrative; dataset analysis and backend integration are planned.

Translations live in `messages/<locale>.json`; supported languages, reading directions and font families are defined in `lib/i18n/locales.ts`.

Built with Next.js 16, React, TypeScript and Tailwind CSS.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/en. Production: `npm run build` then `npm run start`.

[Source](https://github.com/ahmetharunerturk/dataset-doctor) · [Issues](https://github.com/ahmetharunerturk/dataset-doctor/issues) · [MIT License](LICENSE)
