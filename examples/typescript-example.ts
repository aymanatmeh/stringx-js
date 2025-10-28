/**
 * StringX-JS TypeScript Usage Examples
 * This file demonstrates how to use StringX-JS with TypeScript
 */

import Str, { Number } from 'stringx-js';
// Or with default import only:
// import Str from 'stringx-js';

// ====================
// Static Methods
// ====================

// Type inference works automatically
const camelCase: string = Str.camel('hello_world'); // 'helloWorld'
const slug: string = Str.slug('Hello World'); // 'hello-world'
const uuid: string = Str.uuid();

// Boolean return types
const containsValue: boolean = Str.contains('hello world', 'world');
const isValidEmail: boolean = Str.isUrl('https://example.com');

// Array return types
const matches: string[] = Str.matchAll(/\d+/g, 'Order 123 and 456');

// ====================
// Fluent Chaining with Type Safety
// ====================

// Full type safety with method chaining
const result = Str.of('  HELLO_WORLD  ')
    .trim()        // Stringable
    .lower()       // Stringable
    .camel()       // Stringable
    .append('!')   // Stringable
    .toString();   // string

// Type inference for conditional logic
const username = Str.of('John.Doe@Example.com')
    .lower()
    .before('@')
    .replace('.', '_')
    .toString(); // Type: string

// ====================
// Working with Callbacks
// ====================

// Pipe with type safety
const transformed = Str.of('hello')
    .pipe((str: string) => str.toUpperCase())  // Custom transformation
    .pipe((str: string) => `${str}!!!`)
    .toString();

// Tap for debugging
const debugged = Str.of('value')
    .tap((val: string) => console.log('Current:', val))
    .upper()
    .toString();

// Conditional transformations
interface User {
    name: string;
    isPremium: boolean;
    isVerified: boolean;
}

const formatUserName = (user: User): string => {
    return Str.of(user.name)
        .trim()
        .ucfirst()
        .when(user.isPremium, (str) => str.append(' ⭐'))
        .when(user.isVerified, (str) => str.append(' ✓'))
        .toString();
};

// ====================
// Type-Safe Options
// ====================

// Password generation with typed parameters
const password: string = Str.password(
    16,    // length: number
    true,  // letters: boolean
    true,  // numbers: boolean
    true,  // symbols: boolean
    false  // spaces: boolean
);

// Excerpt with options object
const excerpt: string = Str.excerpt(
    'This is a long text',
    'long',
    {
        radius: 10,
        omission: '...'
    }
);

// ====================
// Advanced Type Examples
// ====================

// Function that accepts Stringable or string
function processText(input: string): string {
    // Can work with both fluent and static approaches
    if (input.length > 100) {
        return Str.of(input).limit(100).toString();
    }
    return Str.upper(input);
}

// Generic function with string transformations
function transformList<T>(
    items: T[],
    keyExtractor: (item: T) => string,
    transformer: (str: string) => string
): string[] {
    return items.map(item =>
        transformer(keyExtractor(item))
    );
}

interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: 'iPhone 15', price: 999 },
    { name: 'MacBook Pro', price: 2499 }
];

const slugs = transformList(
    products,
    (p) => p.name,
    (name) => Str.slug(name)
);

// ====================
// Boolean Methods (Type Guards)
// ====================

const email = 'test@example.com';

if (Str.contains(email, '@')) {
    // TypeScript knows email contains '@'
    const domain: string = Str.after(email, '@');
}

if (Str.isJson('{"name":"John"}')) {
    // Safe to parse
    const obj = JSON.parse('{"name":"John"}');
}

// ====================
// Array Methods
// ====================

const words: string[] = Str.ucsplit('FooBarBaz'); // ['Foo', 'Bar', 'Baz']
const allMatches: string[] = Str.matchAll(/\w+/g, 'hello world');

// ====================
// Factory Methods with Type Safety
// ====================

