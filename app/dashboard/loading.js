export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-line" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-3xl bg-line" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-line" />
    </div>
  );
}
