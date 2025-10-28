/**
 * Number utility class for formatting and manipulating numbers
 * Inspired by Laravel's Number helper
 */
declare class Number {
  /**
   * Format the given number according to the current locale
   *
   * @param number - The number to format
   * @param precision - Exact decimal places (overrides maxPrecision)
   * @param maxPrecision - Maximum decimal places
   * @param locale - The locale to use (defaults to current locale)
   * @returns The formatted number
   *
   * @example
   * Number.format(1234.567); // "1,234.567"
   * Number.format(1234.567, 2); // "1,234.57"
   * Number.format(1234.5, null, 2); // "1,234.5"
   */
  static format(number: number, precision?: number | null, maxPrecision?: number | null, locale?: string | null): string;

  /**
   * Parse a string into a number according to the specified locale
   *
   * @param string - The string to parse
   * @param locale - The locale to use for parsing
   * @returns The parsed number or null if invalid
   *
   * @example
   * Number.parse("1,234.56"); // 1234.56 (en locale)
   * Number.parse("10,123", "fr"); // 10.123 (fr locale, comma is decimal)
   * Number.parse("invalid"); // null
   */
  static parse(string: string, locale?: string | null): number | null;

  /**
   * Parse a string into an integer
   *
   * @param string - The string to parse
   * @param locale - The locale to use
   * @returns The parsed integer or null if invalid
   *
   * @example
   * Number.parseInt("1,234"); // 1234
   * Number.parseInt("123.99"); // 123
   */
  static parseInt(string: string, locale?: string | null): number | null;

  /**
   * Parse a string into a float
   *
   * @param string - The string to parse
   * @param locale - The locale to use
   * @returns The parsed float or null if invalid
   *
   * @example
   * Number.parseFloat("1,234.56"); // 1234.56
   */
  static parseFloat(string: string, locale?: string | null): number | null;

  /**
   * Spell out the given number with multi-language support
   *
   * @param number - The number to spell out
   * @param locale - The locale to use (en, fr, es, de, ar, pt, it, ru, pl, uk, tr, nl, id, ko, vi, zh)
   * @param after - Only spell if number is greater than this
   * @param until - Only spell if number is less than this
   * @returns The spelled out number
   *
   * @example
   * Number.spell(42); // "forty-two" (English)
   * Number.spell(42, 'fr'); // "quarante-deux" (French)
   * Number.spell(42, 'es'); // "cuarenta y dos" (Spanish)
   * Number.spell(100, null, 50); // "100"
   */
  static spell(number: number, locale?: string | null, after?: number | null, until?: number | null): string;

  /**
   * Convert the given number to ordinal form (1st, 2nd, 3rd, etc.)
   *
   * @param number - The number to convert
   * @param locale - The locale to use
   * @returns The ordinal number
   *
   * @example
   * Number.ordinal(1); // "1st"
   * Number.ordinal(22); // "22nd"
   * Number.ordinal(103); // "103rd"
   */
  static ordinal(number: number, locale?: string | null): string;

  /**
   * Spell out the ordinal form (first, second, third, etc.)
   *
   * @param number - The number to spell out
   * @param locale - The locale to use
   * @returns The spelled ordinal
   *
   * @example
   * Number.spellOrdinal(1); // "first"
   * Number.spellOrdinal(22); // "twenty-second"
   */
  static spellOrdinal(number: number, locale?: string | null): string;

  /**
   * Convert the given number to its percentage equivalent
   *
   * @param number - The number to convert (e.g., 50 for 50%)
   * @param precision - Decimal places
   * @param maxPrecision - Maximum decimal places
   * @param locale - The locale to use
   * @returns The formatted percentage
   *
   * @example
   * Number.percentage(50); // "50%"
   * Number.percentage(66.666, 2); // "66.67%"
   */
  static percentage(number: number, precision?: number, maxPrecision?: number | null, locale?: string | null): string;

