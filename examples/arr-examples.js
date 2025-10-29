import Arr from '../src/Arr.js';

console.log('=== StringX-JS Arr Examples ===\n');

// ============================================
// 1. Dot Notation Access
// ============================================
console.log('1. DOT NOTATION ACCESS');
console.log('=====================');

const config = {
    app: {
        name: 'MyApp',
        settings: {
            theme: 'dark',
            language: 'en'
        }
    },
    database: {
        host: 'localhost',
        port: 5432
    }
};

console.log('Get nested value:', Arr.get(config, 'app.settings.theme')); // 'dark'
console.log('With default:', Arr.get(config, 'app.version', '1.0.0')); // '1.0.0'
console.log('Check existence:', Arr.has(config, 'app.settings.theme')); // true
console.log('Check multiple:', Arr.hasAll(config, ['app.name', 'database.host'])); // true

// Set nested values
const newConfig = {};
Arr.set(newConfig, 'app.name', 'MyApp');
Arr.set(newConfig, 'app.settings.theme', 'dark');
console.log('Set nested:', JSON.stringify(newConfig, null, 2));

// ============================================
// 2. Array Filtering & Transformation
// ============================================
console.log('\n2. FILTERING & TRANSFORMATION');
console.log('==============================');

const users = [
    { id: 1, name: 'John', age: 30, active: true },
    { id: 2, name: 'Jane', age: 25, active: true },
    { id: 3, name: 'Bob', age: 35, active: false },
    { id: 4, name: 'Alice', age: 28, active: true }
];

// Filter active users
const activeUsers = Arr.where(users, user => user.active);
console.log('Active users:', activeUsers.length); // 3

// Get users over 27
const matureUsers = Arr.where(users, user => user.age > 27);
console.log('Users over 27:', matureUsers.map(u => u.name)); // ['John', 'Bob', 'Alice']

// Partition by age
const [over30, under30] = Arr.partition(users, user => user.age >= 30);
console.log('Over 30:', over30.length, 'Under 30:', under30.length);

// Reject inactive
const notInactive = Arr.reject(users, user => !user.active);
console.log('Not inactive:', notInactive.length); // 3

// ============================================
// 3. Pluck & Select
// ============================================
console.log('\n3. PLUCK & SELECT');
console.log('=================');

// Pluck names
const names = Arr.pluck(users, 'name');
console.log('Names:', names); // ['John', 'Jane', 'Bob', 'Alice']

// Pluck with key
const usersByName = Arr.pluck(users, 'age', 'name');
console.log('Ages by name:', usersByName); // {John: 30, Jane: 25, ...}

// Select specific fields
const userSummaries = Arr.select(users, ['id', 'name']);
console.log('Summaries:', JSON.stringify(userSummaries, null, 2));

// Key by ID
const usersById = Arr.keyBy(users, 'id');
console.log('User #2:', usersById[2].name); // 'Jane'

// ============================================
// 4. Array Manipulation
// ============================================
console.log('\n4. ARRAY MANIPULATION');
console.log('=====================');

const items = [1, 2, 3, 4, 5];

console.log('First:', Arr.first(items)); // 1
console.log('Last:', Arr.last(items)); // 5
console.log('Take 3:', Arr.take(items, 3)); // [1, 2, 3]
console.log('Take last 2:', Arr.take(items, -2)); // [4, 5]

// First/Last with callback
console.log('First > 3:', Arr.first(items, x => x > 3)); // 4
console.log('Last < 4:', Arr.last(items, x => x < 4)); // 3

// Random selection
console.log('Random item:', Arr.random(items));
console.log('Random 3 items:', Arr.random(items, 3));

// Shuffle
const shuffled = Arr.shuffle(items);
console.log('Shuffled:', shuffled);

// ============================================
// 5. Flatten & Collapse
// ============================================
console.log('\n5. FLATTEN & COLLAPSE');
console.log('=====================');

