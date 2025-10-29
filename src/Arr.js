/**
 * Arr - Array helper class inspired by Laravel's Arr helper
 *
 * Provides comprehensive array manipulation methods with support for:
 * - Dot notation for nested arrays
 * - Type-safe getters
 * - Array transformations
 * - Functional operations
 *
 * @version 1.1.0
 */
class Arr {
    /**
     * Determine whether the given value is array accessible.
     *
     * @param {*} value - The value to check
     * @returns {boolean}
     * @example
     * Arr.accessible([1, 2, 3]); // true
     * Arr.accessible(new Map()); // false
     */
    static accessible(value) {
        if (Array.isArray(value)) return true;
        if (!value || typeof value !== 'object') return false;
        return typeof value[Symbol.iterator] === 'function';
    }

    /**
     * Add an element to an array using "dot" notation if it doesn't exist.
     *
     * @param {Array|Object} array - The array to modify
     * @param {string|number} key - The key to add
     * @param {*} value - The value to add
     * @returns {Array|Object}
     * @example
     * Arr.add({}, 'user.name', 'John'); // { user: { name: 'John' } }
     */
    static add(array, key, value) {
        if (this.get(array, key) === undefined) {
            this.set(array, key, value);
        }
        return array;
    }

    /**
     * Get an array item from an array using "dot" notation.
     * Throws an error if the value is not an array.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve
     * @param {Array} defaultValue - Default value if not found
     * @returns {Array}
     * @throws {Error} If value is not an array
     */
    static array(array, key, defaultValue = null) {
        const value = this.get(array, key, defaultValue);

        if (!Array.isArray(value)) {
            throw new Error(`Array value for key [${key}] must be an array, ${typeof value} found.`);
        }

        return value;
    }

    /**
     * Get a boolean item from an array using "dot" notation.
     * Throws an error if the value is not a boolean.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve
     * @param {boolean} defaultValue - Default value if not found
     * @returns {boolean}
     * @throws {Error} If value is not a boolean
     */
    static boolean(array, key, defaultValue = null) {
        const value = this.get(array, key, defaultValue);

        if (typeof value !== 'boolean') {
            throw new Error(`Array value for key [${key}] must be a boolean, ${typeof value} found.`);
        }

        return value;
    }

    /**
     * Collapse an array of arrays into a single flat array.
     *
     * @param {Array} array - Array of arrays to collapse
     * @returns {Array}
     * @example
     * Arr.collapse([[1, 2], [3, 4]]); // [1, 2, 3, 4]
     */
    static collapse(array) {
        const results = [];

        for (const values of array) {
            if (Array.isArray(values)) {
                results.push(...values);
            }
        }

        return results;
    }

    /**
     * Cross join the given arrays, returning all possible permutations.
     *
     * @param {...Array} arrays - Arrays to cross join
     * @returns {Array}
     * @example
     * Arr.crossJoin([1, 2], ['a', 'b']);
     * // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
     */
    static crossJoin(...arrays) {
        let results = [[]];

        for (let i = 0; i < arrays.length; i++) {
            const append = [];

            for (const product of results) {
                for (const item of arrays[i]) {
                    const newProduct = [...product];
                    newProduct[i] = item;
                    append.push(newProduct);
                }
            }

            results = append;
        }

        return results;
    }

    /**
     * Divide an array into two arrays: one with keys and the other with values.
     *
     * @param {Array|Object} array - The array to divide
     * @returns {Array} - [keys, values]
     * @example
     * Arr.divide({a: 1, b: 2}); // [['a', 'b'], [1, 2]]
     */
    static divide(array) {
        if (Array.isArray(array)) {
            return [array.map((_, i) => i), array];
        }
        return [Object.keys(array), Object.values(array)];
    }

    /**
     * Flatten a multi-dimensional associative array with dots.
     *
     * @param {Array|Object} array - The array to flatten
     * @param {string} prepend - String to prepend to keys
     * @returns {Object}
     * @example
     * Arr.dot({ user: { name: 'John' } }); // { 'user.name': 'John' }
     */
    static dot(array, prepend = '') {
        const results = {};

        const flatten = (data, prefix) => {
            for (const [key, value] of Object.entries(data)) {
                const newKey = prefix + key;

                if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
                    flatten(value, newKey + '.');
                } else {
                    results[newKey] = value;
                }
            }
        };

