/**
 * LRU缓存置换算法（维护定长空间，永远删除最久未使用）
 * @param {number} len 空间长度
 * @constructor
 */
export function LRUCache (len) {
    this.map = new Map();
    this.length = len;
}
/**
 * 检查缓存中是否存在指定键
 * @param {string|number} key 要检查的键
 * @returns {boolean} 如果键存在于缓存中，则返回 true，否则返回 false
 */
LRUCache.prototype.has = function (key) {
    return this.map.has(key);
}
/**
 * 获取指定键的值，并将其标记为最近使用
 * @param {string|number} key 要获取值的键
 * @returns {any} 如果缓存中存在该键，则返回对应的值，否则返回 null
 */
LRUCache.prototype.get = function (key) {
    if (!this.has(key)) return null;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key,value);
    return value;
}
/**
 * 设置指定键的值，并根据缓存长度进行必要的置换
 * @param {string|number} key 要设置值的键
 * @param {any} value 要设置的值
 */
LRUCache.prototype.set = function (key,value) {
    if (this.has(key)) {
        this.map.delete(key);
    }
    this.map.set(key,value);
    if(this.map.size > this.length) {
        this.map.delete(this.map.keys().next().value);
    }
}
/**
 * 返回当前缓存中所存储的对象
 * @returns {{[p: string]: any}}
 */
LRUCache.prototype.toObject = function () {
    return Object.fromEntries(this.map);
}