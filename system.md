# Borno AI Backend System Architecture

This document serves as the technical specification and implementation roadmap for the Borno AI backend.

## 1. Core Architecture

Borno AI leverages **Next.js 15 (App Router)** with a hybrid approach to server-side logic:
- **Server Actions**: Preferred for all data mutations and form submissions.
- **Server Components**: Used for direct data fetching from MongoDB to minimize client-side waterfalls.
- **API Routes**: Reserved for Clerk webhooks and potential external AI service integrations.

## 2. Technical Stack

| Component | Technology |
| :--- | :--- |
| **Authentication** | Clerk (Next.js SDK) |
| **Database** | MongoDB (Raw Driver) |
| **State Management** | Redux Toolkit (Client-side) |
| **File Storage** | Public Assets / Cloudinary (Future) |
| **Real-time** | Server-Sent Events (Future - for Voice AI) |

## 2.1 Service APIs

To power the platform's intelligent features, the following third-party APIs will be integrated:

| Feature | Primary API | Alternative |
| :--- | :--- | :--- |
| **AI Intelligence** | Google Gemini (`@google/generative-ai`) | OpenAI GPT-4o |
| **OCR & Math Solve** | Google Gemini (Multimodal) | MathPix API |
| **Voice AI (TTS)** | Google Cloud Text-to-Speech | ElevenLabs |
| **Speech-to-Text** | OpenAI Whisper (API) | Google Speech-to-Text |
| **Authentication** | Clerk (Next.js SDK) | - |
| **Database** | MongoDB Atlas | - |

> [!NOTE]
> Google Gemini is preferred for AI intelligence due to its superior performance with the **Bengali (Bangla)** language.

## 3. Database Schema (MongoDB)

### **Users Collection (`users`)**
Stores platform-specific user data synchronized with Clerk.
```typescript
{
  _id: ObjectId;
  clerkId: string;           // Indexed
  email: string;
  name: string;
  class: string;             // e.g., "10"
  group: string;             // e.g., "Science"
  onboardingCompleted: boolean;
  preferences: {
    theme: "light" | "dark";
    language: "bn" | "en";
  };
  stats: {
    totalReadingTime: number; // in seconds
    solvedProblems: number;
    achievements: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### **Progress Collection (`progress`)**
Tracks student engagement with books and chapters.
```typescript
{
  _id: ObjectId;
  userId: string;            // Reference to users.clerkId
  bookId: string;
  chapterId: string;
  lastReadPage: number;
  highlightedPages: number[];
  textHighlights: Array<{
    id: string;
    text: string;
    page: number;
    color: string;
    createdAt: Date;
  }>;
  readingTime: number;       // Cumulative seconds on this chapter
  isCompleted: boolean;
  lastAccessed: Date;
}
```

### **Activities Collection (`activities`)**
Powers the dashboard's "Recent Activity" feed.
```typescript
{
  _id: ObjectId;
  userId: string;
  type: "reading" | "quiz" | "math_solve";
  title: string;
  description: string;
  link: string;
  timestamp: Date;
}
```

## 4. Implementation Roadmap

### **Phase 1: Foundation (Current Priority)**
1. **Clerk Webhooks**: Create `app/api/webhooks/clerk/route.ts` to sync user creation/updates to the MongoDB `users` collection.
2. **Middleware**: Implement `middleware.ts` to protect `/dashboard` and `/onboarding` routes.
3. **Onboarding Persistence**: Connect `app/onboarding` to a server action that updates user data in MongoDB.

### **Phase 2: Learning Persistence**
1. **Book Reader Sync**: Replace local Redux-only persistence with server actions that sync `lastReadPage` and `highlights` to MongoDB.
2. **Dashboard Feed**: Fetch recent activities from MongoDB instead of using mock data.
3. **Progress Analytics**: Implement aggregation queries to calculate subject-wise completion rates.

### **Phase 3: AI Tool Integration**
1. **Math Solver History**: Log every solved problem to the `activities` collection.
2. **Learning Assistant Memory**: (Optional) Store chat history in MongoDB to provide persistent context for the AI assistant.

## 5. Security & Performance Guidelines

- **Authentication**: Always verify sessions in Server Actions using `auth()` from `@clerk/nextjs/server`.
- **Database Access**: Use the singleton pattern in `lib/mongodb.ts` to manage connections.
- **Validation**: Use a library like `zod` for strict schema validation of all incoming data in Server Actions.
- **Caching**: Utilize Next.js 15's `cache` and `revalidatePath` to ensure the UI stays updated without excessive database hits.

---
*Created: 2026-01-09 | Version 1.0*
