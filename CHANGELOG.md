# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-10-29

### Added
- **🎯 Comprehensive Array Manipulation (`Arr` Class)**
  - New `Arr` class with **60 powerful array and object manipulation methods**
  - Inspired by Laravel's Arr helper class
  - All methods are static and work with both arrays and objects
  - **Complete implementation** - 100% of Laravel's Arr methods

- **📍 Dot Notation Support**
  - `get()` - Access nested values using dot notation (e.g., `'user.address.city'`)
  - `set()` - Set nested values using dot notation
  - `has()` - Check if nested keys exist
  - `hasAll()` - Check if all keys exist
  - `hasAny()` - Check if any keys exist
  - `dot()` - Flatten nested objects to dot notation
  - `undot()` - Expand dot notation back to nested objects
  - `forget()` - Remove items using dot notation
  - `add()` - Add items using dot notation if they don't exist

- **🔍 Array Filtering & Selection**
  - `where()` - Filter arrays using callbacks
  - `reject()` - Filter with negation
  - `whereNotNull()` - Remove null/undefined values
  - `first()` - Get first element (with optional callback)
  - `last()` - Get last element (with optional callback)
  - `take()` - Take first or last N items
  - `only()` - Get subset of items by keys
  - `except()` - Get all except specified keys
  - `select()` - Select specific fields from objects

- **🎯 Plucking & Mapping**
  - `pluck()` - Extract values from array of objects
  - `map()` - Transform array elements
  - `mapWithKeys()` - Create associative arrays
  - `mapSpread()` - Map over nested chunks
  - `keyBy()` - Key array by field or callback

- **🔧 Array Manipulation**
  - `flatten()` - Flatten multi-dimensional arrays (with depth control)
  - `collapse()` - Collapse array of arrays into single array
  - `partition()` - Split array by condition
  - `divide()` - Split into keys and values
  - `crossJoin()` - Create all possible permutations
  - `shuffle()` - Randomly shuffle array
  - `random()` - Get random items
  - `prepend()` - Add to beginning
  - `pull()` - Get and remove value
  - `wrap()` - Wrap non-arrays in array

- **📊 Sorting**
  - `sort()` - Sort arrays (with callback or key support)
  - `sortDesc()` - Sort descending
  - `sortRecursive()` - Recursively sort nested structures
  - `sortRecursiveDesc()` - Recursive descending sort

- **✅ Testing & Validation**
  - `exists()` - Check if key exists
  - `every()` - Check if all items pass test
  - `some()` - Check if any items pass test
  - `isAssoc()` - Check if array is associative
  - `isList()` - Check if array has sequential keys
  - `accessible()` - Check if value is array-accessible

- **🛡️ Type-Safe Getters**
  - `array()` - Get array value with type validation
  - `boolean()` - Get boolean value with type validation
  - `integer()` - Get integer value with type validation
  - `float()` - Get float value with type validation
  - `string()` - Get string value with type validation
  - All throw errors if type doesn't match

- **🎨 String Conversion**
  - `join()` - Join with optional final separator (Oxford comma style)
  - `query()` - Convert to query string
  - `toCssClasses()` - Compile to CSS classes
  - `toCssStyles()` - Compile to CSS styles

- **🔧 Additional Utilities**
  - `prependKeysWith()` - Prefix all keys
  - `from()` - Convert iterables, Sets, Maps, and objects to arrays
  - `push()` - Push items onto nested arrays using dot notation
  - `sole()` - Get sole item matching criteria or throw if multiple/none found
  - Full TypeScript support with comprehensive type definitions
  - Generic type support for all methods

- **✨ Enhanced String Methods (`Str` Class)**
  - **Enhanced `transliterate()` method** - Improved Unicode handling with better ligature support
    - Now uses NFKD normalization instead of NFD for improved compatibility
    - Added explicit handling for German sharp s (ß → ss)
    - Added support for Latin ligatures (æ → ae, Æ → AE, œ → oe, Œ → OE)
    - Better handling of accented characters across multiple languages
    - Enhanced JSDoc documentation with examples
    - Examples:
      - `Str.transliterate('straße')` → "strasse"
      - `Str.transliterate('Æon')` → "AEon"
      - `Str.transliterate("hors d'œuvre")` → "hors d'oeuvre"

### Testing
- Added 107 comprehensive test cases for Arr class (17 for new methods)
- Added 8 new test cases for enhanced transliterate() method
- Total test count increased from 223 to 320 tests
- Coverage includes:
  - Dot notation operations
  - Array filtering and transformation
  - Type-safe getters
  - Sorting algorithms
  - Edge cases and complex scenarios
  - Type conversions (from())
  - Dot notation pushing (push())
  - Sole item validation (sole())
  - Unicode normalization and ligature handling (transliterate())
  - Accented characters across multiple languages

