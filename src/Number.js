/**
 * Number utility class for formatting and manipulating numbers
 * Inspired by Laravel's Number helper
 *
 * @class Number
 */
class Number {
    /**
     * The current default locale
     * @private
     */
    static #locale = 'en-US';

    /**
     * The current default currency
     * @private
     */
    static #currency = 'USD';

    /**
     * Format the given number according to the current locale
     *
     * @param {number} number - The number to format
     * @param {number|null} precision - Exact decimal places (overrides maxPrecision)
     * @param {number|null} maxPrecision - Maximum decimal places
     * @param {string|null} locale - The locale to use (defaults to current locale)
     * @returns {string} The formatted number
     *
     * @example
     * Number.format(1234.567); // "1,234.567"
     * Number.format(1234.567, 2); // "1,234.57"
     * Number.format(1234.5, null, 2); // "1,234.5" (max 2 decimals, but only shows 1)
     */
    static format(number, precision = null, maxPrecision = null, locale = null) {
        const options = { useGrouping: true };

        if (maxPrecision !== null) {
            options.minimumFractionDigits = 0;
            options.maximumFractionDigits = maxPrecision;
        } else if (precision !== null) {
            options.minimumFractionDigits = precision;
            options.maximumFractionDigits = precision;
        }

        return new Intl.NumberFormat(locale || this.#locale, options).format(number);
    }

    /**
     * Parse a string into a number according to the specified locale
     * Note: JavaScript's Intl API doesn't provide parsing, so this is a simplified version
     *
     * @param {string} string - The string to parse
     * @param {string|null} locale - The locale to use (for future compatibility)
     * @returns {number|null} The parsed number or null if invalid
     *
     * @example
     * Number.parse("1,234.56"); // 1234.56
     * Number.parse("invalid"); // null
     */
    static parse(string, locale = null) {
        // Remove common number formatting characters
        const cleaned = string.replace(/[,\s]/g, '');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? null : parsed;
    }

    /**
     * Parse a string into an integer
     *
     * @param {string} string - The string to parse
     * @param {string|null} locale - The locale to use (for future compatibility)
     * @returns {number|null} The parsed integer or null if invalid
     *
     * @example
     * Number.parseInt("1,234"); // 1234
     * Number.parseInt("123.99"); // 123
     */
    static parseInt(string, locale = null) {
        const parsed = this.parse(string, locale);
        return parsed !== null ? Math.floor(parsed) : null;
    }

    /**
     * Parse a string into a float
     *
     * @param {string} string - The string to parse
     * @param {string|null} locale - The locale to use (for future compatibility)
     * @returns {number|null} The parsed float or null if invalid
     *
     * @example
     * Number.parseFloat("1,234.56"); // 1234.56
     */
    static parseFloat(string, locale = null) {
        return this.parse(string, locale);
    }

    /**
     * Spell out the given number in the given locale
     * Uses Intl.NumberFormat with spellout rule set where available
     *
     * @param {number} number - The number to spell out
     * @param {string|null} locale - The locale to use
     * @param {number|null} after - Only spell if number is greater than this
     * @param {number|null} until - Only spell if number is less than this
     * @returns {string} The spelled out number
     *
     * @example
     * Number.spell(42); // "forty-two"
     * Number.spell(100, null, 50); // "100" (greater than 'after' threshold)
     */
    static spell(number, locale = null, after = null, until = null) {
        // Check thresholds
        if (after !== null && number <= after) {
            return this.format(number, 0, null, locale);
        }

        if (until !== null && number >= until) {
            return this.format(number, 0, null, locale);
        }

        // JavaScript doesn't have native spell-out support in all environments
        // Provide a basic implementation for common numbers
        return this.#spellOutNumber(number, locale);
    }

    /**
     * Convert the given number to ordinal form (1st, 2nd, 3rd, etc.)
     *
     * @param {number} number - The number to convert
     * @param {string|null} locale - The locale to use
     * @returns {string} The ordinal number
     *
     * @example
     * Number.ordinal(1); // "1st"
     * Number.ordinal(22); // "22nd"
     * Number.ordinal(103); // "103rd"
     */
    static ordinal(number, locale = null) {
        // Try to use Intl.PluralRules for locale-aware ordinals
        try {
            const pr = new Intl.PluralRules(locale || this.#locale, { type: 'ordinal' });
            const rule = pr.select(number);
            const suffixes = {
                'one': 'st',
                'two': 'nd',
                'few': 'rd',
                'other': 'th'
            };
            return `${number}${suffixes[rule] || 'th'}`;
        } catch (e) {
            // Fallback for older environments
            return this.#basicOrdinal(number);
        }
    }

    /**
     * Spell out the ordinal form (first, second, third, etc.)
     *
     * @param {number} number - The number to spell out
     * @param {string|null} locale - The locale to use
     * @returns {string} The spelled ordinal
     *
     * @example
     * Number.spellOrdinal(1); // "first"
     * Number.spellOrdinal(22); // "twenty-second"
     */
    static spellOrdinal(number, locale = null) {
        return this.#spellOutOrdinal(number, locale);
    }

    /**
     * Convert the given number to its percentage equivalent
     *
     * @param {number} number - The number to convert (e.g., 50 for 50%)
     * @param {number} precision - Decimal places
     * @param {number|null} maxPrecision - Maximum decimal places
     * @param {string|null} locale - The locale to use
     * @returns {string} The formatted percentage
     *
     * @example
     * Number.percentage(50); // "50%"
     * Number.percentage(66.666, 2); // "66.67%"
     */
    static percentage(number, precision = 0, maxPrecision = null, locale = null) {
        const options = { style: 'percent' };

        if (maxPrecision !== null) {
            options.minimumFractionDigits = 0;
            options.maximumFractionDigits = maxPrecision;
        } else {
            options.minimumFractionDigits = precision;
            options.maximumFractionDigits = precision;
        }

        return new Intl.NumberFormat(locale || this.#locale, options).format(number / 100);
    }

    /**
     * Convert the given number to its currency equivalent
     *
     * @param {number} number - The number to format
     * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
     * @param {string|null} locale - The locale to use
     * @param {number|null} precision - Decimal places
     * @returns {string} The formatted currency
     *
     * @example
     * Number.currency(1234.56); // "$1,234.56"
     * Number.currency(1234.56, 'EUR'); // "€1,234.56"
     * Number.currency(1234.5, 'USD', null, 2); // "$1,234.50"
     */
    static currency(number, currency = '', locale = null, precision = null) {
        const options = {
            style: 'currency',
            currency: currency || this.#currency
        };

        if (precision !== null) {
            options.minimumFractionDigits = precision;
            options.maximumFractionDigits = precision;
        }

        return new Intl.NumberFormat(locale || this.#locale, options).format(number);
    }

    /**
     * Convert the given number to its file size equivalent
     *
     * @param {number} bytes - The number of bytes
     * @param {number} precision - Decimal places
     * @param {number|null} maxPrecision - Maximum decimal places
     * @returns {string} The formatted file size
     *
     * @example
     * Number.fileSize(1024); // "1 KB"
     * Number.fileSize(1536, 2); // "1.50 KB"
     * Number.fileSize(1024 * 1024 * 5); // "5 MB"
     */
    static fileSize(bytes, precision = 0, maxPrecision = null) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        let i = 0;
        for (i = 0; (bytes / 1024) > 0.9 && (i < units.length - 1); i++) {
            bytes /= 1024;
        }

        return `${this.format(bytes, precision, maxPrecision)} ${units[i]}`;
    }

    /**
     * Convert the number to its human-readable equivalent (abbreviated)
     *
     * @param {number} number - The number to abbreviate
     * @param {number} precision - Decimal places
     * @param {number|null} maxPrecision - Maximum decimal places
     * @returns {string} The abbreviated number
     *
     * @example
     * Number.abbreviate(1000); // "1K"
     * Number.abbreviate(1500000); // "1.5M"
     * Number.abbreviate(2500000000); // "2.5B"
     */
    static abbreviate(number, precision = 0, maxPrecision = null) {
        return this.forHumans(number, precision, maxPrecision, true);
    }

    /**
     * Convert the number to its human-readable equivalent
     *
     * @param {number} number - The number to convert
     * @param {number} precision - Decimal places
     * @param {number|null} maxPrecision - Maximum decimal places
     * @param {boolean} abbreviate - Use abbreviated format (K, M, B) instead of full words
     * @returns {string} The human-readable number
     *
     * @example
     * Number.forHumans(1000); // "1 thousand"
     * Number.forHumans(1500000); // "1.5 million"
     * Number.forHumans(1000, 0, null, true); // "1K"
     */
    static forHumans(number, precision = 0, maxPrecision = null, abbreviate = false) {
        const units = abbreviate ? {
            3: 'K',
            6: 'M',
            9: 'B',
            12: 'T',
            15: 'Q'
        } : {
            3: ' thousand',
            6: ' million',
            9: ' billion',
            12: ' trillion',
            15: ' quadrillion'
        };

        return this.#summarize(number, precision, maxPrecision, units);
    }

    /**
     * Clamp the given number between the given minimum and maximum
     *
     * @param {number} number - The number to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} The clamped number
     *
     * @example
     * Number.clamp(5, 1, 10); // 5
     * Number.clamp(0, 1, 10); // 1
     * Number.clamp(15, 1, 10); // 10
     */
    static clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }

    /**
     * Split the given number into pairs of min/max values
     *
     * @param {number} to - The maximum value
     * @param {number} by - The step size
     * @param {number} start - The starting value
     * @param {number} offset - Offset for the upper bound
     * @returns {Array<[number, number]>} Array of [min, max] pairs
     *
     * @example
     * Number.pairs(10, 3); // [[0, 2], [3, 5], [6, 8], [9, 10]]
     * Number.pairs(10, 5, 0, 0); // [[0, 5], [5, 10], [10, 10]]
     */
    static pairs(to, by, start = 0, offset = 1) {
        const output = [];

        for (let lower = start; lower <= to; lower += by) {
            let upper = lower + by - offset;

            if (upper > to) {
                upper = to;
            }

            output.push([lower, upper]);
        }

        return output;
    }

    /**
     * Remove any trailing zero digits after the decimal point
     *
     * @param {number} number - The number to trim
     * @returns {number} The trimmed number
     *
     * @example
     * Number.trim(1.50); // 1.5
     * Number.trim(1.00); // 1
     * Number.trim(1.230); // 1.23
     */
    static trim(number) {
        return parseFloat(number.toString());
    }

    /**
     * Execute the given callback using the given locale
     *
     * @param {string} locale - The locale to use
     * @param {Function} callback - The callback to execute
     * @returns {*} The callback result
     *
     * @example
     * Number.withLocale('de-DE', () => Number.format(1234.56)); // "1.234,56"
     */
    static withLocale(locale, callback) {
        const previousLocale = this.#locale;
        this.#locale = locale;

        try {
            return callback();
        } finally {
            this.#locale = previousLocale;
        }
    }

    /**
     * Execute the given callback using the given currency
     *
     * @param {string} currency - The currency code
     * @param {Function} callback - The callback to execute
     * @returns {*} The callback result
     *
     * @example
     * Number.withCurrency('EUR', () => Number.currency(100)); // "€100.00"
     */
    static withCurrency(currency, callback) {
        const previousCurrency = this.#currency;
        this.#currency = currency;

        try {
            return callback();
        } finally {
            this.#currency = previousCurrency;
        }
    }

    /**
     * Set the default locale
     *
     * @param {string} locale - The locale to set
     *
     * @example
     * Number.useLocale('fr-FR');
     */
    static useLocale(locale) {
        this.#locale = locale;
    }

    /**
     * Set the default currency
     *
     * @param {string} currency - The currency code to set
     *
     * @example
     * Number.useCurrency('GBP');
     */
    static useCurrency(currency) {
        this.#currency = currency;
    }

    /**
     * Get the default locale
     *
     * @returns {string} The current default locale
     *
     * @example
     * Number.defaultLocale(); // "en-US"
     */
    static defaultLocale() {
        return this.#locale;
    }

    /**
     * Get the default currency
     *
     * @returns {string} The current default currency
     *
     * @example
     * Number.defaultCurrency(); // "USD"
     */
    static defaultCurrency() {
        return this.#currency;
    }

    // Private helper methods

    /**
     * Basic ordinal suffix generator
     * @private
     */
    static #basicOrdinal(number) {
        const j = number % 10;
        const k = number % 100;

        if (j === 1 && k !== 11) {
            return `${number}st`;
        }
        if (j === 2 && k !== 12) {
            return `${number}nd`;
        }
        if (j === 3 && k !== 13) {
            return `${number}rd`;
        }
        return `${number}th`;
    }

    /**
     * Spell out a number
     * @private
     */
    static #spellOutNumber(number, locale) {
        const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if (number < 10) {
            return ones[number];
        }
        if (number < 20) {
            return teens[number - 10];
        }
        if (number < 100) {
            const ten = Math.floor(number / 10);
            const one = number % 10;
            return tens[ten] + (one > 0 ? '-' + ones[one] : '');
        }
        if (number < 1000) {
            const hundred = Math.floor(number / 100);
            const remainder = number % 100;
            return ones[hundred] + ' hundred' + (remainder > 0 ? ' ' + this.#spellOutNumber(remainder, locale) : '');
        }

        // For larger numbers, return numeric format
        return this.format(number, 0);
    }

    /**
     * Spell out ordinal
     * @private
     */
    static #spellOutOrdinal(number, locale) {
        const ones = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
        const teens = ['tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
        const tens = ['', '', 'twentieth', 'thirtieth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth', 'eightieth', 'ninetieth'];
        const tensPrefix = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if (number < 10) {
            return ones[number];
        }
        if (number < 20) {
            return teens[number - 10];
        }
        if (number < 100) {
            const ten = Math.floor(number / 10);
            const one = number % 10;
            if (one === 0) {
                return tens[ten];
            }
            return tensPrefix[ten] + '-' + ones[one];
        }

        // For larger numbers, use numeric ordinal
        return this.ordinal(number, locale);
    }

    /**
     * Summarize a number with units
     * @private
     */
    static #summarize(number, precision = 0, maxPrecision = null, units = {}) {
        // Handle zero
        if (number === 0) {
            return precision > 0 ? this.format(0, precision, maxPrecision) : '0';
        }

        // Handle negative
        if (number < 0) {
            return '-' + this.#summarize(Math.abs(number), precision, maxPrecision, units);
        }

        // Handle very large numbers (>= 1 quadrillion)
        if (number >= 1e15) {
            const unitValues = Object.values(units);
            return this.#summarize(number / 1e15, precision, maxPrecision, units) + unitValues[unitValues.length - 1];
        }

        const numberExponent = Math.floor(Math.log10(number));
        const displayExponent = numberExponent - (numberExponent % 3);
        const scaled = number / Math.pow(10, displayExponent);

        return (this.format(scaled, precision, maxPrecision) + (units[displayExponent] || '')).trim();
    }
}

export default Number;
