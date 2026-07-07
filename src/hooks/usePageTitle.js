import { useEffect } from "react";

const SITE_NAME = "ABXI";
const DEFAULT_TITLE = `${SITE_NAME} | From Zero to Something Real`;

/**
 * Sets document.title for the current page.
 *
 * @param {string} [title] - Page-specific title. Omit to reset to the default.
 * @param {boolean} [ready=true] - Pass false while data is still loading
 *   (e.g. a project/blog post not yet fetched) to avoid a title flash.
 */
export default function usePageTitle(title, ready = true) {
  useEffect(() => {
    if (!ready) return;
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

    // Reset to default on unmount so a page that doesn't set one
    // (or a fast route change) never leaks a stale title.
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, ready]);
}