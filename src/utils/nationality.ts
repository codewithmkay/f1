/**
 * Ergast/Jolpica report nationalities as adjectives ("British", "Dutch")
 * rather than ISO country codes. This maps the common F1 nationalities
 * to ISO 3166-1 alpha-2 codes so we can render flags and country labels.
 */
const NATIONALITY_TO_CODE: Record<string, string> = {
  British: 'GB',
  Dutch: 'NL',
  Spanish: 'ES',
  Monegasque: 'MC',
  Mexican: 'MX',
  Australian: 'AU',
  French: 'FR',
  German: 'DE',
  Finnish: 'FI',
  Canadian: 'CA',
  Japanese: 'JP',
  Thai: 'TH',
  Chinese: 'CN',
  American: 'US',
  Danish: 'DK',
  Italian: 'IT',
  Brazilian: 'BR',
  Argentine: 'AR',
  Austrian: 'AT',
  Belgian: 'BE',
  Swiss: 'CH',
  Polish: 'PL',
  Russian: 'RU',
  Swedish: 'SE',
  'New Zealander': 'NZ',
  Indonesian: 'ID',
  Indian: 'IN',
}

const COUNTRY_TO_CODE: Record<string, string> = {
  Australia: 'AU',
  Austria: 'AT',
  Azerbaijan: 'AZ',
  Bahrain: 'BH',
  Belgium: 'BE',
  Brazil: 'BR',
  Canada: 'CA',
  China: 'CN',
  France: 'FR',
  Germany: 'DE',
  Hungary: 'HU',
  Italy: 'IT',
  Japan: 'JP',
  Mexico: 'MX',
  Monaco: 'MC',
  Netherlands: 'NL',
  Portugal: 'PT',
  Qatar: 'QA',
  'Saudi Arabia': 'SA',
  Singapore: 'SG',
  Spain: 'ES',
  UAE: 'AE',
  UK: 'GB',
  USA: 'US',
  'United States': 'US',
  'United Kingdom': 'GB',
  Vietnam: 'VN',
  Turkey: 'TR',
  Russia: 'RU',
  UnitedStates: 'US',
}

export function nationalityToCode(nationality: string): string {
  return NATIONALITY_TO_CODE[nationality] ?? '??'
}

export function countryToCode(country: string): string {
  return COUNTRY_TO_CODE[country] ?? '??'
}

/** Converts an ISO 3166-1 alpha-2 code into its regional-indicator flag emoji. */
export function flagEmoji(code: string): string {
  if (code === '??' || code.length !== 2) return '🏁'
  const codePoints = [...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
