# Transit Platform - Setup Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- Firebase account (free tier)

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Team_SShaRK
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration

#### Option A: Use Shared Firebase Project (Ask Team Lead)
1. Ask your team lead for the `.env.local` file contents
2. Create a file named `.env.local` in the root directory
3. Paste the provided environment variables
4. Skip to step 4

#### Option B: Create Your Own Firebase Project
1. Go to https://console.firebase.google.com
2. Create a new project
3. Add a web app to your project
4. Enable Firestore Database (Standard edition, test mode)
5. Enable Realtime Database (test mode)
6. Update Firestore Security Rules (see below)
7. Copy your Firebase config values
8. Create `.env.local` file with these values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.region.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
SEED_API_KEY=generate-random-string-here
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

### 5. Seed Database (First Time Only)
```bash
curl -X POST http://localhost:3000/api/seed \
  -H "x-seed-key: YOUR_SEED_API_KEY" \
  -H "Content-Type: application/json"
```

Replace `YOUR_SEED_API_KEY` with the value from your `.env.local` file.

---

## Firestore Security Rules

If you created your own Firebase project, update the rules:

1. Go to Firebase Console > Firestore Database > Rules
2. Replace with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /routes/{routeId} {
      allow read: if true;
      allow write: if false;
    }

    match /stops/{stopId} {
      allow read: if true;
      allow write: if false;
    }

    match /routeStops/{routeStopId} {
      allow read: if true;
      allow write: if false;
    }

    match /fares/{fareId} {
      allow read: if true;
      allow write: if false;
    }

    match /vehicles/{vehicleId} {
      allow read: if true;
      allow write: if true;
    }

    match /submissions/{submissionId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if false;
    }
  }
}
```

3. Click **Publish**

---

## Realtime Database Rules

1. Go to Firebase Console > Realtime Database > Rules
2. Replace with:

```json
{
  "rules": {
    ".read": "true",
    ".write": "false"
  }
}
```

3. Click **Publish**

---

## Test Routes

- Ratna Park → Bouddhanath (Micro)
- Ratna Park → Putalisadak (Micro)
- Kalanki → Lagankhel (Tempo)
- Kalanki → Kalimati (Tempo)

---

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
├── config/           # Firebase configuration
├── data/             # Sample transit data
├── lib/              # Business logic
└── types/            # TypeScript types
```

---

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Troubleshooting

### "Missing or insufficient permissions" error
- Check Firestore security rules are set correctly
- Make sure you published the rules

### Firebase not connecting
- Check `.env.local` exists and has correct values
- Restart the dev server after creating `.env.local`

### Seed API returns 401 Unauthorized
- Check `x-seed-key` header matches `SEED_API_KEY` in `.env.local`

---

## Need Help?

Contact the team lead or open an issue on GitHub.
