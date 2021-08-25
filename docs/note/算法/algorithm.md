
# 算法

## Two sum

#### Example 1:
```js
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

#### Example 2:
```js
Input: nums = [3,2,4], target = 6
Output: [1,2]

```

## 答案
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]==target){
                return [i,j];   
           }
        }
    }
};
```

## Palindrome Number(回文数)

#### Example 1:
```js
Input: x = 121
Output: true
```

#### Example 2:
```js
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

#### Example 3:
```js
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

### 答案
```js
方法一:
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0) return false;
    let str = ''+x;
    return Array.from(str).reverse().join('') === str;
};

方法二:
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let str = ''+x;
    let newStr = '';
    for(let i=str.length-1;i>=0;i--){
        newStr += str[i];
    }
    return newStr === str;
};
```

## 罗马到整数
```js
罗马数字是由七个不同的符号表示:I, V, X, L, C, D and M.
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

### Example1
```js
Input: s = "III"
Output: 3
```

### Example2
```js
Input: s = "IV"
Output: 4
```

### Example3
```js
Input: s = "IX"
Output: 9
```

### Example4
```js
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

### Example4
```js
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

限制条件:
- 1 <= s.length <= 15
- s仅包含字符('I', 'V', 'X', 'L', 'C', 'D', 'M')。
- 据保证的是s在上述范围内的有效罗马数字[1, 3999]。 


### 解答
```js
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    let num = 0;
    for(let i = 0;i<s.length;i++){
        let currentValue = map[s[i]],nextValue = map[s[i+1]];
        if(currentValue<nextValue){
            num -= currentValue;    
        }else{
            num += currentValue;    
        }
    }
    return num;
};
```

## 最长的公共前缀
编写一个函数以在字符串数组中找到最长的公共前缀字符串。

如果没有公共前缀，则返回一个空字符串""。

### Example1
```js
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

### Example2
```js
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

### 约束条件
- 0 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i]仅包含小写英文字母.


### 解答
```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(!strs.length) return 0;
    strs.sort((a,b)=>a.length-b.length);
    let firstValue = strs[0];//拿排序后的第一位去和数组里面的字符串比较
    for(let i=0;i<firstValue.length;i++){
        for(let s of strs){
            if(s[i]!==firstValue[i]){
                 return s.slice(0,i) ;
             }
        }
    }
    
    return strs[0];
};
```

## 合并两个排序列表
合并两个排序的链表，并将其作为新的排序表返回。应通过将前两个列表的节点拼接在一起来创建新列表。
```js
示例一:
输入： l1 = [1,2,4]，l2 = [1,3,4]
输出： [1,1,2,3,4,4]
示例二:
输入： l1 = []，l2 = []
输出： []
示例三:
输入： l1 = []，l2 = [0]
输出： [0]
```

编程:
```js
var mergeTwoLists = function(l1, l2) {
    let ans = (now = new ListNode(0));
    while(l1!=null&&l2!=null){
        if(l1.val<l2.val){
            now.next = l1;
            l1 = l1.next;
        }else{
            now.next=l2;
            l2 = l2.next;
        }
        now = now.next;
    }
    if(l1==null){
        now.next = l2;
    }else{
        now.next = l1;
    }
    return ans.next;
}
```


## 从排序列表中删除重复项
给定一个已排序的链表，删除所有重复项，使每个元素仅出现一次。
```js
实例1:
输入： 1-> 1-> 2
输出： 1-> 2
实例2：
输入： 1-> 1-> 2-> 3-> 3
输出： 1-> 2-> 3
```
编程:
```js
var deleteDuplicates = function(head) {
    if(!head) return null;
    let pre = head,next = head.next;
    while(next){
        if(pre.val===next.val){
            pre.next = next.next;
        }else{
            pre = pre.next;
        }
        next = next.next;
    }
    return head;
}
```

## 距离相等的条形码 
```js
在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]。

请你重新排列这些条形码，使其中两个相邻的条形码 不能 相等。 你可以返回任何满足该要求的答案，此题保证存在答案。

示例 1：

输入：[1,1,1,2,2,2]
输出：[2,1,2,1,2,1]
示例 2：

输入：[1,1,1,1,2,2,3,3]
输出：[1,3,1,3,2,1,2,1]
 

提示：

1 <= barcodes.length <= 10000
1 <= barcodes[i] <= 10000
 
 var rearrangeBarcodes = function(barcodes){
    const barObj = {};
    for(let i=0;i<barcodes.length;i++){
        const barcode = barcodes[i];
        //统计同一个字符出现次数
        barObj[barcode] = (barObj[barcode]||0)+1;
    }
    const arr = Object.keys(barObj).map(a=>[Number(a),barObj[a]]);
    arr.sort((a,b)=>a[1]-b[1]);
    const result = Array.from(barcodes.length);
    let i=0;
    while(arr.length){
        //取出一组数据 barcode 字符 count次数
        let [barcode,count] = arr.pop();
        while(count-- > 0){
            if(i>=barcodes.length) i=1;

            result[i] = barcode;

            i+=2;
        }
    }
    return result;
}
console.log(rearrangeBarcodes([1,3,2,1]));
```

