export default function translateMonth(m: number): string {
  if (m === 0) return 'Janeiro';
  if (m === 1) return 'Fevereiro';
  if (m === 2) return 'Março';
  if (m === 3) return 'Abril';
  if (m === 4) return 'Maio';
  if (m === 5) return 'Junho';
  if (m === 6) return 'Julho';
  if (m === 7) return 'Agosto';
  if (m === 8) return 'Setembro';
  if (m === 9) return 'Outubro';
  if (m === 10) return 'Novembro';
  if (m === 11) return 'Dezembro';
  return '<inválido>';
}
