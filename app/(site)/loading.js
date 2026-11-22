export default function Loading() {
  return (
    <div className="container-x py-16">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-line" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-3xl bg-line" />
        ))}
      </div>
    </div>
  );
}