const nested = [1, [2, 3], [4, [5, 6]]];
console.log('Flatten depth 1:', Arr.flatten(nested, 1)); // [1, 2, 3, 4, [5, 6]]
console.log('Flatten all:', Arr.flatten(nested)); // [1, 2, 3, 4, 5, 6]

const arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
console.log('Collapse:', Arr.collapse(arrayOfArrays)); // [1, 2, 3, 4, 5, 6]

// ============================================
// 6. Map Operations
// ============================================
console.log('\n6. MAP OPERATIONS');
console.log('=================');

// Basic map
const doubled = Arr.map([1, 2, 3], x => x * 2);
console.log('Doubled:', doubled); // [2, 4, 6]

// Map with keys
const products = [
    { sku: 'A001', price: 100 },
    { sku: 'A002', price: 200 }
];

const productMap = Arr.mapWithKeys(products, p => ({ [p.sku]: p.price }));
console.log('Product map:', productMap); // {A001: 100, A002: 200}

// Map spread
const coordinates = [[1, 2], [3, 4], [5, 6]];
const sums = Arr.mapSpread(coordinates, (x, y) => x + y);
console.log('Coordinate sums:', sums); // [3, 7, 11]

// ============================================
// 7. Dot Notation Flattening
// ============================================
console.log('\n7. DOT FLATTENING');
console.log('=================');

const profile = {
    user: {
        name: 'John',
        email: 'john@example.com',
        address: {
            city: 'NYC',
            zip: '10001'
        }
    }
};

const flattened = Arr.dot(profile);
console.log('Flattened:', JSON.stringify(flattened, null, 2));
// {
//   'user.name': 'John',
//   'user.email': 'john@example.com',
//   'user.address.city': 'NYC',
//   'user.address.zip': '10001'
// }

const restored = Arr.undot(flattened);
console.log('Restored:', JSON.stringify(restored, null, 2));

// ============================================
// 8. Sorting
// ============================================
console.log('\n8. SORTING');
console.log('==========');

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Sorted:', Arr.sort(numbers)); // [1, 1, 2, 3, 4, 5, 6, 9]
console.log('Sorted desc:', Arr.sortDesc(numbers)); // [9, 6, 5, 4, 3, 2, 1, 1]

// Sort by field
const people = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];
const sortedByAge = Arr.sort(people, 'age');
console.log('Sorted by age:', sortedByAge.map(p => `${p.name} (${p.age})`));

// Sort recursively
const nestedObj = { z: 3, a: 1, b: { y: 2, x: 1 } };
const sortedNested = Arr.sortRecursive(nestedObj);
console.log('Sorted keys:', Object.keys(sortedNested)); // ['a', 'b', 'z']

// ============================================
// 9. Only & Except
// ============================================
console.log('\n9. ONLY & EXCEPT');
console.log('================');

const data = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };

// Get only specific fields
const publicData = Arr.only(data, ['id', 'name', 'email']);
console.log('Public data:', publicData);

// Exclude sensitive fields
const safeData = Arr.except(data, 'password');
console.log('Safe data:', safeData);

// ============================================
// 10. Array Testing
// ============================================
console.log('\n10. ARRAY TESTING');
console.log('=================');

const testData = [2, 4, 6, 8];
console.log('All even:', Arr.every(testData, x => x % 2 === 0)); // true
console.log('Some > 5:', Arr.some(testData, x => x > 5)); // true

const mixedData = [1, null, 2, undefined, 3];
console.log('Without nulls:', Arr.whereNotNull(mixedData)); // [1, 2, 3]

console.log('Is list:', Arr.isList([1, 2, 3])); // true
console.log('Is assoc:', Arr.isAssoc({ a: 1, b: 2 })); // true

// ============================================
// 11. Join & Query String
// ============================================
console.log('\n11. JOIN & QUERY STRING');
console.log('=======================');

const tags = ['javascript', 'array', 'helper'];
console.log('Simple join:', Arr.join(tags, ', ')); // 'javascript, array, helper'
console.log('Oxford comma:', Arr.join(tags, ', ', ', and ')); // 'javascript, array, and helper'