// Custom UUID generator
Str.createUuidsUsing((): string => {
    return 'custom-uuid-' + Date.now();
});

const customUuid: string = Str.uuid();

// Reset to default
Str.createUuidsNormally();

// ====================
// Complex Real-World Example
// ====================

interface ApiResponse {
    status: 'success' | 'error';
    message: string;
    data?: any;
}

class ApiErrorFormatter {
    static format(response: ApiResponse): string {
        return Str.of(response.message)
            .when(
                response.status === 'error',
                (str) => str.prepend('❌ ').upper()
            )
            .when(
                response.status === 'success',
                (str) => str.prepend('✅ ')
            )
            .limit(100)
            .toString();
    }

    static formatErrorCode(code: string): string {
        return Str.of(code)
            .upper()
            .replace('_', ' ')
            .after('ERROR ')
            .lower()
            .ucfirst()
            .append('.')
            .toString();
    }
}

// Usage
const formatted = ApiErrorFormatter.format({
    status: 'error',
    message: 'User not found'
}); // Type: string

// ====================
// Utility Type Examples
// ====================

type StringTransformer = (input: string) => string;

const createSlugger = (separator: string = '-'): StringTransformer => {
    return (input: string) => Str.slug(input, separator);
};

const slugger = createSlugger('_');
const result1: string = slugger('Hello World'); // 'hello_world'

// ====================
// Method Chaining with Mixed Returns
// ====================

const text = Str.of('Hello World');

// Methods that return boolean
const isEmpty: boolean = text.isEmpty();
const hasH: boolean = text.startsWith('H');
const len: number = text.length();

// Methods that return Stringable (chainable)
const modified = text
    .lower()
    .replace(' ', '-')
    .toString();

// ====================
// Number Formatting with Type Safety
// ====================

// Basic number formatting
const formatted: string = Number.format(1234567.89, 2); // "1,234,567.89"
const percentage: string = Number.percentage(66.666, 2); // "66.67%"
const currency: string = Number.currency(1234.56, 'EUR'); // "€1,234.56"

// File size formatting
const fileSize: string = Number.fileSize(1024 * 1024 * 5); // "5 MB"
const largeFile: string = Number.fileSize(1024 * 1024 * 1024 * 2.5, 1); // "2.5 GB"

// Human-readable numbers
const readable: string = Number.forHumans(1500000, 1); // "1.5 million"
const abbreviated: string = Number.abbreviate(2500000, 1); // "2.5M"

// Ordinals and spelling
const ordinal: string = Number.ordinal(42); // "42nd"
const spelled: string = Number.spell(42); // "forty-two"
const spellOrdinal: string = Number.spellOrdinal(3); // "third"

// Parsing with type safety
const parsed: number | null = Number.parse("1,234.56"); // 1234.56
const parsedInt: number | null = Number.parseInt("1,234"); // 1234

// Number utilities
const clamped: number = Number.clamp(5, 1, 10); // 5
const pairs: Array<[number, number]> = Number.pairs(10, 3); // [[0,2], [3,5], [6,8], [9,10]]
const trimmed: number = Number.trim(1.50); // 1.5

// ====================
// Number with Locale/Currency
// ====================

// Locale configuration
Number.useLocale('de-DE');
const germanFormat: string = Number.format(1234.56); // "1.234,56"

// Temporary locale scope
const frenchResult: string = Number.withLocale('fr-FR', (): string => {
    return Number.format(1234.56); // "1 234,56"
}); // Locale reverts after

// Currency configuration
Number.useCurrency('EUR');
const euroCurrency: string = Number.currency(100); // "€100.00"

// Temporary currency scope
const gbpResult: string = Number.withCurrency('GBP', (): string => {
    return Number.currency(100); // "£100.00"
}); // Currency reverts after

// ====================
// Real-World Number Examples
// ====================

interface AnalyticsDashboard {
    users: number;
    revenue: number;
    storageUsed: number;
    growthRate: number;
}

