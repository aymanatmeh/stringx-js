# StringX-JS

A comprehensive JavaScript string manipulation library inspired by Laravel's Str helper class. This package provides a wide range of methods for working with strings in a clean and intuitive way.

## Installation

```bash
npm install stringx-js
```

## Usage

```javascript
import Str from 'stringx-js';

// Convert to camelCase
Str.camel('foo_bar'); // 'fooBar'

// Generate a UUID
Str.uuid(); // 'e3c2d7a4-...'

// Limit string length
Str.limit('The quick brown fox', 10); // 'The quick...'

// And many more...
```

## Method Overview

StringX-JS provides **95+ methods** organized into the following categories:

### Quick Reference

| Category | Methods |
|----------|---------|
| **Case Conversion** | `camel`, `kebab`, `snake`, `studly`, `pascal`, `title`, `headline`, `upper`, `lower`, `ucfirst`, `lcfirst`, `apa`, `convertCase` |
| **String Extraction** | `after`, `afterLast`, `before`, `beforeLast`, `between`, `betweenFirst`, `charAt`, `substr`, `take` |
| **String Checking** | `contains`, `containsAll`, `doesntContain`, `startsWith`, `doesntStartWith`, `endsWith`, `doesntEndWith`, `is`, `isAscii`, `isJson`, `isUrl`, `isUuid`, `isUlid`, `isMatch` |
| **String Manipulation** | `limit`, `words`, `mask`, `trim`, `ltrim`, `rtrim`, `squish`, `chopStart`, `chopEnd`, `finish`, `start`, `wrap`, `unwrap`, `reverse`, `ascii`, `transliterate`, `wordWrap` |
| **String Replacement** | `replace`, `replaceFirst`, `replaceLast`, `replaceArray`, `replaceStart`, `replaceEnd`, `replaceMatches`, `remove`, `swap`, `deduplicate`, `substrReplace` |
| **Pattern Matching** | `match`, `matchAll`, `isMatch` |
| **Padding** | `padBoth`, `padLeft`, `padRight` |
| **String Information** | `length`, `wordCount`, `substrCount`, `position` |
| **String Generation** | `random`, `password`, `uuid`, `uuid7`, `ulid` |
| **Pluralization** | `plural`, `singular`, `pluralStudly`, `pluralPascal` |
| **Other Utilities** | `slug`, `numbers`, `excerpt`, `ucsplit`, `repeat` |
| **Encoding** | `toBase64`, `fromBase64` |
| **Factories** | `createUuidsUsing`, `createUuidsNormally`, `createUlidsUsing`, `createUlidsNormally`, `createRandomStringsUsing`, `createRandomStringsNormally` |
| **Cache Management** | `flushCache` |

## Available Methods

### String Extraction

#### `after(subject, search)`
Return the remainder of a string after the first occurrence of a given value.

```javascript
Str.after('This is my name', 'This is'); // ' my name'
```

#### `afterLast(subject, search)`
Return the remainder of a string after the last occurrence of a given value.

```javascript
Str.afterLast('App\\Http\\Controllers\\Controller', '\\'); // 'Controller'
```

#### `before(subject, search)`
Get the portion of a string before the first occurrence of a given value.

```javascript
Str.before('This is my name', 'my name'); // 'This is '
```

#### `beforeLast(subject, search)`
Get the portion of a string before the last occurrence of a given value.

```javascript
Str.beforeLast('This is my name', 'is'); // 'This '
```

#### `between(subject, from, to)`
Get the portion of a string between two given values.

```javascript
Str.between('This is my name', 'This', 'name'); // ' is my '
```

#### `betweenFirst(subject, from, to)`
Get the smallest possible portion of a string between two given values.

```javascript
Str.betweenFirst('[a] bc [d]', '[', ']'); // 'a'
```

### Case Conversion

#### `camel(value)`
Convert a value to camelCase.

```javascript
Str.camel('foo_bar'); // 'fooBar'
Str.camel('foo-bar'); // 'fooBar'
```

#### `kebab(value)`
Convert a string to kebab-case.

```javascript
Str.kebab('fooBar'); // 'foo-bar'
```

#### `snake(value, delimiter = '_')`
Convert a string to snake_case.

```javascript
Str.snake('fooBar'); // 'foo_bar'
Str.snake('fooBar', '-'); // 'foo-bar'
```

#### `studly(value)` / `pascal(value)`
Convert a value to StudlyCase (PascalCase).

```javascript
Str.studly('foo_bar'); // 'FooBar'
Str.pascal('foo_bar'); // 'FooBar'
```

#### `title(value)`
Convert the given string to title case.

