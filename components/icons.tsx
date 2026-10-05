/**
 * Glyphs not available in lucide-react v1 (brand icons were removed upstream).
 * Kept here so icon handling stays uniform across the site.
 */

type IconProps = {
  className?: string;
};

/** GitHub mark (octicon silhouette), sized to match lucide's 24-unit grid. */
export function GithubGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.095.687-.225.687-.502 0-.253-.009-.922-.014-1.81-2.782.618-3.369-1.37-3.369-1.37-.455-1.183-1.11-1.497-1.11-1.497-.908-.638.069-.625.069-.625 1.004.072 1.532 1.057 1.532 1.057.892 1.563 2.341 1.112 2.91.85.092-.66.35-1.112.636-1.367-2.22-.259-4.555-1.14-4.555-5.073 0-1.119.39-2.034 1.029-2.752-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.051A9.32 9.32 0 0 1 12 6.877c.85.004 1.705.118 2.504.346 1.909-1.327 2.747-1.051 2.747-1.051.546 1.412.203 2.454.1 2.714.64.718 1.028 1.633 1.028 2.752 0 3.943-2.339 4.811-4.566 5.064.359.317.679.943.679 1.902 0 1.373-.012 2.48-.012 2.817 0 .278.188.603.694.5A10.25 10.25 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z" />
    </svg>
  );
}