class DashboardFormatter {
    static formatStats(stats: AnalyticsDashboard): {
        users: string;
        revenue: string;
        storage: string;
        growth: string;
    } {
        return {
            users: Number.abbreviate(stats.users, 1),
            revenue: Number.currency(stats.revenue),
            storage: Number.fileSize(stats.storageUsed, 1),
            growth: Number.percentage(stats.growthRate, 2)
        };
    }

    static formatRanking(position: number): string {
        return `You ranked ${Number.ordinal(position)}!`;
    }
}

// Usage
const dashboard: AnalyticsDashboard = {
    users: 1234567,
    revenue: 9876543.21,
    storageUsed: 1024 * 1024 * 523.7,
    growthRate: 15.75
};

const formattedStats = DashboardFormatter.formatStats(dashboard);
// {
//   users: "1.2M",
//   revenue: "$9,876,543.21",
//   storage: "523.7 MB",
//   growth: "15.75%"
// }

interface PricingTier {
    name: string;
    price: number;
    storage: number;
    users: number;
}

class PricingFormatter {
    static format(tier: PricingTier): {
        price: string;
        storage: string;
        users: string;
    } {
        return {
            price: Number.currency(tier.price),
            storage: Number.fileSize(tier.storage * 1024 * 1024 * 1024),
            users: tier.users === Infinity
                ? 'Unlimited'
                : Number.forHumans(tier.users)
        };
    }

    static formatDiscount(original: number, discount: number): {
        original: string;
        save: string;
        final: string;
    } {
        return {
            original: Number.currency(original),
            save: Number.percentage(discount),
            final: Number.currency(original * (1 - discount / 100))
        };
    }
}

const tier: PricingTier = {
    name: 'Enterprise',
    price: 99.99,
    storage: 100, // GB
    users: 50
};

const pricingInfo = PricingFormatter.format(tier);
// {
//   price: "$99.99",
//   storage: "100 GB",
//   users: "50"
// }

// ====================
// Combining Str and Number
// ====================

interface DataPoint {
    label: string;
    value: number;
}

function formatDataPoint(point: DataPoint, format: 'currency' | 'percentage' | 'abbreviated'): string {
    const formattedLabel: string = Str.of(point.label)
        .trim()
        .title()
        .toString();

    let formattedValue: string;
    switch (format) {
        case 'currency':
            formattedValue = Number.currency(point.value);
            break;
        case 'percentage':
            formattedValue = Number.percentage(point.value, 1);
            break;
        case 'abbreviated':
            formattedValue = Number.abbreviate(point.value, 1);
            break;
    }

    return `${formattedLabel}: ${formattedValue}`;
}

// Usage
const salesData: DataPoint = {
    label: 'total_revenue',
    value: 1234567.89
};

const formatted1: string = formatDataPoint(salesData, 'currency');
// "Total Revenue: $1,234,567.89"

const formatted2: string = formatDataPoint(
    { label: 'conversion_rate', value: 3.45 },
    'percentage'
); // "Conversion Rate: 3.5%"

// ====================
// Type-Safe Number Utilities
// ====================

type NumberFormatter = (value: number) => string;

const createCurrencyFormatter = (currency: string, precision: number = 2): NumberFormatter => {
    return (value: number): string => Number.currency(value, currency, null, precision);
};

const usdFormatter: NumberFormatter = createCurrencyFormatter('USD');
const eurFormatter: NumberFormatter = createCurrencyFormatter('EUR');

const price1: string = usdFormatter(1234.56); // "$1,234.56"
const price2: string = eurFormatter(1234.56); // "€1,234.56"

// ====================
// Export for Testing
// ====================

export {
    formatUserName,
    ApiErrorFormatter,
    createSlugger,
    processText,
    DashboardFormatter,
    PricingFormatter,
    formatDataPoint,
    createCurrencyFormatter
};
