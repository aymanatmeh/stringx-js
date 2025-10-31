import { test } from 'node:test';
import assert from 'node:assert/strict';
import Arr from '../Arr.js';

// ============================================
// Type Checking & Validation Tests
// ============================================

test('accessible() checks if value is array accessible', () => {
    assert.strictEqual(Arr.accessible([1, 2, 3]), true);
    assert.strictEqual(Arr.accessible({a: 1, b: 2}), false);
    assert.strictEqual(Arr.accessible('string'), false);
    assert.strictEqual(Arr.accessible(null), false);
});

test('array() returns array value or throws', () => {
    const data = {items: [1, 2, 3], name: 'test'};
    assert.deepStrictEqual(Arr.array(data, 'items'), [1, 2, 3]);
    assert.throws(() => Arr.array(data, 'name'), /must be an array/);
});

test('boolean() returns boolean value or throws', () => {
    const data = {active: true, name: 'test'};
    assert.strictEqual(Arr.boolean(data, 'active'), true);
    assert.throws(() => Arr.boolean(data, 'name'), /must be a boolean/);
});

test('float() returns float value or throws', () => {
    const data = {price: 99.99, name: 'test'};
    assert.strictEqual(Arr.float(data, 'price'), 99.99);
    assert.throws(() => Arr.float(data, 'name'), /must be a float/);
});

test('integer() returns integer value or throws', () => {
    const data = {count: 42, name: 'test'};
    assert.strictEqual(Arr.integer(data, 'count'), 42);
    assert.throws(() => Arr.integer(data, 'name'), /must be an integer/);
});

test('string() returns string value or throws', () => {
    const data = {name: 'test', count: 42};
    assert.strictEqual(Arr.string(data, 'name'), 'test');
    assert.throws(() => Arr.string(data, 'count'), /must be a string/);
});

// ============================================
// Array Access & Retrieval Tests
// ============================================

test('get() retrieves value using dot notation', () => {
    const data = {user: {name: 'John', address: {city: 'NYC'}}};
    assert.strictEqual(Arr.get(data, 'user.name'), 'John');
    assert.strictEqual(Arr.get(data, 'user.address.city'), 'NYC');
    assert.strictEqual(Arr.get(data, 'user.age', 25), 25);
});

test('get() returns null array', () => {
    assert.deepStrictEqual(Arr.get(null, 'key', []), []);
});

test('get() works with arrays', () => {
    const data = ['a', 'b', 'c'];
    assert.strictEqual(Arr.get(data, 0), 'a');
    assert.strictEqual(Arr.get(data, 2), 'c');
});

test('first() returns first element', () => {
    assert.strictEqual(Arr.first([1, 2, 3]), 1);
    assert.strictEqual(Arr.first([]), undefined);
    assert.strictEqual(Arr.first([], null, 'default'), 'default');
});

test('first() with callback', () => {
    assert.strictEqual(Arr.first([1, 2, 3, 4], x => x > 2), 3);
    assert.strictEqual(Arr.first([1, 2], x => x > 5, 'none'), 'none');
});

test('last() returns last element', () => {
    assert.strictEqual(Arr.last([1, 2, 3]), 3);
    assert.strictEqual(Arr.last([]), undefined);
    assert.strictEqual(Arr.last([], null, 'default'), 'default');
});

test('last() with callback', () => {
    assert.strictEqual(Arr.last([1, 2, 3, 4], x => x < 3), 2);
});

test('take() takes first N items', () => {
    assert.deepStrictEqual(Arr.take([1, 2, 3, 4, 5], 3), [1, 2, 3]);
    assert.deepStrictEqual(Arr.take([1, 2, 3, 4, 5], -2), [4, 5]);
});

test('pull() gets and removes value', () => {
    const obj = {a: 1, b: 2, c: 3};
    assert.strictEqual(Arr.pull(obj, 'b'), 2);
    assert.strictEqual(Arr.get(obj, 'b'), undefined);
    assert.deepStrictEqual(obj, {a: 1, c: 3});
});

