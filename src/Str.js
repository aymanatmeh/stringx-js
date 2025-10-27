import { v4 as uuidv4, v7 as uuidv7, validate as validateUuid } from 'uuid';

/**
 * String helper class inspired by Laravel's Str helper
 */
class Str {
    // Static caches for performance
    static snakeCache = {};
    static camelCache = {};
    static studlyCache = {};
    static uuidFactory = null;
    static ulidFactory = null;
    static randomStringFactory = null;

    /**
     * Return the remainder of a string after the first occurrence of a given value.
     */
    static after(subject, search) {
        if (search === '') return subject;
        const parts = subject.split(search);
        return parts.length > 1 ? parts.slice(1).join(search) : subject;
    }

    /**
     * Return the remainder of a string after the last occurrence of a given value.
     */
    static afterLast(subject, search) {
        if (search === '') return subject;
        const position = subject.lastIndexOf(search);
        if (position === -1) return subject;
        return subject.substring(position + search.length);
    }

    /**
     * Get the portion of a string before the first occurrence of a given value.
     */
    static before(subject, search) {
        if (search === '') return subject;
        const position = subject.indexOf(search);
        return position === -1 ? subject : subject.substring(0, position);
    }

    /**
     * Get the portion of a string before the last occurrence of a given value.
     */
    static beforeLast(subject, search) {
        if (search === '') return subject;
        const position = subject.lastIndexOf(search);
        return position === -1 ? subject : subject.substring(0, position);
    }

    /**
     * Get the portion of a string between two given values.
     */
    static between(subject, from, to) {
        if (from === '' || to === '') return subject;
        return this.beforeLast(this.after(subject, from), to);
    }

    /**
     * Get the smallest possible portion of a string between two given values.
     */
    static betweenFirst(subject, from, to) {
        if (from === '' || to === '') return subject;
        return this.before(this.after(subject, from), to);
    }

    /**
     * Convert a value to camel case.
     */
    static camel(value) {
        if (this.camelCache[value]) {
            return this.camelCache[value];
        }

        // Remove special characters and convert to camel case
        const result = value
            .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
            .replace(/^(.)/, (_, c) => c.toLowerCase());

        this.camelCache[value] = result;
        return result;
    }

    /**
     * Get the character at the specified index.
     */
    static charAt(subject, index) {
        const length = subject.length;
        if (index < 0 ? index < -length : index > length - 1) {
            return false;
        }
        return index < 0 ? subject.charAt(length + index) : subject.charAt(index);
    }

    /**
     * Remove the given string(s) if it exists at the start of the haystack.
     */
    static chopStart(subject, needle) {
        const needles = Array.isArray(needle) ? needle : [needle];
        for (const n of needles) {
            if (subject.startsWith(n)) {
                return subject.substring(n.length);
            }
        }
        return subject;
    }

    /**
     * Remove the given string(s) if it exists at the end of the haystack.
     */
    static chopEnd(subject, needle) {
        const needles = Array.isArray(needle) ? needle : [needle];
        for (const n of needles) {
            if (subject.endsWith(n)) {
                return subject.substring(0, subject.length - n.length);
            }
        }
        return subject;
    }

