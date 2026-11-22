const tones = {
  coral: "bg-coral/15 text-coral",
  mint: "bg-mint/25 text-fg",
  sun: "bg-sun/40 text-fg",
  ink: "bg-ink text-white",
};

export default function StatCard({ icon: Icon, label, value, tone = "coral", loading = false }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${tones[tone]}`}>
        <Icon size={26} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-muted">{label}</p>
        {loading ? (
          <div className="mt-1 h-8 w-16 animate-pulse rounded bg-line" />
        ) : (
          <p className="truncate font-heading text-3xl font-extrabold capitalize text-fg">{value}</p>
        )}
      </div>
    </div>
  );
}
