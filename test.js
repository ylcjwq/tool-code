/**
 * 返回数组中第一个大于等于target的数的下标，如果不存在，则返回数组的长度
 * @param nums 数组
 * @param target 指定的数
 * @returns {number} 第一个大于等于target的数的下标
 */
function binarySearchLeft(nums, target) {
    // 二分范围（left,right）
    let left = -1, right = nums.length;
    while (left + 1 < right) {
        // 循环不变量 nums[left] < target nums[right] >= target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] <= target) {
            // 更新二分区间为左区间
            left = mid;
        } else {
            // 更新二分区间为右区间
            right = mid;
        }
    }
    // 此时left = right - 1  nums[right] >= target
    return left;
}

console.log(binarySearchLeft([8,8,8,8,9,9,9,11,56],7))