// Query string
const params = { page: 1, limit: 10, sort: 'name', order: 'asc' };
console.log('Query string:', Arr.query(params));

// ============================================
// 12. CSS Classes & Styles
// ============================================
console.log('\n12. CSS CLASSES & STYLES');
console.log('========================');

const isActive = true;
const isDisabled = false;
const isLarge = true;

const classes = Arr.toCssClasses([
    'btn',
    { active: isActive, disabled: isDisabled, 'btn-lg': isLarge }
]);
console.log('CSS classes:', classes); // 'btn active btn-lg'

const styles = Arr.toCssStyles([
    'color: blue',
    { 'font-size: 16px': isLarge, 'opacity: 0.5': isDisabled }
]);
console.log('CSS styles:', styles); // 'color: blue; font-size: 16px;'

// ============================================
// 13. Cross Join
// ============================================
console.log('\n13. CROSS JOIN');
console.log('==============');

const sizes = ['S', 'M', 'L'];
const colors = ['Red', 'Blue'];
const variants = Arr.crossJoin(sizes, colors);
console.log('Product variants:', variants);
// [['S', 'Red'], ['S', 'Blue'], ['M', 'Red'], ['M', 'Blue'], ...]

// ============================================
// 14. Divide
// ============================================
console.log('\n14. DIVIDE');
console.log('==========');

const userMap = { john: 30, jane: 25, bob: 35 };
const [userNames, ages] = Arr.divide(userMap);
console.log('Names:', userNames); // ['john', 'jane', 'bob']
console.log('Ages:', ages); // [30, 25, 35]

// ============================================
// 15. Prepend & Wrap
// ============================================
console.log('\n15. PREPEND & WRAP');
console.log('==================');

const list = [2, 3, 4];
console.log('Prepend 1:', Arr.prepend(list, 1)); // [1, 2, 3, 4]

// Wrap non-arrays
console.log('Wrap string:', Arr.wrap('hello')); // ['hello']
console.log('Wrap array:', Arr.wrap([1, 2])); // [1, 2]
console.log('Wrap null:', Arr.wrap(null)); // []

// ============================================
// 16. Type-Safe Getters
// ============================================
console.log('\n16. TYPE-SAFE GETTERS');
console.log('=====================');

const settings = {
    debug: true,
    timeout: 30,
    retries: 5,
    apiUrl: 'https://api.example.com',
    features: ['auth', 'payments']
};

try {
    console.log('Boolean:', Arr.boolean(settings, 'debug')); // true
    console.log('Integer:', Arr.integer(settings, 'retries')); // 5
    console.log('String:', Arr.string(settings, 'apiUrl')); // 'https://...'
    console.log('Array:', Arr.array(settings, 'features')); // ['auth', 'payments']

    // This will throw
    // Arr.boolean(settings, 'timeout'); // Error: must be a boolean
} catch (error) {
    console.log('Type error caught:', error.message);
}

// ============================================
// 17. Pull (Get & Remove)
// ============================================
console.log('\n17. PULL (GET & REMOVE)');
console.log('=======================');

const cart = {
    item1: { name: 'Apple', price: 1.99 },
    item2: { name: 'Banana', price: 0.99 },
    item3: { name: 'Orange', price: 2.49 }
};

const removed = Arr.pull(cart, 'item2');
console.log('Removed item:', removed); // {name: 'Banana', price: 0.99}
console.log('Remaining items:', Object.keys(cart).length); // 2

// ============================================
// 18. Real-World Example: E-Commerce
// ============================================
console.log('\n18. REAL-WORLD: E-COMMERCE');
console.log('==========================');

const orders = [
    { id: 1, customer: 'John', total: 150.00, status: 'completed', items: 3 },
    { id: 2, customer: 'Jane', total: 89.99, status: 'pending', items: 2 },
    { id: 3, customer: 'Bob', total: 200.00, status: 'completed', items: 5 },
    { id: 4, customer: 'Alice', total: 45.50, status: 'cancelled', items: 1 }
];

