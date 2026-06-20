interface ScrollSpyOptions {
  /** Selector for the rail links; each must carry a `data-section-link` matching a section id. */
  linkSelector: string;
  /** Classes applied to the active link (and removed from the rest). */
  activeClasses: string[];
  /** Classes applied to inactive links (and removed from the active one). */
  inactiveClasses: string[];
  /** Offset from the top of the viewport for the sticky nav, in px. */
  topOffset?: number;
}

/**
 * Highlights the rail link for the section currently at the top of the viewport.
 *
 * Uses IntersectionObserver for visibility tracking (the browser does the
 * geometry), pins the clicked link during the smooth scroll so the highlight
 * doesn't flash through intermediate sections, and falls back to the last
 * section once the page is scrolled to the bottom (for short trailing sections).
 */
export function initScrollSpy({
  linkSelector,
  activeClasses,
  inactiveClasses,
  topOffset = 96,
}: ScrollSpyOptions): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(linkSelector));
  if (!links.length) return;

  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink ?? ''))
    .filter((el): el is HTMLElement => el !== null);
  if (!sections.length) return;

  const setActive = (id: string | null) => {
    for (const link of links) {
      const on = link.dataset.sectionLink === id;
      for (const c of activeClasses) link.classList.toggle(c, on);
      for (const c of inactiveClasses) link.classList.toggle(c, !on);
    }
  };

  const atBottom = () =>
    window.innerHeight + Math.ceil(window.scrollY) >=
    document.documentElement.scrollHeight - 2;

  // While set, a clicked link stays highlighted regardless of scroll position.
  let pinned: string | null = null;
  const visible = new Set<string>();

  const compute = () => {
    if (pinned) return setActive(pinned);
    if (atBottom()) return setActive(sections[sections.length - 1].id);
    const top = sections.find((el) => visible.has(el.id));
    setActive(top ? top.id : sections[0].id);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      compute();
    },
    { rootMargin: `-${topOffset}px 0px -70% 0px`, threshold: 0 },
  );
  for (const el of sections) observer.observe(el);

  // Click pins the target until the scroll settles, avoiding flash-through.
  for (const link of links) {
    link.addEventListener('click', () => {
      pinned = link.dataset.sectionLink ?? null;
      setActive(pinned);
    });
  }

  const release = () => {
    pinned = null;
    compute();
  };
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', release);
  } else {
    let timer = 0;
    window.addEventListener(
      'scroll',
      () => {
        clearTimeout(timer);
        timer = window.setTimeout(release, 120);
      },
      { passive: true },
    );
  }

  // IntersectionObserver doesn't fire at the very bottom of the page, so nudge
  // the bottom-override along with a cheap rAF-throttled scroll listener.
  let frame = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (pinned || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        compute();
      });
    },
    { passive: true },
  );
  window.addEventListener('resize', compute);

  compute();
}
