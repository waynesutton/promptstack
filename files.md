# PromptStack - File Structure Documentation

## Root Directory

### Configuration Files

- **`package.json`** - Project dependencies, scripts, and metadata for React/Vite app with Convex backend
- **`bun.lockb`** - Bun package manager lock file
- **`package-lock.json`** - npm package manager lock file
- **`.env.local`** - Environment variables for local development (Convex deployment URL, Clerk keys)
- **`tsconfig.json`** - Main TypeScript configuration
- **`tsconfig.app.json`** - TypeScript config for application code
- **`tsconfig.node.json`** - TypeScript config for Node.js environment
- **`vite.config.ts`** - Vite build tool configuration with React plugin
- **`tailwind.config.js`** - Tailwind CSS configuration with custom theme
- **`postcss.config.js`** - PostCSS configuration for CSS processing
- **`eslint.config.js`** - ESLint configuration for code linting
- **`.gitignore`** - Git ignore patterns
- **`.npmrc`** - npm configuration
- **`.node-version`** - Node.js version specification
- **`netlify.toml`** - Netlify deployment configuration

### Documentation Files

- **`README.md`** - Main project documentation and setup instructions
- **`files.md`** - This file - comprehensive file structure documentation
- **`changelog.md`** - Development changelog with feature tracking
- **`modprompts.md`** - Additional prompt examples and documentation
- **`LICENSE`** - MIT license file

### Entry Points

- **`index.html`** - Main HTML entry point for the Vite application

## Source Code (`src/`)

### Main Application Files

- **`main.tsx`** - Application entry point, renders React app with Convex and Clerk providers
- **`App.tsx`** - Main application component with homepage, prompt listings, search, filtering, and modal functionality
- **`router.ts`** - TanStack Router configuration
- **`routeTree.gen.ts`** - Auto-generated route tree for TanStack Router
- **`ConvexClientProvider.tsx`** - Convex client provider for database connection
- **`ThemeContext.tsx`** - Theme context for dark/light mode management

### Styling

- **`index.css`** - Global CSS styles and Tailwind imports
- **`fonts.css`** - Font definitions and imports
- **`vite-env.d.ts`** - Vite environment type definitions

### Routes (`src/routes/`)

- **`__root.tsx`** - Root route layout component
- **`index.tsx`** - Home page route (redirects to App.tsx)
- **`addnew.tsx`** - Add new prompt form page using shared PromptForm component
- **`prompt.$slug.tsx`** - Individual prompt detail page with edit functionality, comments, and access control
- **`docs.tsx`** - Documentation page with API and usage information
- **`about.tsx`** - About page with project information
- **`prompt-guide.tsx`** - Comprehensive prompt creation guide
- **`404.tsx`** - 404 error page for missing routes

### Components (`src/components/`)

#### Core Components

- **`Header.tsx`** - Main navigation header with search, user menu, and authentication
- **`Footer.tsx`** - Site footer with prompt count and links
- **`PromptForm.tsx`** - **SHARED** modern, compact form component for creating and editing prompts (used in modals and standalone) with improved UI/UX
- **`NotFound.tsx`** - 404 component for inaccessible or non-existent prompts

#### Content Components

- **`CodeBlock.tsx`** - Syntax highlighted code display component
- **`CodeEditor.tsx`** - Code editor component for prompt editing
- **`CodeEditor.css`** - Styles for the code editor
- **`CommentSection.tsx`** - Comment system for prompts with TipTap rich text editor
- **`minimal-tiptap.tsx`** - Minimal TipTap rich text editor component

#### Utility Components

- **`ConvexIcon.tsx`** - Convex logo icon component

### UI Components (`src/components/ui/`)

- **`switch.tsx`** - Toggle switch component for UI controls

### Utilities (`src/lib/`)

- **`utils.ts`** - Utility functions and helpers
- **`types.ts`** - TypeScript type definitions

### Constants (`src/constants/`)

- **`categories.ts`** - Centralized CATEGORIES list used across the application

## Backend (`convex/`)

### Database & Functions

- **`schema.ts`** - Convex database schema definitions (prompts, comments, starRatings, customCategories)
- **`prompts.ts`** - Prompt-related database queries and mutations (CRUD, ownership validation, custom categories)
- **`comments.ts`** - Comment system database functions
- **`auth.config.ts`** - Authentication configuration for Clerk integration
- **`tsconfig.json`** - TypeScript configuration for Convex functions
- **`README.md`** - Convex-specific documentation

### Generated Files (`convex/_generated/`)

- Auto-generated Convex client code and type definitions

## Public Assets (`public/`)

### Branding & Icons

- **`promptstacklogo.svg`** - Main PromptStack logo (SVG)
- **`promptstacklogo.png`** - Main PromptStack logo (PNG)
- **`promptdevlogo.svg`** - Alternative logo variant
- **`convex-black.svg`** - Convex logo (black)
- **`convex-white.svg`** - Convex logo (white)
- **`convex-grey-icon.svg`** - Convex icon (grey)

### Favicons & App Icons

- **`favicon.svg`** - Main favicon
- **`favicon-*.png`** - Various favicon sizes (16x16, 32x32, 96x96, etc.)
- **`apple-touch-icon*.png`** - Apple touch icons for iOS devices
- **`android-chrome-*.png`** - Android Chrome app icons
- **`mstile-*.png`** - Microsoft tile icons for Windows

