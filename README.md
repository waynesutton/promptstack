This document serves as some special instructions for building the appp promptstack.dev

# PromptStack

**PromptStack** is an **open-source project** that provides a searchable collection of AI prompts and code gen rules to enhance your workflow for developers. Built with [Convex.dev](https://docs.convex.dev/) as the database and [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) for client-side routing.
rules to enhance your workflow for developers.. Built with [Convex.dev](https://docs.convex.dev/) as the database and [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) for client-side routing.

PromptStack is a community-driven platform for developers to discover, share, and manage AI prompts and code generation rules.

Our mission is to help developers leverage AI tools more effectively by providing a curated collection of prompts that enhance productivity and code quality.

Whether you're using GitHub Copilot, ChatGPT, Claude, or other AI assistants, you'll find valuable prompts to improve your workflow.

**PromptStack** is an **open-source project** that provides a searchable directory of AI prompts and code-generation rules to enhance developer workflows.

1. Task Requirements Summary:

- Build a prompt direcotry
- each new prompt creates a new prompt card and link that can be shared separetly
- Support user creation
- Enable channel-based conversations
- Store and retrieve messages with proper ordering
- Generate AI responses automatically

- **Searchable Directory**: Quickly find AI prompts and code-gen rules tailored to your needs.
- **Prompt Rating System**: Rate and discover top prompts in the directory.
- **Private & Public Prompts**: Option to keep prompts private or share them publicly.
- **Category Organization**: Prompts are organized into clear, functional categories.
- **GitHub Integration**: Automatically link GitHub profiles submitted with prompts.
- **Carbon Copy View**: View and copy prompts in a Carbon-style editor window.
- **Readme Support**: Find and submit README examples for AI and code-gen projects.
- **Developer Tools**: Built-in roadmaps, prompt feedback, and engineering specs documentation.
- **SEO Optimized**: AI tool lists, prompt engineering insights, and metadata for better discoverability.

2. Main Components Needed:

- Database tables: users, prompts, ratings, categories
- Public APIs
- Internal AI
- Context loading

## Links

- [Website](https://promptstack.dev)

---

## Getting Started

### Submit a Prompt

1. Sign in or use the guest submission feature.
2. Fill out the required fields:
   - Title (Required)
   - Prompt content
   - Optional: Description, GitHub or social profile links.
3. Choose whether to make the prompt public or private.
4. Select a category for better organization.

### Search for Prompts

- Browse the directory by categories such as Cursor, Convex, or Readme examples.
- Use the search bar to find prompts tailored to your specific framework or language.

### Customize Your Experience

- Filter by "My Prompts" to view only your submissions.
- Rate and share prompts using the share icon available on each prompt card.

## Planned Features

- [ ] Add support for prompt threading, showing only the first in listings.
- [ ] Enable sidebar floating for better navigation.
- [ ] Introduce a footer navigation section with links to Docs and About pages.
- [ ] Update prompt submission cards to a three-column layout.
- [ ] Add icons (e.g., cube for Cursor, database for Convex) for better category visuals.
- [ ] Improve SEO with AI tools listing, prompt engineering texts, and meta tags.
- [ ] Allow users to preview, copy, and share prompts directly from prompt cards.

## Development Roadmap

1. **Design Enhancements**

   - Update site design inspired by [MagicPatterns](https://www.magicpatterns.com/).
   - Create Carbon-style views for better readability of prompts.

2. **User Features**

   - Allow prompts to be editable only by their creators.
   - Add "Prompt Threads" for multi-step prompts.

3. **Documentation**

   - Add an About page in both markdown and readme formats.
   - Provide a prompt help page and developer roadmaps in the Docs section.

4. **SEO Improvements**
   - Add meta tags and Open Graph (OG) images.
   - Write detailed SEO text about prompt engineering and feedback.

---

## Features

- 🔍 **Searchable Directory**: Quickly find AI prompts and code-gen rules tailored to your needs.
- ⭐ **Prompt Rating System**: Rate and discover top prompts in the directory.
- 📝 **Private & Public Prompts**: Option to keep prompts private or share them publicly.
- 🧩 **Category Organization**: Prompts are organized into clear, functional categories.
- 💻 **GitHub Integration**: Automatically link GitHub profiles submitted with prompts.
- 📦 **Carbon Copy View**: View and copy prompts in a Carbon-style editor window.
- 📄 **Readme Support**: Find and submit README examples for AI and code-gen projects.
- 🛠 **Developer Tools**: Built-in roadmaps, prompt feedback, and engineering specs documentation.
- 🌐 **SEO Optimized**: AI tool lists, prompt engineering insights, and metadata for better discoverability.
  I understand you want to save the current state of the application. The current state includes:

1. Header layout with:

   - Logo
   - Search box
   - About link
   - GitHub link
   - Add Prompt button
   - Theme toggle

2. Prompt cards with:

   - Title
   - Description
   - Categories
   - Star rating
   - GitHub profile link
   - Code window with:
     - Share button
     - Comment button
     - Copy button

3. Sidebar with:

   - Categories list
   - Star rating filter
   - Add Prompt button
   - Scroll controls

4. Footer with:
   - Product links
   - Stack info
   - Resources
   - Prompt counter

All the recent changes have been saved in the codebase. Let me know if you'd like to make any further modifications!

---

## Technology Stack

**PromptStack** is powered by:

- **[Convex.dev](https://docs.convex.dev/)**  
  Convex.dev provides a serverless database and backend that makes building reactive applications easy. It supports real-time updates, ensuring a seamless user experience.

  - Learn more about Convex:
    - [Understanding Convex](https://docs.convex.dev/understanding/)
    - [Best Practices](https://docs.convex.dev/understanding/best-practices/)
    - [TypeScript Support](https://docs.convex.dev/understanding/best-practices/typescript)

- ***

## Stack

- [Convex.dev](https://docs.convex.dev/)
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Bun](https://bun.sh/) (package manager/runtime)

**Key Libraries/Frameworks:**

- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Convex.dev](https://docs.convex.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React](https://react.dev/)
- [clsx/cn](https://www.npmjs.com/package/clsx) (utility for conditional class names)
- [Radix UI](https://www.radix-ui.com/) (UI components)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/waynesutton/PromptStack
cd PromptStack
npm install

## Contributing

We welcome contributions from the community! Feel free to submit a pull request or open an issue to report bugs, suggest features, or provide feedback.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


---

Enhance your AI workflows today with **PromptStack**!
```
