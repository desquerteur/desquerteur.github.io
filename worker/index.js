// Cloudflare Worker: serves the static build on desquerteur.com and every
// project subdomain. <slug>.desquerteur.com/<path> is answered with
// /projects/<slug>/<path> from the same build, so each project feels like its own site.

const ROOT = 'desquerteur.com';
// Paths that are shared by every host (bundled CSS/JS, fonts, project media).
const SHARED = ['/_astro/', '/projects/', '/videos/', '/favicon.svg', '/og.png', '/robots.txt'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    // www -> apex
    if (host === `www.${ROOT}`) {
      url.hostname = ROOT;
      return Response.redirect(url.toString(), 301);
    }

    // On the apex, /projects/<slug>/ redirects to the project's own subdomain.
    if (host === ROOT) {
      const m = url.pathname.match(/^\/projects\/([a-z0-9-]+)\/?$/);
      if (m && (await exists(env, request, `/projects/${m[1]}/`))) {
        return Response.redirect(`https://${m[1]}.${ROOT}/`, 301);
      }
      return env.ASSETS.fetch(request);
    }

    if (host.endsWith(`.${ROOT}`)) {
      const slug = host.slice(0, -(ROOT.length + 1));
      if (SHARED.some((p) => url.pathname.startsWith(p))) return env.ASSETS.fetch(request);
      if (url.pathname === '/' || url.pathname === '/index.html') {
        const target = new URL(`/projects/${slug}/`, url);
        const res = await env.ASSETS.fetch(new Request(target, request));
        if (res.status === 404) return Response.redirect(`https://${ROOT}/`, 302);
        return res;
      }
      // Anything else on a project host belongs to the main site.
      return Response.redirect(`https://${ROOT}${url.pathname}${url.search}`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};

async function exists(env, request, path) {
  const res = await env.ASSETS.fetch(new Request(new URL(path, request.url), { method: 'HEAD' }));
  return res.ok;
}
