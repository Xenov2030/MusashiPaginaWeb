import { useEffect } from "react";

export function useHashNavigation() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    let frame = 0;
    const navigate = (focus = false, immediate = false) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hash = location.hash.slice(1);
        let id: string;
        try {
          id = decodeURIComponent(hash);
        } catch {
          return;
        }
        const target = id ? document.getElementById(id) : null;
        const behavior = immediate || reduced.matches ? "instant" : "smooth";
        if (target) {
          target.scrollIntoView({ block: "start", behavior });
          if (focus) {
            const hadTabindex = target.hasAttribute("tabindex");
            if (!hadTabindex) target.tabIndex = -1;
            target.focus({ preventScroll: true });
            if (!hadTabindex)
              target.addEventListener(
                "blur",
                () => target.removeAttribute("tabindex"),
                { once: true },
              );
          }
        } else if (!id) scrollTo({ top: 0, behavior });
      });
    };
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      if (!document.getElementById(id)) return;
      event.preventDefault();
      if (url.hash !== location.hash)
        history.pushState(null, "", url.pathname + url.search + url.hash);
      navigate(true);
    };
    const restore = () => navigate(false, true);
    const pageshow = (event: PageTransitionEvent) => {
      if (event.persisted) restore();
    };
    document.addEventListener("click", click);
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    window.addEventListener("pageshow", pageshow);
    navigate(false, true);
    return () => {
      cancelAnimationFrame(frame);
      history.scrollRestoration = previousRestoration;
      document.removeEventListener("click", click);
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("popstate", restore);
      window.removeEventListener("pageshow", pageshow);
    };
  }, []);
}

export function useSectionMotion() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const visited = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || visited.has(entry.target)) continue;
          visited.add(entry.target);
          observer.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          el.dataset.motionVisited = "true";
          if (reduced.matches || !el.animate) continue;
          const kind = el.dataset.reveal;
          const frames: Keyframe[] =
            kind === "image"
              ? [
                  {
                    clipPath: "inset(0 10% 0 0)",
                    transform: "translateX(10px)",
                  },
                  { clipPath: "inset(0 0 0 0)", transform: "translateX(0)" },
                ]
              : kind === "poster"
                ? [
                    {
                      opacity: 0.6,
                      transform: "translateY(16px) rotate(-1deg)",
                    },
                    { opacity: 1, transform: "translateY(0) rotate(0)" },
                  ]
                : kind === "stroke"
                  ? [{ transform: "scaleX(.05)" }, { transform: "scaleX(1)" }]
                  : [
                      { opacity: 0.55, transform: "translateY(14px)" },
                      { opacity: 1, transform: "translateY(0)" },
                    ];
          const animation = el.animate(frames, {
            duration: kind === "image" ? 620 : kind === "poster" ? 560 : 440,
            delay: Math.min(
              240,
              Math.max(
                0,
                Number(el.dataset.motionDelay) || (kind === "stroke" ? 160 : 0),
              ),
            ),
            easing: "cubic-bezier(.2,.7,.25,1)",
          });
          animations.add(animation);
          animation.finished
            .catch(() => {})
            .finally(() => animations.delete(animation));
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -22px 0px" },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const stop = () => {
      if (reduced.matches) {
        for (const animation of animations) animation.cancel();
        animations.clear();
      }
    };
    reduced.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", stop);
      for (const animation of animations) animation.cancel();
    };
  }, []);
}
