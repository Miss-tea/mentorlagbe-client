export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title mt-3">{title}</h2>
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </div>
  );
}
