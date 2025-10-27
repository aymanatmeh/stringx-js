import Str from './Str.js';

/**
 * Stringable class for fluent string manipulation
 * Inspired by Laravel's Stringable
 */
class Stringable {
    constructor(value = '') {
        this.value = String(value);
    }

    /**
     * Get the underlying string value
     */
    toString() {
        return this.value;
    }

    /**
     * Get the underlying string value (alias for toString)
     */
    valueOf() {
        return this.value;
    }

    /**
     * Append the given values to the string.
     */
    append(...values) {
        this.value = this.value + values.join('');
        return this;
    }

    /**
     * Prepend the given values to the string.
     */
    prepend(...values) {
        this.value = values.join('') + this.value;
        return this;
    }

    /**
     * Return the remainder of a string after the first occurrence of a given value.
     */
    after(search) {
        this.value = Str.after(this.value, search);
        return this;
    }

    /**
     * Return the remainder of a string after the last occurrence of a given value.
     */
    afterLast(search) {
        this.value = Str.afterLast(this.value, search);
        return this;
    }

    /**
     * Get the portion of a string before the first occurrence of a given value.
     */
    before(search) {
        this.value = Str.before(this.value, search);
        return this;
    }

    /**
     * Get the portion of a string before the last occurrence of a given value.
     */
    beforeLast(search) {
        this.value = Str.beforeLast(this.value, search);
        return this;
    }

    /**
     * Get the portion of a string between two given values.
     */
    between(from, to) {
        this.value = Str.between(this.value, from, to);
        return this;
    }

    /**
     * Get the smallest possible portion of a string between two given values.
     */
    betweenFirst(from, to) {
        this.value = Str.betweenFirst(this.value, from, to);
        return this;
    }

    /**
     * Convert a value to camel case.
     */
    camel() {
        this.value = Str.camel(this.value);
        return this;
    }

    /**
     * Get the character at the specified index.
     */
    charAt(index) {
        return Str.charAt(this.value, index);
    }

    /**
     * Remove the given string(s) if it exists at the start of the haystack.
     */
    chopStart(needle) {
        this.value = Str.chopStart(this.value, needle);
        return this;
    }

    /**
     * Remove the given string(s) if it exists at the end of the haystack.
     */
    chopEnd(needle) {
        this.value = Str.chopEnd(this.value, needle);
        return this;
    }

    /**
     * Determine if a given string contains a given substring.
     */
    contains(needles, ignoreCase = false) {
        return Str.contains(this.value, needles, ignoreCase);
    }

    /**
     * Determine if a given string contains all array values.
     */
    containsAll(needles, ignoreCase = false) {
        return Str.containsAll(this.value, needles, ignoreCase);
    }

    /**
     * Determine if a given string doesn't contain a given substring.
     */
    doesntContain(needles, ignoreCase = false) {
        return Str.doesntContain(this.value, needles, ignoreCase);
    }

    /**
     * Determine if a given string ends with a given substring.
     */
    endsWith(needles) {
        return Str.endsWith(this.value, needles);
    }

    /**
     * Determine if a given string doesn't end with a given substring.
     */
    doesntEndWith(needles) {
        return Str.doesntEndWith(this.value, needles);
    }

    /**
     * Cap a string with a single instance of a given value.
     */
    finish(cap) {
        this.value = Str.finish(this.value, cap);
        return this;
    }

    /**
     * Determine if a given string matches a given pattern.
     */
    is(pattern, ignoreCase = false) {
        return Str.is(pattern, this.value, ignoreCase);
    }

    /**
     * Determine if a given string is 7 bit ASCII.
     */
    isAscii() {
        return Str.isAscii(this.value);
    }

    /**
     * Determine if a given value is valid JSON.
     */
    isJson() {
        return Str.isJson(this.value);
    }

    /**
     * Determine if a given value is a valid URL.
     */
    isUrl(protocols = []) {
        return Str.isUrl(this.value, protocols);
    }

    /**
     * Determine if a given value is a valid UUID.
     */
    isUuid() {
        return Str.isUuid(this.value);
    }

