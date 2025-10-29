/**
 * Arr - Array helper class inspired by Laravel's Arr helper
 *
 * @version 1.1.0
 */
declare class Arr {
    /**
     * Determine whether the given value is array accessible
     */
    static accessible(value: any): boolean;

    /**
     * Add an element to an array using "dot" notation if it doesn't exist
     */
    static add<T extends Record<string, any>>(array: T, key: string | number, value: any): T;

    /**
     * Get an array item from an array using "dot" notation
     * Throws an error if the value is not an array
     */
    static array<T = any>(array: Record<string, any> | any[], key: string | number | null, defaultValue?: T[]): T[];

    /**
     * Get a boolean item from an array using "dot" notation
     * Throws an error if the value is not a boolean
     */
    static boolean(array: Record<string, any> | any[], key: string | number | null, defaultValue?: boolean | null): boolean;

    /**
     * Collapse an array of arrays into a single flat array
     *
     * @example
     * Arr.collapse([[1, 2], [3, 4]]); // [1, 2, 3, 4]
     */
    static collapse<T = any>(array: T[][]): T[];

    /**
     * Cross join the given arrays, returning all possible permutations
     *
     * @example
     * Arr.crossJoin([1, 2], ['a', 'b']);
     * // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
     */
    static crossJoin<T = any>(...arrays: T[][]): T[][];

    /**
     * Divide an array into two arrays: one with keys and the other with values
     *
     * @example
     * Arr.divide({a: 1, b: 2}); // [['a', 'b'], [1, 2]]
     */
    static divide<T = any>(array: T[] | Record<string, T>): [string[], T[]];

    /**
     * Flatten a multi-dimensional associative array with dots
     *
     * @example
     * Arr.dot({ user: { name: 'John' } }); // { 'user.name': 'John' }
     */
    static dot(array: Record<string, any>, prepend?: string): Record<string, any>;

    /**
     * Convert a flattened "dot" notation array into an expanded array
     *
     * @example
     * Arr.undot({ 'user.name': 'John' }); // { user: { name: 'John' } }
     */
    static undot(array: Record<string, any>): Record<string, any>;

    /**
     * Get all of the given array except for a specified array of keys
     *
     * @example
     * Arr.except({a: 1, b: 2, c: 3}, ['b']); // {a: 1, c: 3}
     */
    static except<T extends Record<string, any>>(array: T, keys: string[] | string | number): Partial<T>;

    /**
     * Determine if the given key exists in the provided array
     *
     * @example
     * Arr.exists({a: 1, b: 2}, 'a'); // true
     */
    static exists(array: any[] | Record<string, any>, key: string | number): boolean;

    /**
     * Return the first element in an array passing a given truth test
     *
     * @example
     * Arr.first([1, 2, 3, 4], x => x > 2); // 3
     */
    static first<T = any>(array: T[], callback?: ((value: T, index: number) => boolean) | null, defaultValue?: T | (() => T)): T | undefined;

    /**
     * Return the last element in an array passing a given truth test
     *
     * @example
     * Arr.last([1, 2, 3, 4], x => x < 3); // 2
     */
    static last<T = any>(array: T[], callback?: ((value: T, index: number) => boolean) | null, defaultValue?: T | (() => T)): T | undefined;

    /**
     * Take the first or last {limit} items from an array
     *
     * @example
     * Arr.take([1, 2, 3, 4, 5], 3); // [1, 2, 3]
     * Arr.take([1, 2, 3, 4, 5], -2); // [4, 5]
     */
    static take<T = any>(array: T[], limit: number): T[];

    /**
     * Flatten a multi-dimensional array into a single level
     *
     * @example
     * Arr.flatten([1, [2, [3, 4]]], 1); // [1, 2, [3, 4]]
     * Arr.flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]
     */
    static flatten<T = any>(array: any[], depth?: number): T[];