        flatten(array, prepend);
        return results;
    }

    /**
     * Convert a flattened "dot" notation array into an expanded array.
     *
     * @param {Object} array - The flattened array
     * @returns {Object}
     * @example
     * Arr.undot({ 'user.name': 'John' }); // { user: { name: 'John' } }
     */
    static undot(array) {
        const results = {};

        for (const [key, value] of Object.entries(array)) {
            this.set(results, key, value);
        }

        return results;
    }

    /**
     * Get all of the given array except for a specified array of keys.
     *
     * @param {Array|Object} array - The source array
     * @param {Array|string|number} keys - Keys to exclude
     * @returns {Array|Object}
     * @example
     * Arr.except({a: 1, b: 2, c: 3}, ['b']); // {a: 1, c: 3}
     */
    static except(array, keys) {
        const keysArray = Array.isArray(keys) ? keys : [keys];
        const result = Array.isArray(array) ? [...array] : { ...array };
        this.forget(result, keysArray);
        return result;
    }

    /**
     * Determine if the given key exists in the provided array.
     *
     * @param {Array|Object} array - The array to check
     * @param {string|number} key - The key to check
     * @returns {boolean}
     * @example
     * Arr.exists({a: 1, b: 2}, 'a'); // true
     * Arr.exists([1, 2, 3], 1); // true
     */
    static exists(array, key) {
        if (Array.isArray(array)) {
            return key in array;
        }
        return Object.prototype.hasOwnProperty.call(array, key);
    }

    /**
     * Return the first element in an array passing a given truth test.
     *
     * @param {Array} array - The array to search
     * @param {Function|null} callback - Optional callback function
     * @param {*} defaultValue - Default value if not found
     * @returns {*}
     * @example
     * Arr.first([1, 2, 3, 4], x => x > 2); // 3
     */
    static first(array, callback = null, defaultValue = undefined) {
        if (callback === null) {
            if (array.length === 0) {
                return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
            }
            return array[0];
        }

        for (let i = 0; i < array.length; i++) {
            if (callback(array[i], i)) {
                return array[i];
            }
        }

        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    /**
     * Return the last element in an array passing a given truth test.
     *
     * @param {Array} array - The array to search
     * @param {Function|null} callback - Optional callback function
     * @param {*} defaultValue - Default value if not found
     * @returns {*}
     * @example
     * Arr.last([1, 2, 3, 4], x => x < 3); // 2
     */
    static last(array, callback = null, defaultValue = undefined) {
        if (callback === null) {
            return array.length === 0 ? (typeof defaultValue === 'function' ? defaultValue() : defaultValue) : array[array.length - 1];
        }

        for (let i = array.length - 1; i >= 0; i--) {
            if (callback(array[i], i)) {
                return array[i];
            }
        }

        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    /**
     * Take the first or last {limit} items from an array.
     *
     * @param {Array} array - The source array
     * @param {number} limit - Number of items to take (negative for from end)
     * @returns {Array}
     * @example
     * Arr.take([1, 2, 3, 4, 5], 3); // [1, 2, 3]
     * Arr.take([1, 2, 3, 4, 5], -2); // [4, 5]
     */
    static take(array, limit) {
        if (limit < 0) {
            return array.slice(limit);
        }
        return array.slice(0, limit);
    }

    /**
     * Flatten a multi-dimensional array into a single level.
     *
     * @param {Array} array - The array to flatten
     * @param {number} depth - Maximum depth to flatten (Infinity for full flatten)
     * @returns {Array}
     * @example
     * Arr.flatten([1, [2, [3, 4]]], 1); // [1, 2, [3, 4]]
     * Arr.flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]
     */
    static flatten(array, depth = Infinity) {
        const result = [];

        for (const item of array) {
            if (Array.isArray(item) && depth > 0) {
                result.push(...this.flatten(item, depth - 1));
            } else {
                result.push(item);
            }
        }

        return result;
    }

    /**
     * Get a float item from an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve
     * @param {number} defaultValue - Default value if not found
     * @returns {number}
     * @throws {Error} If value is not a float
     */
    static float(array, key, defaultValue = null) {
        const value = this.get(array, key, defaultValue);

        if (typeof value !== 'number' || !Number.isFinite(value)) {
            throw new Error(`Array value for key [${key}] must be a float, ${typeof value} found.`);
        }

        return value;
    }

    /**
     * Remove one or many array items from a given array using "dot" notation.
     *
     * @param {Array|Object} array - The array to modify
     * @param {Array|string|number} keys - Keys to remove
     * @returns {void}
     * @example
     * const obj = {a: 1, b: 2}; Arr.forget(obj, 'a'); // {b: 2}
     */
    static forget(array, keys) {
        const original = array;
        const keysArray = Array.isArray(keys) ? keys : [keys];

        if (keysArray.length === 0) {
            return;
        }

        for (const key of keysArray) {
            // If exact key exists at top level, remove it
            if (this.exists(array, key)) {
                if (Array.isArray(array)) {
                    array.splice(key, 1);
                } else {
                    delete array[key];
                }
                continue;
            }

            // Handle dot notation
            if (typeof key === 'string' && key.includes('.')) {
                const parts = key.split('.');
                let current = original;

                while (parts.length > 1) {
                    const part = parts.shift();

                    if (current && typeof current === 'object' && part in current) {
                        current = current[part];
                    } else {
                        break;
                    }
                }

                if (parts.length === 1 && current && typeof current === 'object') {
                    const finalKey = parts[0];
                    if (Array.isArray(current)) {
                        current.splice(finalKey, 1);
                    } else {
                        delete current[finalKey];
                    }
                }
            }
        }
    }

    /**
     * Get an item from an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve (supports dot notation)
     * @param {*} defaultValue - Default value if not found
     * @returns {*}
     * @example
     * Arr.get({user: {name: 'John'}}, 'user.name'); // 'John'
     */
    static get(array, key = null, defaultValue = undefined) {
        if (!array || (typeof array !== 'object')) {
            return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }

        if (key === null) {
            return array;
        }

        if (this.exists(array, key)) {
            return array[key];
        }

        if (typeof key !== 'string' || !key.includes('.')) {
            return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }

        const segments = key.split('.');
        let current = array;

        for (const segment of segments) {
            if (current && typeof current === 'object' && this.exists(current, segment)) {
                current = current[segment];
            } else {
                return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
            }
        }

        return current;
    }

    /**
     * Check if an item or items exist in an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to check
     * @param {string|Array} keys - Key or keys to check
     * @returns {boolean}
     * @example
     * Arr.has({user: {name: 'John'}}, 'user.name'); // true
     */
    static has(array, keys) {
        const keysArray = Array.isArray(keys) ? keys : [keys];

        if (!array || keysArray.length === 0) {
            return false;
        }

        for (const key of keysArray) {
            if (this.exists(array, key)) {
                continue;
            }

            if (typeof key === 'string' && key.includes('.')) {
                const segments = key.split('.');
                let current = array;
                let found = true;

                for (const segment of segments) {
                    if (current && typeof current === 'object' && this.exists(current, segment)) {
                        current = current[segment];
                    } else {
                        found = false;
                        break;
                    }
                }

                if (!found) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    /**
     * Determine if all keys exist in an array using "dot" notation.
     * Alias for has() method.
     *
     * @param {Array|Object} array - The array to check
     * @param {string|Array} keys - Keys to check
     * @returns {boolean}
     */
    static hasAll(array, keys) {
        return this.has(array, keys);
    }

    /**
     * Determine if any of the keys exist in an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to check
     * @param {string|Array} keys - Keys to check
     * @returns {boolean}
     * @example
     * Arr.hasAny({a: 1, b: 2}, ['c', 'b']); // true
     */
    static hasAny(array, keys) {
        if (!keys || !array) {
            return false;
        }

        const keysArray = Array.isArray(keys) ? keys : [keys];

        if (keysArray.length === 0) {
            return false;
        }

        for (const key of keysArray) {
            if (this.has(array, key)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine if all items pass the given truth test.
     *
     * @param {Array} array - The array to test
     * @param {Function} callback - Test function (value, key) => boolean
     * @returns {boolean}
     * @example
     * Arr.every([2, 4, 6], x => x % 2 === 0); // true
     */
    static every(array, callback) {
        for (let i = 0; i < array.length; i++) {
            if (!callback(array[i], i)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Determine if some items pass the given truth test.
     *
     * @param {Array} array - The array to test
     * @param {Function} callback - Test function (value, key) => boolean
     * @returns {boolean}
     * @example
     * Arr.some([1, 2, 3], x => x > 2); // true
     */
    static some(array, callback) {
        for (let i = 0; i < array.length; i++) {
            if (callback(array[i], i)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get an integer item from an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve
     * @param {number} defaultValue - Default value if not found
     * @returns {number}
     * @throws {Error} If value is not an integer
     */
    static integer(array, key, defaultValue = null) {
        const value = this.get(array, key, defaultValue);

        if (!Number.isInteger(value)) {
            throw new Error(`Array value for key [${key}] must be an integer, ${typeof value} found.`);
        }

        return value;
    }

    /**
     * Determines if an array is associative.
     * An array is "associative" if it's an object or doesn't have sequential numerical keys.
     *
     * @param {Array|Object} array - The array to check
     * @returns {boolean}
     * @example
     * Arr.isAssoc({a: 1, b: 2}); // true
     * Arr.isAssoc([1, 2, 3]); // false
     */
    static isAssoc(array) {
        if (!Array.isArray(array)) {
            return true;
        }

        if (array.length === 0) {
            return false;
        }

        return !this.isList(array);
    }

    /**
     * Determines if an array is a list.
     * An array is a "list" if all array keys are sequential integers starting from 0.
     *
     * @param {Array} array - The array to check
     * @returns {boolean}
     * @example
     * Arr.isList([1, 2, 3]); // true
     * Arr.isList({0: 1, 2: 3}); // false
     */
    static isList(array) {
        if (!Array.isArray(array)) {
            return false;
        }

        if (array.length === 0) {
            return true;
        }

        return Object.keys(array).every((key, index) => parseInt(key) === index);
    }

    /**
     * Join all items using a string. The final items can use a separate glue string.
     *
     * @param {Array} array - The array to join
     * @param {string} glue - String to join items
     * @param {string} finalGlue - String to join the final item
     * @returns {string}
     * @example
     * Arr.join(['a', 'b', 'c'], ', ', ' and '); // 'a, b and c'
     */
    static join(array, glue, finalGlue = '') {
        if (finalGlue === '') {
            return array.join(glue);
        }

        if (array.length === 0) {
            return '';
        }

        if (array.length === 1) {
            return String(array[0]);
        }

        const finalItem = array[array.length - 1];
        const initial = array.slice(0, -1);

        return initial.join(glue) + finalGlue + finalItem;
    }

    /**
     * Key an associative array by a field or using a callback.
     *
     * @param {Array} array - The array to key
     * @param {string|Function} keyBy - Field name or callback function
     * @returns {Object}
     * @example
     * Arr.keyBy([{id: 1, name: 'John'}], 'id'); // {1: {id: 1, name: 'John'}}
     */
    static keyBy(array, keyBy) {
        const result = {};

        for (const item of array) {
            const key = typeof keyBy === 'function'
                ? keyBy(item)
                : this.get(item, keyBy);

            result[key] = item;
        }

        return result;
    }

    /**
     * Prepend the key names of an associative array.
     *
     * @param {Object} array - The array to modify
     * @param {string} prependWith - String to prepend to keys
     * @returns {Object}
     * @example
     * Arr.prependKeysWith({name: 'John'}, 'user_'); // {user_name: 'John'}
     */
    static prependKeysWith(array, prependWith) {
        return this.mapWithKeys(array, (item, key) => ({ [prependWith + key]: item }));
    }

    /**
     * Get a subset of the items from the given array.
     *
     * @param {Array|Object} array - The source array
     * @param {Array|string} keys - Keys to include
     * @returns {Array|Object}
     * @example
     * Arr.only({a: 1, b: 2, c: 3}, ['a', 'c']); // {a: 1, c: 3}
     */
    static only(array, keys) {
        const keysArray = Array.isArray(keys) ? keys : [keys];
        const result = Array.isArray(array) ? [] : {};

        for (const key of keysArray) {
            if (this.exists(array, key)) {
                result[key] = array[key];
            }
        }

        return result;
    }

    /**
     * Select an array of values from an array.
     *
     * @param {Array} array - The array of objects
     * @param {Array|string} keys - Keys to select from each item
     * @returns {Array}
     * @example
     * Arr.select([{id: 1, name: 'John', age: 30}], ['id', 'name']);
     * // [{id: 1, name: 'John'}]
     */
    static select(array, keys) {
        const keysArray = this.wrap(keys);

        return this.map(array, (item) => {
            const result = {};

            for (const key of keysArray) {
                if (this.accessible(item) && this.exists(item, key)) {
                    result[key] = item[key];
                } else if (typeof item === 'object' && item !== null && key in item) {
                    result[key] = item[key];
                }
            }

            return result;
        });
    }

    /**
     * Pluck an array of values from an array.
     *
     * @param {Array} array - The array to pluck from
     * @param {string|Function} value - Value field or callback
     * @param {string|Function|null} key - Optional key field or callback
     * @returns {Array|Object}
     * @example
     * Arr.pluck([{name: 'John', age: 30}], 'name'); // ['John']
     * Arr.pluck([{name: 'John', age: 30}], 'age', 'name'); // {John: 30}
     */
    static pluck(array, value, key = null) {
        const results = key === null ? [] : {};

        for (const item of array) {
            const itemValue = typeof value === 'function'
                ? value(item)
                : this.get(item, value);

            if (key === null) {
                results.push(itemValue);
            } else {
                const itemKey = typeof key === 'function'
                    ? key(item)
                    : this.get(item, key);

                results[itemKey] = itemValue;
            }
        }

        return results;
    }

    /**
     * Run a map over each of the items in the array.
     *
     * @param {Array|Object} array - The array to map
     * @param {Function} callback - Callback function (value, key) => newValue
     * @returns {Array|Object}
     * @example
     * Arr.map([1, 2, 3], x => x * 2); // [2, 4, 6]
     */
    static map(array, callback) {
        if (Array.isArray(array)) {
            return array.map((value, index) => callback(value, index));
        }

        const result = {};
        for (const [key, value] of Object.entries(array)) {
            result[key] = callback(value, key);
        }
        return result;
    }

    /**
     * Run an associative map over each of the items.
     * The callback should return an object with a single key/value pair.
     *
     * @param {Array|Object} array - The array to map
     * @param {Function} callback - Callback returning {key: value}
     * @returns {Object}
     * @example
     * Arr.mapWithKeys([{name: 'John'}], item => ({[item.name]: item}));
     * // {John: {name: 'John'}}
     */
    static mapWithKeys(array, callback) {
        const result = {};

        const entries = Array.isArray(array)
            ? array.map((v, i) => [i, v])
            : Object.entries(array);

        for (const [key, value] of entries) {
            const mapped = callback(value, key);
            Object.assign(result, mapped);
        }

        return result;
    }

    /**
     * Run a map over each nested chunk of items.
     *
     * @param {Array} array - Array of arrays
     * @param {Function} callback - Callback function
     * @returns {Array}
     * @example
     * Arr.mapSpread([[1, 2], [3, 4]], (a, b, key) => a + b); // [3, 7]
     */
    static mapSpread(array, callback) {
        return this.map(array, (chunk, key) => {
            const args = Array.isArray(chunk) ? [...chunk, key] : [chunk, key];
            return callback(...args);
        });
    }

    /**
     * Push an item onto the beginning of an array.
     *
     * @param {Array} array - The array to modify
     * @param {*} value - Value to prepend
     * @param {string|number} key - Optional key for objects
     * @returns {Array}
     * @example
     * Arr.prepend([2, 3], 1); // [1, 2, 3]
     */
    static prepend(array, value, key = null) {
        if (key === null) {
            return [value, ...array];
        }

        return { [key]: value, ...array };
    }

    /**
     * Get a value from the array, and remove it.
     *
     * @param {Array|Object} array - The array to modify
     * @param {string|number} key - Key to pull
     * @param {*} defaultValue - Default if not found
     * @returns {*}
     * @example
     * const obj = {a: 1, b: 2};
     * Arr.pull(obj, 'a'); // 1, obj is now {b: 2}
     */
    static pull(array, key, defaultValue = undefined) {
        const value = this.get(array, key, defaultValue);
        this.forget(array, key);
        return value;
    }

    /**
     * Convert the array into a query string.
     *
     * @param {Object} array - The object to convert
     * @returns {string}
     * @example
     * Arr.query({name: 'John', age: 30}); // 'name=John&age=30'
     */
    static query(array) {
        const params = new URLSearchParams();

        const flatten = (obj, prefix = '') => {
            for (const [key, value] of Object.entries(obj)) {
                const fullKey = prefix ? `${prefix}[${key}]` : key;

                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    flatten(value, fullKey);
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        params.append(`${fullKey}[${index}]`, String(item));
                    });
                } else {
                    params.append(fullKey, String(value));
                }
            }
        };

        flatten(array);
        return params.toString();
    }

    /**
     * Get one or a specified number of random values from an array.
     *
     * @param {Array} array - The source array
     * @param {number|null} number - Number of items to get
     * @param {boolean} preserveKeys - Whether to preserve keys
     * @returns {*|Array}
     * @example
     * Arr.random([1, 2, 3, 4, 5], 2); // [3, 1] (random)
     */
    static random(array, number = null, preserveKeys = false) {
        const requested = number === null ? 1 : number;
        const count = array.length;

        if (requested > count) {
            throw new Error(`You requested ${requested} items, but there are only ${count} items available.`);
        }

        if (count === 0 || (number !== null && number <= 0)) {
            return number === null ? undefined : [];
        }

        const indices = [];
        const used = new Set();

        while (indices.length < requested) {
            const randomIndex = Math.floor(Math.random() * count);
            if (!used.has(randomIndex)) {
                used.add(randomIndex);
                indices.push(randomIndex);
            }
        }

        if (number === null) {
            return array[indices[0]];
        }

        if (preserveKeys) {
            const result = {};
            for (const index of indices) {
                result[index] = array[index];
            }
            return result;
        }

        return indices.map(i => array[i]);
    }

    /**
     * Set an array item to a given value using "dot" notation.
     *
     * @param {Array|Object} array - The array to modify
     * @param {string|number|null} key - Key to set (supports dot notation)
     * @param {*} value - Value to set
     * @returns {Array|Object}
     * @example
     * Arr.set({}, 'user.name', 'John'); // {user: {name: 'John'}}
     */
    static set(array, key, value) {
        if (key === null) {
            return value;
        }

        if (typeof key !== 'string' || !key.includes('.')) {
            array[key] = value;
            return array;
        }

        const keys = key.split('.');
        let current = array;

        for (let i = 0; i < keys.length - 1; i++) {
            const segment = keys[i];

            if (!current[segment] || typeof current[segment] !== 'object') {
                current[segment] = {};
            }

            current = current[segment];
        }

        current[keys[keys.length - 1]] = value;
        return array;
    }

    /**
     * Shuffle the given array and return the result.
     *
     * @param {Array} array - The array to shuffle
     * @returns {Array}
     * @example
     * Arr.shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (random)
     */
    static shuffle(array) {
        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    /**
     * Sort the array using the given callback or key.
     *
     * @param {Array} array - The array to sort
     * @param {Function|string|null} callback - Sort callback or key
     * @returns {Array}
     * @example
     * Arr.sort([3, 1, 2]); // [1, 2, 3]
     * Arr.sort([{age: 30}, {age: 20}], 'age'); // [{age: 20}, {age: 30}]
     */
    static sort(array, callback = null) {
        const result = [...array];

        if (callback === null) {
            return result.sort();
        }

        if (typeof callback === 'string') {
            return result.sort((a, b) => {
                const aVal = this.get(a, callback);
                const bVal = this.get(b, callback);
                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            });
        }

        return result.sort(callback);
    }

    /**
     * Sort the array in descending order.
     *
     * @param {Array} array - The array to sort
     * @param {Function|string|null} callback - Sort callback or key
     * @returns {Array}
     * @example
     * Arr.sortDesc([1, 2, 3]); // [3, 2, 1]
     */
    static sortDesc(array, callback = null) {
        const result = this.sort(array, callback);
        return result.reverse();
    }

    /**
     * Recursively sort an array by keys and values.
     *
     * @param {Array|Object} array - The array to sort
     * @param {boolean} descending - Sort in descending order
     * @returns {Array|Object}
     * @example
     * Arr.sortRecursive({b: 2, a: 1}); // {a: 1, b: 2}
     */
    static sortRecursive(array, descending = false) {
        if (Array.isArray(array)) {
            const result = array.map(value => {
                if (typeof value === 'object' && value !== null) {
                    return this.sortRecursive(value, descending);
                }
                return value;
            });

            return descending ? result.sort().reverse() : result.sort();
        }

        const sorted = {};
        const keys = Object.keys(array).sort();

        if (descending) {
            keys.reverse();
        }

        for (const key of keys) {
            const value = array[key];
            sorted[key] = typeof value === 'object' && value !== null
                ? this.sortRecursive(value, descending)
                : value;
        }

        return sorted;
    }

    /**
     * Recursively sort an array in descending order.
     *
     * @param {Array|Object} array - The array to sort
     * @returns {Array|Object}
     */
    static sortRecursiveDesc(array) {
        return this.sortRecursive(array, true);
    }

    /**
     * Get a string item from an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to search
     * @param {string|number|null} key - The key to retrieve
     * @param {string} defaultValue - Default value if not found
     * @returns {string}
     * @throws {Error} If value is not a string
     */
    static string(array, key, defaultValue = null) {
        const value = this.get(array, key, defaultValue);

        if (typeof value !== 'string') {
            throw new Error(`Array value for key [${key}] must be a string, ${typeof value} found.`);
        }

        return value;
    }

    /**
     * Conditionally compile classes from an array into a CSS class list.
     *
     * @param {Array|Object} array - The classes array/object
     * @returns {string}
     * @example
     * Arr.toCssClasses(['btn', {active: true, disabled: false}]); // 'btn active'
     */
    static toCssClasses(array) {
        const classList = this.wrap(array);
        const classes = [];

        for (const item of classList) {
            if (typeof item === 'string') {
                classes.push(item);
            } else if (typeof item === 'object') {
                for (const [className, condition] of Object.entries(item)) {
                    if (condition) {
                        classes.push(className);
                    }
                }
            }
        }

        return classes.join(' ');
    }

    /**
     * Conditionally compile styles from an array into a style list.
     *
     * @param {Array|Object} array - The styles array/object
     * @returns {string}
     * @example
     * Arr.toCssStyles(['color: red', {'font-size: 14px': true}]);
     * // 'color: red; font-size: 14px;'
     */
    static toCssStyles(array) {
        const styleList = this.wrap(array);
        const styles = [];

        for (const item of styleList) {
            if (typeof item === 'string') {
                styles.push(item.endsWith(';') ? item : item + ';');
            } else if (typeof item === 'object') {
                for (const [style, condition] of Object.entries(item)) {
                    if (condition) {
                        styles.push(style.endsWith(';') ? style : style + ';');
                    }
                }
            }
        }

        return styles.join(' ');
    }

    /**
     * Filter the array using the given callback.
     *
     * @param {Array|Object} array - The array to filter
     * @param {Function} callback - Filter function (value, key) => boolean
     * @returns {Array|Object}
     * @example
     * Arr.where([1, 2, 3, 4], x => x > 2); // [3, 4]
     */
    static where(array, callback) {
        if (Array.isArray(array)) {
            return array.filter((value, index) => callback(value, index));
        }

        const result = {};
        for (const [key, value] of Object.entries(array)) {
            if (callback(value, key)) {
                result[key] = value;
            }
        }
        return result;
    }

    /**
     * Filter the array using the negation of the given callback.
     *
     * @param {Array|Object} array - The array to filter
     * @param {Function} callback - Filter function to negate
     * @returns {Array|Object}
     * @example
     * Arr.reject([1, 2, 3, 4], x => x > 2); // [1, 2]
     */
    static reject(array, callback) {
        return this.where(array, (value, key) => !callback(value, key));
    }

    /**
     * Partition the array into two arrays using the given callback.
     *
     * @param {Array} array - The array to partition
     * @param {Function} callback - Partition function (value, key) => boolean
     * @returns {Array} - [passed, failed]
     * @example
     * Arr.partition([1, 2, 3, 4], x => x % 2 === 0); // [[2, 4], [1, 3]]
     */
    static partition(array, callback) {
        const isArr = Array.isArray(array);
        const passed = isArr ? [] : {};
        const failed = isArr ? [] : {};

        if (isArr) {
            for (let i = 0; i < array.length; i++) {
                if (callback(array[i], i)) {
                    passed.push(array[i]);
                } else {
                    failed.push(array[i]);
                }
            }
        } else {
            for (const [key, value] of Object.entries(array)) {
                if (callback(value, key)) {
                    passed[key] = value;
                } else {
                    failed[key] = value;
                }
            }
        }

        return [passed, failed];
    }

    /**
     * Filter items where the value is not null.
     *
     * @param {Array|Object} array - The array to filter
     * @returns {Array|Object}
     * @example
     * Arr.whereNotNull([1, null, 2, undefined, 3]); // [1, 2, 3]
     */
    static whereNotNull(array) {
        return this.where(array, value => value !== null && value !== undefined);
    }

    /**
     * If the given value is not an array and not null, wrap it in one.
     *
     * @param {*} value - The value to wrap
     * @returns {Array}
     * @example
     * Arr.wrap('hello'); // ['hello']
     * Arr.wrap([1, 2]); // [1, 2]
     * Arr.wrap(null); // []
     */
    static wrap(value) {
        if (value === null || value === undefined) {
            return [];
        }

        return Array.isArray(value) ? value : [value];
    }

    /**
     * Get the underlying array of items from the given argument.
     * Converts various types to arrays (iterables, arrayables, objects).
     *
     * @param {*} items - The items to convert
     * @returns {Array}
     * @throws {Error} If items cannot be converted to array
     * @example
     * Arr.from([1, 2, 3]); // [1, 2, 3]
     * Arr.from(new Set([1, 2, 3])); // [1, 2, 3]
     * Arr.from('hello'); // throws Error
     */
    static from(items) {
        // Already an array
        if (Array.isArray(items)) {
            return items;
        }

        // Null or undefined
        if (items === null || items === undefined) {
            throw new Error('Items cannot be null or undefined.');
        }

        // Reject scalar values (string, number, boolean)
        if (typeof items === 'string' || typeof items === 'number' || typeof items === 'boolean') {
            throw new Error('Items cannot be represented by a scalar value.');
        }

        // Object with toArray method
        if (typeof items.toArray === 'function') {
            return items.toArray();
        }

        // Iterable (Set, Map, etc.) - but not strings (already rejected above)
        if (typeof items[Symbol.iterator] === 'function') {
            return Array.from(items);
        }

        // Plain object - convert to array of values
        if (typeof items === 'object') {
            return Object.values(items);
        }

        // Other scalar values cannot be converted
        throw new Error('Items cannot be represented by a scalar value.');
    }

    /**
     * Push items onto an array using "dot" notation.
     *
     * @param {Array|Object} array - The array to modify
     * @param {string|number|null} key - The key path (supports dot notation)
     * @param {...*} values - Values to push
     * @returns {Array|Object}
     * @example
     * const data = { products: { items: [1, 2] } };
     * Arr.push(data, 'products.items', 3, 4);
     * // { products: { items: [1, 2, 3, 4] } }
     */
    static push(array, key, ...values) {
        // Get the target array at the key path (or empty array if doesn't exist)
        const target = this.get(array, key, []);

        // Ensure target is an array
        if (!Array.isArray(target)) {
            throw new Error(`Cannot push to non-array value at key [${key}]`);
        }

        // Push new values
        target.push(...values);

        // Set it back
        this.set(array, key, target);

        return array;
    }

    /**
     * Get the sole item that passes a truth test, or throw if not exactly one.
     * Throws an error if no items or multiple items match.
     *
     * @param {Array} array - The array to search
     * @param {Function|null} callback - Optional callback function
     * @returns {*}
     * @throws {Error} If zero or multiple items found
     * @example
     * Arr.sole([1, 2, 3], x => x === 2); // 2
     * Arr.sole([1, 2, 3, 2], x => x === 2); // throws (multiple)
     * Arr.sole([1, 2, 3], x => x === 5); // throws (none found)
     */
    static sole(array, callback = null) {
        let filtered = array;

        // Apply callback filter if provided
        if (callback !== null) {
            filtered = this.where(array, callback);
        }

        const count = Array.isArray(filtered) ? filtered.length : Object.keys(filtered).length;

        // No items found
        if (count === 0) {
            throw new Error('Item not found.');
        }

        // Multiple items found
        if (count > 1) {
            throw new Error(`Multiple items found (${count} items).`);
        }

        // Return the sole item
        return this.first(filtered);
    }
}

export default Arr;
