export default function proper(text: string): string {
  if (text.length === 1) {
    return text.toUpperCase();
  }
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}
