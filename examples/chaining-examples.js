import Str from './index.js';

console.log('=== StringX-JS Method Chaining Examples ===\n');

// Example 1: Your exact example from Laravel
console.log('--- Example 1: Laravel-style Chaining ---');
const result1 = Str.of('  hello world  ')
    .trim()
    .camel()
    .append('Test')
    .slug('-')
    .upper();

console.log('Input: "  hello world  "');
console.log('Chain: .trim().camel().append("Test").slug("-").upper()');
console.log('Result:', result1.toString());
console.log('Type:', typeof result1.valueOf());
console.log();

// Example 2: Real-world username generation
console.log('--- Example 2: Generate Username from Email ---');
const username = Str.of('John.Doe@Example.com')
    .lower()
    .before('@')
    .replace('.', '_');

console.log('Input: "John.Doe@Example.com"');
console.log('Result:', username.toString()); // john_doe
console.log();

// Example 3: Format database field to label
console.log('--- Example 3: Database Field to Label ---');
const label = Str.of('user_email_address')
    .replace('_', ' ')
    .title();

console.log('Input: "user_email_address"');
console.log('Result:', label.toString()); // User Email Address
console.log();

// Example 4: Create SEO-friendly URL slug
console.log('--- Example 4: Create URL Slug ---');
const slug = Str.of('Top 10 JavaScript Tips & Tricks!')
    .slug()
    .prepend('blog/')
    .append('/2024');

console.log('Input: "Top 10 JavaScript Tips & Tricks!"');
console.log('Result:', slug.toString()); // blog/top-10-javascript-tips-tricks/2024
console.log();

// Example 5: Mask sensitive data
console.log('--- Example 5: Mask Credit Card ---');
const maskedCard = Str.of('4111111111111111')
    .mask('*', 4, 8);

console.log('Input: "4111111111111111"');
console.log('Result:', maskedCard.toString()); // 4111********1111
console.log();

// Example 6: Format phone number
console.log('--- Example 6: Format Phone Number ---');
const phone = Str.of('1234567890')
    .pipe(num => `(${num.substr(0, 3)}) ${num.substr(3, 3)}-${num.substr(6)}`);

console.log('Input: "1234567890"');
console.log('Result:', phone.toString()); // (123) 456-7890
console.log();

// Example 7: Conditional formatting
console.log('--- Example 7: Conditional Formatting ---');
const greeting1 = Str.of('john')
    .when(true, str => str.ucfirst())
    .prepend('Hello, ')
    .append('!');

const greeting2 = Str.of('john')
    .when(false, str => str.ucfirst())
    .prepend('Hello, ')
    .append('!');

console.log('With condition true:', greeting1.toString()); // Hello, John!
console.log('With condition false:', greeting2.toString()); // Hello, john!
console.log();

// Example 8: Extract and format
console.log('--- Example 8: Extract Domain from URL ---');
const domain = Str.of('https://www.example.com/path/to/page')
    .after('://')
    .before('/')
    .replace('www.', '');

console.log('Input: "https://www.example.com/path/to/page"');
console.log('Result:', domain.toString()); // example.com
console.log();

// Example 9: Complex text transformation
console.log('--- Example 9: Clean and Format Text ---');
const formatted = Str.of('  THIS   IS    MESSY   TEXT!!!  ')
    .trim()
    .squish()
    .lower()
    .ucfirst()
    .replace('!!!', '.');

console.log('Input: "  THIS   IS    MESSY   TEXT!!!  "');
console.log('Result:', formatted.toString()); // This is messy text.
console.log();

// Example 10: Generate code identifier
console.log('--- Example 10: Generate Class Name ---');
const className = Str.of('user profile service')
    .studly()
    .append('Controller');

console.log('Input: "user profile service"');
console.log('Result:', className.toString()); // UserProfileServiceController
console.log();

// Example 11: Using whenEmpty
console.log('--- Example 11: Default Values with whenEmpty ---');
const withDefault = Str.of('')
    .whenEmpty(str => str.append('No name provided'))
    .upper();

console.log('Input: ""');
console.log('Result:', withDefault.toString()); // NO NAME PROVIDED
console.log();

// Example 12: Using tap for debugging
console.log('--- Example 12: Debug with tap() ---');
const debugged = Str.of('hello world')
    .tap(val => console.log('Before upper:', val))
    .upper()
    .tap(val => console.log('After upper:', val))
    .reverse();

console.log('Final result:', debugged.toString()); // DLROW OLLEH
console.log();

// Example 13: Working with template strings
console.log('--- Example 13: Using in Template Strings ---');
const name = Str.of('john doe').title();
const message = `Welcome, ${name}!`;
console.log(message); // Welcome, John Doe!
console.log();

// Example 14: API response formatting
console.log('--- Example 14: Format API Error Message ---');
const errorMessage = Str.of('VALIDATION_ERROR_USER_EMAIL_INVALID')
    .lower()
    .replace('_', ' ')
    .title()
    .replaceFirst('Validation Error ', '')
    .replace(' ', ': ');

console.log('Input: "VALIDATION_ERROR_USER_EMAIL_INVALID"');
console.log('Result:', errorMessage.toString()); // User: Email Invalid
console.log();

// Example 15: Multiple conditions
console.log('--- Example 15: Multiple Conditional Transformations ---');
const userStatus = 'premium';
const displayName = Str.of('john_doe_123')
    .replace('_', ' ')
    .title()
    .when(userStatus === 'premium', str => str.append(' ⭐'))
    .unless(userStatus === 'banned', str => str.prepend('👤 '));

console.log('User Status:', userStatus);
console.log('Result:', displayName.toString()); // 👤 John Doe 123 ⭐
console.log();

// Example 16: JSON serialization
console.log('--- Example 16: JSON Serialization ---');
const apiResponse = {
    username: Str.of('john.doe').snake(),
    displayName: Str.of('john doe').title(),
    slug: Str.of('John Doe').slug()
};

console.log('API Response:', JSON.stringify(apiResponse, null, 2));
// {
//   "username": "john_doe",
//   "displayName": "John Doe",
//   "slug": "john-doe"
// }
console.log();

// Example 17: Extract and capitalize initials
console.log('--- Example 17: Generate Initials ---');
const initials = Str.of('john doe smith')
    .title()
    .pipe(name => {
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('');
    })
    .upper();

console.log('Input: "john doe smith"');
console.log('Result:', initials.toString()); // JDS
console.log();

// Example 18: Password masking
console.log('--- Example 18: Password Display ---');
const password = Str.of('MySecretPassword123')
    .mask('•', 0);

console.log('Input: "MySecretPassword123"');
console.log('Result:', password.toString()); // •••••••••••••••••••
console.log();

// Example 19: Excerpt generation
console.log('--- Example 19: Generate Excerpt ---');
const excerpt = Str.of('This is a very long article about JavaScript and its amazing features that we want to preview')
    .limit(50);

console.log('Full text: "This is a very long article about JavaScript..."');
console.log('Excerpt:', excerpt.toString());
console.log();

// Example 20: Real-world form validation formatting
console.log('--- Example 20: Format Validation Message ---');
const fieldName = 'email_address';
const validationMsg = Str.of(fieldName)
    .replace('_', ' ')
    .title()
    .prepend('The ')
    .append(' field is required.');

console.log('Field:', fieldName);
console.log('Message:', validationMsg.toString());
// The Email Address field is required.

console.log('\n=== All chaining examples completed! ===');
