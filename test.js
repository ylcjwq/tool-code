const LIS = (nums) => {
    if (nums.length === 0) return [];
    const temp = [[nums[0]]];
    for(let i =1;i<nums.length;i++) {
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
console.log(LIS([10,8,5,4]))