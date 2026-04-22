import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { META, type RouteMeta } from "@/lib/meta";

const SITE_ORIGIN = "https://ryskex.com";

type MetaProps = {
  /** Explicit registry key (e.g. "/", "/platform", "*"). Falls back to current pathname. */
  routeKey?: string;
};

function upsertMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function resolveMeta(key: string): RouteMeta {
  return META[key] ?? META["*"];
}

/**
 * Per-route meta updater. Mutates document.title + OG / Twitter / description tags
 * on mount and whenever the route key changes. Renders nothing.
 */
export default function Meta({ routeKey }: MetaProps) {
  const location = useLocation();
  const key = routeKey ?? location.pathname;

  useEffect(() => {
    const meta = resolveMeta(key);
    const url = `${SITE_ORIGIN}${key === "*" ? "/404" : key}`;
    const ogTitle = meta.ogTitle ?? meta.title;
    const ogDescription = meta.ogDescription ?? meta.description;
    const ogImage = meta.ogImage ?? `${SITE_ORIGIN}/hero/08-marble-slab.jpg`;

    document.title = meta.title;

    upsertMeta(
      'meta[name="description"]',
      "name",
      "description",
      meta.description,
    );

    upsertMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      ogTitle,
    );
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      ogDescription,
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);

    upsertMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      ogTitle,
    );
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      ogDescription,
    );
    upsertMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      ogImage,
    );

    upsertLink("canonical", url);
  }, [key]);

  return null;
}