```javascript
Str.title('hello world'); // 'Hello World'
```

#### `headline(value)`
Convert the given string to title case for each word.

```javascript
Str.headline('hello_world'); // 'Hello World'
Str.headline('hello-world'); // 'Hello World'
```

#### `lower(value)`
Convert the given string to lower-case.

```javascript
Str.lower('HELLO'); // 'hello'
```

#### `upper(value)`
Convert the given string to upper-case.

```javascript
Str.upper('hello'); // 'HELLO'
```

#### `ucfirst(string)`
Make a string's first character uppercase.

```javascript
Str.ucfirst('hello'); // 'Hello'
```

#### `lcfirst(string)`
Make a string's first character lowercase.

```javascript
Str.lcfirst('Hello'); // 'hello'
```

#### `apa(value)`
Convert the given string to APA-style title case.

```javascript
Str.apa('the quick brown fox'); // 'The Quick Brown Fox'
Str.apa('a guide to javascript'); // 'A Guide to JavaScript'
```

#### `convertCase(string, mode = 'lower', encoding = 'UTF-8')`
Convert case of a string using different modes.

```javascript
Str.convertCase('Hello', 'upper'); // 'HELLO'
Str.convertCase('HELLO', 'lower'); // 'hello'
Str.convertCase('hello world', 'title'); // 'Hello World'
```

### String Manipulation

#### `limit(value, limit = 100, end = '...')`
Limit the number of characters in a string.

```javascript
Str.limit('The quick brown fox', 10); // 'The quick...'
Str.limit('The quick brown fox', 10, ' >'); // 'The quick >'
```

#### `words(value, words = 100, end = '...')`
Limit the number of words in a string.

```javascript
Str.words('The quick brown fox jumps', 3); // 'The quick brown...'
```

#### `mask(string, character, index, length = null)`
Masks a portion of a string with a repeated character.

```javascript
Str.mask('email@example.com', '*', 5); // 'email************'
Str.mask('1234567890', '*', 0, 4); // '****567890'
```

#### `trim(value, charlist = null)`
Remove whitespace (or other characters) from both ends of a string.

```javascript
Str.trim('  hello  '); // 'hello'
Str.trim('/hello/', '/'); // 'hello'
```

#### `ltrim(value, charlist = null)`
Remove whitespace (or other characters) from the beginning of a string.

```javascript
Str.ltrim('  hello  '); // 'hello  '
```

#### `rtrim(value, charlist = null)`
Remove whitespace (or other characters) from the end of a string.

```javascript
Str.rtrim('  hello  '); // '  hello'
```

#### `squish(value)`
Remove all "extra" blank space from the given string.

```javascript
Str.squish('  hello   world  '); // 'hello world'
```

#### `chopStart(subject, needle)`
Remove the given string(s) if it exists at the start of the haystack.

```javascript
Str.chopStart('Hello World', 'Hello '); // 'World'
Str.chopStart('Hello World', ['Hi ', 'Hello ']); // 'World'
```

#### `chopEnd(subject, needle)`
Remove the given string(s) if it exists at the end of the haystack.

```javascript
Str.chopEnd('Hello World', ' World'); // 'Hello'
```

#### `finish(value, cap)`
Cap a string with a single instance of a given value.

```javascript
Str.finish('this/string', '/'); // 'this/string/'
Str.finish('this/string/', '/'); // 'this/string/'
```

#### `start(value, prefix)`
Begin a string with a single instance of a given value.

```javascript
Str.start('this/string', '/'); // '/this/string'
Str.start('/this/string', '/'); // '/this/string'
```

#### `wrap(value, before, after = null)`
Wrap the string with the given strings.

```javascript
Str.wrap('Hello', '"'); // '"Hello"'
Str.wrap('Hello', '<', '>'); // '<Hello>'
```

#### `unwrap(value, before, after = null)`
Unwrap the string with the given strings.

```javascript
Str.unwrap('"Hello"', '"'); // 'Hello'
Str.unwrap('<Hello>', '<', '>'); // 'Hello'
```

#### `ascii(value, language = 'en')`
Transliterate a string to its closest ASCII representation.

```javascript
Str.ascii('café'); // 'cafe'
Str.ascii('über'); // 'uber'
```

#### `transliterate(string, unknown = '?', strict = false)`
Transliterate a string to its closest ASCII representation with control over unknown characters.

```javascript
Str.transliterate('café'); // 'cafe'
Str.transliterate('Hello 世界', '?', true); // 'Hello ??'
```

#### `wordWrap(string, characters = 75, breakStr = '\n', cutLongWords = false)`
Wrap a string to a given number of characters.