test('random() returns random items', () => {
    const arr = [1, 2, 3, 4, 5];
    const single = Arr.random(arr);
    assert.ok(arr.includes(single));

    const multiple = Arr.random(arr, 3);
    assert.strictEqual(multiple.length, 3);
    multiple.forEach(item => assert.ok(arr.includes(item)));
});

test('random() throws when requesting too many items', () => {
    assert.throws(() => Arr.random([1, 2], 5), /only 2 items available/);
});

test('only() returns subset of items', () => {
    const data = {a: 1, b: 2, c: 3};
    assert.deepStrictEqual(Arr.only(data, ['a', 'c']), {a: 1, c: 3});
    assert.deepStrictEqual(Arr.only(data, 'b'), {b: 2});
});

test('except() returns all except specified keys', () => {
    const data = {a: 1, b: 2, c: 3};
    assert.deepStrictEqual(Arr.except(data, ['b']), {a: 1, c: 3});
});

test('select() selects fields from array of objects', () => {
    const users = [
        {id: 1, name: 'John', age: 30},
        {id: 2, name: 'Jane', age: 25}
    ];
    const result = Arr.select(users, ['id', 'name']);
    assert.deepStrictEqual(result, [
        {id: 1, name: 'John'},
        {id: 2, name: 'Jane'}
    ]);
});

test('pluck() extracts values', () => {
    const users = [
        {name: 'John', age: 30},
        {name: 'Jane', age: 25}
    ];
    assert.deepStrictEqual(Arr.pluck(users, 'name'), ['John', 'Jane']);
    assert.deepStrictEqual(Arr.pluck(users, 'age', 'name'), {John: 30, Jane: 25});
});

// ============================================
// Array Manipulation Tests
// ============================================

test('add() adds element if not exists', () => {
    const obj = {a: 1};
    Arr.add(obj, 'b', 2);
    assert.strictEqual(obj.b, 2);

    Arr.add(obj, 'b', 3);
    assert.strictEqual(obj.b, 2); // Should not change
});

test('set() sets value using dot notation', () => {
    const obj = {};
    Arr.set(obj, 'user.name', 'John');
    assert.deepStrictEqual(obj, {user: {name: 'John'}});

    Arr.set(obj, 'user.age', 30);
    assert.deepStrictEqual(obj, {user: {name: 'John', age: 30}});
});

test('prepend() adds to beginning', () => {
    assert.deepStrictEqual(Arr.prepend([2, 3], 1), [1, 2, 3]);
    assert.deepStrictEqual(Arr.prepend({b: 2}, 1, 'a'), {a: 1, b: 2});
});

test('forget() removes items using dot notation', () => {
    const obj = {a: 1, b: 2, c: {d: 3, e: 4}};
    Arr.forget(obj, 'b');
    assert.strictEqual(obj.b, undefined);

    Arr.forget(obj, 'c.d');
    assert.strictEqual(obj.c.d, undefined);
    assert.strictEqual(obj.c.e, 4);
});

test('collapse() flattens array of arrays', () => {
    assert.deepStrictEqual(Arr.collapse([[1, 2], [3, 4], [5]]), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(Arr.collapse([]), []);
});

test('flatten() flattens multi-dimensional array', () => {
    assert.deepStrictEqual(Arr.flatten([1, [2, [3, 4]]], 1), [1, 2, [3, 4]]);
    assert.deepStrictEqual(Arr.flatten([1, [2, [3, 4]]]), [1, 2, 3, 4]);
    assert.deepStrictEqual(Arr.flatten([1, [2, [3, [4, 5]]]], 2), [1, 2, 3, [4, 5]]);
});

test('divide() splits into keys and values', () => {
    assert.deepStrictEqual(Arr.divide({a: 1, b: 2}), [['a', 'b'], [1, 2]]);
    assert.deepStrictEqual(Arr.divide([10, 20, 30])[1], [10, 20, 30]);
});

test('shuffle() randomizes array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    const shuffled = Arr.shuffle(arr);

    // Check length and all elements present
    assert.strictEqual(shuffled.length, arr.length);
    assert.deepStrictEqual(shuffled.sort(), arr.sort());

    // Verify original array is unchanged
    assert.deepStrictEqual(arr, original);
});

