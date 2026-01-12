# Borno AI Backend Generation Instructions

This document outlines the full backend architecture and implementation plan for Borno AI, transitioning from a mock-heavy frontend to a robust, MongoDB-powered learning platform.

## Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk (Next.js SDK)
- **Database**: MongoDB (Raw driver via `mongodb` package)
- **State Management**: Redux Toolkit (for complex client-side interactions)
- **Styling**: Tailwind CSS v4 (Standardized onto Borno Teal branding)

---

## 1. Database Connection (`lib/mongodb.ts`)

The connection logic is already implemented using a singleton pattern to prevent multiple connections in development.

**Key Database**: `borno-ai`
**Environment Variable**: `MONGODB_URI`

Use `getDatabase()` from `lib/mongodb.ts` for all server-side operations.

---

## 2. Authentication Flow

Authentication is handled by Clerk. 

- **Protected Routes**: All `/dashboard/*` and `/onboarding/*` routes require authentication.
- **User Metadata**: Sync Clerk users to MongoDB on first login or via webhooks to store platform-specific data (Class, Group, Progress).

---

## 3. Data Models (MongoDB)

### **Users**
```typescript
{
  clerkId: string;
  email: string;
  name: string;
  class: string; // e.g., "Class 9"
  group: string; // e.g., "Science"
  onboardingCompleted: boolean;
  preferences: {
    language: "bn" | "en";
    theme: "light" | "dark";
  };
  createdAt: Date;
}
```

### **Progress**
```typescript
{
  userId: string;
  subject: string;
  chapter: string;
  completionRate: number;
  lastAccessed: Date;
  quizScores: Array<{ quizId: string, score: number, Date: Date }>;
}
```

### **Books & Resources**
```typescript
{
  title: string;
  subject: string;
  nctbYear: number;
  pdfUrl: string;
  chapters: Array<{ id: string, title: string, pageRange: string }>;
}
```

---

## 4. Server Actions vs. API Routes

Prefer **Server Actions** for all mutations (e.g., saving progress, updating profile). 
Use **API Routes** only for:
- External integrations (e.g., Voice AI streaming if required as a separate endpoint).
- Webhooks (e.g., Clerk webhooks).

---

## 5. Implementation Roadmap

### **Phase 1: Database Migration**
- [ ] Replace mock `recentActivities` in `app/dashboard/page.tsx` with a MongoDB fetch.
- [ ] Connect `app/onboarding` to save user preferences.

### **Phase 2: Intelligent Tools**
- [ ] **Math Solver**: Implement a server action that logs solved problems to the user's history.
- [ ] **Voice AI**: Securely pass Clerk tokens to the voice engine.

### **Phase 3: Analytics & Reporting**
- [ ] Implement a background job or server-side aggregation for student progress analytics.

---

## 6. Development Guidelines

1. **Security**: Always use `auth()` from Clerk in Server Components/Actions to verify the user.
2. **Performance**: Use Next.js `cache` and `revalidatePath` to keep the UI snappy without excessive DB hits.
3. **Bangla Support**: Ensure all dynamic strings fetched from the DB are strictly typed for Bengali character support.
