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
 * 数组对象根据指定的元素去重
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
