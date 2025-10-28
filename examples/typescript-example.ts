/**
 * StringX-JS TypeScript Usage Examples
 * This file demonstrates how to use StringX-JS with TypeScript
 */

import Str from 'stringx-js';
// Or with named imports:
// import Str, { Stringable } from 'stringx-js';

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
// Export for Testing
// ====================

export {
    formatUserName,
    ApiErrorFormatter,
    createSlugger,
    processText
};