test('wrap() wraps non-arrays', () => {
    assert.deepStrictEqual(Arr.wrap('hello'), ['hello']);
    assert.deepStrictEqual(Arr.wrap([1, 2]), [1, 2]);
    assert.deepStrictEqual(Arr.wrap(null), []);
    assert.deepStrictEqual(Arr.wrap(undefined), []);
});

test('crossJoin() creates permutations', () => {
    const result = Arr.crossJoin([1, 2], ['a', 'b']);
    assert.deepStrictEqual(result, [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
});

test('partition() splits by condition', () => {
    const [even, odd] = Arr.partition([1, 2, 3, 4, 5], x => x % 2 === 0);
    assert.deepStrictEqual(even, [2, 4]);
    assert.deepStrictEqual(odd, [1, 3, 5]);
});

// ============================================
// Array Testing Tests
// ============================================

test('exists() checks key existence', () => {
    assert.strictEqual(Arr.exists({a: 1, b: 2}, 'a'), true);
    assert.strictEqual(Arr.exists({a: 1}, 'b'), false);
    assert.strictEqual(Arr.exists([1, 2, 3], 1), true);
});

test('has() checks nested keys', () => {
    const data = {user: {name: 'John', address: {city: 'NYC'}}};
    assert.strictEqual(Arr.has(data, 'user.name'), true);
    assert.strictEqual(Arr.has(data, 'user.address.city'), true);
    assert.strictEqual(Arr.has(data, 'user.age'), false);
    assert.strictEqual(Arr.has(data, ['user.name', 'user.address']), true);
});

test('hasAll() checks all keys exist', () => {
    const data = {a: 1, b: 2, c: 3};
    assert.strictEqual(Arr.hasAll(data, ['a', 'b']), true);
    assert.strictEqual(Arr.hasAll(data, ['a', 'd']), false);
});

test('hasAny() checks if any key exists', () => {
    const data = {a: 1, b: 2};
    assert.strictEqual(Arr.hasAny(data, ['c', 'b']), true);
    assert.strictEqual(Arr.hasAny(data, ['c', 'd']), false);
});

test('every() checks all pass test', () => {
    assert.strictEqual(Arr.every([2, 4, 6], x => x % 2 === 0), true);
    assert.strictEqual(Arr.every([2, 3, 6], x => x % 2 === 0), false);
});

test('some() checks if any pass test', () => {
    assert.strictEqual(Arr.some([1, 2, 3], x => x > 2), true);
    assert.strictEqual(Arr.some([1, 2, 3], x => x > 5), false);
});

test('isAssoc() checks if associative', () => {
    assert.strictEqual(Arr.isAssoc({a: 1, b: 2}), true);
    assert.strictEqual(Arr.isAssoc([1, 2, 3]), false);
    assert.strictEqual(Arr.isAssoc([]), false);
});

test('isList() checks if sequential array', () => {
    assert.strictEqual(Arr.isList([1, 2, 3]), true);
    assert.strictEqual(Arr.isList({0: 1, 2: 3}), false);
    assert.strictEqual(Arr.isList([]), true);
});

// ============================================
// Dot Notation Tests
// ============================================

test('dot() flattens with dot notation', () => {
    const nested = {user: {name: 'John', address: {city: 'NYC'}}};
    const flat = Arr.dot(nested);
    assert.deepStrictEqual(flat, {
        'user.name': 'John',
        'user.address.city': 'NYC'
    });
});

test('dot() with prepend', () => {
    const result = Arr.dot({name: 'John'}, 'user.');
    assert.deepStrictEqual(result, {'user.name': 'John'});
});

test('undot() expands dot notation', () => {
    const flat = {'user.name': 'John', 'user.age': 30};
    const nested = Arr.undot(flat);
    assert.deepStrictEqual(nested, {user: {name: 'John', age: 30}});
});

// ============================================
// Array Transformation Tests
// ============================================

test('map() transforms array', () => {
    assert.deepStrictEqual(Arr.map([1, 2, 3], x => x * 2), [2, 4, 6]);
    assert.deepStrictEqual(
        Arr.map({a: 1, b: 2}, (v, k) => v * 2),
        {a: 2, b: 4}
    );
});

test('mapWithKeys() creates associative array', () => {
    const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
    const result = Arr.mapWithKeys(users, user => ({[user.name]: user}));
    assert.deepStrictEqual(result, {
        John: {id: 1, name: 'John'},
        Jane: {id: 2, name: 'Jane'}
    });
});

test('mapSpread() spreads nested arrays', () => {
    const result = Arr.mapSpread([[1, 2], [3, 4]], (a, b, key) => a + b);
    assert.deepStrictEqual(result, [3, 7]);
});

test('where() filters array', () => {
    assert.deepStrictEqual(Arr.where([1, 2, 3, 4], x => x > 2), [3, 4]);
    assert.deepStrictEqual(
        Arr.where({a: 1, b: 2, c: 3}, v => v > 1),
        {b: 2, c: 3}
    );
});

test('reject() filters with negation', () => {
    assert.deepStrictEqual(Arr.reject([1, 2, 3, 4], x => x > 2), [1, 2]);
});

test('whereNotNull() filters nulls', () => {
    assert.deepStrictEqual(
        Arr.whereNotNull([1, null, 2, undefined, 3]),
        [1, 2, 3]
    );
});

test('keyBy() keys array by field', () => {
    const users = [
        {id: 1, name: 'John'},
        {id: 2, name: 'Jane'}
    ];
    assert.deepStrictEqual(Arr.keyBy(users, 'id'), {
        1: {id: 1, name: 'John'},
        2: {id: 2, name: 'Jane'}
    });
});

test('keyBy() with callback', () => {
    const users = [{name: 'John'}, {name: 'Jane'}];
    const result = Arr.keyBy(users, u => u.name);
    assert.deepStrictEqual(result, {
        John: {name: 'John'},
        Jane: {name: 'Jane'}
    });
});

test('prependKeysWith() prefixes keys', () => {
    const result = Arr.prependKeysWith({name: 'John', age: 30}, 'user_');
    assert.deepStrictEqual(result, {user_name: 'John', user_age: 30});
});

test('sort() sorts array', () => {
    assert.deepStrictEqual(Arr.sort([3, 1, 2]), [1, 2, 3]);

    const users = [{age: 30}, {age: 20}, {age: 25}];
    const sorted = Arr.sort(users, 'age');
    assert.deepStrictEqual(sorted, [{age: 20}, {age: 25}, {age: 30}]);
});

test('sortDesc() sorts descending', () => {
    assert.deepStrictEqual(Arr.sortDesc([1, 2, 3]), [3, 2, 1]);
});

test('sortRecursive() sorts recursively', () => {
    const nested = {b: 2, a: 1, c: {z: 26, x: 24}};
    const sorted = Arr.sortRecursive(nested);
    assert.deepStrictEqual(Object.keys(sorted), ['a', 'b', 'c']);
    assert.deepStrictEqual(Object.keys(sorted.c), ['x', 'z']);
});

test('sortRecursiveDesc() sorts recursively descending', () => {
    const result = Arr.sortRecursiveDesc({b: 2, a: 1});
    assert.deepStrictEqual(Object.keys(result), ['b', 'a']);
});

// ============================================
// String Conversion Tests
// ============================================

test('join() joins array elements', () => {
    assert.strictEqual(Arr.join(['a', 'b', 'c'], ', '), 'a, b, c');
    assert.strictEqual(Arr.join(['a', 'b', 'c'], ', ', ' and '), 'a, b and c');
    assert.strictEqual(Arr.join(['a'], ', ', ' and '), 'a');
    assert.strictEqual(Arr.join([], ', '), '');
});

test('query() converts to query string', () => {
    const params = {name: 'John', age: 30};
    const query = Arr.query(params);
    assert.ok(query.includes('name=John'));
    assert.ok(query.includes('age=30'));
});

test('toCssClasses() compiles CSS classes', () => {
    const result = Arr.toCssClasses(['btn', {active: true, disabled: false}]);
    assert.strictEqual(result, 'btn active');
});

test('toCssStyles() compiles CSS styles', () => {
    const result = Arr.toCssStyles(['color: red', {'font-size: 14px': true}]);
    assert.strictEqual(result, 'color: red; font-size: 14px;');
});

// ============================================
// Edge Cases and Complex Scenarios
// ============================================

test('get() with default function', () => {
    const result = Arr.get({a: 1}, 'b', () => 'computed');
    assert.strictEqual(result, 'computed');
});

test('set() handles complex nested paths', () => {
    const obj = {};
    Arr.set(obj, 'a.b.c.d', 'deep');
    assert.strictEqual(Arr.get(obj, 'a.b.c.d'), 'deep');
});

test('forget() handles arrays', () => {
    const arr = [1, 2, 3, 4];
    Arr.forget(arr, 1);
    assert.strictEqual(arr.length, 3);
});

test('pluck() with callback', () => {
    const users = [{name: 'John', age: 30}];
    const result = Arr.pluck(users, u => u.age * 2);
    assert.deepStrictEqual(result, [60]);
});

test('random() with preserveKeys', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const result = Arr.random(arr, 2, true);
    assert.strictEqual(Object.keys(result).length, 2);
});

test('map() handles callback with different arity', () => {
    const result = Arr.map([1, 2, 3], (v, k) => `${k}:${v}`);
    assert.deepStrictEqual(result, ['0:1', '1:2', '2:3']);
});

test('flatten() with depth 0', () => {
    const result = Arr.flatten([[1, 2], [3, 4]], 0);
    assert.deepStrictEqual(result, [[1, 2], [3, 4]]);
});

test('dot() handles empty objects', () => {
    assert.deepStrictEqual(Arr.dot({}), {});
});

test('crossJoin() with three arrays', () => {
    const result = Arr.crossJoin([1, 2], ['a'], ['x', 'y']);
    assert.strictEqual(result.length, 4); // 2 * 1 * 2
    assert.deepStrictEqual(result[0], [1, 'a', 'x']);
});

test('take() with limit larger than array', () => {
    assert.deepStrictEqual(Arr.take([1, 2], 5), [1, 2]);
});

test('where() preserves keys for objects', () => {
    const result = Arr.where({a: 1, b: 2, c: 3}, v => v > 1);
    assert.deepStrictEqual(Object.keys(result), ['b', 'c']);
});

test('partition() works with objects', () => {
    const [high, low] = Arr.partition({a: 1, b: 5, c: 3}, v => v > 2);
    assert.deepStrictEqual(high, {b: 5, c: 3});
    assert.deepStrictEqual(low, {a: 1});
});

// ============================================
// New Methods Tests (from, push, sole)
// ============================================

test('from() converts arrays', () => {
    assert.deepStrictEqual(Arr.from([1, 2, 3]), [1, 2, 3]);
});

test('from() converts Sets', () => {
    const set = new Set([1, 2, 3]);
    assert.deepStrictEqual(Arr.from(set), [1, 2, 3]);
});

test('from() converts Maps', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    const result = Arr.from(map);
    assert.strictEqual(result.length, 2);
    assert.deepStrictEqual(result[0], ['a', 1]);
});