```javascript
Str.wordWrap('This is a very long sentence', 20);
// 'This is a very long\nsentence'

Str.wordWrap('Short text', 20); // 'Short text'
```

### String Replacement

#### `replace(search, replace, subject, caseSensitive = true)`
Replace the given value in the given string.

```javascript
Str.replace('foo', 'bar', 'foo foo'); // 'bar bar'
Str.replace(['foo', 'bar'], 'baz', 'foo bar'); // 'baz baz'
```

#### `replaceFirst(search, replace, subject)`
Replace the first occurrence of a given value in the string.

```javascript
Str.replaceFirst('foo', 'bar', 'foo foo'); // 'bar foo'
```

#### `replaceLast(search, replace, subject)`
Replace the last occurrence of a given value in the string.

```javascript
Str.replaceLast('foo', 'bar', 'foo foo'); // 'foo bar'
```

#### `remove(search, subject, caseSensitive = true)`
Remove any occurrence of the given string in the subject.

```javascript
Str.remove('foo', 'foo bar foo'); // ' bar '
```

#### `deduplicate(string, characters = ' ')`
Replace consecutive instances of a given character with a single character.

```javascript
Str.deduplicate('hello  world'); // 'hello world'
Str.deduplicate('foo---bar', '-'); // 'foo-bar'
Str.deduplicate('foo  --  bar', [' ', '-']); // 'foo - bar'
```

#### `replaceArray(search, replace, subject)`
Replace a given value in the string sequentially with an array.

```javascript
Str.replaceArray('?', ['foo', 'bar'], '? ?'); // 'foo bar'
Str.replaceArray('?', ['8:30', '9:00'], 'The event runs from ? to ?');
// 'The event runs from 8:30 to 9:00'
```

#### `replaceStart(search, replace, subject)`
Replace the first occurrence of the given value if it appears at the start.

```javascript
Str.replaceStart('Hello', 'Hi', 'Hello World'); // 'Hi World'
Str.replaceStart('Hello', 'Hi', 'World Hello'); // 'World Hello'
```

#### `replaceEnd(search, replace, subject)`
Replace the last occurrence of a given value if it appears at the end.

```javascript
Str.replaceEnd('World', 'Universe', 'Hello World'); // 'Hello Universe'
Str.replaceEnd('World', 'Universe', 'World Hello'); // 'World Hello'
```

#### `replaceMatches(pattern, replace, subject, limit = -1)`
Replace the patterns matching the given regular expression.

```javascript
Str.replaceMatches(/\d+/, 'X', 'Order 123'); // 'Order X'
Str.replaceMatches(/\d+/g, 'X', 'Order 123 and 456'); // 'Order X and X'
Str.replaceMatches(/\d+/g, 'X', 'a1 b2 c3', 2); // 'aX bX c3'
```

#### `swap(map, subject)`
Swap multiple keywords in a string with other keywords.

```javascript
Str.swap({foo: 'bar', bar: 'baz'}, 'foo bar'); // 'bar baz'
Str.swap({Hello: 'Hi', World: 'Universe'}, 'Hello World'); // 'Hi Universe'
```

#### `substrReplace(string, replace, offset = 0, length = null)`
Replace text within a portion of a string.

```javascript
Str.substrReplace('Hello World', 'Goodbye', 0, 5); // 'Goodbye World'
Str.substrReplace('1234567890', 'xxx', 3, 3); // '123xxx7890'
```

### String Checking

#### `contains(haystack, needles, ignoreCase = false)`
Determine if a given string contains a given substring.

```javascript
Str.contains('This is my name', 'my'); // true
Str.contains('This is my name', ['my', 'name']); // true
Str.contains('This is my name', 'MY', true); // true
```

#### `containsAll(haystack, needles, ignoreCase = false)`
Determine if a given string contains all array values.

```javascript
Str.containsAll('This is my name', ['my', 'name']); // true
Str.containsAll('This is my name', ['my', 'foo']); // false
```

#### `doesntContain(haystack, needles, ignoreCase = false)`
Determine if a given string doesn't contain a given substring.

```javascript
Str.doesntContain('This is my name', 'foo'); // true
```

#### `startsWith(haystack, needles)`
Determine if a given string starts with a given substring.

```javascript
Str.startsWith('Hello World', 'Hello'); // true
Str.startsWith('Hello World', ['Hello', 'Hi']); // true
```

#### `doesntStartWith(haystack, needles)`
Determine if a given string doesn't start with a given substring.

```javascript
Str.doesntStartWith('Hello World', 'Hi'); // true
```

#### `endsWith(haystack, needles)`
Determine if a given string ends with a given substring.

