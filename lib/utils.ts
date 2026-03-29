export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function stripQuotes(text: string): string {
  return text.replace(/^[\u201C\u201D\u201E\u201F"'\u2018\u2019\u00AB\u00BB]+|[\u201C\u201D\u201E\u201F"'\u2018\u2019\u00AB\u00BB]+$/g, "").trim();
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    })
    .toUpperCase();
}