test('from() converts objects to array of values', () => {
    assert.deepStrictEqual(Arr.from({a: 1, b: 2, c: 3}), [1, 2, 3]);
});

test('from() handles objects with toArray method', () => {
    const obj = {
        data: [1, 2, 3],
        toArray() { return this.data; }
    };
    assert.deepStrictEqual(Arr.from(obj), [1, 2, 3]);
});

test('from() throws on null', () => {
    assert.throws(() => Arr.from(null), /cannot be null or undefined/i);
});

test('from() throws on scalar values', () => {
    assert.throws(() => Arr.from('hello'), /cannot be represented by a scalar/i);
    assert.throws(() => Arr.from(42), /cannot be represented by a scalar/i);
});

test('push() adds items using dot notation', () => {
    const data = { products: { items: [1, 2] } };
    Arr.push(data, 'products.items', 3, 4);
    assert.deepStrictEqual(data.products.items, [1, 2, 3, 4]);
});

test('push() creates array if key does not exist', () => {
    const data = {};
    Arr.push(data, 'products.items', 1, 2);
    assert.deepStrictEqual(data.products.items, [1, 2]);
});

test('push() throws on non-array target', () => {
    const data = { value: 'string' };
    assert.throws(() => Arr.push(data, 'value', 1), /Cannot push to non-array/);
});

