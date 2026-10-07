/**
 * Pre-paint theme bootstrap for the class-based ThemeProvider.
 *
 * Rendered through next/script with strategy="beforeInteractive", so it runs
 * before first paint (zero theme-FOUC) and is injected by Next's runtime into
 * <head> outside React's reconciliation tree — which means it never trips the
 * React "script tag inside a component" warning that next-themes' own inline
 * script did.
 *
 * Persisted values are "system" | "light" | "dark", matching the UI toggle.
 * The dark canvas that `:root` carries in globals.css is the no-JS fallback;
 * light is applied by toggling the `.light` class on <html>.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var s=window.matchMedia("(prefers-color-scheme: light)");var r=t==="light"?"light":t==="dark"?"dark":(s.matches?"light":"dark");var d=document.documentElement;d.classList.toggle("light",r==="light");d.classList.toggle("dark",r==="dark");d.style.colorScheme=r}catch(e){document.documentElement.classList.add("dark")}})();`;