  /**
   * Convert the given number to its currency equivalent
   *
   * @param number - The number to format
   * @param currency - The currency code (e.g., 'USD', 'EUR')
   * @param locale - The locale to use
   * @param precision - Decimal places
   * @returns The formatted currency
   *
   * @example
   * Number.currency(1234.56); // "$1,234.56"
   * Number.currency(1234.56, 'EUR'); // "€1,234.56"
   */
  static currency(number: number, currency?: string, locale?: string | null, precision?: number | null): string;

  /**
   * Convert the given number to its file size equivalent
   *
   * @param bytes - The number of bytes
   * @param precision - Decimal places
   * @param maxPrecision - Maximum decimal places
   * @returns The formatted file size
   *
   * @example
   * Number.fileSize(1024); // "1 KB"
   * Number.fileSize(1536, 2); // "1.50 KB"
   */
  static fileSize(bytes: number, precision?: number, maxPrecision?: number | null): string;

  /**
   * Convert the number to its human-readable equivalent (abbreviated)
   *
   * @param number - The number to abbreviate
   * @param precision - Decimal places
   * @param maxPrecision - Maximum decimal places
   * @returns The abbreviated number
   *
   * @example
   * Number.abbreviate(1000); // "1K"
   * Number.abbreviate(1500000); // "1.5M"
   */
  static abbreviate(number: number, precision?: number, maxPrecision?: number | null): string;

  /**
   * Convert the number to its human-readable equivalent
   *
   * @param number - The number to convert
   * @param precision - Decimal places
   * @param maxPrecision - Maximum decimal places
   * @param abbreviate - Use abbreviated format (K, M, B)
   * @returns The human-readable number
   *
   * @example
   * Number.forHumans(1000); // "1 thousand"
   * Number.forHumans(1500000); // "1.5 million"
   */
  static forHumans(number: number, precision?: number, maxPrecision?: number | null, abbreviate?: boolean): string;

  /**
   * Clamp the given number between the given minimum and maximum
   *
   * @param number - The number to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns The clamped number
   *
   * @example
   * Number.clamp(5, 1, 10); // 5
   * Number.clamp(0, 1, 10); // 1
   */
  static clamp(number: number, min: number, max: number): number;

  /**
   * Split the given number into pairs of min/max values
   *
   * @param to - The maximum value
   * @param by - The step size
   * @param start - The starting value
   * @param offset - Offset for the upper bound
   * @returns Array of [min, max] pairs
   *
   * @example
   * Number.pairs(10, 3); // [[0, 2], [3, 5], [6, 8], [9, 10]]
   */
  static pairs(to: number, by: number, start?: number, offset?: number): Array<[number, number]>;

  /**
   * Remove any trailing zero digits after the decimal point
   *
   * @param number - The number to trim
   * @returns The trimmed number
   *
   * @example
   * Number.trim(1.50); // 1.5
   * Number.trim(1.00); // 1
   */
  static trim(number: number): number;

  /**
   * Execute the given callback using the given locale
   *
   * @param locale - The locale to use
   * @param callback - The callback to execute
   * @returns The callback result
   *
   * @example
   * Number.withLocale('de-DE', () => Number.format(1234.56));
   */
  static withLocale<T>(locale: string, callback: () => T): T;

  /**
   * Execute the given callback using the given currency
   *
   * @param currency - The currency code
   * @param callback - The callback to execute
   * @returns The callback result
   *
   * @example
   * Number.withCurrency('EUR', () => Number.currency(100));
   */
  static withCurrency<T>(currency: string, callback: () => T): T;

  /**
   * Set the default locale
   *
   * @param locale - The locale to set
   *
   * @example
   * Number.useLocale('fr-FR');
   */
  static useLocale(locale: string): void;

  /**
   * Set the default currency
   *
   * @param currency - The currency code to set
   *
   * @example
   * Number.useCurrency('GBP');
   */
  static useCurrency(currency: string): void;

  /**
   * Get the default locale
   *
   * @returns The current default locale
   *
   * @example
   * Number.defaultLocale(); // "en"
   */
  static defaultLocale(): string;

  /**
   * Get the default currency
   *
   * @returns The current default currency
   *
   * @example
   * Number.defaultCurrency(); // "USD"
   */
  static defaultCurrency(): string;
}

export default Number;
