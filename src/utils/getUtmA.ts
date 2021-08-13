export default function getUtmA() {
  const meta = document.querySelector('meta[name="data-module-name"]');
  const utm_a = meta?.getAttribute("content");
  return utm_a;
}
