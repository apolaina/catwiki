# 🐾 CatWiki

> *"Fall in love with a cat, not a breed."*

CatWiki is a mobile application built with **Expo** and **React Native**, combining a breed encyclopedia (powered by [The Cat API](https://thecatapi.com/)) with a **personal encounter journal** — to log every cat you've met at a shelter, on the street, or at a friend's place.

The app promotes an ethical approach to adoption: you don't adopt a breed, you adopt **an animal**.

---

## ✨ Features

### 📖 Encyclopedia (The Cat API)
- Full breed list with photos, descriptions, and origins
- Detailed breed page: temperament, energy level, life expectancy, etc.
- Search and filters (origin, adaptability level, etc.)

### 📓 Encounter Journal (local CRUD)
- **Create** an encounter: date, location, associated breed (or "unknown"), free notes, photo
- **Read** your personal encounter log
- **Update** an existing entry
- **Delete** an encounter
- Local storage with **Expo SQLite**

### 💡 UX & Technical
- File-based navigation with **Expo Router v4**
- Data fetching with React 19's **`use()`** hook
- Smooth animations with **Reanimated 3**
- Optimized images with **Expo Image**
- iOS & Android support

---

## 🛠️ Tech Stack

| Technology              | Version | Role                      |
|-------------------------|---------|---------------------------|
| Expo SDK                | 52+     | Main framework            |
| React Native            | 0.76+   | Mobile UI                 |
| React                   | 19      | UI logic, `use()` hook    |
| Expo Router             | v4      | File-based navigation     |
| Expo SQLite             | latest  | Local persistence (CRUD)  |
| Expo Image              | latest  | Optimized image rendering |
| React Native Reanimated | 3       | Animations                |
| TypeScript              | 5+      | Static typing             |
| The Cat API             | v1      | Breed data                |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- A free account on [thecatapi.com](https://thecatapi.com/) to get an API key

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/catwiki.git
cd catwiki

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# → Fill in your Cat API key in .env

# Start the app
npx expo start
```

### Environment Variables

```env
EXPO_PUBLIC_CAT_API_KEY=your_api_key_here
EXPO_PUBLIC_CAT_API_URL=https://api.thecatapi.com/v1
```

---

## 📁 Project Architecture

```
catwiki/
├── app/                          # Expo Router — all routes
│   ├── (tabs)/                   # Tab layout
│   │   ├── _layout.tsx           # Tab configuration
│   │   ├── index.tsx             # Encyclopedia tab
│   │   └── journal.tsx           # Encounter journal tab
│   ├── breed/
│   │   └── [id].tsx              # Breed detail page
│   ├── encounter/
│   │   ├── new.tsx               # Create an encounter
│   │   └── [id].tsx              # Encounter detail / edit
│   └── _layout.tsx               # Root layout
│
├── components/                   # Reusable components
│   ├── ui/                       # Generic components (Button, Card, etc.)
│   ├── BreedCard.tsx             # Breed card
│   ├── EncounterCard.tsx         # Encounter card
│   └── EthicalBanner.tsx        # Ethical message banner
│
├── features/                     # Domain-driven business logic
│   ├── breeds/
│   │   ├── api.ts                # The Cat API calls
│   │   ├── types.ts              # TypeScript types
│   │   └── hooks.ts              # Hooks (React 19 use())
│   └── encounters/
│       ├── db.ts                 # SQLite layer (CRUD)
│       ├── types.ts
│       └── hooks.ts
│
├── constants/                    # Colors, sizes, theme
├── assets/                       # Images, fonts, icons
├── .env.example
└── README.md
```

---

## 🔬 Technical Highlights

### `use()` Hook — React 19

React 19 introduces the `use()` hook, which lets you read a **Promise directly inside the render function**, paired with `Suspense`:

```tsx
// features/breeds/api.ts
export function fetchBreeds(): Promise<Breed[]> {
  return fetch(`${API_URL}/breeds`, {
    headers: { 'x-api-key': API_KEY }
  }).then(res => res.json());
}

// app/(tabs)/index.tsx
import { use, Suspense } from 'react';
import { fetchBreeds } from '@/features/breeds/api';

const breedsPromise = fetchBreeds(); // Created ONCE, outside the component

function BreedList() {
  const breeds = use(breedsPromise); // React 19 — suspends automatically
  return <FlatList data={breeds} renderItem={...} />;
}

export default function EncyclopediaScreen() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BreedList />
    </Suspense>
  );
}
```

> 💡 **Why it matters:** The `use()` hook replaces the classic `useEffect` + `useState` data fetching pattern, making code more declarative and natively integrated with `Suspense`.

---

### Expo Router v4 — File-based Navigation

Expo Router brings the Next.js paradigm to React Native: your file structure **is** your navigation.

```tsx
// app/breed/[id].tsx — Dynamic route
import { useLocalSearchParams } from 'expo-router';

export default function BreedScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // ...
}

// From anywhere in the app:
router.push(`/breed/${breed.id}`);
```

---

### Expo SQLite — Local CRUD

```tsx
// features/encounters/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('catwiki.db');

export function createEncounter(encounter: NewEncounter) {
  return db.runSync(
    `INSERT INTO encounters (date, location, breed_id, notes, photo_uri)
     VALUES (?, ?, ?, ?, ?)`,
    [encounter.date, encounter.location, encounter.breedId, encounter.notes, encounter.photoUri]
  );
}
```

---

### Reacticx — Animated UI Components

[Reacticx](https://www.reacticx.com/) is a headless, animation-focused component library powered by **React Native Skia** and **Reanimated**. Instead of installing a package, components are copied directly into your project — you own the code entirely.

Used in CatWiki for visually rich interactions: animated sliders for breed traits, theme toggle, and transition effects.

---

## 🤔 Philosophy

Most cat breed apps are built for **buyers and breeders**. CatWiki takes the opposite stance: breeds are a source of **knowledge and curiosity**, not a shopping catalogue.

The encounter journal gives value to **every cat you've met**, whether purebred or mixed, found at a shelter or on the street. The goal is to build an emotional connection with a real animal — not a fantasy image of one.

---

## 🗺️ Roadmap

- [ ] v1 — Encyclopedia + local Encounter Journal
- [ ] v2 — Encounter sharing (Supabase backend)
- [ ] v3 — Nearby shelter map
- [ ] v4 — Breed identification from photo (ML)

---

## 📄 License

MIT — Open source, contributions welcome.

---

## 🙏 Acknowledgements

- [The Cat API](https://thecatapi.com/) — Free and well-documented API
- [Expo](https://expo.dev/) — The best DX in the React Native world
- [Reacticx](https://www.reacticx.com/) — Beautiful animated components for React Native
- Every shelter cat out there that deserves a home 🐱