# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-10-27

### Added
- **🎯 Fluent method chaining with `Str.of()` and Stringable class (Laravel-style)**
- New `Stringable` class for method chaining with 95+ chainable methods
- `Str.of()` method to create Stringable instances
- **Stringable utility methods:**
  - `append(...values)` - Append strings to the end
  - `prepend(...values)` - Prepend strings to the beginning
  - `pipe(callback)` - Transform with custom function
  - `tap(callback)` - Execute callback without modifying string (for debugging)
- **Conditional transformation methods:**
  - `when(condition, callback, defaultCallback)` - Conditionally transform
  - `unless(condition, callback, defaultCallback)` - Transform unless condition is true
  - `whenEmpty(callback)` - Transform only if string is empty
  - `whenNotEmpty(callback)` - Transform only if string is not empty
- **Debugging helpers:**
  - `dump()` - Log current value and continue chain
  - `dd()` - Dump and die (Laravel-style)
- **Checking methods:**
  - `isEmpty()` - Check if string is empty
  - `isNotEmpty()` - Check if string is not empty
  - `test(pattern)` - Test against regex pattern
- **Value extraction methods:**
  - `toString()` - Get string value
  - `valueOf()` - Get string value (for coercion)
  - `toJSON()` - JSON serialization support
- Improved `slug()` method to handle camelCase properly
- 49 new comprehensive tests for Stringable (137 total tests, all passing)
- Dedicated "Stringable API" section in README with examples
- 20+ real-world chaining examples in `examples/chaining-examples.js`

### Fixed
- `slug()` now correctly handles camelCase strings (e.g., 'helloWorld' → 'hello-world')

### Documentation
- Added complete Stringable API documentation to README
- Added fluent chaining usage examples
- Created STRINGABLE-FEATURE.md with detailed feature documentation
- Updated all examples to show both static and chaining approaches

## [1.0.0] - 2024-10-27

### Added
- Initial release of StringX-JS
- 95+ string manipulation methods inspired by Laravel's Str helper
- **Case conversion methods:** camel, snake, kebab, studly, pascal, title, headline, apa, convertCase
- **String extraction methods:** after, afterLast, before, beforeLast, between, betweenFirst, charAt, substr, take
- **String checking methods:** contains, containsAll, doesntContain, startsWith, doesntStartWith, endsWith, doesntEndWith, is, isAscii, isJson, isUrl, isUuid, isUlid, isMatch
- **String manipulation methods:** limit, words, mask, trim, ltrim, rtrim, squish, chopStart, chopEnd, finish, start, wrap, unwrap, reverse, ascii, transliterate, wordWrap
- **String replacement methods:** replace, replaceFirst, replaceLast, replaceArray, replaceStart, replaceEnd, replaceMatches, remove, swap, deduplicate, substrReplace
- **Pattern matching:** match, matchAll, isMatch with regex support
- **Padding methods:** padLeft, padRight, padBoth
- **String generation:** uuid, uuid7, ulid, random, password (with crypto support)
- **Pluralization:** plural, singular, pluralStudly, pluralPascal
- **Encoding:** toBase64, fromBase64
- **String information:** length, wordCount, substrCount, position
- **Utilities:** slug, numbers, excerpt, ucsplit, repeat
- **Factory customization:** createUuidsUsing, createUlidsUsing, createRandomStringsUsing (and corresponding "Normally" methods)
- **Cache management:** flushCache for case conversion caches
- Comprehensive test suite with 88 tests (100% passing)
- Full documentation with examples for every method
- Browser and Node.js compatibility (Node.js 14+)
- ES6 module support
- MIT License

[1.0.1]: https://github.com/yourusername/stringx-js/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/yourusername/stringx-js/releases/tag/v1.0.0