### Examples
- Created comprehensive `examples/arr-examples.js` with 20 sections
- Real-world use cases:
  - E-commerce order processing
  - Form data handling with dot notation
  - Data analytics with nested metrics
  - CSS class and style management
- Demonstrates all 60 Arr methods with practical examples

### Documentation
- Added comprehensive Arr class documentation to README
- Documented all 60 array manipulation methods
- Added code examples for each method category (including from, push, sole)
- Included real-world usage patterns
- Updated package description to mention array capabilities (60 methods)
- Added TypeScript usage examples

### Package Metadata
- Updated version to 1.1.0
- Updated description: "A comprehensive JavaScript library for string, number, and array manipulation"
- Added keywords: `array`, `arr`, `array-manipulation`, `array-utils`, `array-helpers`, `dot-notation`, `nested-objects`, `pluck`, `map`, `filter`, `flatten`, `collection`
- Added `src/Arr.js` and `src/Arr.d.ts` to files array

### Files Changed
- `src/Arr.js` - New comprehensive Arr class (60 methods, ~1400 lines)
- `src/Arr.d.ts` - Full TypeScript definitions for Arr class (including from, push, sole)
- `src/tests/arr.test.js` - Comprehensive test suite (107 tests total, 17 new)
- `examples/arr-examples.js` - Real-world examples (20 sections)
- `src/Str.js` - Enhanced transliterate() method with improved ligature handling
- `src/tests/str.test.js` - Added 8 comprehensive tests for transliterate() enhancements
- `index.js` - Added Arr export
- `index.d.ts` - Added Arr type definitions
- `README.md` - Updated Arr and transliterate() documentation with examples
- `package.json` - Updated version, description (60 array utilities), keywords, and files

### Migration Notes
- No breaking changes
- Fully backward compatible with v1.0.5
- Arr class is a new addition and doesn't affect existing Str or Number functionality

## [1.0.5] - 2024-10-28

### Added
- **🌍 Multi-language number spelling (powered by n2words)**
  - `spell()` method now supports 16+ languages
  - Supported languages: English (en), French (fr), Spanish (es), German (de), Arabic (ar), Portuguese (pt), Italian (it), Russian (ru), Polish (pl), Ukrainian (uk), Turkish (tr), Dutch (nl), Indonesian (id), Korean (ko), Vietnamese (vi), Chinese (zh)
  - Examples:
    - `Number.spell(42, 'fr')` → "quarante-deux" (French)
    - `Number.spell(42, 'es')` → "cuarenta y dos" (Spanish)
    - `Number.spell(42, 'de')` → "zweiundvierzig" (German)
  - Added `n2words` package as dependency for robust multilingual support

- **🌐 Locale-aware number parsing**
  - Enhanced `parse()` method with locale-specific decimal and thousands separator detection
  - Enhanced `parseInt()` and `parseFloat()` with locale support
  - Added `#getLocaleSeparators()` helper to detect locale separators using Intl.NumberFormat
  - Examples:
    - `Number.parse("1,234.56")` → 1234.56 (en: comma=thousands, period=decimal)
    - `Number.parse("10,123", "fr")` → 10.123 (fr: comma=decimal, space=thousands)
    - `Number.parse("1.234,56", "de")` → 1234.56 (de: period=thousands, comma=decimal)
    - `Number.parseInt("10,123", "fr")` → 10 (correctly interprets French decimal)
  - Handles regular spaces and non-breaking spaces universally
  - Properly escapes special regex characters in separators

### Enhanced
- **Number.spell() improvements**
  - Now uses n2words for accurate multi-language support
  - Maintains backward compatibility with English
  - Fallback to English for unsupported locales
  - Better handling of hundreds (e.g., "one hundred and twenty-three" with proper "and")

- **Number.spellOrdinal() improvements**
  - Enhanced with n2words support for available languages
  - Falls back to basic English implementation for unsupported locales
  - Maintains full English ordinal support (first, second, third, etc.)

### Changed
- **Default locale updated**
  - Changed default locale from `'en-US'` to `'en'` for broader compatibility
  - More flexible for international users while maintaining English defaults

### Testing
- Added 3 new comprehensive tests (223 total tests)
- **Test: "handles locale-specific decimal separators"** in parse()
  - Tests French format: "1 234,56" → 1234.56
  - Tests German format: "1.234,56" → 1234.56
- **Test: "handles French locale with comma as decimal separator"** in parseInt()
  - Tests: "10,123" with 'fr' locale → 10
