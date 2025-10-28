import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import Number from '../Number.js';

describe('Number', () => {
    describe('format', () => {
        test('formats numbers with default locale', () => {
            assert.strictEqual(Number.format(1234.567), '1,234.567');
            assert.strictEqual(Number.format(1000000), '1,000,000');
        });

        test('formats numbers with precision', () => {
            assert.strictEqual(Number.format(1234.567, 2), '1,234.57');
            assert.strictEqual(Number.format(1234.5, 2), '1,234.50');
        });

        test('formats numbers with max precision', () => {
            assert.strictEqual(Number.format(1234.5, null, 2), '1,234.5');
            assert.strictEqual(Number.format(1234.567, null, 2), '1,234.57');
        });

        test('formats zero', () => {
            assert.strictEqual(Number.format(0), '0');
            assert.strictEqual(Number.format(0, 2), '0.00');
        });

        test('formats negative numbers', () => {
            assert.strictEqual(Number.format(-1234.56), '-1,234.56');
        });
    });

    describe('parse', () => {
        test('parses formatted numbers', () => {
            assert.strictEqual(Number.parse('1,234.56'), 1234.56);
            assert.strictEqual(Number.parse('1 234.56'), 1234.56);
        });

        test('parses simple numbers', () => {
            assert.strictEqual(Number.parse('123'), 123);
            assert.strictEqual(Number.parse('123.45'), 123.45);
        });

        test('returns null for invalid input', () => {
            assert.strictEqual(Number.parse('invalid'), null);
            assert.strictEqual(Number.parse('abc123'), null);
        });

        test('parses negative numbers', () => {
            assert.strictEqual(Number.parse('-123.45'), -123.45);
        });

        test('handles locale-specific decimal separators', () => {
            // French: comma is decimal, space is thousands
            assert.strictEqual(Number.parse('10,5', 'fr'), 10.5);
            assert.strictEqual(Number.parse('1 234,56', 'fr-FR'), 1234.56);

            // German: comma is decimal, period is thousands
            assert.strictEqual(Number.parse('10,5', 'de'), 10.5);
            assert.strictEqual(Number.parse('1.234,56', 'de-DE'), 1234.56);
        });
    });

    describe('parseInt', () => {
        test('parses integers from strings', () => {
            assert.strictEqual(Number.parseInt('123'), 123);
            assert.strictEqual(Number.parseInt('1,234'), 1234);
        });

        test('truncates decimals', () => {
            assert.strictEqual(Number.parseInt('123.99'), 123);
            assert.strictEqual(Number.parseInt('123.45'), 123);
        });

        test('returns null for invalid input', () => {
            assert.strictEqual(Number.parseInt('invalid'), null);
        });

        test('handles French locale with comma as decimal separator', () => {
            // In French locale, comma is decimal separator: "10,123" = 10.123
            assert.strictEqual(Number.parseInt('10,123', 'fr'), 10);
        });
    });

    describe('parseFloat', () => {
        test('parses floats from strings', () => {
            assert.strictEqual(Number.parseFloat('123.45'), 123.45);
            assert.strictEqual(Number.parseFloat('1,234.56'), 1234.56);
        });

        test('returns null for invalid input', () => {
            assert.strictEqual(Number.parseFloat('invalid'), null);
        });

        test('handles locale-specific formats', () => {
            // French: comma as decimal
            assert.strictEqual(Number.parseFloat('10,123', 'fr'), 10.123);

            // German: comma as decimal, period as thousands
            assert.strictEqual(Number.parseFloat('1.234,56', 'de'), 1234.56);
        });
    });

    describe('spell', () => {
        test('spells out small numbers', () => {
            assert.strictEqual(Number.spell(0), 'zero');
            assert.strictEqual(Number.spell(5), 'five');
            assert.strictEqual(Number.spell(10), 'ten');
            assert.strictEqual(Number.spell(15), 'fifteen');
        });

        test('spells out tens', () => {
            assert.strictEqual(Number.spell(20), 'twenty');
            assert.strictEqual(Number.spell(42), 'forty-two');
            assert.strictEqual(Number.spell(99), 'ninety-nine');
        });

        test('spells out hundreds', () => {
            assert.strictEqual(Number.spell(100), 'one hundred');
            assert.strictEqual(Number.spell(123), 'one hundred and twenty-three'); // n2words uses "and"
            assert.strictEqual(Number.spell(500), 'five hundred');
        });

        test('respects after threshold', () => {
            assert.strictEqual(Number.spell(5, null, 10), '5');
            assert.strictEqual(Number.spell(15, null, 10), 'fifteen');
        });

        test('respects until threshold', () => {
            assert.strictEqual(Number.spell(5, null, null, 10), 'five');
            assert.strictEqual(Number.spell(15, null, null, 10), '15');
        });

        test('supports multiple locales', () => {
            // French
            assert.strictEqual(Number.spell(42, 'fr'), 'quarante-deux');
            assert.strictEqual(Number.spell(100, 'fr'), 'cent');

            // Spanish
            assert.strictEqual(Number.spell(42, 'es'), 'cuarenta y dos');
            assert.strictEqual(Number.spell(100, 'es'), 'cien');

            // German
            assert.strictEqual(Number.spell(42, 'de'), 'zweiundvierzig');
            assert.strictEqual(Number.spell(100, 'de'), 'einhundert');
        });
    });

    describe('ordinal', () => {
        test('returns correct ordinals for 1-10', () => {
            assert.strictEqual(Number.ordinal(1), '1st');
            assert.strictEqual(Number.ordinal(2), '2nd');
            assert.strictEqual(Number.ordinal(3), '3rd');
            assert.strictEqual(Number.ordinal(4), '4th');
            assert.strictEqual(Number.ordinal(5), '5th');
        });

        test('handles teens correctly', () => {
            assert.strictEqual(Number.ordinal(11), '11th');
            assert.strictEqual(Number.ordinal(12), '12th');
            assert.strictEqual(Number.ordinal(13), '13th');
        });

        test('handles larger numbers', () => {
            assert.strictEqual(Number.ordinal(21), '21st');
            assert.strictEqual(Number.ordinal(22), '22nd');
            assert.strictEqual(Number.ordinal(23), '23rd');
            assert.strictEqual(Number.ordinal(100), '100th');
            assert.strictEqual(Number.ordinal(101), '101st');
        });
    });

    describe('spellOrdinal', () => {
        test('spells out ordinals for small numbers', () => {
            assert.strictEqual(Number.spellOrdinal(1), 'first');
            assert.strictEqual(Number.spellOrdinal(2), 'second');
            assert.strictEqual(Number.spellOrdinal(3), 'third');
            assert.strictEqual(Number.spellOrdinal(5), 'fifth');
        });

        test('spells out ordinals for teens', () => {
            assert.strictEqual(Number.spellOrdinal(10), 'tenth');
            assert.strictEqual(Number.spellOrdinal(11), 'eleventh');
            assert.strictEqual(Number.spellOrdinal(15), 'fifteenth');
        });

        test('spells out ordinals for tens', () => {
            assert.strictEqual(Number.spellOrdinal(20), 'twentieth');
            assert.strictEqual(Number.spellOrdinal(21), 'twenty-first');
            assert.strictEqual(Number.spellOrdinal(42), 'forty-second');
        });
    });

    describe('percentage', () => {
        test('formats percentages', () => {
            assert.strictEqual(Number.percentage(50), '50%');
            assert.strictEqual(Number.percentage(100), '100%');
        });

        test('formats percentages with precision', () => {
            assert.strictEqual(Number.percentage(66.666, 2), '66.67%');
            assert.strictEqual(Number.percentage(33.333, 1), '33.3%');
            assert.strictEqual(Number.percentage(10, 2), '10.00%');
        });

        test('formats percentages with max precision', () => {
            assert.strictEqual(Number.percentage(50, 0, 2), '50%');
            assert.strictEqual(Number.percentage(50.5, 0, 2), '50.5%');
        });
    });

    describe('currency', () => {
        test('formats currency with default settings', () => {
            const result = Number.currency(1234.56);
            assert.ok(result.includes('1,234.56') || result.includes('1234.56'));
        });

        test('formats currency with specific currency code', () => {
            const result = Number.currency(1234.56, 'EUR');
            assert.ok(result.includes('€') || result.includes('EUR'));
        });

        test('formats currency with precision', () => {
            const result = Number.currency(1234.5, 'USD', null, 2);
            assert.ok(result.includes('.50') || result.includes(',50'));
        });
    });

    describe('fileSize', () => {
        test('formats bytes', () => {
            assert.strictEqual(Number.fileSize(0), '0 B');
            assert.strictEqual(Number.fileSize(100), '100 B');
            assert.strictEqual(Number.fileSize(900), '900 B');
        });

        test('formats kilobytes', () => {
            assert.strictEqual(Number.fileSize(1024), '1 KB');
            assert.strictEqual(Number.fileSize(2048), '2 KB');
        });

        test('formats megabytes', () => {
            assert.strictEqual(Number.fileSize(1024 * 1024), '1 MB');
            assert.strictEqual(Number.fileSize(1024 * 1024 * 5.5), '6 MB');
        });

        test('formats gigabytes', () => {
            assert.strictEqual(Number.fileSize(1024 * 1024 * 1024), '1 GB');
        });

        test('formats with precision', () => {
            assert.strictEqual(Number.fileSize(1536, 2), '1.50 KB');
            assert.strictEqual(Number.fileSize(1024 * 1.5, 1), '1.5 KB');
        });
    });

    describe('abbreviate', () => {
        test('abbreviates thousands', () => {
            assert.strictEqual(Number.abbreviate(1000), '1K');
            assert.strictEqual(Number.abbreviate(5000), '5K');
        });

        test('abbreviates millions', () => {
            assert.strictEqual(Number.abbreviate(1000000), '1M');
            assert.strictEqual(Number.abbreviate(2500000, 1), '2.5M');
        });

        test('abbreviates billions', () => {
            assert.strictEqual(Number.abbreviate(1000000000), '1B');
            assert.strictEqual(Number.abbreviate(3500000000, 1), '3.5B');
        });

        test('abbreviates with precision', () => {
            assert.strictEqual(Number.abbreviate(1234, 2), '1.23K');
            assert.strictEqual(Number.abbreviate(1500000, 1), '1.5M');
        });

        test('handles small numbers', () => {
            assert.strictEqual(Number.abbreviate(0), '0');
            assert.strictEqual(Number.abbreviate(999), '999');
        });
    });

    describe('forHumans', () => {
        test('formats thousands', () => {
            assert.strictEqual(Number.forHumans(1000), '1 thousand');
            assert.strictEqual(Number.forHumans(5000), '5 thousand');
        });

        test('formats millions', () => {
            assert.strictEqual(Number.forHumans(1000000), '1 million');
            assert.strictEqual(Number.forHumans(2500000, 1), '2.5 million');
        });

        test('formats billions', () => {
            assert.strictEqual(Number.forHumans(1000000000), '1 billion');
        });

        test('formats with precision', () => {
            assert.strictEqual(Number.forHumans(1234000, 2), '1.23 million');
        });

        test('abbreviates when flag is true', () => {
            assert.strictEqual(Number.forHumans(1000, 0, null, true), '1K');
            assert.strictEqual(Number.forHumans(1000000, 0, null, true), '1M');
        });

        test('handles negative numbers', () => {
            assert.strictEqual(Number.forHumans(-1000), '-1 thousand');
            assert.strictEqual(Number.forHumans(-1000000), '-1 million');
        });

        test('handles zero', () => {
            assert.strictEqual(Number.forHumans(0), '0');
        });
    });

    describe('clamp', () => {
        test('returns number when within range', () => {
            assert.strictEqual(Number.clamp(5, 1, 10), 5);
            assert.strictEqual(Number.clamp(7.5, 0, 100), 7.5);
        });

        test('returns min when below range', () => {
            assert.strictEqual(Number.clamp(0, 1, 10), 1);
            assert.strictEqual(Number.clamp(-5, 0, 10), 0);
        });

        test('returns max when above range', () => {
            assert.strictEqual(Number.clamp(15, 1, 10), 10);
            assert.strictEqual(Number.clamp(100, 0, 50), 50);
        });

        test('handles edge cases', () => {
            assert.strictEqual(Number.clamp(1, 1, 10), 1);
            assert.strictEqual(Number.clamp(10, 1, 10), 10);
        });
    });

    describe('pairs', () => {
        test('creates pairs with default parameters', () => {
            const pairs = Number.pairs(10, 3);
            assert.deepStrictEqual(pairs, [[0, 2], [3, 5], [6, 8], [9, 10]]);
        });

        test('creates pairs with custom start', () => {
            const pairs = Number.pairs(10, 3, 1);
            assert.deepStrictEqual(pairs, [[1, 3], [4, 6], [7, 9], [10, 10]]);
        });

        test('creates pairs with zero offset', () => {
            const pairs = Number.pairs(10, 5, 0, 0);
            assert.deepStrictEqual(pairs, [[0, 5], [5, 10], [10, 10]]);
        });

        test('handles exact divisions', () => {
            const pairs = Number.pairs(9, 3);
            assert.deepStrictEqual(pairs, [[0, 2], [3, 5], [6, 8], [9, 9]]);
        });
    });

    describe('trim', () => {
        test('removes trailing zeros', () => {
            assert.strictEqual(Number.trim(1.50), 1.5);
            assert.strictEqual(Number.trim(1.00), 1);
            assert.strictEqual(Number.trim(1.230), 1.23);
        });

        test('preserves significant zeros', () => {
            assert.strictEqual(Number.trim(1.05), 1.05);
            assert.strictEqual(Number.trim(100), 100);
        });

        test('handles integers', () => {
            assert.strictEqual(Number.trim(42), 42);
        });
    });

    describe('withLocale', () => {
        test('executes callback with temporary locale', () => {
            const originalLocale = Number.defaultLocale();

            const result = Number.withLocale('de-DE', () => {
                assert.strictEqual(Number.defaultLocale(), 'de-DE');
                return Number.format(1234.56);
            });

            assert.ok(result.includes('1') && result.includes('234'));
            assert.strictEqual(Number.defaultLocale(), originalLocale);
        });

        test('restores locale even if callback throws', () => {
            const originalLocale = Number.defaultLocale();

            try {
                Number.withLocale('fr-FR', () => {
                    throw new Error('Test error');
                });
            } catch (e) {
                // Expected
            }

            assert.strictEqual(Number.defaultLocale(), originalLocale);
        });
    });

    describe('withCurrency', () => {
        test('executes callback with temporary currency', () => {
            const originalCurrency = Number.defaultCurrency();

            Number.withCurrency('EUR', () => {
                assert.strictEqual(Number.defaultCurrency(), 'EUR');
            });

            assert.strictEqual(Number.defaultCurrency(), originalCurrency);
        });

        test('restores currency even if callback throws', () => {
            const originalCurrency = Number.defaultCurrency();

            try {
                Number.withCurrency('GBP', () => {
                    throw new Error('Test error');
                });
            } catch (e) {
                // Expected
            }

            assert.strictEqual(Number.defaultCurrency(), originalCurrency);
        });
    });

    describe('useLocale / defaultLocale', () => {
        test('sets and gets locale', () => {
            const original = Number.defaultLocale();

            Number.useLocale('fr-FR');
            assert.strictEqual(Number.defaultLocale(), 'fr-FR');

            // Restore
            Number.useLocale(original);
        });
    });

    describe('useCurrency / defaultCurrency', () => {
        test('sets and gets currency', () => {
            const original = Number.defaultCurrency();

            Number.useCurrency('EUR');
            assert.strictEqual(Number.defaultCurrency(), 'EUR');

            // Restore
            Number.useCurrency(original);
        });
    });
});
