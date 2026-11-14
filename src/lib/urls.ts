// Central place for every link between the main site and the project sites.
// In subdomain mode each project lives on its own host: <slug>.desquerteur.com.
// The Cloudflare Worker (worker/index.js) serves the same build on every host,
// so root-relative asset paths (/_astro/..., /projects/...) work everywhere.
export const ROOT_DOMAIN = 'desquerteur.com';
export const SUBDOMAIN_MODE = import.meta.env.SITE_MODE === 'subdomain';

export function projectUrl(slug: string): string {
  return SUBDOMAIN_MODE ? `https://${slug}.${ROOT_DOMAIN}/` : `/projects/${slug}/`;
}

export function homeUrl(hash = ''): string {
  return (SUBDOMAIN_MODE ? `https://${ROOT_DOMAIN}/` : '/') + hash;
}

export function projectHost(slug: string): string {
  return `${slug}.${ROOT_DOMAIN}`;
}
