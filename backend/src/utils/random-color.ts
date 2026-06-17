const COLORS = [
  '#EF4444',
  '#F97316',
  '#EAB308',
  '#22C55E',
  '#14B8A6',
  '#06B6D4',
  '#3B82F6',
  '#6366F1',
  '#A855F7',
  '#EC4899',
  '#F43F5E',
  '#84CC16',
];

export function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#3B82F6';
}
