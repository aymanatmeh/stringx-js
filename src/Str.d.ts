/**
 * StringX-JS - TypeScript Type Definitions
 * A comprehensive JavaScript string manipulation library inspired by Laravel's Str helper
 */

import { Stringable } from './Stringable';

/**
 * Main Str class with static methods for string manipulation
 */
declare class Str {
  /**
   * Create a new Stringable instance for fluent method chaining
   * @param string - The string value to wrap
   * @returns A Stringable instance for chaining
   * @example
   * Str.of('hello').upper().toString() // 'HELLO'
   */
  static of(string: string): Stringable;

  // Case Conversion

  /**
   * Convert a value to camelCase
   * @param value - The string to convert
   * @returns The camelCase string
   * @example
   * Str.camel('foo_bar') // 'fooBar'
   */
  static camel(value: string): string;

  /**
   * Convert a string to kebab-case
   * @param value - The string to convert
   * @returns The kebab-case string
   * @example
   * Str.kebab('fooBar') // 'foo-bar'
   */
  static kebab(value: string): string;

  /**
   * Convert a string to snake_case
   * @param value - The string to convert
   * @param delimiter - The delimiter to use (default: '_')
   * @returns The snake_case string
   * @example
   * Str.snake('fooBar') // 'foo_bar'
   */
  static snake(value: string, delimiter?: string): string;

  /**
   * Convert a value to StudlyCase (PascalCase)
   * @param value - The string to convert
   * @returns The StudlyCase string
   * @example
   * Str.studly('foo_bar') // 'FooBar'
   */
  static studly(value: string): string;

  /**
   * Convert a value to PascalCase (alias for studly)
   * @param value - The string to convert
   * @returns The PascalCase string
   * @example
   * Str.pascal('foo_bar') // 'FooBar'
   */
  static pascal(value: string): string;
  static title(value: string): string;
  static headline(value: string): string;
  static upper(value: string): string;
  static lower(value: string): string;
  static ucfirst(string: string): string;
  static lcfirst(string: string): string;
  static apa(value: string): string;
  static convertCase(string: string, mode?: 'lower' | 'upper' | 'title', encoding?: string): string;

  // String Extraction
  static after(subject: string, search: string): string;
  static afterLast(subject: string, search: string): string;
  static before(subject: string, search: string): string;
  static beforeLast(subject: string, search: string): string;
  static between(subject: string, from: string, to: string): string;
  static betweenFirst(subject: string, from: string, to: string): string;
  static charAt(subject: string, index: number): string;
  static substr(string: string, start: number, length?: number | null): string;
  static take(string: string, limit: number): string;

  // String Checking
  static contains(haystack: string, needles: string | string[], ignoreCase?: boolean): boolean;
  static containsAll(haystack: string, needles: string[], ignoreCase?: boolean): boolean;
  static doesntContain(haystack: string, needles: string | string[], ignoreCase?: boolean): boolean;
  static startsWith(haystack: string, needles: string | string[]): boolean;
  static doesntStartWith(haystack: string, needles: string | string[]): boolean;
  static endsWith(haystack: string, needles: string | string[]): boolean;
  static doesntEndWith(haystack: string, needles: string | string[]): boolean;
  static is(pattern: string | string[], value: string, ignoreCase?: boolean): boolean;
  static isAscii(value: string): boolean;
  static isJson(value: string): boolean;
  static isUrl(value: string, protocols?: string[]): boolean;
  static isUuid(value: string): boolean;
  static isUlid(value: string): boolean;
  static isMatch(pattern: RegExp | string, value: string): boolean;

  // String Manipulation
  static limit(value: string, limit?: number, end?: string): string;
  static words(value: string, words?: number, end?: string): string;
  static mask(string: string, character: string, index: number, length?: number | null): string;
  static trim(value: string, charlist?: string | null): string;
  static ltrim(value: string, charlist?: string | null): string;
  static rtrim(value: string, charlist?: string | null): string;
  static squish(value: string): string;
  static chopStart(subject: string, needle: string | string[]): string;
  static chopEnd(subject: string, needle: string | string[]): string;
  static finish(value: string, cap: string): string;
  static start(value: string, prefix: string): string;
  static wrap(value: string, before: string, after?: string | null): string;
  static unwrap(value: string, before: string, after?: string | null): string;
  static reverse(value: string): string;
  static ascii(value: string, language?: string): string;
  static transliterate(string: string, unknown?: string, strict?: boolean): string;
  static wordWrap(string: string, characters?: number, breakStr?: string, cutLongWords?: boolean): string;

  // String Replacement
  static replace(search: string | string[], replace: string | string[], subject: string, caseSensitive?: boolean): string;
  static replaceFirst(search: string, replace: string, subject: string): string;
  static replaceLast(search: string, replace: string, subject: string): string;
  static replaceArray(search: string, replace: string[], subject: string): string;
  static replaceStart(search: string, replace: string, subject: string): string;
  static replaceEnd(search: string, replace: string, subject: string): string;
  static replaceMatches(pattern: RegExp | string, replace: string, subject: string, limit?: number): string;
  static remove(search: string | string[], subject: string, caseSensitive?: boolean): string;
  static swap(map: Record<string, string>, subject: string): string;
  static deduplicate(string: string, characters?: string | string[]): string;
  static substrReplace(string: string, replace: string, offset?: number, length?: number | null): string;

  // Pattern Matching
  static match(pattern: RegExp | string, subject: string): string | null;
  static matchAll(pattern: RegExp | string, subject: string): string[];

  // Padding
  static padBoth(value: string, length: number, pad?: string): string;
  static padLeft(value: string, length: number, pad?: string): string;
  static padRight(value: string, length: number, pad?: string): string;

  // String Information
  static length(value: string): number;
  static wordCount(string: string): number;
  static substrCount(haystack: string, needle: string, offset?: number, length?: number | null): number;
  static position(haystack: string, needle: string, offset?: number): number | false;

  // String Generation
  static random(length?: number): string;
  static password(length?: number, letters?: boolean, numbers?: boolean, symbols?: boolean, spaces?: boolean): string;
  static uuid(): string;
  static uuid7(): string;
  static ulid(): string;

  // Pluralization
  static plural(value: string, count?: number): string;
  static singular(value: string): string;
  static pluralStudly(value: string, count?: number): string;
  static pluralPascal(value: string, count?: number): string;

  // Other Utilities
  static slug(title: string, separator?: string): string;
  static numbers(value: string): string;
  static excerpt(text: string, phrase?: string, options?: ExcerptOptions): string;
  static ucsplit(string: string): string[];
  static repeat(string: string, times: number): string;

  // Encoding
  static toBase64(string: string): string;
  static fromBase64(string: string, strict?: boolean): string;

  // Factories
  static createUuidsUsing(factory: (() => string) | null): void;
  static createUuidsNormally(): void;
  static createUlidsUsing(factory: (() => string) | null): void;
  static createUlidsNormally(): void;
  static createRandomStringsUsing(factory: ((length: number) => string) | null): void;
  static createRandomStringsNormally(): void;

  // Cache Management
  static flushCache(): void;
}

/**
 * Options for the excerpt method
 */
export interface ExcerptOptions {
  radius?: number;
  omission?: string;
}

export default Str;
