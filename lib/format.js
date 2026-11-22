export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const taka = (n) => `৳${Number(n || 0).toLocaleString("en-US")}`;
