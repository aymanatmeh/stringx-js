import { describe, test } from 'node:test';
import assert from 'node:assert';
import Str from '../Str.js';

describe('Stringable Tests', () => {
    describe('of', () => {
        test('creates a Stringable instance', () => {
            const stringable = Str.of('hello');
            assert.strictEqual(stringable.toString(), 'hello');
            assert.strictEqual(String(stringable), 'hello');
        });
    });

    describe('method chaining', () => {
        test('chains multiple methods like Laravel example', () => {
            const result = Str.of('  hello world  ')
                .trim()
                .camel()
                .append('Test')
                .slug('-')
                .upper()
                .toString();

            assert.strictEqual(result, 'HELLO-WORLD-TEST');
        });

        test('chains case conversion methods', () => {
            const result = Str.of('foo_bar')
                .camel()
                .toString();

            assert.strictEqual(result, 'fooBar');
        });

        test('chains string manipulation methods', () => {
            const result = Str.of('hello world')
                .upper()
                .reverse()
                .toString();

            assert.strictEqual(result, 'DLROW OLLEH');
        });

        test('chains extraction methods', () => {
            const result = Str.of('This is my name')
                .after('This is')
                .trim()
                .toString();

            assert.strictEqual(result, 'my name');
        });
    });

    describe('append', () => {
        test('appends strings', () => {
            const result = Str.of('Hello')
                .append(' ', 'World')
                .toString();

            assert.strictEqual(result, 'Hello World');
        });
    });

    describe('prepend', () => {
        test('prepends strings', () => {
            const result = Str.of('World')
                .prepend('Hello ', '')
                .toString();

            assert.strictEqual(result, 'Hello World');
        });
    });

    describe('trim', () => {
        test('trims whitespace', () => {
            const result = Str.of('  hello  ')
                .trim()
                .toString();

            assert.strictEqual(result, 'hello');
        });

        test('trims custom characters', () => {
            const result = Str.of('/hello/')
                .trim('/')
                .toString();

            assert.strictEqual(result, 'hello');
        });
    });

    describe('case conversion', () => {
        test('converts to camelCase', () => {
            assert.strictEqual(Str.of('foo_bar').camel().toString(), 'fooBar');
        });

        test('converts to snake_case', () => {
            assert.strictEqual(Str.of('fooBar').snake().toString(), 'foo_bar');
        });

        test('converts to kebab-case', () => {
            assert.strictEqual(Str.of('fooBar').kebab().toString(), 'foo-bar');
        });

        test('converts to StudlyCase', () => {
            assert.strictEqual(Str.of('foo_bar').studly().toString(), 'FooBar');
        });

        test('converts to PascalCase', () => {
            assert.strictEqual(Str.of('foo_bar').pascal().toString(), 'FooBar');
        });

        test('converts to uppercase', () => {
            assert.strictEqual(Str.of('hello').upper().toString(), 'HELLO');
        });

        test('converts to lowercase', () => {
            assert.strictEqual(Str.of('HELLO').lower().toString(), 'hello');
        });

        test('converts to title case', () => {
            assert.strictEqual(Str.of('hello world').title().toString(), 'Hello World');
        });
    });

    describe('slug', () => {
        test('creates slug', () => {
            const result = Str.of('Hello World!')
                .slug()
                .toString();

            assert.strictEqual(result, 'hello-world');
        });

        test('creates slug with custom separator', () => {
            const result = Str.of('Hello World!')
                .slug('_')
                .toString();

            assert.strictEqual(result, 'hello_world');
        });
    });

    describe('limit', () => {
        test('limits string length', () => {
            const result = Str.of('The quick brown fox')
                .limit(10)
                .toString();

            assert.strictEqual(result, 'The quick...');
        });
    });

    describe('mask', () => {
        test('masks portion of string', () => {
            const result = Str.of('email@example.com')
                .mask('*', 5)
                .toString();

            assert.strictEqual(result, 'email************');
        });
    });

    describe('replace', () => {
        test('replaces all occurrences', () => {
            const result = Str.of('foo foo')
                .replace('foo', 'bar')
                .toString();

            assert.strictEqual(result, 'bar bar');
        });
    });

    describe('replaceFirst', () => {
        test('replaces first occurrence', () => {
            const result = Str.of('foo foo')
                .replaceFirst('foo', 'bar')
                .toString();

            assert.strictEqual(result, 'bar foo');
        });
    });

    describe('checking methods', () => {
        test('contains', () => {
            assert.strictEqual(Str.of('hello world').contains('world'), true);
            assert.strictEqual(Str.of('hello world').contains('foo'), false);
        });

        test('startsWith', () => {
            assert.strictEqual(Str.of('hello world').startsWith('hello'), true);
            assert.strictEqual(Str.of('hello world').startsWith('world'), false);
        });

        test('endsWith', () => {
            assert.strictEqual(Str.of('hello world').endsWith('world'), true);
            assert.strictEqual(Str.of('hello world').endsWith('hello'), false);
        });

        test('isAscii', () => {
            assert.strictEqual(Str.of('hello').isAscii(), true);
            assert.strictEqual(Str.of('hello 世界').isAscii(), false);
        });

        test('isEmpty', () => {
            assert.strictEqual(Str.of('').isEmpty(), true);
            assert.strictEqual(Str.of('hello').isEmpty(), false);
        });

        test('isNotEmpty', () => {
            assert.strictEqual(Str.of('hello').isNotEmpty(), true);
            assert.strictEqual(Str.of('').isNotEmpty(), false);
        });
    });

    describe('pipe', () => {
        test('pipes value through callback', () => {
            const result = Str.of('hello')
                .pipe(str => str.toUpperCase())
                .toString();

            assert.strictEqual(result, 'HELLO');
        });
    });

    describe('tap', () => {
        test('taps value without modifying', () => {
            let tapped = '';
            const result = Str.of('hello')
                .tap(str => { tapped = str; })
                .upper()
                .toString();

            assert.strictEqual(tapped, 'hello');
            assert.strictEqual(result, 'HELLO');
        });
    });

    describe('when', () => {
        test('executes callback when condition is true', () => {
            const result = Str.of('hello')
                .when(true, str => str.upper())
                .toString();

            assert.strictEqual(result, 'HELLO');
        });

        test('does not execute callback when condition is false', () => {
            const result = Str.of('hello')
                .when(false, str => str.upper())
                .toString();

            assert.strictEqual(result, 'hello');
        });

        test('executes default callback when condition is false', () => {
            const result = Str.of('hello')
                .when(false, str => str.upper(), str => str.reverse())
                .toString();

            assert.strictEqual(result, 'olleh');
        });
    });

    describe('unless', () => {
        test('executes callback when condition is false', () => {
            const result = Str.of('hello')
                .unless(false, str => str.upper())
                .toString();

            assert.strictEqual(result, 'HELLO');
        });

        test('does not execute callback when condition is true', () => {
            const result = Str.of('hello')
                .unless(true, str => str.upper())
                .toString();

            assert.strictEqual(result, 'hello');
        });
    });

    describe('whenEmpty', () => {
        test('executes callback when empty', () => {
            const result = Str.of('')
                .whenEmpty(str => str.append('default'))
                .toString();

            assert.strictEqual(result, 'default');
        });

        test('does not execute callback when not empty', () => {
            const result = Str.of('hello')
                .whenEmpty(str => str.append('default'))
                .toString();

            assert.strictEqual(result, 'hello');
        });
    });

    describe('whenNotEmpty', () => {
        test('executes callback when not empty', () => {
            const result = Str.of('hello')
                .whenNotEmpty(str => str.upper())
                .toString();

            assert.strictEqual(result, 'HELLO');
        });

        test('does not execute callback when empty', () => {
            const result = Str.of('')
                .whenNotEmpty(str => str.upper())
                .toString();

            assert.strictEqual(result, '');
        });
    });

    describe('dump', () => {
        test('dumps value and continues chain', () => {
            // Capture console.log
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args);

            const result = Str.of('hello')
                .dump()
                .upper()
                .toString();

            console.log = originalLog;

            assert.strictEqual(result, 'HELLO');
            assert.deepStrictEqual(logs, [['hello']]);
        });
    });

    describe('complex chaining', () => {
        test('handles complex real-world scenario', () => {
            const result = Str.of('  John Doe - Software Engineer  ')
                .trim()
                .replace(' - ', ', ')
                .lower()
                .title()
                .toString();

            assert.strictEqual(result, 'John Doe, Software Engineer');
        });

        test('generates username from email', () => {
            const result = Str.of('john.doe@example.com')
                .before('@')
                .replace('.', '_')
                .toString();

            assert.strictEqual(result, 'john_doe');
        });

        test('formats database column to label', () => {
            const result = Str.of('user_email_address')
                .replace('_', ' ')
                .title()
                .toString();

            assert.strictEqual(result, 'User Email Address');
        });
    });

    describe('valueOf and toString', () => {
        test('valueOf returns string value', () => {
            const stringable = Str.of('hello');
            assert.strictEqual(stringable.valueOf(), 'hello');
        });

        test('toString returns string value', () => {
            const stringable = Str.of('hello');
            assert.strictEqual(stringable.toString(), 'hello');
        });

        test('can be used in string concatenation', () => {
            const stringable = Str.of('hello');
            assert.strictEqual('Say ' + stringable, 'Say hello');
        });

        test('can be used in template literals', () => {
            const stringable = Str.of('world');
            assert.strictEqual(`Hello ${stringable}`, 'Hello world');
        });
    });

    describe('toJSON', () => {
        test('serializes to JSON correctly', () => {
            const obj = {
                message: Str.of('hello')
            };
            assert.strictEqual(JSON.stringify(obj), '{"message":"hello"}');
        });
    });
});
