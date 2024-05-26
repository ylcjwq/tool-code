/**
 * 取任意两数中的一个随机整数
 * @param {number} n1 第一个数
 * @param {number} n2 第二个数
 * @returns {number} 一个随机整数
 */
export function randomNum(n1, n2) {
    const max = n1 > n2 ? n1 : n2;
    const min = n1 < n2 ? n1 : n2;
    return parseInt(Math.random() * (max - min + 1) + min);
}

/**
 * 返回从start累加到end的结果
 * @param {number} start 累加开始的数
 * @param {number} end   累加结束的数
 * @param {number} step  步长
 * @returns {number}   累加后的结果
 */
export const accumulate = (start,end, step = 1) => {
    // 计算项数
    const numberOfTerms = Math.floor((end - start) / step) + 1;
    // 等差数列求和公式
    return (start + end) * numberOfTerms / 2;
}