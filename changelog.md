# PromptStack Changelog

All notable changes to this project will be documented in this file.

## [Current] - 2024-12-19

### Added

- **Environment Variable Consolidation**: Consolidated all environment variables into `.env.local` only, removed duplicate `.env` file
- **Project Documentation**: Created comprehensive `files.md` documenting the entire project structure
- **File Structure Documentation**: Detailed descriptions of all directories and files in the codebase
- **Component Architecture**: Documented React components, routes, and utilities
- **Backend Documentation**: Convex database schema and function documentation
- **Asset Organization**: Catalogued all public assets, icons, and branding materials
- **Categories Centralization**: Created shared `src/constants/categories.ts` to eliminate duplicate CATEGORIES lists across components
- **Sidebar Filtering**: Updated sidebar to only show categories that have at least one submission
- **Shared PromptForm Component**: Created `src/components/PromptForm.tsx` to consolidate all prompt creation and editing logic
- **Form Reusability**: PromptForm can now be used both as a modal and as a standalone form component

### Infrastructure

- **Convex.dev**: Serverless database and backend with real-time updates
- **TanStack Router**: Client-side routing for React application
- **Clerk**: Authentication and user management system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Type-safe development environment
- **Vite**: Fast build tool and development server
- **Bun**: JavaScript runtime and package manager

### Features Completed

- ✅ **Authentication**: Sign-in with Clerk integration
- ✅ **Prompt Feedback**: Comment section on each prompt page
- ✅ **Privacy Controls**: Private prompts visible only to creators
- ✅ **Public Prompts**: Public prompts visible to all users
- ✅ **User Authentication**: Only logged-in users can comment
- ✅ **Rich Text Editor**: Minimal TipTap editor for comments and feedback
- ✅ **Edit Permissions**: Allow prompt creators to edit their own prompts
- ✅ **Prompt Likes**: Allow users to like prompts and view liked prompts
- ✅ **Visibility Toggle**: Toggle prompts between public and private
- ✅ **Delete Permissions**: Allow prompt creators to delete their own prompts
- ✅ **Edit Modal**: Comprehensive edit form with all prompt fields
- ✅ **Confirmation Modals**: User confirmation for visibility changes
- ✅ **Real-time Updates**: All changes sync immediately with Convex database
- ✅ **Custom Categories**: User-specific categories for personalized organization

### Features In Development

- [ ] **@Mentions**: Add mention functionality to comments
- [ ] **AI Prompt Redo**: AI-powered prompt regeneration on prompt pages
- [ ] **Prompt Threads**: Multi-step prompt conversations
- [ ] **Follow System**: Follow prompts for updates
- [ ] **Notifications**: Resend integration for likes, comments, and follows
- [ ] **Team Prompts**: Private and public team prompt collections

### Recent Updates (2024-12-19)

- ✅ **Edit Functionality**: Added edit icons and functionality to both App.tsx and prompt.$slug.tsx
- ✅ **Ownership Validation**: Backend functions validate prompt ownership before allowing edits
- ✅ **UI Consistency**: Edit and visibility controls match existing app design
- ✅ **Error Handling**: Proper error handling and user feedback for all operations
- ✅ **Modal Confirmations**: Added confirmation dialogs for visibility changes
- ✅ **Code Editor Integration**: Edit mode in SandpackCodeEditor for real-time editing
- ✅ **Custom Categories**: User-specific custom categories that only show up for the creator
- ✅ **Category Management**: Add custom categories in both App.tsx and addnew.tsx
- ✅ **Category Filtering**: Custom categories appear in sidebar filters and prompt creation
- ✅ **Duplicate Prevention**: Backend validation prevents duplicate custom categories per user
- ✅ **UI Integration**: Seamless integration with existing category system
- ✅ **Modal Category Creation**: Added "+ Add" button and input field to both create and edit modals in App.tsx
- ✅ **Public/Private Toggle**: Verified working correctly - prompts save with proper isPublic values
- ✅ **Authentication Integration**: User authentication working properly with Clerk and Convex
- ✅ **Categories Refresh Fix**: Fixed categories not updating when custom categories are added by removing categoriesInitialized flag
- ✅ **Private Prompt Access Fix**: Fixed getPromptBySlug function to properly restrict access to private prompts for non-owners
- ✅ **404 Access Control**: Added NotFound component and proper access control for private prompts - users now see 404 page when trying to access private prompts they don't own

## Architecture Overview

### Frontend Stack

- **React 18**: Modern React with hooks and concurrent features
- **TanStack Router**: Type-safe routing with file-based routing
- **Tailwind CSS**: Responsive design with dark/light theme support
- **TypeScript**: Full type safety across the application

### Backend Stack

- **Convex.dev**: Real-time database with automatic schema validation
- **Clerk**: User authentication and session management
- **Netlify**: Static site hosting and deployment

### Development Tools

- **Vite**: Fast development server and build tool
- **ESLint**: Code linting and quality enforcement
- **Bun**: Package management and script running
- **TypeScript**: Compile-time type checking

## [Previous] - 2024-12-18

### Added

- Initial prompt management system
- User authentication with Clerk
- Comment system for prompts
- Category filtering and search functionality
- Custom category creation for signed-in users

## [Latest] - 2024-12-19

### Fixed

- ✅ **Custom Category Cleanup**: Fixed issue where deleting a custom category from the sidebar didn't remove it from existing prompts - now when a user deletes their custom category, it's automatically removed from all their prompts that used that category

## [Previous] - 2024-12-18

### Added

- ✅ **Custom Category Deletion**: Logged-in users can now delete their own custom categories with a delete icon next to each custom category they created
- ✅ **Delete Permission Control**: Only the user who created a custom category can delete it - delete icons only appear for their own categories
- ✅ **Confirmation Dialog**: Added confirmation prompt before deleting custom categories to prevent accidental deletions
