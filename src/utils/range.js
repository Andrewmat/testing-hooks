export default function range(length, start = 0) {
  return Array.from({ length }).map((_, i) => i + start);
}