// Get completed orders
const completed = Arr.where(orders, o => o.status === 'completed');
console.log('Completed orders:', completed.length);

// Calculate total revenue from completed orders
const revenue = Arr.pluck(completed, 'total').reduce((sum, val) => sum + val, 0);
console.log('Revenue:', `$${revenue.toFixed(2)}`);

// Group by customer
const byCustomer = Arr.keyBy(orders, 'customer');
console.log('John\'s order:', byCustomer.John.total);

// Get order summaries
const summaries = Arr.select(orders, ['id', 'customer', 'total']);
console.log('Order summaries:', summaries);

// Sort by total (highest first)
const sortedOrders = Arr.sortDesc(orders, 'total');
console.log('Highest order:', `$${sortedOrders[0].total} by ${sortedOrders[0].customer}`);

// ============================================
// 19. Real-World Example: Data Analytics
// ============================================
console.log('\n19. REAL-WORLD: DATA ANALYTICS');
console.log('==============================');

const analytics = {
    users: {
        total: 10000,
        active: 7500,
        new: 250
    },
    revenue: {
        daily: 15000,
        monthly: 450000
    },
    performance: {
        api: {
            latency: 45,
            uptime: 99.9
        }
    }
};

// Flatten for CSV export
const flatData = Arr.dot(analytics);
console.log('Flat data keys:', Object.keys(flatData));
console.log('API latency:', Arr.get(analytics, 'performance.api.latency'));

// Check required metrics
const hasAllMetrics = Arr.hasAll(analytics, [
    'users.total',
    'revenue.monthly',
    'performance.api.uptime'
]);
console.log('Has all metrics:', hasAllMetrics);

// ============================================
// 20. Real-World Example: Form Data
// ============================================
console.log('\n20. REAL-WORLD: FORM DATA');
console.log('=========================');

const formData = {
    'user.name': 'John Doe',
    'user.email': 'john@example.com',
    'user.address.street': '123 Main St',
    'user.address.city': 'NYC',
    'preferences.theme': 'dark',
    'preferences.notifications': true
};

// Convert flat form data to nested structure
const nestedForm = Arr.undot(formData);
console.log('Nested form:', JSON.stringify(nestedForm, null, 2));

// Extract only user data
const userData = Arr.get(nestedForm, 'user');
console.log('User data:', userData);

// Get safe data (exclude sensitive info)
const safeFormData = Arr.except(formData, ['user.email']);
console.log('Safe data keys:', Object.keys(safeFormData).length);

// ============================================
// 21. from() - Type Conversion
// ============================================
console.log('\n21. FROM() - TYPE CONVERSION');
console.log('============================');

// Convert array (returns as-is)
console.log('From array:', Arr.from([1, 2, 3])); // [1, 2, 3]

// Convert Set to array
const mySet = new Set([1, 2, 3, 2, 1]);
console.log('From Set:', Arr.from(mySet)); // [1, 2, 3]

// Convert Map to array
const myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log('From Map:', Arr.from(myMap)); // [['a', 1], ['b', 2], ['c', 3]]

// Convert object to array of values
console.log('From object:', Arr.from({a: 1, b: 2, c: 3})); // [1, 2, 3]

// Object with toArray method
const collection = {
    items: [10, 20, 30],
    toArray() { return this.items; }
};
console.log('From collection:', Arr.from(collection)); // [10, 20, 30]

// Real-world: Converting Set of unique user IDs
const userIdSet = new Set([101, 102, 103, 102, 101]); // duplicates removed
const userIdArray = Arr.from(userIdSet);
console.log('Unique user IDs:', userIdArray); // [101, 102, 103]

try {
    // This will throw - scalars not allowed
    Arr.from('hello');
} catch (error) {
    console.log('Error on scalar:', error.message);
}

