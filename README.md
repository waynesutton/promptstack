# PromptStack - The CRM for Prompts, Vibe Coding, and Custom Rules.

**[PromptStack](https://promptstack.dev)** is a **open-source** real-time prompt management platform built with React, [Convex.dev](https://convex.link/promptstackgithub), and Clerk authentication. It enables users to create, organize, and share AI prompts with features like custom categories, privacy controls, and community engagement through likes and comments. The platform features a sleek, responsive design with both grid and list views, real-time updates, and comprehensive search and filtering capabilities.

## Features

- **Modern Interface**: Clean, compact design with improved user experience and streamlined workflows
- **Searchable Directory**: Quickly find AI prompts and code generation rules tailored to your needs
- **Prompt Likes**: Like and sort top prompts in the directory
- **Category Organization**: Prompts are organized into clear, functional categories
- **Custom Categories**: Create your own personal categories for better organization
- **GitHub Integration**: Automatically link GitHub or social profiles submitted with prompts
- **Carbon Copy View**: View and copy prompts in a Carbon-style editor window
- **README Support**: Find and submit README examples for AI and code generation projects
- **Cursor Rules**: Find and submit Cursor rules for AI and code generation projects
- **Prompt Link Sharing**: Easily share prompts or cursor rules with others
- **Rich Comments**: Comment on prompts with rich text formatting using TipTap editor
- **Privacy Controls**: Create public prompts for the community or private prompts for personal use
- **Edit & Delete**: Full control over your own prompts with edit and delete functionality
- **Keyboard Shortcuts**: Efficient navigation with ESC to close modals and Ctrl/Cmd+Enter to submit forms

---

## Getting Started

### Submit a Prompt

1. Sign in with Clerk authentication or use the guest submission feature
2. Fill out the required fields in our streamlined form:
   - Title (Required)
   - Prompt content
   - Optional: Description, GitHub or social profile links
3. Choose whether to make the prompt public or private
4. Select from existing categories or create your own custom category
5. Submit and share with the community

### Search for Prompts

- Browse the directory by categories such as Cursor, Convex, or README examples
- Use the search bar to find prompts tailored to your specific framework or language
- Filter by categories in the sidebar to narrow down results
- Like prompts to save them for later reference

### Customize Your Experience

- Filter by "My Prompts" to view only your submissions
- Create custom categories for better personal organization
- Edit your prompts anytime with the built-in compact editor
- Toggle prompts between public and private visibility

## Development Roadmap

### Completed Features ✅

- ✅ Setup sign-in with Clerk authentication
- ✅ Add a "prompt feedback / comments" section to each prompt page
- ✅ Private prompts visible only to the creator
- ✅ Public prompts visible to all users
- ✅ Only allow prompt feedback or comments if user is logged in
- ✅ Use [Minimal TipTap](https://shadcn-minimal-tiptap.vercel.app/) for prompt feedback / comments
- ✅ Allow logged in users to like prompts and view liked prompts
- ✅ Allow prompts to be editable only by their creators if they are logged in
- ✅ Custom categories for personalized organization
- ✅ Category management with add/delete functionality
- ✅ Proper access control for private prompts
- ✅ Shared PromptForm component for consistent UX
- ✅ Modern, compact UI design with improved spacing and typography
- ✅ Enhanced keyboard navigation and accessibility features

---

## Tech Stack

**PromptStack** is powered by:

**[Convex.dev](https://convex.link/promptstackgithub)**  
Convex.dev provides a real-time database and backend that makes building reactive applications easy. It supports real-time updates, ensuring a seamless user experience.

- Learn more about Convex:
  - [Understanding Convex](https://docs.convex.dev/understanding/)
  - [Best Practices](https://docs.convex.dev/understanding/best-practices/)
  - [TypeScript Support](https://docs.convex.dev/understanding/best-practices/typescript)

### Frontend Stack

- [React 18](https://react.dev/) - Modern React with hooks and concurrent features
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) - Type-safe client-side routing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework with custom design system
- [Vite](https://vitejs.dev/) - Fast build tool and development server

### Backend & Services

- [Convex.dev](https://docs.convex.dev/) - Real-time database and backend with automatic synchronization
- [Clerk](https://clerk.com/) - Authentication and user management
- [Netlify](https://netlify.com) - Static site hosting and deployment

### Development Tools

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [ESLint](https://eslint.org/) - Code quality enforcement
- [TipTap](https://tiptap.dev/) - Rich text editor for comments

## Project Structure

```
promptstack/
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── Header.tsx            # Navigation header with search
│   │   ├── Footer.tsx            # Site footer with prompt count
│   │   ├── PromptForm.tsx        # Modern, compact shared form component
│   │   ├── CodeBlock.tsx         # Code syntax highlighting
│   │   ├── CodeEditor.tsx        # Code editing component
│   │   ├── CommentSection.tsx    # Prompt comments system
│   │   ├── NotFound.tsx          # 404 component for access control
│   │   └── minimal-tiptap.tsx    # Rich text editor
│   ├── routes/                   # TanStack Router pages
│   │   ├── index.tsx             # Home page redirect
│   │   ├── addnew.tsx            # Add prompt form
│   │   ├── prompt.$slug.tsx      # Individual prompt page
│   │   ├── docs.tsx              # Documentation
│   │   ├── about.tsx             # About page
│   │   ├── prompt-guide.tsx      # Prompt creation guide
│   │   └── 404.tsx               # 404 error page
│   ├── constants/                # Application constants
│   │   └── categories.ts         # Predefined categories
│   ├── lib/                      # Utilities and types
│   │   ├── utils.ts              # Helper functions
│   │   └── types.ts              # TypeScript definitions
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   ├── router.ts                 # Router configuration
│   └── ThemeContext.tsx          # Theme management
├── convex/                       # Backend (Convex.dev)
│   ├── schema.ts                 # Database schema
│   ├── prompts.ts                # Prompt queries/mutations
│   ├── comments.ts               # Comment system functions
│   └── auth.config.ts            # Authentication config
├── public/                       # Static assets
│   ├── promptstacklogo.svg       # Main logo
│   ├── favicon.svg               # Site favicon
│   ├── og-image.png              # Social sharing image
│   └── fonts/                    # Custom fonts
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript configuration
├── files.md                      # Detailed file documentation
└── changelog.md                  # Development changelog
```

For detailed information about each file and directory, see [`files.md`](./files.md).

## Key Features

### Authentication & User Management

- **Clerk Integration**: Secure sign-in/sign-up with social providers
- **User Profiles**: Persistent user identity and session management
- **Access Control**: Proper permissions for editing and viewing prompts

### Prompt Management

- **CRUD Operations**: Create, read, update, and delete prompts with modern, compact interface
- **Ownership Validation**: Users can only modify their own content
- **Privacy Controls**: Toggle between public and private visibility
- **Custom Categories**: Create personalized categories for organization

### Modern User Experience

- **Compact Design**: Streamlined, space-efficient interface with improved visual hierarchy
- **Real-time Updates**: Live synchronization with Convex database
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Theme switching with persistent preferences
- **Rich Text Editing**: TipTap editor for comments and descriptions
- **Keyboard Shortcuts**: ESC to close modals, Ctrl/Cmd+Enter to submit forms

### Search & Discovery

- **Full-text Search**: Find prompts by title, content, or description
- **Category Filtering**: Browse by predefined or custom categories
- **Like System**: Community-driven prompt ranking
- **Social Features**: Comments and engagement on prompts

### Developer Tools

- **Carbon Copy View**: View prompts in a Carbon-style code editor
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **Export Functionality**: Easy copying and sharing of prompt content
- **API Integration**: Built for integration with AI development tools

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/waynesutton/PromptStack
cd PromptStack
bun install
```

Set up environment variables in `.env.local`:

```bash
# Convex
VITE_CONVEX_URL=your_convex_deployment_url

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the development server:

```bash
bun run dev
```

## Contributing

We welcome contributions from the community! Feel free to submit a pull request or open an issue to report bugs, suggest features, or provide feedback.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/f6a1c7ac-d77a-4c43-92f9-7e8ca585c0d6/deploy-status)](https://app.netlify.com/sites/promptstack/deploys)
