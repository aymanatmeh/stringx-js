/**
 * Stringable - TypeScript Type Definitions
 * Fluent interface for string manipulation with method chaining
 */

/**
 * Stringable class for fluent string manipulation
 */
export declare class Stringable {
  /** The underlying string value */
  protected value: string;

  /**
   * Create a new Stringable instance
   */
  constructor(value?: string);

  // Value Extraction
  toString(): string;
  valueOf(): string;
  toJSON(): string;

  // Utility Methods
  append(...values: string[]): this;
  prepend(...values: string[]): this;
  pipe(callback: (value: string) => string): this;
  tap(callback: (value: string) => void): this;

  // Conditional Methods
  when(condition: boolean | ((str: this) => boolean), callback: (str: this, condition?: any) => this | void, defaultCallback?: ((str: this) => this | void) | null): this;
  unless(condition: boolean | ((str: this) => boolean), callback: (str: this) => this | void, defaultCallback?: ((str: this) => this | void) | null): this;
  whenEmpty(callback: (str: this) => this | void): this;
  whenNotEmpty(callback: (str: this) => this | void): this;

  // Debugging
  dump(): this;
  dd(): never;

  // Checking Methods
  isEmpty(): boolean;
  isNotEmpty(): boolean;
  test(pattern: RegExp | string): boolean;

  // String Extraction
  after(search: string): this;
  afterLast(search: string): this;
  before(search: string): this;
  beforeLast(search: string): this;
  between(from: string, to: string): this;
  betweenFirst(from: string, to: string): this;
  charAt(index: number): string;
  substr(start: number, length?: number | null): this;
  take(limit: number): this;

  // Case Conversion
  camel(): this;
  kebab(): this;
  snake(delimiter?: string): this;
  studly(): this;
  pascal(): this;
  title(): this;
  headline(): this;
  upper(): this;
  lower(): this;
  ucfirst(): this;
  lcfirst(): this;
  apa(): this;
  convertCase(mode?: 'lower' | 'upper' | 'title', encoding?: string): this;

  // String Checking (returns boolean, not chainable)
  contains(needles: string | string[], ignoreCase?: boolean): boolean;
  containsAll(needles: string[], ignoreCase?: boolean): boolean;
  doesntContain(needles: string | string[], ignoreCase?: boolean): boolean;
  startsWith(needles: string | string[]): boolean;
  doesntStartWith(needles: string | string[]): boolean;
  endsWith(needles: string | string[]): boolean;
  doesntEndWith(needles: string | string[]): boolean;
  is(pattern: string | string[], ignoreCase?: boolean): boolean;
  isAscii(): boolean;
  isJson(): boolean;
  isUrl(protocols?: string[]): boolean;
  isUuid(): boolean;
  isUlid(): boolean;
  isMatch(pattern: RegExp | string): boolean;

  // String Manipulation
  limit(limit?: number, end?: string): this;
  words(words?: number, end?: string): this;
  mask(character: string, index: number, length?: number | null): this;
  trim(charlist?: string | null): this;
  ltrim(charlist?: string | null): this;
  rtrim(charlist?: string | null): this;
  squish(): this;
  chopStart(needle: string | string[]): this;
  chopEnd(needle: string | string[]): this;
  finish(cap: string): this;
  start(prefix: string): this;
  wrap(before: string, after?: string | null): this;
  unwrap(before: string, after?: string | null): this;
  reverse(): this;
  ascii(language?: string): this;
  transliterate(unknown?: string, strict?: boolean): this;
  wordWrap(characters?: number, breakStr?: string, cutLongWords?: boolean): this;

  // String Replacement
  replace(search: string | string[], replace: string | string[], caseSensitive?: boolean): this;
  replaceFirst(search: string, replace: string): this;
  replaceLast(search: string, replace: string): this;
  replaceArray(search: string, replace: string[]): this;
  replaceStart(search: string, replace: string): this;
  replaceEnd(search: string, replace: string): this;
  replaceMatches(pattern: RegExp | string, replace: string, limit?: number): this;
  remove(search: string | string[], caseSensitive?: boolean): this;
  swap(map: Record<string, string>): this;
  deduplicate(characters?: string | string[]): this;
  substrReplace(replace: string, offset?: number, length?: number | null): this;

  // Pattern Matching (returns values, not chainable)
  match(pattern: RegExp | string): string | null;
  matchAll(pattern: RegExp | string): string[];

  // Padding
  padBoth(length: number, pad?: string): this;
  padLeft(length: number, pad?: string): this;
  padRight(length: number, pad?: string): this;

  // String Information (returns values, not chainable)
  length(): number;
  wordCount(): number;
  substrCount(needle: string, offset?: number, length?: number | null): number;
  position(needle: string, offset?: number): number | false;

  // Pluralization
  plural(count?: number): this;
  singular(): this;
  pluralStudly(count?: number): this;

  // Other Utilities
  slug(separator?: string): this;
  numbers(): this;
  excerpt(phrase?: string, options?: { radius?: number; omission?: string }): this;
  ucsplit(): string[];
  repeat(times: number): this;

  // Encoding
  toBase64(): this;
  fromBase64(strict?: boolean): this;

  // Additional utilities
  substring(start: number, length: number): this;
}

export default Stringable;