    /**
     * Get a float item from an array using "dot" notation
     * Throws an error if the value is not a float
     */
    static float(array: Record<string, any> | any[], key: string | number | null, defaultValue?: number | null): number;

    /**
     * Remove one or many array items from a given array using "dot" notation
     *
     * @example
     * const obj = {a: 1, b: 2}; Arr.forget(obj, 'a'); // {b: 2}
     */
    static forget(array: any[] | Record<string, any>, keys: string[] | string | number): void;

    /**
     * Get an item from an array using "dot" notation
     *
     * @example
     * Arr.get({user: {name: 'John'}}, 'user.name'); // 'John'
     */
    static get<T = any>(array: Record<string, any> | any[], key?: string | number | null, defaultValue?: T | (() => T)): T;

    /**
     * Check if an item or items exist in an array using "dot" notation
     *
     * @example
     * Arr.has({user: {name: 'John'}}, 'user.name'); // true
     */
    static has(array: Record<string, any> | any[], keys: string | string[]): boolean;

    /**
     * Determine if all keys exist in an array using "dot" notation
     * Alias for has() method
     */
    static hasAll(array: Record<string, any> | any[], keys: string | string[]): boolean;

    /**
     * Determine if any of the keys exist in an array using "dot" notation
     *
     * @example
     * Arr.hasAny({a: 1, b: 2}, ['c', 'b']); // true
     */
    static hasAny(array: Record<string, any> | any[], keys: string | string[]): boolean;

    /**
     * Determine if all items pass the given truth test
     *
     * @example
     * Arr.every([2, 4, 6], x => x % 2 === 0); // true
     */
    static every<T = any>(array: T[], callback: (value: T, index: number) => boolean): boolean;

    /**
     * Determine if some items pass the given truth test
     *
     * @example
     * Arr.some([1, 2, 3], x => x > 2); // true
     */
    static some<T = any>(array: T[], callback: (value: T, index: number) => boolean): boolean;

    /**
     * Get an integer item from an array using "dot" notation
     * Throws an error if the value is not an integer
     */
    static integer(array: Record<string, any> | any[], key: string | number | null, defaultValue?: number | null): number;

    /**
     * Determines if an array is associative
     *
     * @example
     * Arr.isAssoc({a: 1, b: 2}); // true
     * Arr.isAssoc([1, 2, 3]); // false
     */
    static isAssoc(array: any[] | Record<string, any>): boolean;

    /**
     * Determines if an array is a list (sequential keys starting from 0)
     *
     * @example
     * Arr.isList([1, 2, 3]); // true
     * Arr.isList({0: 1, 2: 3}); // false
     */
    static isList(array: any[]): boolean;

    /**
     * Join all items using a string. The final items can use a separate glue string
     *
     * @example
     * Arr.join(['a', 'b', 'c'], ', ', ' and '); // 'a, b and c'
     */
    static join(array: any[], glue: string, finalGlue?: string): string;

    /**
     * Key an associative array by a field or using a callback
     *
     * @example
     * Arr.keyBy([{id: 1, name: 'John'}], 'id'); // {1: {id: 1, name: 'John'}}
     */
    static keyBy<T = any>(array: T[], keyBy: string | ((item: T) => string | number)): Record<string, T>;

    /**
     * Prepend the key names of an associative array
     *
     * @example
     * Arr.prependKeysWith({name: 'John'}, 'user_'); // {user_name: 'John'}
     */
    static prependKeysWith<T = any>(array: Record<string, T>, prependWith: string): Record<string, T>;

    /**
     * Get a subset of the items from the given array
     *
     * @example
     * Arr.only({a: 1, b: 2, c: 3}, ['a', 'c']); // {a: 1, c: 3}
     */
    static only<T = any>(array: T[] | Record<string, T>, keys: string[] | string): T[] | Partial<Record<string, T>>;

