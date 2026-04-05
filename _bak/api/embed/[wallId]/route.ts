import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface PageProps {
  params: Promise<{ wallId: string }>
}

export async function GET(req: NextRequest, { params }: PageProps) {
  const { wallId } = await params

  // Validate the wall exists and is active
  const admin = createAdminClient()
  const { data: wall } = await admin
    .from('wol_walls')
    .select('id, name, settings, is_active')
    .eq('id', wallId)
    .single()

  if (!wall || !wall.is_active) {
    const notFoundScript = `console.warn("[WallOfLove] Wall not found or inactive: ${wallId}");`
    return new NextResponse(notFoundScript, {
      status: 404,
      headers: { 'Content-Type': 'application/javascript' },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = wall.settings as Record<string, any> | null
  const accentColor: string = settings?.primary_color ?? '#8b5cf6'
  const origin = new URL(req.url).origin

  // The widget script — self-contained, uses Shadow DOM, ~3-4 KB
  const script = /* js */ `
(function () {
  'use strict';

  var WALL_ID = ${JSON.stringify(wallId)};
  var ACCENT = ${JSON.stringify(accentColor)};
  var API_BASE = ${JSON.stringify(origin)};
  var WALL_NAME = ${JSON.stringify(wall.name)};

  // ── Styles injected inside Shadow DOM ───────────────────────────────────
  var CSS = \`
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :host{display:block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color-scheme:dark}
    .wol-root{background:#0a0a0a;padding:32px 16px;border-radius:16px}
    .wol-header{text-align:center;margin-bottom:24px}
    .wol-title{font-size:1.25rem;font-weight:700;color:#fff;margin-bottom:4px}
    .wol-count{font-size:0.75rem;color:#71717a}
    .wol-grid{column-count:1;column-gap:12px}
    @media(min-width:480px){.wol-grid{column-count:2}}
    @media(min-width:768px){.wol-grid{column-count:3}}
    .wol-card{display:inline-block;width:100%;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:16px;margin-bottom:12px;break-inside:avoid;transition:transform .2s,box-shadow .2s,border-color .2s;cursor:default}
    .wol-card:hover{transform:translateY(-3px);box-shadow:0 12px 30px -8px \${ACCENT}30;border-color:\${ACCENT}40}
    .wol-stars{display:flex;gap:2px;margin-bottom:10px}
    .wol-star{width:13px;height:13px}
    .wol-content{font-size:0.8125rem;color:#a1a1aa;line-height:1.6;margin-bottom:12px}
    .wol-author{display:flex;align-items:center;gap:10px;padding-top:10px;border-top:1px solid #27272a}
    .wol-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;flex-shrink:0;background:\${ACCENT}}
    .wol-author-info{min-width:0}
    .wol-author-name{font-size:0.8125rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .wol-author-byline{font-size:0.6875rem;color:#71717a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .wol-empty{text-align:center;padding:48px 16px;color:#52525b;font-size:0.875rem}
    .wol-footer{text-align:center;margin-top:20px;font-size:0.6875rem;color:#3f3f46}
    .wol-footer a{color:#52525b;text-decoration:none}
    .wol-footer a:hover{color:#71717a}
    .wol-error{text-align:center;padding:32px;color:#f87171;font-size:0.8125rem}
  \`.replace(/\\\${ACCENT}/g, ACCENT);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k){ e.setAttribute(k, attrs[k]); });
    if (children) {
      if (typeof children === 'string') e.textContent = children;
      else children.forEach(function(c){ if (c) e.appendChild(c); });
    }
    return e;
  }

  function starSVG(filled) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'wol-star');
    var path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
    path.setAttribute('fill', filled ? ACCENT : 'none');
    path.setAttribute('stroke', filled ? ACCENT : '#52525b');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    return svg;
  }

  function renderCard(t) {
    var card = el('div', {class: 'wol-card'});

    // Stars
    if (t.rating) {
      var stars = el('div', {class: 'wol-stars'});
      for (var i = 1; i <= 5; i++) stars.appendChild(starSVG(i <= t.rating));
      card.appendChild(stars);
    }

    // Content
    if (t.content) {
      card.appendChild(el('p', {class: 'wol-content'}, '\u201c' + t.content + '\u201d'));
    }

    // Author
    var initial = (t.author_name || '?').charAt(0).toUpperCase();
    var avatar = el('div', {class: 'wol-avatar'}, initial);
    var bylineParts = [t.author_title, t.author_company].filter(Boolean);
    var byline = bylineParts.join(' @ ');
    var info = el('div', {class: 'wol-author-info'}, [
      el('div', {class: 'wol-author-name'}, t.author_name || 'Anonymous'),
      byline ? el('div', {class: 'wol-author-byline'}, byline) : null,
    ]);
    card.appendChild(el('div', {class: 'wol-author'}, [avatar, info]));
    return card;
  }

  function renderWidget(root, testimonials) {
    var header = el('div', {class: 'wol-header'}, [
      el('div', {class: 'wol-title'}, WALL_NAME),
      el('div', {class: 'wol-count'}, testimonials.length + ' testimonial' + (testimonials.length !== 1 ? 's' : '')),
    ]);

    var grid = el('div', {class: 'wol-grid'});
    if (testimonials.length === 0) {
      grid.appendChild(el('p', {class: 'wol-empty'}, 'No testimonials yet.'));
    } else {
      testimonials.forEach(function(t) { grid.appendChild(renderCard(t)); });
    }

    var footer = el('div', {class: 'wol-footer'});
    var link = el('a', {href: 'https://walloflove.io', target: '_blank', rel: 'noopener'}, 'WallOfLove');
    footer.appendChild(document.createTextNode('Powered by '));
    footer.appendChild(link);

    var wroot = el('div', {class: 'wol-root'}, [header, grid, footer]);
    root.appendChild(wroot);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  function init(container) {
    var shadow = container.attachShadow({ mode: 'open' });

    var style = document.createElement('style');
    style.textContent = CSS;
    shadow.appendChild(style);

    fetch(API_BASE + '/api/testimonials?wallId=' + WALL_ID)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        renderWidget(shadow, data.testimonials || []);
      })
      .catch(function(err) {
        var errEl = el('div', {class: 'wol-error'}, 'Could not load testimonials.');
        shadow.appendChild(errEl);
        console.error('[WallOfLove] Failed to load:', err);
      });
  }

  // Find the script tag and use its data-wall-id or fall back to WALL_ID from URL
  function mount() {
    // Look for an explicit container first
    var container = document.querySelector('[data-wol-wall="' + WALL_ID + '"]');
    if (!container) {
      // Auto-create a container next to the script tag
      var scripts = document.querySelectorAll('script[src*="' + WALL_ID + '"]');
      var scriptTag = scripts[scripts.length - 1];
      if (scriptTag && scriptTag.parentNode) {
        container = document.createElement('div');
        container.setAttribute('data-wol-wall', WALL_ID);
        scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);
      } else {
        // Fallback: append to body
        container = document.createElement('div');
        container.setAttribute('data-wol-wall', WALL_ID);
        document.body.appendChild(container);
      }
    }
    init(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
`

  return new NextResponse(script, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