    /**
     * Determine if a given string contains a given substring.
     */
    static contains(haystack, needles, ignoreCase = false) {
        if (!haystack) return false;

        const needleArray = Array.isArray(needles) ? needles : [needles];
        const searchHaystack = ignoreCase ? haystack.toLowerCase() : haystack;

        for (let needle of needleArray) {
            const searchNeedle = ignoreCase ? needle.toLowerCase() : needle;
            if (searchNeedle !== '' && searchHaystack.includes(searchNeedle)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determine if a given string contains all array values.
     */
    static containsAll(haystack, needles, ignoreCase = false) {
        const needleArray = Array.isArray(needles) ? needles : [needles];
        for (const needle of needleArray) {
            if (!this.contains(haystack, needle, ignoreCase)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Determine if a given string doesn't contain a given substring.
     */
    static doesntContain(haystack, needles, ignoreCase = false) {
        return !this.contains(haystack, needles, ignoreCase);
    }

    /**
     * Determine if a given string ends with a given substring.
     */
    static endsWith(haystack, needles) {
        if (!haystack) return false;

        const needleArray = Array.isArray(needles) ? needles : [needles];
        for (const needle of needleArray) {
            if (needle !== '' && haystack.endsWith(needle)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determine if a given string doesn't end with a given substring.
     */
    static doesntEndWith(haystack, needles) {
        return !this.endsWith(haystack, needles);
    }

    /**
     * Cap a string with a single instance of a given value.
     */
    static finish(value, cap) {
        const quotedCap = cap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?:${quotedCap})+$`);
        return value.replace(regex, '') + cap;
    }

    /**
     * Determine if a given string matches a given pattern.
     */
    static is(pattern, value, ignoreCase = false) {
        const patterns = Array.isArray(pattern) ? pattern : [pattern];

        for (let p of patterns) {
            // Exact match
            if (p === '*' || p === value) return true;

            if (ignoreCase && p.toLowerCase() === value.toLowerCase()) {
                return true;
            }

            // Convert pattern to regex
            const regexPattern = p
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                .replace(/\\\*/g, '.*');

            const flags = ignoreCase ? 'i' : '';
            const regex = new RegExp(`^${regexPattern}$`, flags);

            if (regex.test(value)) return true;
        }

        return false;
    }

    /**
     * Determine if a given string is 7 bit ASCII.
     */
    static isAscii(value) {
        return /^[\x00-\x7F]*$/.test(value);
    }

    /**
     * Determine if a given value is valid JSON.
     */
    static isJson(value) {
        if (typeof value !== 'string') return false;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Determine if a given value is a valid URL.
     */
    static isUrl(value, protocols = []) {
        if (typeof value !== 'string') return false;

        try {
            const url = new URL(value);
            if (protocols.length === 0) return true;
            return protocols.includes(url.protocol.replace(':', ''));
        } catch {
            return false;
        }
    }

    /**
     * Determine if a given value is a valid UUID.
     */
    static isUuid(value) {
        if (typeof value !== 'string') return false;
        return validateUuid(value);
    }

    /**
     * Determine if a given value is a valid ULID.
     */
    static isUlid(value) {
        if (typeof value !== 'string') return false;
        // ULID is 26 characters, base32 encoded
        return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(value);
    }

    /**
     * Convert a string to kebab case.
     */
    static kebab(value) {
        return this.snake(value, '-');
    }

    /**
     * Return the length of the given string.
     */
    static length(value) {
        // JavaScript strings are UTF-16, but we can count Unicode code points
        return Array.from(value).length;
    }

    /**
     * Limit the number of characters in a string.
     */
    static limit(value, limit = 100, end = '...') {
        if (value.length <= limit) return value;
        return value.substring(0, limit).trimEnd() + end;
    }

    /**
     * Convert the given string to lower-case.
     */
    static lower(value) {
        return value.toLowerCase();
    }

    /**
     * Limit the number of words in a string.
     */
    static words(value, words = 100, end = '...') {
        const matches = value.match(/\S+/g) || [];
        if (matches.length <= words) return value;
        return matches.slice(0, words).join(' ') + end;
    }

    /**
     * Masks a portion of a string with a repeated character.
     */
    static mask(string, character, index, length = null) {
        if (character === '') return string;

        const stringArray = Array.from(string);
        const strLength = stringArray.length;

        let startIndex = index < 0 ? Math.max(0, strLength + index) : index;
        let maskLength = length === null ? strLength - startIndex : length;

        if (startIndex >= strLength) return string;

        const segment = stringArray.slice(startIndex, startIndex + maskLength);
        const maskChar = Array.from(character)[0];
        const masked = maskChar.repeat(segment.length);

        return stringArray.slice(0, startIndex).join('') +
               masked +
               stringArray.slice(startIndex + segment.length).join('');
    }

    /**
     * Get the string matching the given pattern.
     */
    static match(pattern, subject) {
        const matches = subject.match(pattern);
        if (!matches) return '';
        return matches[1] !== undefined ? matches[1] : matches[0];
    }

    /**
     * Determine if a given string matches a given pattern.
     */
    static isMatch(pattern, value) {
        const patterns = Array.isArray(pattern) ? pattern : [pattern];
        for (const p of patterns) {
            if (new RegExp(p).test(value)) return true;
        }
        return false;
    }

    /**
     * Get all strings matching the given pattern.
     */
    static matchAll(pattern, subject) {
        const regex = new RegExp(pattern, 'g');
        const matches = [];
        let match;

        while ((match = regex.exec(subject)) !== null) {
            matches.push(match[1] !== undefined ? match[1] : match[0]);
        }

        return matches;
    }

    /**
     * Pad both sides of a string with another.
     */
    static padBoth(value, length, pad = ' ') {
        const strLength = value.length;
        if (strLength >= length) return value;

        const padLength = length - strLength;
        const leftPad = Math.floor(padLength / 2);
        const rightPad = padLength - leftPad;

        return pad.repeat(leftPad).substring(0, leftPad) +
               value +
               pad.repeat(rightPad).substring(0, rightPad);
    }

    /**
     * Pad the left side of a string with another.
     */
    static padLeft(value, length, pad = ' ') {
        return value.padStart(length, pad);
    }

    /**
     * Pad the right side of a string with another.
     */
    static padRight(value, length, pad = ' ') {
        return value.padEnd(length, pad);
    }

    /**
     * Convert a string to Pascal case (StudlyCase).
     */
    static pascal(value) {
        return this.studly(value);
    }

    /**
     * Generate a random, secure string.
     */
    static random(length = 16) {
        if (this.randomStringFactory) {
            return this.randomStringFactory(length);
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        // Use crypto for secure randomness in Node.js or browser
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            const values = new Uint32Array(length);
            crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                result += chars[values[i] % chars.length];
            }
        } else {
            // Fallback for environments without crypto
            for (let i = 0; i < length; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        return result;
    }

    /**
     * Remove all non-numeric characters from a string.
     */
    static numbers(value) {
        return value.replace(/[^0-9]/g, '');
    }

    /**
     * Replace a given value in the string.
     */
    static replace(search, replace, subject, caseSensitive = true) {
        if (Array.isArray(subject)) {
            return subject.map(s => this.replace(search, replace, s, caseSensitive));
        }

        if (caseSensitive) {
            if (Array.isArray(search)) {
                search.forEach((s, i) => {
                    const r = Array.isArray(replace) ? replace[i] : replace;
                    subject = subject.split(s).join(r);
                });
                return subject;
            }
            return subject.split(search).join(replace);
        } else {
            const regex = new RegExp(search, 'gi');
            return subject.replace(regex, replace);
        }
    }

    /**
     * Replace the first occurrence of a given value in the string.
     */
    static replaceFirst(search, replace, subject) {
        if (search === '') return subject;
        const position = subject.indexOf(search);
        if (position === -1) return subject;
        return subject.substring(0, position) + replace + subject.substring(position + search.length);
    }

    /**
     * Replace the last occurrence of a given value in the string.
     */
    static replaceLast(search, replace, subject) {
        if (search === '') return subject;
        const position = subject.lastIndexOf(search);
        if (position === -1) return subject;
        return subject.substring(0, position) + replace + subject.substring(position + search.length);
    }

    /**
     * Remove any occurrence of the given string in the subject.
     */
    static remove(search, subject, caseSensitive = true) {
        return this.replace(search, '', subject, caseSensitive);
    }

    /**
     * Reverse the given string.
     */
    static reverse(value) {
        return Array.from(value).reverse().join('');
    }

    /**
     * Begin a string with a single instance of a given value.
     */
    static start(value, prefix) {
        const quotedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`^(?:${quotedPrefix})+`);
        return prefix + value.replace(regex, '');
    }

    /**
     * Convert the given string to upper-case.
     */
    static upper(value) {
        return value.toUpperCase();
    }

    /**
     * Convert the given string to title case.
     */
    static title(value) {
        return value.replace(/\w\S*/g, txt =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

    /**
     * Convert the given string to title case for each word.
     */
    static headline(value) {
        const parts = value.split(/[\s_-]+/);
        return parts
            .map(part => this.title(part))
            .join(' ');
    }

    /**
     * Get the singular form of an English word.
     */
    static singular(value) {
        // Simple singularization rules
        if (value.endsWith('ies')) {
            return value.slice(0, -3) + 'y';
        }
        if (value.endsWith('es')) {
            return value.slice(0, -2);
        }
        if (value.endsWith('s') && !value.endsWith('ss')) {
            return value.slice(0, -1);
        }
        return value;
    }

    /**
     * Get the plural form of an English word.
     */
    static plural(value, count = 2) {
        if (count === 1) return value;

        // Simple pluralization rules
        if (value.endsWith('y') && !/[aeiou]y$/.test(value)) {
            return value.slice(0, -1) + 'ies';
        }
        if (value.endsWith('s') || value.endsWith('sh') || value.endsWith('ch')) {
            return value + 'es';
        }
        return value + 's';
    }

    /**
     * Generate a URL friendly "slug" from a given string.
     */
    static slug(title, separator = '-') {
        // Convert to lowercase and replace special characters
        let slug = title.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics

        // Replace non-alphanumeric characters with separator
        slug = slug.replace(/[^a-z0-9]+/g, separator);

        // Remove leading/trailing separators
        slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

        return slug;
    }

    /**
     * Convert a string to snake case.
     */
    static snake(value, delimiter = '_') {
        const key = value + delimiter;

        if (this.snakeCache[key]) {
            return this.snakeCache[key];
        }

        // Handle special cases
        if (!/[A-Z]/.test(value)) {
            return value;
        }

        const result = value
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1' + delimiter + '$2')
            .replace(/([a-z\d])([A-Z])/g, '$1' + delimiter + '$2')
            .replace(/[-\s]+/g, delimiter)
            .toLowerCase();

        this.snakeCache[key] = result;
        return result;
    }

    /**
     * Remove whitespace from both ends of a string.
     */
    static trim(value, charlist = null) {
        if (charlist === null) {
            return value.trim();
        }
        const chars = charlist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '');
    }

    /**
     * Remove whitespace from the beginning of a string.
     */
    static ltrim(value, charlist = null) {
        if (charlist === null) {
            return value.trimStart();
        }
        const chars = charlist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(`^[${chars}]+`, 'g'), '');
    }

    /**
     * Remove whitespace from the end of a string.
     */
    static rtrim(value, charlist = null) {
        if (charlist === null) {
            return value.trimEnd();
        }
        const chars = charlist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(`[${chars}]+$`, 'g'), '');
    }

    /**
     * Remove all "extra" blank space from the given string.
     */
    static squish(value) {
        return this.trim(value).replace(/\s+/g, ' ');
    }

    /**
     * Determine if a given string starts with a given substring.
     */
    static startsWith(haystack, needles) {
        if (!haystack) return false;

        const needleArray = Array.isArray(needles) ? needles : [needles];
        for (const needle of needleArray) {
            if (needle !== '' && haystack.startsWith(needle)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determine if a given string doesn't start with a given substring.
     */
    static doesntStartWith(haystack, needles) {
        return !this.startsWith(haystack, needles);
    }

    /**
     * Convert a value to studly caps case.
     */
    static studly(value) {
        if (this.studlyCache[value]) {
            return this.studlyCache[value];
        }

        const result = value
            .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
            .replace(/^(.)/, (_, c) => c.toUpperCase());

        this.studlyCache[value] = result;
        return result;
    }

    /**
     * Returns the portion of the string specified by the start and length parameters.
     */
    static substr(string, start, length = null) {
        const str = Array.from(string);

        if (start < 0) {
            start = Math.max(0, str.length + start);
        }

        if (length === null) {
            return str.slice(start).join('');
        }

        if (length < 0) {
            return str.slice(start, str.length + length).join('');
        }

        return str.slice(start, start + length).join('');
    }

    /**
     * Returns the number of substring occurrences.
     */
    static substrCount(haystack, needle, offset = 0, length = null) {
        let str = haystack;

        if (offset !== 0 || length !== null) {
            str = this.substr(haystack, offset, length);
        }

        return (str.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    }

    /**
     * Make a string's first character lowercase.
     */
    static lcfirst(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    /**
     * Make a string's first character uppercase.
     */
    static ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Split a string into pieces by uppercase characters.
     */
    static ucsplit(string) {
        return string.split(/(?=[A-Z])/).filter(s => s.length > 0);
    }

    /**
     * Get the number of words a string contains.
     */
    static wordCount(string) {
        return (string.match(/\S+/g) || []).length;
    }

    /**
     * Wrap the string with the given strings.
     */
    static wrap(value, before, after = null) {
        return before + value + (after !== null ? after : before);
    }

    /**
     * Unwrap the string with the given strings.
     */
    static unwrap(value, before, after = null) {
        after = after !== null ? after : before;

        if (this.startsWith(value, before)) {
            value = this.substr(value, this.length(before));
        }

        if (this.endsWith(value, after)) {
            value = this.substr(value, 0, -this.length(after));
        }

        return value;
    }

    /**
     * Generate a UUID (version 4).
     */
    static uuid() {
        return this.uuidFactory ? this.uuidFactory() : uuidv4();
    }

    /**
     * Generate a UUID (version 7).
     */
    static uuid7() {
        return this.uuidFactory ? this.uuidFactory() : uuidv7();
    }

    /**
     * Generate a ULID.
     */
    static ulid() {
        if (this.ulidFactory) {
            return this.ulidFactory();
        }

        // Simple ULID implementation
        // ULID format: 10 characters timestamp + 16 characters randomness
        const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
        const ENCODING_LEN = ENCODING.length;
        const TIME_LEN = 10;
        const RANDOM_LEN = 16;

        const now = Date.now();
        let ulid = '';

        // Encode timestamp
        let time = now;
        for (let i = TIME_LEN - 1; i >= 0; i--) {
            const mod = time % ENCODING_LEN;
            ulid = ENCODING.charAt(mod) + ulid;
            time = (time - mod) / ENCODING_LEN;
        }

        // Add randomness
        for (let i = 0; i < RANDOM_LEN; i++) {
            ulid += ENCODING.charAt(Math.floor(Math.random() * ENCODING_LEN));
        }

        return ulid;
    }

    /**
     * Set the callable that will be used to generate UUIDs.
     */
    static createUuidsUsing(factory = null) {
        this.uuidFactory = factory;
    }

    /**
     * Set the callable that will be used to generate ULIDs.
     */
    static createUlidsUsing(factory = null) {
        this.ulidFactory = factory;
    }

    /**
     * Set the callable that will be used to generate random strings.
     */
    static createRandomStringsUsing(factory = null) {
        this.randomStringFactory = factory;
    }

    /**
     * Indicate that random strings should be created normally.
     */
    static createRandomStringsNormally() {
        this.randomStringFactory = null;
    }

    /**
     * Indicate that UUIDs should be created normally.
     */
    static createUuidsNormally() {
        this.uuidFactory = null;
    }

    /**
     * Indicate that ULIDs should be created normally.
     */
    static createUlidsNormally() {
        this.ulidFactory = null;
    }

    /**
     * Transliterate a string to its closest ASCII representation.
     */
    static ascii(value, language = 'en') {
        // Simple ASCII conversion by removing diacritics
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Transliterate a string to its closest ASCII representation.
     */
    static transliterate(string, unknown = '?', strict = false) {
        // Normalize and remove diacritics
        const normalized = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // Replace non-ASCII characters with unknown character if strict
        if (strict) {
            return normalized.replace(/[^\x00-\x7F]/g, unknown);
        }

        return normalized;
    }

    /**
     * Extracts an excerpt from text that matches the first instance of a phrase.
     */
    static excerpt(text, phrase = '', options = {}) {
        const radius = options.radius || 100;
        const omission = options.omission || '...';

        if (!phrase) {
            return text.length > radius ? text.substring(0, radius).trim() + omission : text;
        }

        const position = text.toLowerCase().indexOf(phrase.toLowerCase());
        if (position === -1) return null;

        const start = Math.max(0, position - radius);
        const end = Math.min(text.length, position + phrase.length + radius);

        let excerpt = text.substring(start, end).trim();

        if (start > 0) excerpt = omission + excerpt;
        if (end < text.length) excerpt = excerpt + omission;

        return excerpt;
    }

    /**
     * Generate a secure password.
     */
    static password(length = 32, letters = true, numbers = true, symbols = true, spaces = false) {
        const options = [];

        if (letters) {
            options.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        }
        if (numbers) {
            options.push('0123456789');
        }
        if (symbols) {
            options.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
        }
        if (spaces) {
            options.push(' ');
        }

        const allChars = options.join('');
        let password = '';

        // Use crypto for secure randomness
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            const values = new Uint32Array(length);
            crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                password += allChars[values[i] % allChars.length];
            }
        } else {
            for (let i = 0; i < length; i++) {
                password += allChars[Math.floor(Math.random() * allChars.length)];
            }
        }

        return password;
    }

    /**
     * Find the position of the first occurrence of a substring.
     */
    static position(haystack, needle, offset = 0) {
        const position = haystack.indexOf(needle, offset);
        return position === -1 ? false : position;
    }

    /**
     * Replace a given value in the string sequentially with an array.
     */
    static replaceArray(search, replace, subject) {
        const replaceArray = Array.isArray(replace) ? replace : [replace];
        const segments = subject.split(search);
        let result = segments[0];

        for (let i = 1; i < segments.length; i++) {
            const replacement = replaceArray[i - 1] !== undefined ? replaceArray[i - 1] : search;
            result += replacement + segments[i];
        }

        return result;
    }

    /**
     * Replace the first occurrence of the given value if it appears at the start.
     */
    static replaceStart(search, replace, subject) {
        if (search === '') return subject;
        if (this.startsWith(subject, search)) {
            return this.replaceFirst(search, replace, subject);
        }
        return subject;
    }

    /**
     * Replace the last occurrence of a given value if it appears at the end.
     */
    static replaceEnd(search, replace, subject) {
        if (search === '') return subject;
        if (this.endsWith(subject, search)) {
            return this.replaceLast(search, replace, subject);
        }
        return subject;
    }

    /**
     * Replace the patterns matching the given regular expression.
     */
    static replaceMatches(pattern, replace, subject, limit = -1) {
        if (typeof replace === 'function') {
            return subject.replace(pattern, replace);
        }

        if (limit === -1) {
            return subject.replace(pattern, replace);
        }

        let count = 0;
        return subject.replace(pattern, (match) => {
            if (limit !== -1 && count >= limit) return match;
            count++;
            return replace;
        });
    }

    /**
     * Convert the given string to APA-style title case.
     */
    static apa(value) {
        if (value.trim() === '') return value;

        const minorWords = [
            'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an',
            'the', 'at', 'by', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via'
        ];

        const words = value.split(/\s+/);

        return words.map((word, index) => {
            const lowerWord = word.toLowerCase();

            // Always capitalize first word
            if (index === 0) {
                return this.ucfirst(lowerWord);
            }

            // Check if word contains hyphen
            if (word.includes('-')) {
                return word.split('-').map(part =>
                    minorWords.includes(part.toLowerCase()) && part.length <= 3 ?
                        part.toLowerCase() : this.ucfirst(part.toLowerCase())
                ).join('-');
            }

            // Minor words in lowercase (unless they're long)
            if (minorWords.includes(lowerWord) && lowerWord.length <= 3) {
                return lowerWord;
            }

            return this.ucfirst(lowerWord);
        }).join(' ');
    }

    /**
     * Pluralize the last word of an English, studly caps case string.
     */
    static pluralStudly(value, count = 2) {
        const parts = value.split(/(?=[A-Z])/);
        const lastWord = parts.pop();
        return parts.join('') + this.plural(lastWord, count);
    }

    /**
     * Pluralize the last word of an English, Pascal case string.
     */
    static pluralPascal(value, count = 2) {
        return this.pluralStudly(value, count);
    }

    /**
     * Replace text within a portion of a string.
     */
    static substrReplace(string, replace, offset = 0, length = null) {
        const stringArray = Array.from(string);

        if (length === null) {
            length = stringArray.length;
        }

        const before = stringArray.slice(0, offset).join('');
        const after = stringArray.slice(offset + length).join('');

        return before + replace + after;
    }

    /**
     * Swap multiple keywords in a string with other keywords.
     */
    static swap(map, subject) {
        // Sort keys by length (longest first) to avoid partial replacements
        const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

        let result = subject;
        for (const key of sortedKeys) {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            result = result.replace(new RegExp(escapedKey, 'g'), map[key]);
        }

        return result;
    }

    /**
     * Wrap a string to a given number of characters.
     */
    static wordWrap(string, characters = 75, breakStr = '\n', cutLongWords = false) {
        if (characters <= 0) return string;

        const words = string.split(' ');
        let lines = [];
        let currentLine = '';

        for (const word of words) {
            if (cutLongWords && word.length > characters) {
                // If current line has content, push it
                if (currentLine) {
                    lines.push(currentLine.trim());
                    currentLine = '';
                }

                // Split long word
                for (let i = 0; i < word.length; i += characters) {
                    lines.push(word.substring(i, i + characters));
                }
            } else {
                const testLine = currentLine ? currentLine + ' ' + word : word;

                if (testLine.length <= characters) {
                    currentLine = testLine;
                } else {
                    if (currentLine) {
                        lines.push(currentLine.trim());
                    }
                    currentLine = word;
                }
            }
        }

        if (currentLine) {
            lines.push(currentLine.trim());
        }

        return lines.join(breakStr);
    }

    /**
     * Convert case of a string using different modes.
     */
    static convertCase(string, mode = 'lower', encoding = 'UTF-8') {
        switch (mode) {
            case 'upper':
                return string.toUpperCase();
            case 'lower':
                return string.toLowerCase();
            case 'title':
                return this.title(string);
            default:
                return string.toLowerCase();
        }
    }

    /**
     * Remove all strings from the casing caches.
     */
    static flushCache() {
        this.snakeCache = {};
        this.camelCache = {};
        this.studlyCache = {};
    }

    /**
     * Convert the given string to Base64 encoding.
     */
    static toBase64(string) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(string).toString('base64');
        }
        return btoa(string);
    }

    /**
     * Decode the given Base64 encoded string.
     */
    static fromBase64(string, strict = false) {
        try {
            if (typeof Buffer !== 'undefined') {
                return Buffer.from(string, 'base64').toString('utf8');
            }
            return atob(string);
        } catch (e) {
            return strict ? false : '';
        }
    }

    /**
     * Take the first or last {limit} characters of a string.
     */
    static take(string, limit) {
        if (limit < 0) {
            return this.substr(string, limit);
        }
        return this.substr(string, 0, limit);
    }

    /**
     * Repeat the given string.
     */
    static repeat(string, times) {
        return string.repeat(times);
    }

    /**
     * Replace consecutive instances of a given character with a single character.
     */
    static deduplicate(string, characters = ' ') {
        const chars = Array.isArray(characters) ? characters : [characters];

        let result = string;
        for (const char of chars) {
            const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            result = result.replace(new RegExp(`${escapedChar}+`, 'g'), char);
        }

        return result;
    }
}

export default Str;
