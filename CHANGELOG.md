# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
