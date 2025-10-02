# Design Guidelines: MovieShare - Social Movie Platform

## Design Approach

**Reference-Based Strategy:** Drawing inspiration from Netflix (content discovery), Letterboxd (movie social features), and Instagram (social interaction patterns) to create an engaging, visually-rich movie sharing experience.

**Core Principle:** Cinematic aesthetics meet social connectivity - dark, immersive interface that puts movie posters front and center while facilitating social interactions.

---

## Color Palette

**Dark Mode Primary (Default):**
- Background Base: 12 8% 8% (Deep charcoal)
- Surface: 12 6% 12% (Elevated dark)
- Surface Hover: 12 5% 16%
- Border: 12 5% 18%

**Accent Colors:**
- Primary (Brand): 0 84% 60% (Vibrant red - cinema theme)
- Secondary: 210 50% 50% (Cool blue for interactions)
- Success: 142 76% 45% (For upvotes)
- Warning: 45 93% 58% (For watchlist indicators)

**Text:**
- Primary: 0 0% 95%
- Secondary: 0 0% 65%
- Muted: 0 0% 45%

---

## Typography

**Font Stack:**
- Primary: 'Inter' from Google Fonts for UI elements
- Display: 'Archivo Black' for movie titles and headings
- Body: 'Inter' for all text content

**Scale:**
- Hero Title: text-6xl font-black (72px)
- Page Headers: text-4xl font-bold (36px)
- Card Titles: text-xl font-semibold (20px)
- Body: text-base (16px)
- Caption: text-sm (14px)

---

## Layout System

**Spacing Primitives:** Consistent use of 2, 4, 8, 12, 16, 24 units
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-24
- Card gaps: gap-4, gap-6

**Container Strategy:**
- Max width: max-w-7xl mx-auto
- Responsive padding: px-4 md:px-6 lg:px-8

**Grid Patterns:**
- Movie Cards: grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
- Group Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature Sections: grid-cols-1 md:grid-cols-2

---

## Component Library

### Navigation
- Fixed top navbar with blur backdrop (backdrop-blur-xl bg-background/80)
- Logo left, search center, profile/notifications right
- Mobile: Hamburger menu with slide-out drawer

### Movie Cards
- Aspect ratio: 2:3 (movie poster standard)
- Hover effect: Scale slightly (scale-105) with elevated shadow
- Overlay gradient on hover revealing actions
- Rating badge: Top-right corner, rounded-full with star icon
- Action buttons: Bottom overlay with watchlist heart and group plus icons
- Poster images with rounded-lg border

### Group Cards
- Horizontal card layout with group image/icon left
- Member avatars stacked (max 5 visible + count)
- Movie count and activity indicators
- Join/Enter button right-aligned

### Watchlist Grid
- Same movie card pattern as dashboard
- Remove button on hover
- Empty state: Centered illustration with CTA

### Group Detail View
- Two-column layout: Main content (70%) + Sidebar (30%)
- Movie cards with vote counts and up/down buttons below
- Sidebar: Sticky member list with avatars and usernames
- Add movie FAB (Floating Action Button) bottom-right

### Search Interface
- Prominent search bar with movie reel icon
- Real-time results dropdown with poster thumbnails
- Category filters as pill buttons below search

### Authentication
- Centered card on gradient background
- Google OAuth button with logo
- Minimal, focused design

---

## Interaction Patterns

**Microinteractions:**
- Button hover: Subtle scale and shadow increase
- Card hover: Lift effect with shadow
- Vote buttons: Scale bounce on click
- Loading states: Skeleton screens matching card layouts

**Animations:**
- Page transitions: Fade in/out (200ms)
- Modal overlays: Scale from center with backdrop blur
- Toast notifications: Slide from top-right

---

## Images & Visual Assets

### Hero Section (Dashboard)
**Include:** Large banner showcasing featured/trending movie backdrop
- Full-width, 50vh height on desktop, 40vh on mobile
- Gradient overlay (bottom to top) for text readability
- CTA: "Discover Your Next Favorite" with search prompt

### Movie Posters
**Critical:** All movie cards use TMDB poster images
- Aspect ratio: 2:3 maintained
- Lazy loading for performance
- Placeholder: Blurred gradient while loading

### Group Avatars
**Include:** User profile pictures in circular format
- Fallback: Colorful initials on gradient backgrounds
- Stack overlap for group member display

### Empty States
**Include:** Illustrations for:
- Empty watchlist: Popcorn icon with "Start adding movies"
- No groups: People icon with "Create your first group"
- No search results: Film reel with "Try different keywords"

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (Single column, stacked layout)
- Tablet: 768px - 1024px (2-4 columns)
- Desktop: > 1024px (Full multi-column grids)

**Mobile Optimizations:**
- Bottom navigation bar for key actions
- Swipeable movie carousels instead of grids
- Simplified group detail with tab navigation
- Full-screen search overlay

---

## Page-Specific Layouts

### Dashboard
1. Hero banner with featured content
2. Search bar section
3. "Trending Now" horizontal scroll (6-8 cards)
4. "Popular" grid (multi-column)
5. "Top Rated" horizontal scroll
6. Category sections (Action, Drama, etc.) as carousels

### Groups Page
- Header with "Create Group" CTA
- Grid of group cards
- Quick stats: Total groups, total movies shared

### Group Detail
- Group header: Name, description, member count
- Main: Movie grid with voting
- Sidebar: Member list, invite button, group settings

### Watchlist
- Header: "My Watchlist" with count
- Filter/sort options (By rating, date added, genre)
- Movie grid matching dashboard style

---

## Accessibility & UX

- Dark mode default with high contrast ratios (WCAG AAA)
- Focus states: 2px outline in primary color
- Icon buttons: Proper aria-labels
- Keyboard navigation: Full support
- Loading states: Clear visual feedback
- Error messages: Toast notifications with retry options

---

**Quality Mandate:** This design creates an immersive, cinema-inspired experience that makes browsing movies feel like exploring a premium streaming service, while social features feel natural and engaging like a social network. Every interaction should feel smooth, purposeful, and delightful.