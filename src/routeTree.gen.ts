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
import { Route as AddnewImport } from './routes/addnew'
import { Route as AboutImport } from './routes/about'
import { Route as R404Import } from './routes/404'
import { Route as IndexImport } from './routes/index'
import { Route as PromptSlugImport } from './routes/prompt.$slug'
import { Route as EditPromptIdImport } from './routes/edit-prompt.$id'

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

const AddnewRoute = AddnewImport.update({
  id: '/addnew',
  path: '/addnew',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const R404Route = R404Import.update({
  id: '/404',
  path: '/404',
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

const EditPromptIdRoute = EditPromptIdImport.update({
  id: '/edit-prompt/$id',
  path: '/edit-prompt/$id',
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
    '/404': {
      id: '/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof R404Import
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/addnew': {
      id: '/addnew'
      path: '/addnew'
      fullPath: '/addnew'
      preLoaderRoute: typeof AddnewImport
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
    '/edit-prompt/$id': {
      id: '/edit-prompt/$id'
      path: '/edit-prompt/$id'
      fullPath: '/edit-prompt/$id'
      preLoaderRoute: typeof EditPromptIdImport
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
  '/404': typeof R404Route
  '/about': typeof AboutRoute
  '/addnew': typeof AddnewRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/edit-prompt/$id': typeof EditPromptIdRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/about': typeof AboutRoute
  '/addnew': typeof AddnewRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/edit-prompt/$id': typeof EditPromptIdRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/about': typeof AboutRoute
  '/addnew': typeof AddnewRoute
  '/docs': typeof DocsRoute
  '/prompt-guide': typeof PromptGuideRoute
  '/edit-prompt/$id': typeof EditPromptIdRoute
  '/prompt/$slug': typeof PromptSlugRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/404'
    | '/about'
    | '/addnew'
    | '/docs'
    | '/prompt-guide'
    | '/edit-prompt/$id'
    | '/prompt/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/404'
    | '/about'
    | '/addnew'
    | '/docs'
    | '/prompt-guide'
    | '/edit-prompt/$id'
    | '/prompt/$slug'
  id:
    | '__root__'
    | '/'
    | '/404'
    | '/about'
    | '/addnew'
    | '/docs'
    | '/prompt-guide'
    | '/edit-prompt/$id'
    | '/prompt/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  R404Route: typeof R404Route
  AboutRoute: typeof AboutRoute
  AddnewRoute: typeof AddnewRoute
  DocsRoute: typeof DocsRoute
  PromptGuideRoute: typeof PromptGuideRoute
  EditPromptIdRoute: typeof EditPromptIdRoute
  PromptSlugRoute: typeof PromptSlugRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  R404Route: R404Route,
  AboutRoute: AboutRoute,
  AddnewRoute: AddnewRoute,
  DocsRoute: DocsRoute,
  PromptGuideRoute: PromptGuideRoute,
  EditPromptIdRoute: EditPromptIdRoute,
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
        "/404",
        "/about",
        "/addnew",
        "/docs",
        "/prompt-guide",
        "/edit-prompt/$id",
        "/prompt/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/404": {
      "filePath": "404.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/addnew": {
      "filePath": "addnew.tsx"
    },
    "/docs": {
      "filePath": "docs.tsx"
    },
    "/prompt-guide": {
      "filePath": "prompt-guide.tsx"
    },
    "/edit-prompt/$id": {
      "filePath": "edit-prompt.$id.tsx"
    },
    "/prompt/$slug": {
      "filePath": "prompt.$slug.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
