/**
 * SectionDivider – Full-bleed dashed horizontal rule.
 * Shared across Home, Projects, and Playground pages.
 */
export default function SectionDivider() {
  return (
    <div className="w-full px-4 relative">
      <div className="absolute left-[calc(-50vw+50%)] w-screen border-t border-dashed border-border" />
    </div>
  );
}
