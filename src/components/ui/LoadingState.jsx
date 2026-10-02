export default function LoadingState({ compact = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio content"
      className={`flex flex-col gap-3 px-4 ${compact ? 'py-8' : 'min-h-[50vh] justify-center py-16'}`}
    >
      <span className="sr-only">Loading portfolio content</span>
      <div className="h-3 w-28 animate-pulse rounded bg-muted/30" />
      <div className="h-3 w-full max-w-xl animate-pulse rounded bg-muted/20" />
      <div className="h-3 w-3/4 max-w-md animate-pulse rounded bg-muted/20" />
    </div>
  );
}