```javascript
Str.endsWith('Hello World', 'World'); // true
Str.endsWith('Hello World', ['World', 'Earth']); // true
```

#### `doesntEndWith(haystack, needles)`
Determine if a given string doesn't end with a given substring.

```javascript
Str.doesntEndWith('Hello World', 'Earth'); // true
```

#### `is(pattern, value, ignoreCase = false)`
Determine if a given string matches a given pattern.

```javascript
Str.is('*', 'foo'); // true
Str.is('foo*', 'foobar'); // true
Str.is(['foo', 'bar'], 'foo'); // true
```

#### `isAscii(value)`
Determine if a given string is 7 bit ASCII.

```javascript
Str.isAscii('Hello World'); // true
Str.isAscii('Hello 世界'); // false
```

#### `isJson(value)`
Determine if a given value is valid JSON.

```javascript
Str.isJson('{"name":"John"}'); // true
Str.isJson('not json'); // false
```

#### `isUrl(value, protocols = [])`
Determine if a given value is a valid URL.

```javascript
Str.isUrl('https://example.com'); // true
Str.isUrl('http://example.com', ['https']); // false
```

#### `isUuid(value)`
Determine if a given value is a valid UUID.

```javascript
const uuid = Str.uuid();
Str.isUuid(uuid); // true
Str.isUuid('not-a-uuid'); // false
```

#### `isUlid(value)`
Determine if a given value is a valid ULID.

```javascript
const ulid = Str.ulid();
Str.isUlid(ulid); // true
```

### String Information

#### `length(value)`
Return the length of the given string.

```javascript
Str.length('Hello'); // 5
Str.length('👍'); // 1 (handles Unicode correctly)
```

#### `wordCount(string)`
Get the number of words a string contains.

```javascript
Str.wordCount('Hello World'); // 2
```

#### `substrCount(haystack, needle, offset = 0, length = null)`
Returns the number of substring occurrences.

```javascript
Str.substrCount('foo foo foo', 'foo'); // 3
```

### Pattern Matching

#### `match(pattern, subject)`
Get the string matching the given pattern.

```javascript
Str.match(/(\d+)/, 'Order 123'); // '123'
```

#### `isMatch(pattern, value)`
Determine if a given string matches a given pattern.

```javascript
Str.isMatch(/\d+/, '123'); // true
```

#### `matchAll(pattern, subject)`
Get all strings matching the given pattern.

```javascript
Str.matchAll(/\d+/g, 'Order 123 and 456'); // ['123', '456']
```

### Padding

#### `padBoth(value, length, pad = ' ')`
Pad both sides of a string with another.

```javascript
Str.padBoth('James', 10, '_'); // '__James___'
```

#### `padLeft(value, length, pad = ' ')`
Pad the left side of a string with another.

```javascript
Str.padLeft('James', 10, '-'); // '-----James'
```

#### `padRight(value, length, pad = ' ')`
Pad the right side of a string with another.

```javascript
Str.padRight('James', 10, '-'); // 'James-----'
```

### Other Utilities

#### `charAt(subject, index)`
Get the character at the specified index.

```javascript
Str.charAt('Hello', 0); // 'H'
Str.charAt('Hello', -1); // 'o'
```

#### `plural(value, count = 2)`
Get the plural form of an English word.

```javascript
Str.plural('car'); // 'cars'
Str.plural('car', 1); // 'car'
Str.plural('city'); // 'cities'
```

#### `singular(value)`
Get the singular form of an English word.

```javascript
Str.singular('cars'); // 'car'
Str.singular('cities'); // 'city'
```

#### `slug(title, separator = '-')`
Generate a URL friendly "slug" from a given string.

```javascript
Str.slug('Hello World'); // 'hello-world'
Str.slug('Hello World', '_'); // 'hello_world'
```

#### `random(length = 16)`
Generate a random, secure string.

```javascript
Str.random(); // 'aB3dE5fG7hI9jK1L'
Str.random(32); // 32 character random string
```

#### `numbers(value)`
Remove all non-numeric characters from a string.

```javascript
Str.numbers('abc123def456'); // '123456'
Str.numbers('Price: $19.99'); // '1999'
```

#### `reverse(value)`
Reverse the given string.

```javascript
Str.reverse('Hello'); // 'olleH'
```

#### `substr(string, start, length = null)`
Returns the portion of the string specified by the start and length parameters.

```javascript
Str.substr('Hello World', 0, 5); // 'Hello'
Str.substr('Hello World', 6); // 'World'
Str.substr('Hello World', -5); // 'World'
```

#### `take(string, limit)`
Take the first or last {limit} characters of a string.