    /**
     * Determine if a given value is a valid ULID.
     */
    isUlid() {
        return Str.isUlid(this.value);
    }

    /**
     * Convert a string to kebab case.
     */
    kebab() {
        this.value = Str.kebab(this.value);
        return this;
    }

    /**
     * Return the length of the given string.
     */
    length() {
        return Str.length(this.value);
    }

    /**
     * Limit the number of characters in a string.
     */
    limit(limit = 100, end = '...') {
        this.value = Str.limit(this.value, limit, end);
        return this;
    }

    /**
     * Convert the given string to lower-case.
     */
    lower() {
        this.value = Str.lower(this.value);
        return this;
    }

    /**
     * Limit the number of words in a string.
     */
    words(words = 100, end = '...') {
        this.value = Str.words(this.value, words, end);
        return this;
    }

    /**
     * Masks a portion of a string with a repeated character.
     */
    mask(character, index, length = null) {
        this.value = Str.mask(this.value, character, index, length);
        return this;
    }

    /**
     * Get the string matching the given pattern.
     */
    match(pattern) {
        return Str.match(pattern, this.value);
    }

    /**
     * Determine if a given string matches a given pattern.
     */
    isMatch(pattern) {
        return Str.isMatch(pattern, this.value);
    }

    /**
     * Get all strings matching the given pattern.
     */
    matchAll(pattern) {
        return Str.matchAll(pattern, this.value);
    }

    /**
     * Pad both sides of a string with another.
     */
    padBoth(length, pad = ' ') {
        this.value = Str.padBoth(this.value, length, pad);
        return this;
    }

    /**
     * Pad the left side of a string with another.
     */
    padLeft(length, pad = ' ') {
        this.value = Str.padLeft(this.value, length, pad);
        return this;
    }

    /**
     * Pad the right side of a string with another.
     */
    padRight(length, pad = ' ') {
        this.value = Str.padRight(this.value, length, pad);
        return this;
    }

    /**
     * Convert a string to Pascal case (StudlyCase).
     */
    pascal() {
        this.value = Str.pascal(this.value);
        return this;
    }

    /**
     * Convert a string to Pascal case (StudlyCase).
     */
    studly() {
        this.value = Str.studly(this.value);
        return this;
    }

    /**
     * Remove all non-numeric characters from a string.
     */
    numbers() {
        this.value = Str.numbers(this.value);
        return this;
    }

    /**
     * Replace a given value in the string.
     */
    replace(search, replace, caseSensitive = true) {
        this.value = Str.replace(search, replace, this.value, caseSensitive);
        return this;
    }

    /**
     * Replace the first occurrence of a given value in the string.
     */
    replaceFirst(search, replace) {
        this.value = Str.replaceFirst(search, replace, this.value);
        return this;
    }

    /**
     * Replace the last occurrence of a given value in the string.
     */
    replaceLast(search, replace) {
        this.value = Str.replaceLast(search, replace, this.value);
        return this;
    }

    /**
     * Replace a given value in the string sequentially with an array.
     */
    replaceArray(search, replace) {
        this.value = Str.replaceArray(search, replace, this.value);
        return this;
    }

    /**
     * Replace the first occurrence of the given value if it appears at the start.
     */
    replaceStart(search, replace) {
        this.value = Str.replaceStart(search, replace, this.value);
        return this;
    }

    /**
     * Replace the last occurrence of a given value if it appears at the end.
     */
    replaceEnd(search, replace) {
        this.value = Str.replaceEnd(search, replace, this.value);
        return this;
    }

    /**
     * Replace the patterns matching the given regular expression.
     */
    replaceMatches(pattern, replace, limit = -1) {
        this.value = Str.replaceMatches(pattern, replace, this.value, limit);
        return this;
    }

    /**
     * Remove any occurrence of the given string in the subject.
     */
    remove(search, caseSensitive = true) {
        this.value = Str.remove(search, this.value, caseSensitive);
        return this;
    }

    /**
     * Reverse the given string.
     */
    reverse() {
        this.value = Str.reverse(this.value);
        return this;
    }

