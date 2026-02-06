
# Implementation Plan: The Plague Community Hub

## 1. Research & Theme Definition
*   **Brand Analysis**: "The Plague" NFT project uses a distinctive plague doctor aesthetic. The color palette will focus on "Void Black" (#0a0a0a), "Toxic Green" (#22c55e), and "Miasma Purple" (#7e22ce).
*   **Design Language**: Modern Gothic-Tech. Glassmorphism, neon glows, and sharp typography.

## 2. Core Architecture
*   **Framework**: React 18 with TypeScript for type safety.
*   **Styling**: Tailwind CSS for rapid, responsive UI development.
*   **Icons**: Lucide React for consistent, high-quality iconography.
*   **Animation**: Framer Motion to provide a "premium" NFT experience.

## 3. Feature Implementation Steps
### Step 1: Foundation & Navigation
*   Build the `Navbar` with sticky positioning.
*   Implement a mock "Connect X" authentication flow.
*   Define global types for `Member`, `Project`, and `Skill`.

### Step 2: Member Showcase (The Collective)
*   Create a `SearchHero` component for keyword-based filtering.
*   Implement `MemberCard` with skill badges and "Endorse" functionality.
*   Build a `ProfileModal` for deep-dive into member experience.

### Step 3: Elders' Project Board
*   Design a dedicated section for "Elders" to post proposals.
*   Implement upvoting logic (heart/zap icon).
*   Create an "Apply/Interested" modal for project collaboration.

### Step 4: User Profile Management
*   Enable users to edit their own profile (Bio, Skills, X handle).
*   Implement skill selection using a predefined set of community-relevant skills (Solidity, UI/UX, Lore, Community Management).

### Step 5: Search & Filtering
*   Implement real-time search logic across names, skills, and interests.

## 4. Deployment & Hosting
*   The application is optimized for Vercel, ensuring fast loading and efficient routing via `HashRouter`.
