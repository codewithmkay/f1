/**
 * Accent colors per team, keyed by the constructorId Ergast/Jolpica use.
 * These are original accent choices for APEX (not official livery hex
 * values) so the product keeps its own visual identity.
 */
export const TEAM_COLORS: Record<string, string> = {
  red_bull: '#3D6DFF',
  ferrari: '#FF4B5C',
  mercedes: '#3FD0E0',
  mclaren: '#FF8A3D',
  aston_martin: '#3FE0A5',
  alpine: '#FF6FD8',
  williams: '#5CA6FF',
  rb: '#7C7CFF',
  sauber: '#9CFF57',
  haas: '#D8DCE6',
  kick_sauber: '#9CFF57',
  audi: '#D8DCE6',
  cadillac: '#C9A24B',
}

export function teamColor(constructorId: string): string {
  return TEAM_COLORS[constructorId] ?? '#8B6BFF'
}
