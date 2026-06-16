export function formatDate(date: Date): string {
  // Frontmatter dates coerce to UTC midnight; format in UTC so the displayed
  // day matches the frontmatter regardless of the build machine's timezone.
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
