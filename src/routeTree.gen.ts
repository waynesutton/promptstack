/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PromptGuideImport } from './routes/prompt-guide'
import { Route as DocsImport } from './routes/docs'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as PromptSlugImport } from './routes/prompt.$slug'

// Create/Update Routes

const PromptGuideRoute = PromptGuideImport.update({
  id: '/prompt-guide',
  path: '/prompt-guide',
  getParentRoute: () => rootRoute,
} as any)

const DocsRoute = DocsImport.update({
  id: '/docs',
  path: '/docs',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PromptSlugRoute = PromptSlugImport.update({
  id: '/prompt/$slug',
  path: '/prompt/$slug',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/docs': {
      id: '/docs'
      path: '/docs'
      fullPath: '/docs'
      preLoaderRoute: typeof DocsImport
      parentRoute: typeof rootRoute
    }
    '/prompt-guide': {
      id: '/prompt-guide'
      path: '/prompt-guide'
      fullPath: '/prompt-guide'
      preLoaderRoute: typeof PromptGuideImport
      parentRoute: typeof rootRoute
    }
    '/prompt/$slug': {
      id: '/prompt/$slug'
      path: '/prompt/$slug'
      fullPath: '/prompt/$slug'
      preLoaderRoute: typeof PromptSlugImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/docs' | '/prompt-guide' | '/prompt/$slug'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/docs' | '/prompt-guide' | '/prompt/$slug'
  id: '__root__' | '/' | '/about' | '/docs' | '/prompt-guide' | '/prompt/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DocsRoute: typeof DocsRoute
  PromptGuideRoute: typeof PromptGuideRoute
  PromptSlugRoute: typeof PromptSlugRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DocsRoute: DocsRoute,
  PromptGuideRoute: PromptGuideRoute,
  PromptSlugRoute: PromptSlugRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/docs",
        "/prompt-guide",
        "/prompt/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/docs": {
      "filePath": "docs.tsx"
    },
    "/prompt-guide": {
      "filePath": "prompt-guide.tsx"
    },
    "/prompt/$slug": {
      "filePath": "prompt.$slug.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
