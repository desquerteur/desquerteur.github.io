// @ts-check
import { defineConfig } from 'astro/config';

// SITE_MODE=subdomain -> production build for desquerteur.com (projects on <slug>.desquerteur.com)
// default            -> path mode for the GitHub Pages preview (projects on /projects/<slug>/)
const subdomain = process.env.SITE_MODE === 'subdomain';

export default defineConfig({
  site: subdomain ? 'https://desquerteur.com' : 'https://desquerteur.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    define: {
      'import.meta.env.SITE_MODE': JSON.stringify(subdomain ? 'subdomain' : 'path'),
    },
  },
});