    /**
     * Select an array of values from an array of objects
     *
     * @example
     * Arr.select([{id: 1, name: 'John', age: 30}], ['id', 'name']);
     * // [{id: 1, name: 'John'}]
     */
    static select<T = any>(array: T[], keys: string[] | string): Partial<T>[];

    /**
     * Pluck an array of values from an array
     *
     * @example
     * Arr.pluck([{name: 'John', age: 30}], 'name'); // ['John']
     * Arr.pluck([{name: 'John', age: 30}], 'age', 'name'); // {John: 30}
     */
    static pluck<T = any, K = any>(
        array: T[],
        value: string | ((item: T) => any),
        key?: string | ((item: T) => string | number) | null
    ): K[] | Record<string, K>;

    /**
     * Run a map over each of the items in the array
     *
     * @example
     * Arr.map([1, 2, 3], x => x * 2); // [2, 4, 6]
     */
    static map<T = any, R = any>(array: T[] | Record<string, T>, callback: (value: T, key: number | string) => R): R[] | Record<string, R>;

    /**
     * Run an associative map over each of the items
     * The callback should return an object with a single key/value pair
     *
     * @example
     * Arr.mapWithKeys([{name: 'John'}], item => ({[item.name]: item}));
     * // {John: {name: 'John'}}
     */
    static mapWithKeys<T = any, R = any>(array: T[] | Record<string, T>, callback: (value: T, key: number | string) => Record<string, R>): Record<string, R>;

    /**
     * Run a map over each nested chunk of items
     *
     * @example
     * Arr.mapSpread([[1, 2], [3, 4]], (a, b, key) => a + b); // [3, 7]
     */
    static mapSpread<T = any, R = any>(array: T[][], callback: (...args: any[]) => R): R[];

    /**
     * Push an item onto the beginning of an array
     *
     * @example
     * Arr.prepend([2, 3], 1); // [1, 2, 3]
     */
    static prepend<T = any>(array: T[], value: T, key?: string | number | null): T[] | Record<string, T>;

    /**
     * Get a value from the array, and remove it
     *
     * @example
     * const obj = {a: 1, b: 2};
     * Arr.pull(obj, 'a'); // 1, obj is now {b: 2}
     */
    static pull<T = any>(array: any[] | Record<string, any>, key: string | number, defaultValue?: T): T;

    /**
     * Convert the array into a query string
     *
     * @example
     * Arr.query({name: 'John', age: 30}); // 'name=John&age=30'
     */
    static query(array: Record<string, any>): string;

    /**
     * Get one or a specified number of random values from an array
     *
     * @example
     * Arr.random([1, 2, 3, 4, 5], 2); // [3, 1] (random)
     */
    static random<T = any>(array: T[], number?: number | null, preserveKeys?: boolean): T | T[] | Record<number, T> | undefined;

    /**
     * Set an array item to a given value using "dot" notation
     *
     * @example
     * Arr.set({}, 'user.name', 'John'); // {user: {name: 'John'}}
     */
    static set<T extends Record<string, any>>(array: T, key: string | number | null, value: any): T;

    /**
     * Shuffle the given array and return the result
     *
     * @example
     * Arr.shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (random)
     */
    static shuffle<T = any>(array: T[]): T[];

    /**
     * Sort the array using the given callback or key
     *
     * @example
     * Arr.sort([3, 1, 2]); // [1, 2, 3]
     * Arr.sort([{age: 30}, {age: 20}], 'age'); // [{age: 20}, {age: 30}]
     */
    static sort<T = any>(array: T[], callback?: ((a: T, b: T) => number) | string | null): T[];

    /**
     * Sort the array in descending order
     *
     * @example
     * Arr.sortDesc([1, 2, 3]); // [3, 2, 1]
     */
    static sortDesc<T = any>(array: T[], callback?: ((a: T, b: T) => number) | string | null): T[];

    /**
     * Recursively sort an array by keys and values
     *
     * @example
     * Arr.sortRecursive({b: 2, a: 1}); // {a: 1, b: 2}
     */
    static sortRecursive<T = any>(array: T[] | Record<string, any>, descending?: boolean): T[] | Record<string, any>;