    /**
     * Begin a string with a single instance of a given value.
     */
    start(prefix) {
        this.value = Str.start(this.value, prefix);
        return this;
    }

    /**
     * Convert the given string to upper-case.
     */
    upper() {
        this.value = Str.upper(this.value);
        return this;
    }

    /**
     * Convert the given string to title case.
     */
    title() {
        this.value = Str.title(this.value);
        return this;
    }

    /**
     * Convert the given string to title case for each word.
     */
    headline() {
        this.value = Str.headline(this.value);
        return this;
    }

    /**
     * Convert the given string to APA-style title case.
     */
    apa() {
        this.value = Str.apa(this.value);
        return this;
    }

    /**
     * Get the singular form of an English word.
     */
    singular() {
        this.value = Str.singular(this.value);
        return this;
    }

    /**
     * Get the plural form of an English word.
     */
    plural(count = 2) {
        this.value = Str.plural(this.value, count);
        return this;
    }

    /**
     * Pluralize the last word of an English, studly caps case string.
     */
    pluralStudly(count = 2) {
        this.value = Str.pluralStudly(this.value, count);
        return this;
    }

    /**
     * Generate a URL friendly "slug" from a given string.
     */
    slug(separator = '-') {
        this.value = Str.slug(this.value, separator);
        return this;
    }

    /**
     * Convert a string to snake case.
     */
    snake(delimiter = '_') {
        this.value = Str.snake(this.value, delimiter);
        return this;
    }

    /**
     * Remove whitespace from both ends of a string.
     */
    trim(charlist = null) {
        this.value = Str.trim(this.value, charlist);
        return this;
    }

    /**
     * Remove whitespace from the beginning of a string.
     */
    ltrim(charlist = null) {
        this.value = Str.ltrim(this.value, charlist);
        return this;
    }

    /**
     * Remove whitespace from the end of a string.
     */
    rtrim(charlist = null) {
        this.value = Str.rtrim(this.value, charlist);
        return this;
    }

    /**
     * Remove all "extra" blank space from the given string.
     */
    squish() {
        this.value = Str.squish(this.value);
        return this;
    }

    /**
     * Determine if a given string starts with a given substring.
     */
    startsWith(needles) {
        return Str.startsWith(this.value, needles);
    }

    /**
     * Determine if a given string doesn't start with a given substring.
     */
    doesntStartWith(needles) {
        return Str.doesntStartWith(this.value, needles);
    }

    /**
     * Returns the portion of the string specified by the start and length parameters.
     */
    substr(start, length = null) {
        this.value = Str.substr(this.value, start, length);
        return this;
    }

    /**
     * Returns the number of substring occurrences.
     */
    substrCount(needle, offset = 0, length = null) {
        return Str.substrCount(this.value, needle, offset, length);
    }

    /**
     * Replace text within a portion of a string.
     */
    substrReplace(replace, offset = 0, length = null) {
        this.value = Str.substrReplace(this.value, replace, offset, length);
        return this;
    }

    /**
     * Make a string's first character lowercase.
     */
    lcfirst() {
        this.value = Str.lcfirst(this.value);
        return this;
    }

    /**
     * Make a string's first character uppercase.
     */
    ucfirst() {
        this.value = Str.ucfirst(this.value);
        return this;
    }

    /**
     * Split a string into pieces by uppercase characters.
     */
    ucsplit() {
        return Str.ucsplit(this.value);
    }

    /**
     * Get the number of words a string contains.
     */
    wordCount() {
        return Str.wordCount(this.value);
    }

    /**
     * Wrap the string with the given strings.
     */
    wrap(before, after = null) {
        this.value = Str.wrap(this.value, before, after);
        return this;
    }

    /**
     * Unwrap the string with the given strings.
     */
    unwrap(before, after = null) {
        this.value = Str.unwrap(this.value, before, after);
        return this;
    }

    /**
     * Convert the given string to Base64 encoding.
     */
    toBase64() {
        this.value = Str.toBase64(this.value);
        return this;
    }

    /**
     * Decode the given Base64 encoded string.
     */
    fromBase64(strict = false) {
        this.value = Str.fromBase64(this.value, strict);
        return this;
    }

