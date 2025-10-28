/**
 * Number Formatting Examples
 * Demonstrates the Number class from StringX-JS
 *
 * Run this file: node examples/number-examples.js
 */

import { Number } from '../index.js';

console.log('=== StringX-JS Number Examples ===\n');

// ============================================
// 1. Basic Number Formatting
// ============================================
console.log('1. Basic Number Formatting');
console.log('---------------------------');
console.log('Format 1234567.89:', Number.format(1234567.89));
console.log('With 2 decimals:', Number.format(1234567.89, 2));
console.log('With max 2 decimals:', Number.format(1234.5, null, 2));
console.log('Format zero:', Number.format(0));
console.log('Negative number:', Number.format(-1234.56));
console.log();

// ============================================
// 2. Percentage Formatting
// ============================================
console.log('2. Percentage Formatting');
console.log('------------------------');
console.log('50% conversion:', Number.percentage(50));
console.log('66.666% with 2 decimals:', Number.percentage(66.666, 2));
console.log('33.333% with 1 decimal:', Number.percentage(33.333, 1));
console.log('100%:', Number.percentage(100));
console.log();

// ============================================
// 3. Currency Formatting
// ============================================
console.log('3. Currency Formatting');
console.log('----------------------');
console.log('Default USD:', Number.currency(1234.56));
console.log('Euro:', Number.currency(1234.56, 'EUR'));
console.log('British Pound:', Number.currency(1234.56, 'GBP'));
console.log('Japanese Yen:', Number.currency(1234, 'JPY'));
console.log('With exact precision:', Number.currency(1234.5, 'USD', null, 2));
console.log();

// ============================================
// 4. File Size Formatting
// ============================================
console.log('4. File Size Formatting');
console.log('-----------------------');
console.log('100 bytes:', Number.fileSize(100));
console.log('1 KB:', Number.fileSize(1024));
console.log('1.5 KB:', Number.fileSize(1536, 2));
console.log('5 MB:', Number.fileSize(1024 * 1024 * 5));
console.log('2.5 GB:', Number.fileSize(1024 * 1024 * 1024 * 2.5, 1));
console.log('1 TB:', Number.fileSize(1024 * 1024 * 1024 * 1024));
console.log();

// ============================================
// 5. Human-Readable Numbers
// ============================================
console.log('5. Human-Readable Numbers');
console.log('-------------------------');
console.log('1,000:', Number.forHumans(1000));
console.log('1,500:', Number.forHumans(1500, 1));
console.log('1,000,000:', Number.forHumans(1000000));
console.log('2,500,000:', Number.forHumans(2500000, 1));
console.log('1,000,000,000:', Number.forHumans(1000000000));
console.log('Negative number:', Number.forHumans(-5000));
console.log();

// ============================================
// 6. Abbreviated Numbers
// ============================================
console.log('6. Abbreviated Numbers');
console.log('----------------------');
console.log('1,000:', Number.abbreviate(1000));
console.log('5,000:', Number.abbreviate(5000));
console.log('1,234:', Number.abbreviate(1234, 2));
console.log('1,500,000:', Number.abbreviate(1500000, 1));
console.log('1,000,000,000:', Number.abbreviate(1000000000));
console.log('3,500,000,000:', Number.abbreviate(3500000000, 1));
console.log();

// ============================================
// 7. Spelling Numbers
// ============================================
console.log('7. Spelling Numbers');
console.log('-------------------');
console.log('0:', Number.spell(0));
console.log('5:', Number.spell(5));
console.log('10:', Number.spell(10));
console.log('15:', Number.spell(15));
console.log('42:', Number.spell(42));
console.log('99:', Number.spell(99));
console.log('100:', Number.spell(100));
console.log('123:', Number.spell(123));
console.log('500:', Number.spell(500));
console.log();

// ============================================
// 8. Ordinal Numbers
// ============================================
console.log('8. Ordinal Numbers');
console.log('------------------');
console.log('1st:', Number.ordinal(1));
console.log('2nd:', Number.ordinal(2));
console.log('3rd:', Number.ordinal(3));
console.log('4th:', Number.ordinal(4));
console.log('11th:', Number.ordinal(11));
console.log('21st:', Number.ordinal(21));
console.log('22nd:', Number.ordinal(22));
console.log('42nd:', Number.ordinal(42));
console.log('103rd:', Number.ordinal(103));
console.log();

// ============================================
// 9. Spelled Ordinals
// ============================================
console.log('9. Spelled Ordinals');
console.log('-------------------');
console.log('1:', Number.spellOrdinal(1));
console.log('2:', Number.spellOrdinal(2));
console.log('3:', Number.spellOrdinal(3));
console.log('10:', Number.spellOrdinal(10));
console.log('15:', Number.spellOrdinal(15));
console.log('20:', Number.spellOrdinal(20));
console.log('21:', Number.spellOrdinal(21));
console.log('42:', Number.spellOrdinal(42));
console.log();