    /**
     * Recursively sort an array in descending order
     */
    static sortRecursiveDesc<T = any>(array: T[] | Record<string, any>): T[] | Record<string, any>;

    /**
     * Get a string item from an array using "dot" notation
     * Throws an error if the value is not a string
     */
    static string(array: Record<string, any> | any[], key: string | number | null, defaultValue?: string | null): string;

    /**
     * Conditionally compile classes from an array into a CSS class list
     *
     * @example
     * Arr.toCssClasses(['btn', {active: true, disabled: false}]); // 'btn active'
     */
    static toCssClasses(array: (string | Record<string, boolean>)[]): string;

    /**
     * Conditionally compile styles from an array into a style list
     *
     * @example
     * Arr.toCssStyles(['color: red', {'font-size: 14px': true}]);
     * // 'color: red; font-size: 14px;'
     */
    static toCssStyles(array: (string | Record<string, boolean>)[]): string;

    /**
     * Filter the array using the given callback
     *
     * @example
     * Arr.where([1, 2, 3, 4], x => x > 2); // [3, 4]
     */
    static where<T = any>(array: T[] | Record<string, T>, callback: (value: T, key: number | string) => boolean): T[] | Record<string, T>;

    /**
     * Filter the array using the negation of the given callback
     *
     * @example
     * Arr.reject([1, 2, 3, 4], x => x > 2); // [1, 2]
     */
    static reject<T = any>(array: T[] | Record<string, T>, callback: (value: T, key: number | string) => boolean): T[] | Record<string, T>;

    /**
     * Partition the array into two arrays using the given callback
     *
     * @example
     * Arr.partition([1, 2, 3, 4], x => x % 2 === 0); // [[2, 4], [1, 3]]
     */
    static partition<T = any>(array: T[], callback: (value: T, key: number) => boolean): [T[], T[]];

    /**
     * Filter items where the value is not null or undefined
     *
     * @example
     * Arr.whereNotNull([1, null, 2, undefined, 3]); // [1, 2, 3]
     */
    static whereNotNull<T = any>(array: T[] | Record<string, T>): T[] | Record<string, T>;

    /**
     * If the given value is not an array and not null, wrap it in one
     *
     * @example
     * Arr.wrap('hello'); // ['hello']
     * Arr.wrap([1, 2]); // [1, 2]
     * Arr.wrap(null); // []
     */
    static wrap<T = any>(value: T | T[] | null | undefined): T[];

    /**
     * Get the underlying array of items from the given argument
     * Converts various types to arrays (iterables, arrayables, objects)
     *
     * @example
     * Arr.from([1, 2, 3]); // [1, 2, 3]
     * Arr.from(new Set([1, 2, 3])); // [1, 2, 3]
     * Arr.from({a: 1, b: 2}); // [1, 2]
     */
    static from<T = any>(items: Iterable<T> | ArrayLike<T> | Record<string, T> | { toArray(): T[] }): T[];

    /**
     * Push items onto an array using "dot" notation
     *
     * @example
     * const data = { products: { items: [1, 2] } };
     * Arr.push(data, 'products.items', 3, 4);
     * // { products: { items: [1, 2, 3, 4] } }
     */
    static push<T extends Record<string, any>>(array: T, key: string | number | null, ...values: any[]): T;

    /**
     * Get the sole item that passes a truth test, or throw if not exactly one
     * Throws an error if no items or multiple items match
     *
     * @example
     * Arr.sole([1, 2, 3], x => x === 2); // 2
     * Arr.sole([1, 2, 3, 2], x => x === 2); // throws (multiple)
     * Arr.sole([1, 2, 3], x => x === 5); // throws (none found)
     */
    static sole<T = any>(array: T[], callback?: ((value: T, index: number) => boolean) | null): T;
}

export default Arr;
