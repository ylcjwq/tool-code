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
export const arrayLIS = (nums) => {
    if (nums.length === 0) return [];
    const temp = [[nums[0]]];
    for(let i =0;i<nums.length;i++) {
        const n = nums[i];
        _update(n)
    }
    return temp.at(-1);
    function _update(n) {
        for(let i =temp.length - 1; i>=0; i--) {
            const line = temp[i]
            const tail = line.at(-1);
            if(n>tail) {
                temp[i+1] = [...line,n];
                break;
            } else if(n<tail && i === 0) {
                temp[i] = [n];
            }
        }
    }
}

/**
 * 数组对象根据指定的元素去重（对比元素全部相同）
 * @param {Object[]} array 要去重的数组
 * @param {string[]} tags 要对比去重的元素
 * @returns {Object[]} 去重后的新数组
 */
export const removeSameObiect = (array, ...tags) => {
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

/**
 * 数组对象根据指定的元素去重（所有元素全部相同）
 * @param {Object[]} array 要去重的数组
 * @returns {Object[]} 去重后的新数组
 */
export const removeSameObjectAll = (array) => {
    const set = new Set();
    const uniqueObjects = [];
    for (const obj of array) {
        const objString = JSON.stringify(obj);
        if (!set.has(objString)) {
            set.add(objString);
            uniqueObjects.push(obj);
        }
    }
    return uniqueObjects;
}
