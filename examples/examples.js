import Str from './index.js';

console.log('=== StringX-JS Examples ===\n');

// Case Conversion
console.log('--- Case Conversion ---');
console.log('camel:', Str.camel('foo_bar')); // fooBar
console.log('snake:', Str.snake('fooBar')); // foo_bar
console.log('kebab:', Str.kebab('fooBar')); // foo-bar
console.log('studly:', Str.studly('foo_bar')); // FooBar
console.log('title:', Str.title('hello world')); // Hello World
console.log('headline:', Str.headline('hello_world')); // Hello World
console.log('upper:', Str.upper('hello')); // HELLO
console.log('lower:', Str.lower('HELLO')); // hello
console.log('ucfirst:', Str.ucfirst('hello')); // Hello
console.log('lcfirst:', Str.lcfirst('Hello')); // hello
console.log();

// String Extraction
console.log('--- String Extraction ---');
console.log('after:', Str.after('This is my name', 'This is')); // ' my name'
console.log('afterLast:', Str.afterLast('App\\Http\\Controllers\\Controller', '\\')); // Controller
console.log('before:', Str.before('This is my name', 'my name')); // 'This is '
console.log('beforeLast:', Str.beforeLast('This is my name', 'is')); // 'This '
console.log('between:', Str.between('[a] bc [d]', '[', ']')); // 'a] bc [d'
console.log('betweenFirst:', Str.betweenFirst('[a] bc [d]', '[', ']')); // 'a'
console.log();

// String Checks
console.log('--- String Checks ---');
console.log('contains:', Str.contains('This is my name', 'my')); // true
console.log('containsAll:', Str.containsAll('This is my name', ['my', 'name'])); // true
console.log('startsWith:', Str.startsWith('Hello World', 'Hello')); // true
console.log('endsWith:', Str.endsWith('Hello World', 'World')); // true
console.log('is (pattern):', Str.is('foo*', 'foobar')); // true
console.log('isAscii:', Str.isAscii('Hello World')); // true
console.log('isJson:', Str.isJson('{"name":"John"}')); // true
console.log('isUrl:', Str.isUrl('https://example.com')); // true
console.log();

// String Manipulation
console.log('--- String Manipulation ---');
console.log('limit:', Str.limit('The quick brown fox', 10)); // 'The quick...'
console.log('words:', Str.words('The quick brown fox jumps', 3)); // 'The quick brown...'
console.log('mask:', Str.mask('email@example.com', '*', 5)); // 'email************'
console.log('trim:', Str.trim('  hello  ')); // 'hello'
console.log('squish:', Str.squish('  hello   world  ')); // 'hello world'
console.log('finish:', Str.finish('this/string', '/')); // 'this/string/'
console.log('start:', Str.start('this/string', '/')); // '/this/string'
console.log('wrap:', Str.wrap('Hello', '"')); // '"Hello"'
console.log('reverse:', Str.reverse('Hello')); // 'olleH'
console.log();

// Replacement
console.log('--- Replacement ---');
console.log('replace:', Str.replace('foo', 'bar', 'foo foo')); // 'bar bar'
console.log('replaceFirst:', Str.replaceFirst('foo', 'bar', 'foo foo')); // 'bar foo'
console.log('replaceLast:', Str.replaceLast('foo', 'bar', 'foo foo')); // 'foo bar'
console.log('remove:', Str.remove('foo', 'foo bar foo')); // ' bar '
console.log('swap:', Str.swap({foo: 'bar', bar: 'baz'}, 'foo bar')); // 'bar baz'
console.log();

// Padding
console.log('--- Padding ---');
console.log('padBoth:', Str.padBoth('James', 10, '_')); // '__James___'
console.log('padLeft:', Str.padLeft('James', 10, '-')); // '-----James'
console.log('padRight:', Str.padRight('James', 10, '-')); // 'James-----'
console.log();

// Utilities
console.log('--- Utilities ---');
console.log('length:', Str.length('Hello')); // 5
console.log('wordCount:', Str.wordCount('Hello World')); // 2
console.log('numbers:', Str.numbers('abc123def456')); // '123456'
console.log('slug:', Str.slug('Hello World')); // 'hello-world'
console.log('plural:', Str.plural('car')); // 'cars'
console.log('singular:', Str.singular('cars')); // 'car'
console.log('charAt:', Str.charAt('Hello', 0)); // 'H'
console.log('substr:', Str.substr('Hello World', 0, 5)); // 'Hello'
console.log('take:', Str.take('Hello World', 5)); // 'Hello'
console.log('repeat:', Str.repeat('a', 3)); // 'aaa'
console.log('ucsplit:', Str.ucsplit('FooBar')); // ['Foo', 'Bar']
console.log();

// Advanced Features
console.log('--- Advanced Features ---');
console.log('excerpt:', Str.excerpt('This is a long text with the word Laravel in it', 'Laravel', {radius: 10}));
console.log('apa:', Str.apa('the quick brown fox')); // 'The Quick Brown Fox'
console.log('ascii:', Str.ascii('café')); // 'cafe'
console.log('password:', Str.password(16)); // Random password
console.log('random:', Str.random(10)); // Random string
console.log('wordWrap:', Str.wordWrap('This is a very long sentence that needs to be wrapped', 20));
console.log();

// UUID & ULID
console.log('--- UUID & ULID ---');
const uuid = Str.uuid();
console.log('uuid:', uuid);
console.log('isUuid:', Str.isUuid(uuid)); // true

const uuid7 = Str.uuid7();
console.log('uuid7:', uuid7);

const ulid = Str.ulid();
console.log('ulid:', ulid);
console.log('isUlid:', Str.isUlid(ulid)); // true
console.log();

// Encoding
console.log('--- Encoding ---');
const encoded = Str.toBase64('Hello World');
console.log('toBase64:', encoded);
console.log('fromBase64:', Str.fromBase64(encoded)); // 'Hello World'
console.log();

// Pattern Matching
console.log('--- Pattern Matching ---');
console.log('match:', Str.match(/(\d+)/, 'Order 123')); // '123'
console.log('matchAll:', Str.matchAll(/\d+/g, 'Order 123 and 456')); // ['123', '456']
console.log('isMatch:', Str.isMatch(/\d+/, '123')); // true
console.log();

console.log('=== All examples completed! ===');
