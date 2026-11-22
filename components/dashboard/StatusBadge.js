const styles = {
  pending: "bg-sun/50 text-fg",
  accepted: "bg-mint/40 text-fg",
  approved: "bg-mint/40 text-fg",
  rejected: "bg-coral/20 text-coral",
  active: "bg-mint/40 text-fg",
  closed: "bg-line text-muted",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[status] || "bg-line text-fg"}`}>
      {status}
    </span>
  );
}