// ============================================
// 10. Parsing Numbers
// ============================================
console.log('10. Parsing Numbers');
console.log('-------------------');
console.log('Parse "1,234.56":', Number.parse('1,234.56'));
console.log('Parse "1 234.56":', Number.parse('1 234.56'));
console.log('Parse "invalid":', Number.parse('invalid'));
console.log('ParseInt "1,234":', Number.parseInt('1,234'));
console.log('ParseInt "123.99":', Number.parseInt('123.99'));
console.log('ParseFloat "1,234.56":', Number.parseFloat('1,234.56'));
console.log();

// ============================================
// 11. Clamping Numbers
// ============================================
console.log('11. Clamping Numbers');
console.log('--------------------');
console.log('Clamp 5 (1-10):', Number.clamp(5, 1, 10));
console.log('Clamp 0 (1-10):', Number.clamp(0, 1, 10));
console.log('Clamp 15 (1-10):', Number.clamp(15, 1, 10));
console.log('Clamp -5 (0-100):', Number.clamp(-5, 0, 100));
console.log('Clamp 150 (0-100):', Number.clamp(150, 0, 100));
console.log();

// ============================================
// 12. Number Pairs (Pagination Ranges)
// ============================================
console.log('12. Number Pairs (Pagination)');
console.log('------------------------------');
console.log('Pairs(10, 3):', JSON.stringify(Number.pairs(10, 3)));
console.log('Pairs(10, 5):', JSON.stringify(Number.pairs(10, 5)));
console.log('Pairs(10, 3, start=1):', JSON.stringify(Number.pairs(10, 3, 1)));
console.log('Pairs(20, 10):', JSON.stringify(Number.pairs(20, 10)));
console.log();

// ============================================
// 13. Trimming Numbers
// ============================================
console.log('13. Trimming Numbers');
console.log('--------------------');
console.log('Trim 1.50:', Number.trim(1.50));
console.log('Trim 1.00:', Number.trim(1.00));
console.log('Trim 1.230:', Number.trim(1.230));
console.log('Trim 1.05:', Number.trim(1.05));
console.log('Trim 100:', Number.trim(100));
console.log();

// ============================================
// 14. Locale Support
// ============================================
console.log('14. Locale Support');
console.log('------------------');
console.log('Current locale:', Number.defaultLocale());

// Temporarily use German locale
Number.withLocale('de-DE', () => {
    console.log('German format (1234.56):', Number.format(1234.56));
});

// Temporarily use French locale
Number.withLocale('fr-FR', () => {
    console.log('French format (1234.56):', Number.format(1234.56));
});

console.log('Back to default:', Number.format(1234.56));
console.log();

// ============================================
// 15. Currency Support
// ============================================
console.log('15. Currency Support');
console.log('--------------------');
console.log('Current currency:', Number.defaultCurrency());

// Temporarily use EUR
Number.withCurrency('EUR', () => {
    console.log('Euro currency (100):', Number.currency(100));
});

// Temporarily use GBP
Number.withCurrency('GBP', () => {
    console.log('Pound currency (100):', Number.currency(100));
});

console.log('Back to default:', Number.currency(100));
console.log();

// ============================================
// 16. Real-World Use Cases
// ============================================
console.log('16. Real-World Use Cases');
console.log('------------------------');

// E-commerce pricing
const price = 1299.99;
console.log('Product price:', Number.currency(price));
console.log('Save 20%:', Number.percentage(20), 'off');
console.log('Final price:', Number.currency(price * 0.8));
console.log();

// Analytics dashboard
const users = 1234567;
const revenue = 9876543.21;
const fileSize = 1024 * 1024 * 523.7;
console.log('Dashboard stats:');
console.log('  Users:', Number.abbreviate(users, 1));
console.log('  Revenue:', Number.currency(revenue));
console.log('  Database size:', Number.fileSize(fileSize, 1));
console.log();

// Pagination
const totalItems = 247;
const perPage = 25;
console.log('Pagination ranges for', totalItems, 'items:');
Number.pairs(totalItems, perPage, 0, 0).forEach((pair, index) => {
    console.log(`  Page ${index + 1}: items ${pair[0] + 1}-${pair[1]}`);
});
console.log();

// Progress indicators
const downloaded = 1024 * 1024 * 75;
const total = 1024 * 1024 * 100;
const percentage = (downloaded / total) * 100;
console.log('Download progress:');
console.log('  Downloaded:', Number.fileSize(downloaded, 1));
console.log('  Total:', Number.fileSize(total));
console.log('  Progress:', Number.percentage(percentage, 1));
console.log();

// Social media stats
const followers = 12500;
const likes = 347892;
const views = 1234567890;
console.log('Social media stats:');
console.log('  Followers:', Number.forHumans(followers, 1));
console.log('  Likes:', Number.abbreviate(likes, 1));
console.log('  Views:', Number.forHumans(views, 1));
console.log();

// Contest rankings
const rankings = [1, 2, 3, 21, 42, 100];
console.log('Contest rankings:');
rankings.forEach(rank => {
    console.log(`  ${Number.ordinal(rank)} place`);
});
console.log();

console.log('=== All Examples Complete ===');
