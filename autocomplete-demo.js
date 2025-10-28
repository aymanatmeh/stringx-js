/**
 * AUTOCOMPLETE DEMONSTRATION
 * Open this file in VS Code to see autocomplete in action!
 *
 * Instructions:
 * 1. Open this file in VS Code
 * 2. Place your cursor after the dots below
 * 3. Press Ctrl+Space (or just wait) to see autocomplete
 * 4. Scroll through the list of 95+ methods!
 */

import Str from './index.js';

// ============================================
// DEMO 1: Static Methods Autocomplete
// ============================================
// Type "Str." and you'll see ALL methods:
// - camel, snake, kebab, studly, pascal
// - upper, lower, title, headline
// - contains, startsWith, endsWith
// - uuid, ulid, random, password
// - and 80+ more!

const demo1 = Str.
//                 ↑ Place cursor here and press Ctrl+Space


// ============================================
// DEMO 2: Specific Method Examples
// ============================================

// Autocomplete shows parameter types:
const camelCase = Str.camel(
//                          ↑ Parameter hint shows: (value: string)

// Autocomplete knows return types:
const containsX = Str.contains(
//                             ↑ Shows: (haystack: string, needles: string | string[], ignoreCase?: boolean)

// Optional parameters are shown:
const snakeCase = Str.snake(
//                          ↑ Shows: (value: string, delimiter?: string)


// ============================================
// DEMO 3: Fluent Chaining Autocomplete
// ============================================

// Type ".of('text')." to see all Stringable methods:
const fluent1 = Str.of('hello').
//                              ↑ Shows: append, prepend, upper, lower, trim, etc.


// Chaining multiple methods:
const fluent2 = Str.of('  HELLO_WORLD  ')
    .trim().
//          ↑ Shows next available methods

    .lower().
//           ↑ And again...

    .camel().
//           ↑ And again...

    .toString();
//            ↑ Final method returns string


// ============================================
// DEMO 4: Conditional Methods
// ============================================

const isPremium = true;

const username = Str.of('john')
    .when(
        //       ↑ Shows: (condition: boolean | function, callback: function)
        isPremium,
        (str) => str.
//                   ↑ Inside callback, 'str' has full autocomplete too!
    );


// ============================================
// DEMO 5: Pipe with Custom Functions
// ============================================

const transformed = Str.of('hello')
    .pipe(
        //       ↑ Shows: (callback: (value: string) => string)
        (str) => {
            // str is typed as 'string' - full autocomplete!
            return str.
//                     ↑ Shows: toUpperCase, toLowerCase, etc. (native string methods)
        }
    );


// ============================================
// DEMO 6: Boolean Methods
// ============================================

// Methods that return boolean:
const checks = {
    contains: Str.of('test').contains(
        //                                    ↑ Shows parameters

        startsWith: Str.of('test').startsWith(
            //                                        ↑ Shows parameters

            isEmpty: Str.of('').isEmpty(
                //                             ↑ No parameters needed

                isAscii: Str.of('hello').isAscii(
//                                  ↑ No parameters
};


// ============================================
// DEMO 7: Real-World Example
// ============================================

function processEmail(email) {
    return Str.
        //             ↑ Try autocomplete here
        of(email)
        .lower().
        //              ↑ And here

        before('@').
        //                  ↑ And here

        replace('.', '_').
        //                        ↑ And here

        toString();
}


// ============================================
// DEMO 8: Hover Documentation
// ============================================

// Hover over any method name to see:
// - Parameter types
// - Return type
// - Description (for methods with JSDoc)

Str.camel('test');     // ← Hover over 'camel'
Str.contains('x', 'y'); // ← Hover over 'contains'
Str.uuid();            // ← Hover over 'uuid'

Str.of('test')
    .upper()           // ← Hover over 'upper'
    .trim()            // ← Hover over 'trim'
    .toString();       // ← Hover over 'toString'


// ============================================
// DEMO 9: Error Detection
// ============================================

// TypeScript/JSDoc will show errors for wrong types:

// ❌ This would show error in TypeScript:
// const result: number = Str.camel('test');
//     ^^^^^^ Type 'string' is not assignable to type 'number'

// ✅ This is correct:
const result = Str.camel('test');


// ============================================
// DEMO 10: Go to Definition
// ============================================

// Ctrl/Cmd + Click on any method to jump to definition:
Str.camel('test');     // ← Ctrl+Click on 'camel' to see type definition
Str.of('test').upper(); // ← Ctrl+Click on 'upper' to see type definition


// ============================================
// TRY IT YOURSELF!
// ============================================

// Your turn! Try typing code here and see autocomplete:

const myTest = Str.

const myFluent = Str.of('your text here').


    // ============================================
    // TIPS
    // ============================================

    /*
     * VS Code Tips:
     * - Ctrl/Cmd + Space: Trigger autocomplete manually
     * - Ctrl/Cmd + Shift + Space: Show parameter hints
     * - Ctrl/Cmd + Click: Go to definition
     * - Hover: See type information
     *
     * WebStorm Tips:
     * - Ctrl + Space: Autocomplete
     * - Ctrl + P: Parameter info
     * - Ctrl + Q: Quick documentation
     * - Ctrl + B: Go to definition
     */

    console.log('Autocomplete works! 🎉');
