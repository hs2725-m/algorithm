/**
https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/

Given an array of integers arr, return true if we can partition the array into three non-empty parts with equal sums.

Formally, we can partition the array if we can find indexes i + 1 < j with (arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... + arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1])

 

Example 1:

Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1
Example 2:

Input: arr = [0,2,1,-6,6,7,9,-1,2,0,1]
Output: false
Example 3:

Input: arr = [3,3,6,5,-2,2,5,1,-9,4]
Output: true
Explanation: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4
 

Constraints:
 * 3 <= arr.length <= 5 * 104
 * -104 <= arr[i] <= 104
 */

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function (arr) {
  const n = arr.reduce((acc, cur) => acc + cur, 0) / 3;

  if (!Number.isInteger(n)) return false;

  let a = arr.shift();
  let b = 0;
  let c = arr.pop();

  while (arr.length && a !== n) {
    a += arr.shift();
  }

  while (arr.length && c !== n) {
    c += arr.pop();
  }

  if (!arr.length) return false;

  b = arr.reduce((acc, cur) => acc + cur, 0);

  return a === b && b === c;
};

// Minimum Runtime
/**
 * @param {number[]} arr
 * @return {boolean}
 */

var canThreePartsEqualSum = function (arr) {
  let sum = arr.reduce((pr, cr) => pr + cr);
  let sum1 = 0,
    n = 3;

  for (let i = 0; i < arr.length; i++) {
    sum1 += arr[i];
    if (sum1 * 3 === sum) {
      n--;
      sum1 = 0;
    }
  }
  return n <= 0;
};

// Minimum Memory
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function (arr) {
  let equalSum = arr.reduce((total, num) => total + num);
  if (equalSum % 3 !== 0) return false;
  equalSum /= 3;

  let sum = 0,
    count = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum === equalSum) {
      count++;
      sum = 0;
    }
  }

  return count >= 3 ? true : false;
};