### Meta Files

- **`site.webmanifest`** - Web app manifest for PWA features
- **`robots.txt`** - Search engine crawler instructions
- **`sitemap.xml`** - Site structure for search engines
- **`og-image.png`** - Open Graph image for social sharing

### Data Files

- **`llms.json`** - LLM data in JSON format
- **`llms.md`** - LLM documentation in Markdown
- **`llms.txt`** - LLM data in text format

### Fonts (`public/fonts/`)

- Custom font files for the application

## Build Output & Dependencies

- **`dist/`** - Production build output directory (generated by Vite)
- **`node_modules/`** - Installed npm packages

## Development Tools

- **`.cursor/`** - Cursor IDE configuration
- **`.git/`** - Git version control directory

# Key Application Features

## Authentication & User Management

- **Clerk Integration**: Full authentication system with sign-in/sign-up
- **User Profiles**: User identity management through Clerk
- **Session Management**: Persistent user sessions across app

## Prompt Management System

### Core Functionality

- **CRUD Operations**: Create, read, update, delete prompts with modern, compact form interface
- **Ownership Validation**: Users can only edit/delete their own prompts
- **Privacy Controls**: Public/private prompt visibility
- **Access Control**: Private prompts only accessible to creators

### Advanced Features

- **Custom Categories**: User-specific categories for organization
- **Category Management**: Add/delete custom categories with validation
- **Search & Filtering**: Real-time search and category-based filtering
- **Prompt Likes**: Like system for community engagement

## User Interface

### Modern Design System

- **Compact UI**: Streamlined, space-efficient interface design
- **Modern Forms**: Clean, professional form components with improved spacing and typography
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Dark/Light Theme**: Theme switching with persistent preferences

### Interactive Components

- **Modal System**: Edit prompts in modal overlays with compact design
- **Confirmation Dialogs**: User confirmation for destructive actions
- **Real-time Updates**: Live updates through Convex real-time database
- **Rich Text Editing**: TipTap editor for comments and descriptions
- **View Toggles**: Switch between grid view and Hacker News-style list view
- **List View**: Compact display with numbered entries, categories, and actions

### Enhanced User Experience

- **Keyboard Shortcuts**: ESC to close modals, Ctrl/Cmd+Enter to submit forms
- **Form Validation**: Real-time validation with clear error messaging
- **Character Limits**: Visual feedback for input length restrictions
- **Tab Navigation**: Logical tab order for accessibility

## Technical Architecture

### Frontend Stack

- **React 18**: Modern React with hooks and concurrent features
- **TanStack Router**: Type-safe file-based routing
- **TypeScript**: Full type safety across application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Vite**: Fast development and build tool

### Backend Stack

- **Convex.dev**: Real-time database with automatic synchronization
- **Clerk**: Authentication and user management
- **Netlify**: Static site hosting and deployment

### Development Workflow

- **Type Safety**: End-to-end TypeScript integration
- **Code Quality**: ESLint configuration for consistent code
- **Package Management**: Bun for fast package installation
- **Version Control**: Git with comprehensive .gitignore

## Recent Major Changes

### UI/UX Improvements (2024-12-19)

- **Compact Form Design**: Reduced spacing and improved visual hierarchy in PromptForm
- **Modern Typography**: Consistent text sizing and improved readability
- **Refined Interactions**: Smaller icons, tighter layouts, and polished button styles
- **Enhanced Accessibility**: Better keyboard navigation and focus management

### Component Consolidation (2024-12-19)

- **Shared PromptForm**: Eliminated duplicate form logic across components
- **Modal Integration**: PromptForm works seamlessly as both modal and standalone component
- **Consistent UX**: Unified prompt creation/editing experience across the app

### Custom Categories System

- **User-Specific Categories**: Each user can create their own categories
- **Category Management**: Add/delete custom categories with proper validation
- **UI Integration**: Seamless integration with existing category system
- **Data Cleanup**: Automatic removal of deleted categories from prompts

### Access Control & Security

- **Private Prompt Protection**: Proper access control for private prompts
- **404 Handling**: Users see 404 for inaccessible private prompts
- **Ownership Validation**: Backend validation for all user actions
- **Authentication Integration**: Proper Clerk and Convex auth integration

## Application Capabilities

### Content Management

- **AI Prompt Library**: Comprehensive collection of AI prompts for various use cases
- **Code Generation Rules**: Specialized prompts for code generation and development
- **Cursor Rules**: IDE-specific rules and configurations
- **README Templates**: Documentation templates and examples

### Community Features

- **Social Sharing**: Share prompts with direct links
- **Community Engagement**: Like and comment on prompts
- **User Profiles**: Link GitHub and social profiles to submissions
- **Public Directory**: Discover community-contributed content

### Developer Tools

- **Carbon Copy View**: View prompts in a Carbon-style code editor
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **Export Functionality**: Easy copying and sharing of prompt content
- **API Integration**: Built for integration with AI development tools

This documentation reflects the current state of PromptStack as of December 2024, including all recent UI improvements, feature additions, and architectural enhancements.