```javascript
Str.take('Hello World', 5); // 'Hello'
Str.take('Hello World', -5); // 'World'
```

#### `repeat(string, times)`
Repeat the given string.

```javascript
Str.repeat('a', 3); // 'aaa'
```

#### `ucsplit(string)`
Split a string into pieces by uppercase characters.

```javascript
Str.ucsplit('FooBar'); // ['Foo', 'Bar']
```

#### `excerpt(text, phrase = '', options = {})`
Extracts an excerpt from text that matches the first instance of a phrase.

```javascript
Str.excerpt('This is a long text with the word Laravel', 'Laravel');
// '...with the word Laravel'

Str.excerpt('This is my name', 'my', {radius: 3});
// '...is my na...'

Str.excerpt('This is my name', '', {radius: 4});
// 'This...'
```

#### `password(length = 32, letters = true, numbers = true, symbols = true, spaces = false)`
Generate a secure password.

```javascript
Str.password(); // 'aB3!dE5@fG7#hI9$'
Str.password(16); // 16 character password
Str.password(12, true, true, false); // Letters and numbers only
Str.password(8, true, false, false); // Letters only
```

#### `position(haystack, needle, offset = 0)`
Find the position of the first occurrence of a substring.

```javascript
Str.position('Hello World', 'World'); // 6
Str.position('Hello World', 'o'); // 4
Str.position('Hello World', 'o', 5); // 7
Str.position('Hello World', 'xyz'); // false
```

#### `pluralStudly(value, count = 2)`
Pluralize the last word of an English, studly caps case string.

```javascript
Str.pluralStudly('UserProfile'); // 'UserProfiles'
Str.pluralStudly('VerifiedHuman'); // 'VerifiedHumans'
Str.pluralStudly('Child', 1); // 'Child'
```

#### `pluralPascal(value, count = 2)`
Pluralize the last word of an English, Pascal case string (alias for pluralStudly).

```javascript
Str.pluralPascal('UserProfile'); // 'UserProfiles'
Str.pluralPascal('Child', 1); // 'Child'
```

### Encoding

#### `toBase64(string)`
Convert the given string to Base64 encoding.

```javascript
Str.toBase64('Hello World'); // 'SGVsbG8gV29ybGQ='
```

#### `fromBase64(string, strict = false)`
Decode the given Base64 encoded string.

```javascript
Str.fromBase64('SGVsbG8gV29ybGQ='); // 'Hello World'
```

### UUID & ULID

#### `uuid()`
Generate a UUID (version 4).

```javascript
Str.uuid(); // 'e3c2d7a4-5c8e-4b2f-a1d3-9e7f6c5b4a3d'
```

#### `uuid7()`
Generate a UUID (version 7).

```javascript
Str.uuid7(); // '018f4f9e-5c8e-7b2f-a1d3-9e7f6c5b4a3d'
```

#### `ulid()`
Generate a ULID.

```javascript
Str.ulid(); // '01HQXYZ123ABC456DEF789GHJ'
```

### Factories

You can customize the behavior of UUID, ULID, and random string generation:

#### `createUuidsUsing(factory = null)`
Set the callable that will be used to generate UUIDs.

```javascript
Str.createUuidsUsing(() => 'custom-uuid');
Str.uuid(); // 'custom-uuid'
```

#### `createUuidsNormally()`
Indicate that UUIDs should be created normally (reset to default).

```javascript
Str.createUuidsNormally();
Str.uuid(); // Regular UUID generation resumes
```

#### `createUlidsUsing(factory = null)`
Set the callable that will be used to generate ULIDs.

```javascript
Str.createUlidsUsing(() => 'custom-ulid');
Str.ulid(); // 'custom-ulid'
```

#### `createUlidsNormally()`
Indicate that ULIDs should be created normally (reset to default).

```javascript
Str.createUlidsNormally();
Str.ulid(); // Regular ULID generation resumes
```

#### `createRandomStringsUsing(factory = null)`
Set the callable that will be used to generate random strings.

```javascript
Str.createRandomStringsUsing((length) => 'x'.repeat(length));
Str.random(5); // 'xxxxx'
```

#### `createRandomStringsNormally()`
Indicate that random strings should be created normally (reset to default).

```javascript
Str.createRandomStringsNormally();
Str.random(16); // Regular random string generation resumes
```

### Cache Management

#### `flushCache()`
Remove all strings from the casing caches.

```javascript
Str.flushCache();
```

## Testing

Run the test suite:

```bash
npm test
```

Watch mode for tests:

```bash
npm run test:watch
```

## License

MIT

## Credits

Inspired by Laravel's [Str helper](https://laravel.com/docs/strings).