test('push() works with top-level keys', () => {
    const data = { items: [1, 2] };
    Arr.push(data, 'items', 3);
    assert.deepStrictEqual(data.items, [1, 2, 3]);
});

test('sole() returns single matching item', () => {
    const result = Arr.sole([1, 2, 3], x => x === 2);
    assert.strictEqual(result, 2);
});

test('sole() returns first item when no callback', () => {
    const result = Arr.sole([42]);
    assert.strictEqual(result, 42);
});

test('sole() throws when no items match', () => {
    assert.throws(() => Arr.sole([1, 2, 3], x => x === 5), /Item not found/);
});

test('sole() throws when multiple items match', () => {
    assert.throws(() => Arr.sole([1, 2, 3, 2], x => x === 2), /Multiple items found/);
});

test('sole() throws on empty array', () => {
    assert.throws(() => Arr.sole([]), /Item not found/);
});

test('sole() works with objects', () => {
    const users = [
        {id: 1, name: 'John'},
        {id: 2, name: 'Jane'}
    ];
    const result = Arr.sole(users, u => u.id === 2);
    assert.deepStrictEqual(result, {id: 2, name: 'Jane'});
});

// ═══════════════════════════════════════════════════════════════
// SECURITY TESTS - Prototype Pollution Protection
// ═══════════════════════════════════════════════════════════════