    /**
     * Take the first or last {limit} characters of a string.
     */
    take(limit) {
        this.value = Str.take(this.value, limit);
        return this;
    }

    /**
     * Repeat the given string.
     */
    repeat(times) {
        this.value = Str.repeat(this.value, times);
        return this;
    }

    /**
     * Replace consecutive instances of a given character with a single character.
     */
    deduplicate(characters = ' ') {
        this.value = Str.deduplicate(this.value, characters);
        return this;
    }

    /**
     * Transliterate a string to its closest ASCII representation.
     */
    ascii(language = 'en') {
        this.value = Str.ascii(this.value, language);
        return this;
    }

    /**
     * Transliterate a string to its closest ASCII representation.
     */
    transliterate(unknown = '?', strict = false) {
        this.value = Str.transliterate(this.value, unknown, strict);
        return this;
    }

    /**
     * Extracts an excerpt from text that matches the first instance of a phrase.
     */
    excerpt(phrase = '', options = {}) {
        this.value = Str.excerpt(this.value, phrase, options);
        return this;
    }

    /**
     * Wrap a string to a given number of characters.
     */
    wordWrap(characters = 75, breakStr = '\n', cutLongWords = false) {
        this.value = Str.wordWrap(this.value, characters, breakStr, cutLongWords);
        return this;
    }

    /**
     * Swap multiple keywords in a string with other keywords.
     */
    swap(map) {
        this.value = Str.swap(map, this.value);
        return this;
    }

    /**
     * Find the position of the first occurrence of a substring.
     */
    position(needle, offset = 0) {
        return Str.position(this.value, needle, offset);
    }

    /**
     * Convert case of a string using different modes.
     */
    convertCase(mode = 'lower', encoding = 'UTF-8') {
        this.value = Str.convertCase(this.value, mode, encoding);
        return this;
    }

    /**
     * Pipe the string through the given callback.
     */
    pipe(callback) {
        this.value = callback(this.value);
        return this;
    }

    /**
     * Tap the string with the given callback.
     */
    tap(callback) {
        callback(this.value);
        return this;
    }

    /**
     * Execute the given callback if the value is empty.
     */
    whenEmpty(callback) {
        if (this.value === '') {
            const result = callback(this);
            return result instanceof Stringable ? result : this;
        }
        return this;
    }

    /**
     * Execute the given callback if the value is not empty.
     */
    whenNotEmpty(callback) {
        if (this.value !== '') {
            const result = callback(this);
            return result instanceof Stringable ? result : this;
        }
        return this;
    }

    /**
     * Execute the given callback if the condition is true.
     */
    when(condition, callback, defaultCallback = null) {
        const conditionResult = typeof condition === 'function' ? condition(this) : condition;

        if (conditionResult) {
            const result = callback(this, conditionResult);
            return result instanceof Stringable ? result : this;
        } else if (defaultCallback) {
            const result = defaultCallback(this);
            return result instanceof Stringable ? result : this;
        }

        return this;
    }

    /**
     * Execute the given callback unless the condition is true.
     */
    unless(condition, callback, defaultCallback = null) {
        const conditionResult = typeof condition === 'function' ? condition(this) : condition;
        return this.when(!conditionResult, callback, defaultCallback);
    }

    /**
     * Dump the string and die.
     */
    dd() {
        console.log(this.value);
        throw new Error('dd() was called');
    }

    /**
     * Dump the string.
     */
    dump() {
        console.log(this.value);
        return this;
    }

    /**
     * Test if the string matches a pattern.
     */
    test(pattern) {
        return new RegExp(pattern).test(this.value);
    }

    /**
     * Get the underlying string value (for JSON serialization).
     */
    toJSON() {
        return this.value;
    }

    /**
     * Get a substring from the string.
     */
    substring(start, length) {
        this.value = this.value.substring(start, start + length);
        return this;
    }

    /**
     * Check if string is empty.
     */
    isEmpty() {
        return this.value === '';
    }

    /**
     * Check if string is not empty.
     */
    isNotEmpty() {
        return this.value !== '';
    }
}

export default Stringable;