// ============================================
// 22. push() - Dot Notation Pushing
// ============================================
console.log('\n22. PUSH() - DOT NOTATION PUSHING');
console.log('=================================');

// Push to nested array
const store = {
    cart: {
        items: ['apple', 'banana']
    }
};

Arr.push(store, 'cart.items', 'orange', 'grape');
console.log('Updated cart:', store.cart.items);
// ['apple', 'banana', 'orange', 'grape']

// Create nested structure if doesn't exist
const newStore = {};
Arr.push(newStore, 'cart.items', 'first-item');
console.log('New store:', JSON.stringify(newStore, null, 2));
// { cart: { items: ['first-item'] } }

// Real-world: Building shopping cart
const shoppingCart = { products: { electronics: [] } };
Arr.push(shoppingCart, 'products.electronics', 'laptop', 'mouse');
Arr.push(shoppingCart, 'products.clothing', 'shirt', 'pants'); // Creates 'clothing' array
console.log('Shopping cart:', JSON.stringify(shoppingCart, null, 2));

// Real-world: Adding tags to posts
const blog = {
    posts: {
        'post-1': {
            title: 'My Post',
            tags: ['javascript']
        }
    }
};
Arr.push(blog, 'posts.post-1.tags', 'arrays', 'tutorial');
console.log('Post tags:', blog.posts['post-1'].tags);
// ['javascript', 'arrays', 'tutorial']

// ============================================
// 23. sole() - Single Item Validation
// ============================================
console.log('\n23. SOLE() - SINGLE ITEM VALIDATION');
console.log('===================================');

// Get sole matching item
const inventory = [
    { id: 1, sku: 'ABC123', name: 'Widget' },
    { id: 2, sku: 'DEF456', name: 'Gadget' },
    { id: 3, sku: 'GHI789', name: 'Tool' }
];

try {
    const product = Arr.sole(inventory, p => p.sku === 'ABC123');
    console.log('Found product:', product.name); // 'Widget'
} catch (error) {
    console.log('Error:', error.message);
}

// Real-world: Find user by unique email
const allUsers = [
    { id: 1, email: 'john@example.com', name: 'John' },
    { id: 2, email: 'jane@example.com', name: 'Jane' },
    { id: 3, email: 'bob@example.com', name: 'Bob' }
];

try {
    const user = Arr.sole(allUsers, u => u.email === 'jane@example.com');
    console.log('Found user:', user.name); // 'Jane'
} catch (error) {
    console.log('Error:', error.message);
}

// Error: Multiple items found
const duplicateOrders = [
    { id: 1, status: 'pending' },
    { id: 2, status: 'pending' },
    { id: 3, status: 'completed' }
];

try {
    Arr.sole(duplicateOrders, o => o.status === 'pending');
} catch (error) {
    console.log('Expected error (multiple):', error.message);
    // 'Multiple items found (2 items).'
}

// Error: No items found
try {
    Arr.sole(inventory, p => p.sku === 'NOTFOUND');
} catch (error) {
    console.log('Expected error (none):', error.message);
    // 'Item not found.'
}

// Real-world: Database query validation
// Ensure only one record exists before updating
const dbRecords = [
    { id: 123, username: 'john_doe', active: true }
];

try {
    const record = Arr.sole(dbRecords, r => r.username === 'john_doe');
    console.log('Safe to update record:', record.id); // 123
    // Now we know there's exactly one match, safe to proceed
} catch (error) {
    console.log('Cannot update - multiple or no records found');
}

// Real-world: Configuration validation
const configs = [
    { environment: 'production', apiKey: 'abc123' }
];

try {
    const prodConfig = Arr.sole(configs, c => c.environment === 'production');
    console.log('Production API key:', prodConfig.apiKey);
    // Ensures only ONE production config exists
} catch (error) {
    console.log('Config error:', error.message);
    // Would catch if multiple production configs exist (bad!)
}

console.log('\n=== All Arr examples completed! ===');