test('set() blocks __proto__ key', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, '__proto__', { isAdmin: true }),
        /Unsafe key detected.*__proto__/i
    );
    // Verify no pollution occurred
    assert.strictEqual({}.isAdmin, undefined);
});

test('set() blocks __proto__ in dot notation', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, 'user.__proto__.isAdmin', true),
        /Unsafe key segment detected.*__proto__/i
    );
    assert.strictEqual({}.isAdmin, undefined);
});

test('set() blocks constructor key', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, 'constructor', { dangerous: true }),
        /Unsafe key detected.*constructor/i
    );
});

test('set() blocks constructor in dot notation', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, 'user.constructor.prototype.isAdmin', true),
        /Unsafe key segment detected.*constructor/i
    );
});

test('set() blocks prototype key', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, 'prototype', { dangerous: true }),
        /Unsafe key detected.*prototype/i
    );
});

test('set() blocks prototype in dot notation', () => {
    const obj = {};
    assert.throws(
        () => Arr.set(obj, 'data.prototype.hack', true),
        /Unsafe key segment detected.*prototype/i
    );
});

test('set() allows safe keys to work normally', () => {
    const obj = {};
    Arr.set(obj, 'user.name', 'John');
    Arr.set(obj, 'user.profile.email', 'john@example.com');
    Arr.set(obj, 'settings.theme', 'dark');

    assert.deepStrictEqual(obj, {
        user: {
            name: 'John',
            profile: { email: 'john@example.com' }
        },
        settings: { theme: 'dark' }
    });
});

