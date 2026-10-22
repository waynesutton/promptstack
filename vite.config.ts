import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// Clerk publishable keys are "pk_<env>_" plus base64 of "<frontend api host>$"
function clerkFrontendApiHost(publishableKey: string | undefined): string | null {
  const encoded = publishableKey?.split('_')[2]
  if (!encoded) return null
  const decoded = Buffer.from(encoded, 'base64').toString('utf8')
  return decoded.endsWith('$') ? decoded.slice(0, -1) : null
}

function hostFromUrl(url: string | undefined): string | null {
  try {
    return url ? new URL(url).host : null
  } catch {
    return null
  }
}

// Content Security Policy for production builds only. Dev mode is skipped because
// the React refresh runtime injects an inline script that this policy would block.
function contentSecurityPolicy(env: Record<string, string>): Plugin {
  const convexHost = hostFromUrl(env.VITE_CONVEX_URL)
  const clerkHost = clerkFrontendApiHost(env.VITE_CLERK_PUBLISHABLE_KEY)

  const convex = convexHost ? [`https://${convexHost}`, `wss://${convexHost}`] : []
  const clerk = clerkHost ? [`https://${clerkHost}`] : []

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...clerk, 'https://challenges.cloudflare.com'],
    'connect-src': ["'self'", ...convex, ...clerk, 'https://clerk-telemetry.com', 'https://*.codesandbox.io'],
    'img-src': ["'self'", 'data:', 'https://img.clerk.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://api.fontshare.com'],
    'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com', 'https://api.fontshare.com', 'https://cdn.fontshare.com'],
    'frame-src': ['https://challenges.cloudflare.com', 'https://*.codesandbox.io'],
    'worker-src': ["'self'", 'blob:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  }
  const policy = Object.entries(directives)
    .map(([name, sources]) => `${name} ${sources.join(' ')}`)
    .join('; ')

  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: policy },
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), TanStackRouterVite(), contentSecurityPolicy(env)],
    build: {
      rollupOptions: {
        external: ['@swc/core']
      }
    }
  }
})
