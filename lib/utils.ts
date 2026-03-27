export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    })
    .toUpperCase();
}
