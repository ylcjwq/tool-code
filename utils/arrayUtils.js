/**
 * 返回数组中最小的数
 * @param {(number|string)[]} nums 需要查找的数组
 * @returns {number} 最小的数字
 */
export function minNumber(nums) {
    nums.sort((a, b) => a - b)
    return Number(nums[0])
}

/**
 * 返回数组中最大的数
 * @param {(number|string)[]} nums 需要查找的数组
 * @returns {number} 最大的数字
 */
export function maxNumber(nums) {
    nums.sort((a, b) => b - a)
    return Number(nums[0])
}

/**
 * 返回数组中第一个大于等于target的数的下标，如果不存在，则返回数组的长度
 * @param nums 数组
 * @param target 指定的数
 * @returns {number} 第一个大于等于target的数的下标
 */
export function lowerBound(nums, target) {
    // 二分范围（left,rght）
    let left = -1, right = nums.length;
    while (left + 1 < right) {
        // 循环不变量 nums[left] < target nums[right] >= target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            // 更新二分区间为左区间
            right = mid;
        } else {
            // 更新二分区间为右区间
            left = mid;
        }
    }
    // 此时left = right - 1  nums[right] >= target
    return right;
}

/**
 * 最大递增子序列算法
 * @param nums 要计算的数组
 * @returns {number|string[]} 最大递增子序列
 * @constructor
 */
export const LIS = (nums) => {
    if (nums.length === 0) return [];
    const temp = [[nums[0]]];
    for(let i =0;i<nums.length;i++) {
        const n = nums[i];
        _updata(n)
    }
    return temp.at(-1);
    function _updata(n) {
        for(let i =temp.length - 1; i>=0; i--) {
            const line = temp[i]
            const tail = line.at(-1);
            if(n>tail) {
                temp[i+1] = [...line,n];
                break;
            } else if(n<tail && i === 0) {
                temp[i] = n;
            }
        }
    }
}

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
 * 数组对象根据指定的元素去重（对比元素全部相同）
 * @param {Object[]} array 要去重的数组
 * @param {string[]} tags 要对比去重的元素
 * @returns {Object[]} 去重后的新数组
 */
export const deleteSameObiect = (array, ...tags) => {
    const map = new Map();
    return array.filter(item => {
        const key = tags.map(tag => item[tag]).join('|');
        if (!map.has(key)) {
            map.set(key, item);
            return true
        }
        return false
    })
}
