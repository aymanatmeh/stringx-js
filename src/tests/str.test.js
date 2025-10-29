import { describe, test } from 'node:test';
import assert from 'node:assert';
import Str from '../Str.js';

describe('Str Helper Tests', () => {
    describe('after', () => {
        test('returns remainder after first occurrence', () => {
            assert.strictEqual(Str.after('This is my name', 'This is'), ' my name');
            assert.strictEqual(Str.after('This is my name', 'is'), ' is my name');
        });

        test('returns original string when search not found', () => {
            assert.strictEqual(Str.after('This is my name', 'x'), 'This is my name');
        });

        test('returns original string when search is empty', () => {
            assert.strictEqual(Str.after('This is my name', ''), 'This is my name');
        });
    });

    describe('afterLast', () => {
        test('returns remainder after last occurrence', () => {
            assert.strictEqual(Str.afterLast('App\\Http\\Controllers\\Controller', '\\'), 'Controller');
            assert.strictEqual(Str.afterLast('This is my name', 'is'), ' my name');
        });

        test('returns original string when search not found', () => {
            assert.strictEqual(Str.afterLast('This is my name', 'x'), 'This is my name');
        });
    });

    describe('before', () => {
        test('returns portion before first occurrence', () => {
            assert.strictEqual(Str.before('This is my name', 'my name'), 'This is ');
            assert.strictEqual(Str.before('This is my name', 'is'), 'Th'); // 'is' appears in 'This'
        });

        test('returns original string when search not found', () => {
            assert.strictEqual(Str.before('This is my name', 'x'), 'This is my name');
        });
    });

    describe('beforeLast', () => {
        test('returns portion before last occurrence', () => {
            assert.strictEqual(Str.beforeLast('This is my name', 'is'), 'This ');
            assert.strictEqual(Str.beforeLast('App\\Http\\Controllers\\Controller', '\\'), 'App\\Http\\Controllers');
        });
    });

    describe('between', () => {
        test('returns portion between two strings', () => {
            assert.strictEqual(Str.between('This is my name', 'This', 'name'), ' is my ');
            assert.strictEqual(Str.between('[a] bc [d]', '[', ']'), 'a] bc [d');
        });
    });

    describe('betweenFirst', () => {
        test('returns smallest portion between two strings', () => {
            assert.strictEqual(Str.betweenFirst('[a] bc [d]', '[', ']'), 'a');
            assert.strictEqual(Str.betweenFirst('This is my name', 'This', 'name'), ' is my ');
        });
    });

    describe('camel', () => {
        test('converts to camelCase', () => {
            assert.strictEqual(Str.camel('foo_bar'), 'fooBar');
            assert.strictEqual(Str.camel('foo-bar'), 'fooBar');
            assert.strictEqual(Str.camel('foo bar'), 'fooBar');
            assert.strictEqual(Str.camel('FooBar'), 'fooBar');
        });

        test('uses cache', () => {
            Str.flushCache();
            const result1 = Str.camel('foo_bar');
            const result2 = Str.camel('foo_bar');
            assert.strictEqual(result1, result2);
        });
    });

    describe('charAt', () => {
        test('returns character at index', () => {
            assert.strictEqual(Str.charAt('Hello', 0), 'H');
            assert.strictEqual(Str.charAt('Hello', 4), 'o');
        });

        test('supports negative indices', () => {
            assert.strictEqual(Str.charAt('Hello', -1), 'o');
            assert.strictEqual(Str.charAt('Hello', -5), 'H');
        });

        test('returns false for out of bounds', () => {
            assert.strictEqual(Str.charAt('Hello', 10), false);
            assert.strictEqual(Str.charAt('Hello', -10), false);
        });
    });

    describe('chopStart', () => {
        test('removes string from start', () => {
            assert.strictEqual(Str.chopStart('Hello World', 'Hello '), 'World');
            assert.strictEqual(Str.chopStart('https://example.com', 'https://'), 'example.com');
        });

        test('handles array of needles', () => {
            assert.strictEqual(Str.chopStart('Hello World', ['Hi ', 'Hello ']), 'World');
        });
    });

    describe('chopEnd', () => {
        test('removes string from end', () => {
            assert.strictEqual(Str.chopEnd('Hello World', ' World'), 'Hello');
            assert.strictEqual(Str.chopEnd('app/models/User.php', '.php'), 'app/models/User');
        });

        test('handles array of needles', () => {
            assert.strictEqual(Str.chopEnd('Hello World', [' Universe', ' World']), 'Hello');
        });
    });

    describe('contains', () => {
        test('checks if string contains substring', () => {
            assert.strictEqual(Str.contains('This is my name', 'my'), true);
            assert.strictEqual(Str.contains('This is my name', 'foo'), false);
        });

        test('handles array of needles', () => {
            assert.strictEqual(Str.contains('This is my name', ['my', 'name']), true);
            assert.strictEqual(Str.contains('This is my name', ['foo', 'bar']), false);
        });

        test('supports case insensitive search', () => {
            assert.strictEqual(Str.contains('This is my name', 'MY', true), true);
        });
    });

    describe('containsAll', () => {
        test('checks if string contains all substrings', () => {
            assert.strictEqual(Str.containsAll('This is my name', ['my', 'name']), true);
            assert.strictEqual(Str.containsAll('This is my name', ['my', 'foo']), false);
        });
    });

    describe('endsWith', () => {
        test('checks if string ends with substring', () => {
            assert.strictEqual(Str.endsWith('This is my name', 'name'), true);
            assert.strictEqual(Str.endsWith('This is my name', 'foo'), false);
        });

        test('handles array of needles', () => {
            assert.strictEqual(Str.endsWith('This is my name', ['name', 'foo']), true);
        });
    });

    describe('finish', () => {
        test('adds single instance of value to end', () => {
            assert.strictEqual(Str.finish('this/string', '/'), 'this/string/');
            assert.strictEqual(Str.finish('this/string/', '/'), 'this/string/');
            assert.strictEqual(Str.finish('this/string//', '/'), 'this/string/');
        });
    });

    describe('is', () => {
        test('checks pattern match', () => {
            assert.strictEqual(Str.is('*', 'foo'), true);
            assert.strictEqual(Str.is('foo*', 'foobar'), true);
            assert.strictEqual(Str.is('foo', 'foo'), true);
            assert.strictEqual(Str.is('foo', 'bar'), false);
        });

        test('handles array of patterns', () => {
            assert.strictEqual(Str.is(['foo', 'bar'], 'foo'), true);
        });
    });

    describe('isAscii', () => {
        test('checks if string is ASCII', () => {
            assert.strictEqual(Str.isAscii('Hello World'), true);
            assert.strictEqual(Str.isAscii('Hello 世界'), false);
        });
    });

    describe('isJson', () => {
        test('checks if valid JSON', () => {
            assert.strictEqual(Str.isJson('{"name":"John"}'), true);
            assert.strictEqual(Str.isJson('not json'), false);
            assert.strictEqual(Str.isJson(123), false);
        });
    });

    describe('isUrl', () => {
        test('checks if valid URL', () => {
            assert.strictEqual(Str.isUrl('https://example.com'), true);
            assert.strictEqual(Str.isUrl('http://example.com'), true);
            assert.strictEqual(Str.isUrl('not a url'), false);
        });

        test('checks specific protocols', () => {
            assert.strictEqual(Str.isUrl('https://example.com', ['https']), true);
            assert.strictEqual(Str.isUrl('http://example.com', ['https']), false);
        });
    });

    describe('isUuid', () => {
        test('checks if valid UUID', () => {
            const uuid = Str.uuid();
            assert.strictEqual(Str.isUuid(uuid), true);
            assert.strictEqual(Str.isUuid('not-a-uuid'), false);
        });
    });

    describe('isUlid', () => {
        test('checks if valid ULID', () => {
            const ulid = Str.ulid();
            assert.strictEqual(Str.isUlid(ulid), true);
            assert.strictEqual(Str.isUlid('not-a-ulid'), false);
        });
    });

    describe('kebab', () => {
        test('converts to kebab-case', () => {
            assert.strictEqual(Str.kebab('fooBar'), 'foo-bar');
            assert.strictEqual(Str.kebab('FooBar'), 'foo-bar');
        });
    });

    describe('length', () => {
        test('returns string length', () => {
            assert.strictEqual(Str.length('Hello'), 5);
            assert.strictEqual(Str.length(''), 0);
        });

        test('handles Unicode correctly', () => {
            assert.strictEqual(Str.length('👍'), 1);
        });
    });

    describe('limit', () => {
        test('limits string length', () => {
            assert.strictEqual(Str.limit('The quick brown fox', 10), 'The quick...');
            assert.strictEqual(Str.limit('Short', 10), 'Short');
        });

        test('custom end string', () => {
            assert.strictEqual(Str.limit('The quick brown fox', 10, ' >'), 'The quick >');
        });
    });

    describe('lower', () => {
        test('converts to lowercase', () => {
            assert.strictEqual(Str.lower('HELLO'), 'hello');
            assert.strictEqual(Str.lower('Hello World'), 'hello world');
        });
    });

    describe('upper', () => {
        test('converts to uppercase', () => {
            assert.strictEqual(Str.upper('hello'), 'HELLO');
            assert.strictEqual(Str.upper('Hello World'), 'HELLO WORLD');
        });
    });

    describe('words', () => {
        test('limits number of words', () => {
            assert.strictEqual(Str.words('The quick brown fox jumps', 3), 'The quick brown...');
            assert.strictEqual(Str.words('Short', 10), 'Short');
        });
    });

    describe('mask', () => {
        test('masks portion of string', () => {
            assert.strictEqual(Str.mask('email@example.com', '*', 5), 'email************');
            assert.strictEqual(Str.mask('1234567890', '*', 0, 4), '****567890');
        });
    });

    describe('match', () => {
        test('returns first match', () => {
            assert.strictEqual(Str.match(/(\d+)/, 'Order 123'), '123');
            assert.strictEqual(Str.match(/foo/, 'bar'), '');
        });
    });

    describe('matchAll', () => {
        test('returns all matches', () => {
            const matches = Str.matchAll(/\d+/g, 'Order 123 and 456');
            assert.deepStrictEqual(matches, ['123', '456']);
        });
    });

    describe('padBoth', () => {
        test('pads both sides', () => {
            assert.strictEqual(Str.padBoth('James', 10, '_'), '__James___');
            assert.strictEqual(Str.padBoth('James', 10), '  James   ');
        });
    });

    describe('padLeft', () => {
        test('pads left side', () => {
            assert.strictEqual(Str.padLeft('James', 10, '-'), '-----James');
        });
    });

    describe('padRight', () => {
        test('pads right side', () => {
            assert.strictEqual(Str.padRight('James', 10, '-'), 'James-----');
        });
    });

    describe('plural', () => {
        test('returns regular plurals', () => {
            assert.strictEqual(Str.plural('car'), 'cars');
            assert.strictEqual(Str.plural('book'), 'books');
            assert.strictEqual(Str.plural('house'), 'houses');
        });

        test('handles words ending in -y', () => {
            assert.strictEqual(Str.plural('city'), 'cities');
            assert.strictEqual(Str.plural('baby'), 'babies');
            assert.strictEqual(Str.plural('day'), 'days'); // vowel + y
        });

        test('handles words ending in -s, -sh, -ch, -x, -z', () => {
            assert.strictEqual(Str.plural('class'), 'classes');
            assert.strictEqual(Str.plural('dish'), 'dishes');
            assert.strictEqual(Str.plural('church'), 'churches');
            assert.strictEqual(Str.plural('box'), 'boxes');
            assert.strictEqual(Str.plural('buzz'), 'buzzes');
        });

        test('handles words ending in -o', () => {
            assert.strictEqual(Str.plural('hero'), 'heroes');
            assert.strictEqual(Str.plural('potato'), 'potatoes');
            assert.strictEqual(Str.plural('photo'), 'photos'); // vowel + o
            assert.strictEqual(Str.plural('radio'), 'radios'); // vowel + o
        });

        test('handles words ending in -f and -fe', () => {
            assert.strictEqual(Str.plural('wolf'), 'wolves');
            assert.strictEqual(Str.plural('knife'), 'knives');
            assert.strictEqual(Str.plural('life'), 'lives');
        });

        test('handles irregular plurals', () => {
            assert.strictEqual(Str.plural('man'), 'men');
            assert.strictEqual(Str.plural('woman'), 'women');
            assert.strictEqual(Str.plural('child'), 'children');
            assert.strictEqual(Str.plural('person'), 'people');
            assert.strictEqual(Str.plural('tooth'), 'teeth');
            assert.strictEqual(Str.plural('foot'), 'feet');
            assert.strictEqual(Str.plural('mouse'), 'mice');
            assert.strictEqual(Str.plural('goose'), 'geese');
        });

        test('handles uncountable words', () => {
            assert.strictEqual(Str.plural('equipment'), 'equipment');
            assert.strictEqual(Str.plural('information'), 'information');
            assert.strictEqual(Str.plural('fish'), 'fish');
            assert.strictEqual(Str.plural('sheep'), 'sheep');
            assert.strictEqual(Str.plural('deer'), 'deer');
        });

        test('handles Latin/Greek plurals', () => {
            assert.strictEqual(Str.plural('radius'), 'radii');
            assert.strictEqual(Str.plural('crisis'), 'crises');
            assert.strictEqual(Str.plural('analysis'), 'analyses');
            assert.strictEqual(Str.plural('criterion'), 'criteria');
            assert.strictEqual(Str.plural('phenomenon'), 'phenomena');
        });

        test('matches case', () => {
            assert.strictEqual(Str.plural('Child'), 'Children');
            assert.strictEqual(Str.plural('CHILD'), 'CHILDREN');
            assert.strictEqual(Str.plural('Man'), 'Men');
            assert.strictEqual(Str.plural('PERSON'), 'PEOPLE');
        });

        test('returns singular when count is 1', () => {
            assert.strictEqual(Str.plural('car', 1), 'car');
            assert.strictEqual(Str.plural('child', 1), 'child');
        });

        test('handles empty strings', () => {
            assert.strictEqual(Str.plural(''), '');
        });
    });

    describe('singular', () => {
        test('returns regular singulars', () => {
            assert.strictEqual(Str.singular('cars'), 'car');
            assert.strictEqual(Str.singular('books'), 'book');
            assert.strictEqual(Str.singular('houses'), 'house');
        });

        test('handles words ending in -ies', () => {
            assert.strictEqual(Str.singular('cities'), 'city');
            assert.strictEqual(Str.singular('babies'), 'baby');
        });

        test('handles words ending in -es', () => {
            assert.strictEqual(Str.singular('classes'), 'class');
            assert.strictEqual(Str.singular('dishes'), 'dish');
            assert.strictEqual(Str.singular('churches'), 'church');
            assert.strictEqual(Str.singular('boxes'), 'box');
            assert.strictEqual(Str.singular('heroes'), 'hero');
        });

        test('handles words ending in -ves', () => {
            assert.strictEqual(Str.singular('wolves'), 'wolf');
            assert.strictEqual(Str.singular('knives'), 'knife');
            assert.strictEqual(Str.singular('lives'), 'life');
        });

        test('handles irregular singulars', () => {
            assert.strictEqual(Str.singular('men'), 'man');
            assert.strictEqual(Str.singular('women'), 'woman');
            assert.strictEqual(Str.singular('children'), 'child');
            assert.strictEqual(Str.singular('people'), 'person');
            assert.strictEqual(Str.singular('teeth'), 'tooth');
            assert.strictEqual(Str.singular('feet'), 'foot');
            assert.strictEqual(Str.singular('mice'), 'mouse');
            assert.strictEqual(Str.singular('geese'), 'goose');
        });

        test('handles uncountable words', () => {
            assert.strictEqual(Str.singular('equipment'), 'equipment');
            assert.strictEqual(Str.singular('information'), 'information');
            assert.strictEqual(Str.singular('fish'), 'fish');
            assert.strictEqual(Str.singular('sheep'), 'sheep');
        });

        test('handles Latin/Greek singulars', () => {
            assert.strictEqual(Str.singular('radii'), 'radius');
            assert.strictEqual(Str.singular('crises'), 'crisis');
            assert.strictEqual(Str.singular('analyses'), 'analysis');
            assert.strictEqual(Str.singular('criteria'), 'criterion');
            assert.strictEqual(Str.singular('phenomena'), 'phenomenon');
        });

        test('matches case', () => {
            assert.strictEqual(Str.singular('Children'), 'Child');
            assert.strictEqual(Str.singular('CHILDREN'), 'CHILD');
            assert.strictEqual(Str.singular('Men'), 'Man');
            assert.strictEqual(Str.singular('PEOPLE'), 'PERSON');
        });

        test('handles empty strings', () => {
            assert.strictEqual(Str.singular(''), '');
        });
    });

    describe('random', () => {
        test('generates random string', () => {
            const random1 = Str.random(16);
            const random2 = Str.random(16);
            assert.strictEqual(random1.length, 16);
            assert.strictEqual(random2.length, 16);
            assert.notStrictEqual(random1, random2);
        });
    });

    describe('numbers', () => {
        test('removes non-numeric characters', () => {
            assert.strictEqual(Str.numbers('abc123def456'), '123456');
            assert.strictEqual(Str.numbers('Price: $19.99'), '1999');
        });
    });

    describe('replace', () => {
        test('replaces all occurrences', () => {
            assert.strictEqual(Str.replace('foo', 'bar', 'foo foo'), 'bar bar');
        });

        test('handles array of search terms', () => {
            assert.strictEqual(Str.replace(['foo', 'bar'], 'baz', 'foo bar'), 'baz baz');
        });
    });

    describe('replaceFirst', () => {
        test('replaces first occurrence', () => {
            assert.strictEqual(Str.replaceFirst('foo', 'bar', 'foo foo'), 'bar foo');
        });
    });

    describe('replaceLast', () => {
        test('replaces last occurrence', () => {
            assert.strictEqual(Str.replaceLast('foo', 'bar', 'foo foo'), 'foo bar');
        });
    });

    describe('remove', () => {
        test('removes all occurrences', () => {
            assert.strictEqual(Str.remove('foo', 'foo bar foo'), ' bar ');
        });
    });

    describe('reverse', () => {
        test('reverses string', () => {
            assert.strictEqual(Str.reverse('Hello'), 'olleH');
        });
    });

    describe('start', () => {
        test('adds single instance to start', () => {
            assert.strictEqual(Str.start('this/string', '/'), '/this/string');
            assert.strictEqual(Str.start('/this/string', '/'), '/this/string');
        });
    });

    describe('title', () => {
        test('converts to title case', () => {
            assert.strictEqual(Str.title('hello world'), 'Hello World');
        });
    });

    describe('headline', () => {
        test('converts to headline case', () => {
            assert.strictEqual(Str.headline('hello_world'), 'Hello World');
            assert.strictEqual(Str.headline('hello-world'), 'Hello World');
        });
    });

    describe('slug', () => {
        test('generates URL slug', () => {
            assert.strictEqual(Str.slug('Hello World'), 'hello-world');
            assert.strictEqual(Str.slug('Hello  World'), 'hello-world');
        });

        test('custom separator', () => {
            assert.strictEqual(Str.slug('Hello World', '_'), 'hello_world');
        });
    });

    describe('snake', () => {
        test('converts to snake_case', () => {
            assert.strictEqual(Str.snake('fooBar'), 'foo_bar');
            assert.strictEqual(Str.snake('FooBar'), 'foo_bar');
        });

        test('custom delimiter', () => {
            assert.strictEqual(Str.snake('fooBar', '-'), 'foo-bar');
        });
    });

    describe('studly', () => {
        test('converts to StudlyCase', () => {
            assert.strictEqual(Str.studly('foo_bar'), 'FooBar');
            assert.strictEqual(Str.studly('foo-bar'), 'FooBar');
        });
    });

    describe('trim', () => {
        test('trims whitespace', () => {
            assert.strictEqual(Str.trim('  hello  '), 'hello');
        });

        test('trims custom characters', () => {
            assert.strictEqual(Str.trim('/hello/', '/'), 'hello');
        });
    });

    describe('ltrim', () => {
        test('trims left whitespace', () => {
            assert.strictEqual(Str.ltrim('  hello  '), 'hello  ');
        });
    });

    describe('rtrim', () => {
        test('trims right whitespace', () => {
            assert.strictEqual(Str.rtrim('  hello  '), '  hello');
        });
    });

    describe('squish', () => {
        test('removes extra whitespace', () => {
            assert.strictEqual(Str.squish('  hello   world  '), 'hello world');
        });
    });

    describe('startsWith', () => {
        test('checks if starts with substring', () => {
            assert.strictEqual(Str.startsWith('Hello World', 'Hello'), true);
            assert.strictEqual(Str.startsWith('Hello World', 'World'), false);
        });
    });

    describe('substr', () => {
        test('extracts substring', () => {
            assert.strictEqual(Str.substr('Hello World', 0, 5), 'Hello');
            assert.strictEqual(Str.substr('Hello World', 6), 'World');
        });

        test('supports negative start', () => {
            assert.strictEqual(Str.substr('Hello World', -5), 'World');
        });
    });

    describe('substrCount', () => {
        test('counts substring occurrences', () => {
            assert.strictEqual(Str.substrCount('foo foo foo', 'foo'), 3);
        });
    });

    describe('ucfirst', () => {
        test('capitalizes first character', () => {
            assert.strictEqual(Str.ucfirst('hello'), 'Hello');
        });
    });

    describe('lcfirst', () => {
        test('lowercases first character', () => {
            assert.strictEqual(Str.lcfirst('Hello'), 'hello');
        });
    });

    describe('ucsplit', () => {
        test('splits by uppercase characters', () => {
            assert.deepStrictEqual(Str.ucsplit('FooBar'), ['Foo', 'Bar']);
        });
    });

    describe('wordCount', () => {
        test('counts words', () => {
            assert.strictEqual(Str.wordCount('Hello World'), 2);
            assert.strictEqual(Str.wordCount('one two three'), 3);
        });
    });

    describe('wrap', () => {
        test('wraps string', () => {
            assert.strictEqual(Str.wrap('Hello', '"'), '"Hello"');
            assert.strictEqual(Str.wrap('Hello', '<', '>'), '<Hello>');
        });
    });

    describe('unwrap', () => {
        test('unwraps string', () => {
            assert.strictEqual(Str.unwrap('"Hello"', '"'), 'Hello');
            assert.strictEqual(Str.unwrap('<Hello>', '<', '>'), 'Hello');
        });
    });

    describe('toBase64', () => {
        test('encodes to base64', () => {
            const encoded = Str.toBase64('Hello World');
            assert.strictEqual(typeof encoded, 'string');
            assert.strictEqual(Str.fromBase64(encoded), 'Hello World');
        });
    });

    describe('take', () => {
        test('takes first n characters', () => {
            assert.strictEqual(Str.take('Hello World', 5), 'Hello');
        });

        test('takes last n characters with negative', () => {
            assert.strictEqual(Str.take('Hello World', -5), 'World');
        });
    });

    describe('repeat', () => {
        test('repeats string', () => {
            assert.strictEqual(Str.repeat('a', 3), 'aaa');
        });
    });

    describe('deduplicate', () => {
        test('removes duplicate characters', () => {
            assert.strictEqual(Str.deduplicate('hello  world'), 'hello world');
            assert.strictEqual(Str.deduplicate('foo---bar', '-'), 'foo-bar');
        });

        test('handles array of characters', () => {
            assert.strictEqual(Str.deduplicate('foo  --  bar', [' ', '-']), 'foo - bar');
        });
    });

    describe('transliterate', () => {
        test('removes accents and diacritics', () => {
            assert.strictEqual(Str.transliterate('Café'), 'Cafe');
            assert.strictEqual(Str.transliterate('naïve'), 'naive');
            assert.strictEqual(Str.transliterate('Übermensch'), 'Ubermensch');
            assert.strictEqual(Str.transliterate('São Paulo'), 'Sao Paulo');
        });

        test('handles German sharp s (ß)', () => {
            assert.strictEqual(Str.transliterate('straße'), 'strasse');
            assert.strictEqual(Str.transliterate('Fußball'), 'Fussball');
        });

        test('handles Latin ligatures', () => {
            assert.strictEqual(Str.transliterate('Æon'), 'AEon');
            assert.strictEqual(Str.transliterate('æther'), 'aether');
            assert.strictEqual(Str.transliterate('Œuvre'), 'OEuvre');
            assert.strictEqual(Str.transliterate("hors d'œuvre"), "hors d'oeuvre");
        });

        test('handles strict mode with unknown character', () => {
            assert.strictEqual(Str.transliterate('Hello世界', '?', true), 'Hello??');
            assert.strictEqual(Str.transliterate('Café☕', '*', true), 'Cafe*');
        });

        test('handles strict mode with null unknown', () => {
            assert.strictEqual(Str.transliterate('Hello世界', null, true), 'Hello');
        });

        test('handles mixed accents and ligatures', () => {
            assert.strictEqual(Str.transliterate('Café Æon naïve straße'), 'Cafe AEon naive strasse');
        });

        test('preserves ASCII characters', () => {
            assert.strictEqual(Str.transliterate('Hello World 123!'), 'Hello World 123!');
        });

        test('handles empty string', () => {
            assert.strictEqual(Str.transliterate(''), '');
        });
    });
});