- **Test: "handles locale-specific formats"** in parseFloat()
  - Tests French: "10,123" → 10.123
  - Tests German: "1.234,56" → 1234.56
- **Test: "supports multiple locales"** in spell()
  - Tests French: 42 → "quarante-deux", 100 → "cent"
  - Tests Spanish: 42 → "cuarenta y dos", 100 → "cien"
  - Tests German: 42 → "zweiundvierzig", 100 → "einhundert"
- **Test: "formats percentages with precision"**
  - Added test: `Number.percentage(10, 2)` → "10.00%"
- All 223 tests passing ✅

### Documentation
- Updated README with comprehensive locale-aware parsing examples
- Added multi-language spelling examples for all 16 supported languages
- Updated TypeScript definitions with locale parameter documentation
- Enhanced JSDoc comments with locale examples
- Added credits to n2words library in README
- Documented supported languages in both README and type definitions

### Dependencies
- Added `n2words` ^1.21.0 for multi-language number spelling

### Package Metadata
- Added keywords: `i18n`, `multilingual`, `n2words`, `spell-number`, `number-to-words`
- Updated description to highlight number formatting capabilities

## [1.0.4] - 2024-10-28

### Added
- **🔢 Number formatting class (inspired by Laravel's Number helper)**
  - New `Number` class with 25+ static methods for number manipulation
  - **Formatting methods:**
    - `format()` - Locale-aware number formatting with thousand separators
    - `percentage()` - Convert to percentage format (e.g., "66.67%")
    - `currency()` - Format as currency with locale support (e.g., "$1,234.56", "€1,234.56")
    - `fileSize()` - Convert bytes to human-readable sizes (B, KB, MB, GB, TB, etc.)
  - **Human-readable numbers:**
    - `forHumans()` - Convert to readable format (e.g., "1.5 million", "2.5 billion")
    - `abbreviate()` - Abbreviate large numbers (e.g., "1K", "2.5M", "3.5B")
  - **Spelling and ordinals:**
    - `spell()` - Spell out numbers in words (e.g., "forty-two", "one hundred")
    - `ordinal()` - Convert to ordinal format (e.g., "1st", "22nd", "103rd")
    - `spellOrdinal()` - Spell out ordinals (e.g., "first", "twenty-second")
  - **Parsing methods:**
    - `parse()` - Parse formatted number strings
    - `parseInt()` - Parse strings to integers
    - `parseFloat()` - Parse strings to floats
  - **Utility methods:**
    - `clamp()` - Constrain number between min/max values
    - `pairs()` - Generate [min, max] pairs for pagination ranges
    - `trim()` - Remove trailing zeros from decimals
  - **Locale and currency management:**
    - `useLocale()` / `defaultLocale()` - Set/get default locale
    - `useCurrency()` / `defaultCurrency()` - Set/get default currency
    - `withLocale()` - Temporarily use different locale for callback
    - `withCurrency()` - Temporarily use different currency for callback
  - Full TypeScript support with `src/Number.d.ts`
  - Export as named export: `import { Number } from 'stringx-js'`
  - Uses native `Intl.NumberFormat` and `Intl.PluralRules` APIs for locale support

- **📚 examples and documentation**
  - Added `examples/number-examples.js` with 16 sections demonstrating all Number methods
  - Added Number examples to `examples/typescript-example.ts` with type-safe implementations
  - Real-world examples: e-commerce pricing, analytics dashboards, pagination, social media stats
  - Combined Str + Number examples showing how to use both classes together

- **🎮 Demo & Playground section in README**
  - Added prominent badge linking to [stringx-js.com](https://www.stringx-js.com/)
  - New "Demo & Playground" section highlighting:
    - Live Editor for testing all methods
    - Chain Builder visual tool for fluent chaining
    - Interactive examples and method explorer
    - TypeScript support with autocomplete
  - Perfect for learning, experimentation, and teaching

### Changed
- **Package metadata updates**
  - Updated description to mention number formatting capabilities
  - Added number-related keywords: `number`, `number-formatting`, `currency`, `percentage`, `filesize`, `abbreviate`, `ordinal`, `intl`, `locale`
  - Updated homepage to `https://www.stringx-js.com/`
  - Added `src/Number.js` and `src/Number.d.ts` to files array
  - Updated version headers in type definition files

### Testing
- Added 65 comprehensive tests for Number class (219 total tests)
- All tests passing (219/219) ✅
- Test coverage includes:
  - All formatting methods (format, percentage, currency, fileSize)
  - Human-readable conversions (forHumans, abbreviate)
  - Spelling and ordinals (spell, ordinal, spellOrdinal)
  - Parsing methods (parse, parseInt, parseFloat)
  - Utility methods (clamp, pairs, trim)
  - Locale and currency management (withLocale, withCurrency, useLocale, useCurrency)
  - Edge cases and error handling

### Documentation
- Updated README with comprehensive Number class documentation
- Added Number TypeScript examples showing type-safe usage
- Documented all 25+ Number methods with examples
- Added demo badges and playground links for better discoverability

## [1.0.3] - 2024-10-28

### Enhanced
- **🎯 Comprehensive pluralization system (95% Laravel compatibility)**
  - Added `matchCase()` helper method for case-preserving transformations
  - Enhanced `plural()` method with 15+ irregular plural forms:
    - Irregular plurals: man→men, woman→women, child→children, person→people, tooth→teeth, foot→feet, mouse→mice, goose→geese, ox→oxen
    - Latin/Greek plurals: radius→radii, crisis→crises, analysis→analyses, criterion→criteria, phenomenon→phenomena, basis→bases, diagnosis→diagnoses, thesis→theses
  - Added uncountable words support (equipment, information, fish, sheep, moose, deer, news, pants, scissors, trousers, glasses, police)
  - Added -f/-fe → -ves endings (wolf→wolves, knife→knives, life→lives)
  - Added -o endings with proper exceptions (hero→heroes, potato→potatoes, but photo→photos, radio→radios)
  - Added case matching support (Child→Children, CHILD→CHILDREN, Man→Men, PERSON→PEOPLE)
  - Enhanced `singular()` method with reverse operations for all plural rules:
    - Irregular singulars: men→man, children→child, people→person, teeth→tooth, mice→mouse, geese→goose, oxen→ox
    - Latin/Greek singulars: radii→radius, crises→crisis, analyses→analysis, criteria→criterion, phenomena→phenomenon
    - -ves → -f/-fe endings (wolves→wolf, knives→knife, lives→life)
    - Proper -es removal (classes→class, boxes→box, houses→house, heroes→hero)
    - Case matching for singulars (Children→Child, PEOPLE→PERSON)
  - Added 17 comprehensive tests for pluralization (154 total tests, all passing)

### Improved
- Pluralization coverage increased from ~40% to ~95% of Laravel's Str helper functionality
- `plural()` now handles edge cases that previously returned incorrect forms:
  - `child` → `children` (was `childs`)
  - `person` → `people` (was `persons`)
  - `wolf` → `wolves` (was `wolfs`)
  - `knife` → `knives` (was `knifes`)
  - `hero` → `heroes` (was `heros`)
  - `equipment` → `equipment` (was `equipments`)
  - And 50+ more edge cases

### Documentation
- Added examples for all new pluralization features

## [1.0.2] - 2024-10-28

### Added
- **🎯 Full TypeScript support with complete type definitions**
  - `index.d.ts` - Main entry point type definitions
  - `src/Str.d.ts` - Complete types for all 95+ static methods
  - `src/Stringable.d.ts` - Complete types for all 95+ fluent methods
  - Added `"types": "index.d.ts"` to package.json
- **✨ IDE Autocomplete & IntelliSense support**
  - Full autocomplete when typing `Str.` (shows all 95+ methods)
  - Parameter hints with type information
  - Return type inference
  - Hover documentation with JSDoc comments
  - Works in JavaScript (.js) and TypeScript (.ts) files
  - Zero configuration required - works automatically after npm install
- **📁 Better project organization**
  - Created `examples/` folder for all example files
  - Moved `examples.js` → `examples/examples.js`
  - Moved `chaining-examples.js` → `examples/chaining-examples.js`
  - Added `examples/typescript-example.ts` with comprehensive TypeScript examples
  - Updated `.npmignore` to exclude examples folder

### Changed
- **Updated terminology to match Laravel**
  - Changed "Stringable API" to "Fluent Strings" in README
  - Aligned documentation with Laravel's official terminology
- **Enhanced type definitions**
  - Added JSDoc comments to key methods for better IDE hover documentation
  - Improved parameter descriptions and examples
- **Package metadata**
  - Added "typescript" keyword for better npm discoverability
  - Updated files array to include all TypeScript definition files


### Developer Experience
- ✅ Full IntelliSense in VS Code
- ✅ Smart autocomplete in WebStorm/PhpStorm
- ✅ Type checking in TypeScript projects
- ✅ Parameter hints in all modern IDEs
- ✅ Hover documentation with examples
- ✅ Go to definition support
- ✅ Works in both .js and .ts files

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

[1.0.3]: https://github.com/aymanatmeh/stringx-js/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/aymanatmeh/stringx-js/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/aymanatmeh/stringx-js/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/aymanatmeh/stringx-js/releases/tag/v1.0.0