test('add() inherits protection from set()', () => {
    const obj = {};
    assert.throws(
        () => Arr.add(obj, '__proto__.isAdmin', true),
        /Unsafe key.*__proto__/i
    );
    assert.strictEqual({}.isAdmin, undefined);
});

test('push() inherits protection from set()', () => {
    const obj = { items: [] };
    assert.throws(
        () => Arr.push(obj, '__proto__.malicious', 'value'),
        /Unsafe key segment detected.*__proto__/i
    );
});

test('forget() blocks __proto__ key', () => {
    const obj = { name: 'test' };
    assert.throws(
        () => Arr.forget(obj, '__proto__'),
        /Unsafe key detected.*__proto__/i
    );
});

test('forget() blocks __proto__ in dot notation', () => {
    const obj = { user: { name: 'test' } };
    assert.throws(
        () => Arr.forget(obj, 'user.__proto__.constructor'),
        /Unsafe key segment detected.*__proto__/i
    );
});

test('forget() blocks constructor key', () => {
    const obj = { name: 'test' };
    assert.throws(
        () => Arr.forget(obj, 'constructor'),
        /Unsafe key detected.*constructor/i
    );
});

test('forget() blocks prototype key', () => {
    const obj = { name: 'test' };
    assert.throws(
        () => Arr.forget(obj, 'prototype'),
        /Unsafe key detected.*prototype/i
    );
});

test('forget() allows safe deletions', () => {
    const obj = { user: { name: 'John', email: 'john@example.com' }, settings: { theme: 'dark' } };
    Arr.forget(obj, 'user.email');
    Arr.forget(obj, 'settings');

    assert.deepStrictEqual(obj, { user: { name: 'John' } });
});

test('isSafeKey() correctly identifies dangerous keys', () => {
    assert.strictEqual(Arr.isSafeKey('__proto__'), false);
    assert.strictEqual(Arr.isSafeKey('__PROTO__'), false); // case insensitive
    assert.strictEqual(Arr.isSafeKey('constructor'), false);
    assert.strictEqual(Arr.isSafeKey('CONSTRUCTOR'), false);
    assert.strictEqual(Arr.isSafeKey('prototype'), false);
    assert.strictEqual(Arr.isSafeKey('PROTOTYPE'), false);
});

test('isSafeKey() allows safe keys', () => {
    assert.strictEqual(Arr.isSafeKey('name'), true);
    assert.strictEqual(Arr.isSafeKey('user'), true);
    assert.strictEqual(Arr.isSafeKey('__private'), true);
    assert.strictEqual(Arr.isSafeKey('proto'), true); // partial match should be safe
    assert.strictEqual(Arr.isSafeKey('my_prototype'), true); // contains but not exact
});

test('Multiple attack vectors are blocked', () => {
    const attacks = [
        '__proto__.isAdmin',
        'user.__proto__.isAdmin',
        'constructor.prototype.isAdmin',
        'data.constructor.prototype.hack',
        'settings.prototype.exploit',
        '__PROTO__.polluted',
        'CONSTRUCTOR.bad'
    ];

    attacks.forEach(attack => {
        const obj = {};
        assert.throws(
            () => Arr.set(obj, attack, true),
            /Unsafe key/i,
            `Attack vector "${attack}" should be blocked`
        );
    });
});

test('No pollution occurs after blocked attempts', () => {
    const obj = {};

    // Try various attacks
    try { Arr.set(obj, '__proto__.polluted', true); } catch (e) {}
    try { Arr.set(obj, 'constructor.bad', true); } catch (e) {}
    try { Arr.set(obj, 'prototype.evil', true); } catch (e) {}

    // Verify no pollution
    assert.strictEqual({}.polluted, undefined);
    assert.strictEqual({}.bad, undefined);
    assert.strictEqual({}.evil, undefined);

    // Verify original object is unchanged (except for valid operations)
    assert.deepStrictEqual(Object.keys(obj).length, 0);
});

console.log('✅ All Arr tests completed!');
