/**
https://leetcode.com/problems/the-number-of-full-rounds-you-have-played/

You are participating in an online chess tournament. There is a chess round that starts every 15 minutes. The first round of the day starts at 00:00, and after every 15 minutes, a new round starts.

* For example, the second round starts at 00:15, the fourth round starts at 00:45, and the seventh round starts at 01:30.
You are given two strings loginTime and logoutTime where:

* loginTime is the time you will login to the game, and
* logoutTime is the time you will logout from the game.
If logoutTime is earlier than loginTime, this means you have played from loginTime to midnight and from midnight to logoutTime.

Return the number of full chess rounds you have played in the tournament.

Note: All the given times follow the 24-hour clock. That means the first round of the day starts at 00:00 and the last round of the day starts at 23:45.

 

Example 1:

Input: loginTime = "09:31", logoutTime = "10:14"
Output: 1
Explanation: You played one full round from 09:45 to 10:00.
You did not play the full round from 09:30 to 09:45 because you logged in at 09:31 after it began.
You did not play the full round from 10:00 to 10:15 because you logged out at 10:14 before it ended.
Example 2:

Input: loginTime = "21:30", logoutTime = "03:00"
Output: 22
Explanation: You played 10 full rounds from 21:30 to 00:00 and 12 full rounds from 00:00 to 03:00.
10 + 12 = 22.
 

Constraints:

* loginTime and logoutTime are in the format hh:mm.
* 00 <= hh <= 23
* 00 <= mm <= 59
* loginTime and logoutTime are not equal.
 */

/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
 var numberOfRounds = function(loginTime, logoutTime) {
  let answer = 0;
  const [loginHours, loginMinutes] = loginTime.split(':').map(time => +time);
  const [logoutHours, logoutMinutes] = logoutTime.split(':').map(time => +time);
  let hours = 0;
  let minutes = 0;
  
  if (loginHours < logoutHours || 
      loginHours === logoutHours && loginMinutes < logoutMinutes) {
      hours = logoutHours - loginHours;
  } else {
      hours = 24 - loginHours + logoutHours;
  }
  
  minutes = logoutMinutes - logoutMinutes % 15;
  // console.log(minutes)
  minutes -= loginMinutes + (loginMinutes % 15 === 0 ? 0 : 15 - loginMinutes % 15)
  // console.log(hours, minutes)
  
  answer = hours * 4 + minutes / 15;
  return answer < 0 ? 0 : answer;
};

// Minimum Runtime
/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
 function numberOfRounds(loginTime, logoutTime) {
  let start = 60 * Number(loginTime.substring(0, 2)) + Number(loginTime.substring(3));
  let finish = 60 * Number(logoutTime.substring(0, 2)) + Number(logoutTime.substring(3));
  if (start > finish) finish += 60 * 24;
  return Math.max(0, Math.floor(finish / 15) - Math.floor((start + 14) / 15));
}

// Minimum Memory
/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
 var numberOfRounds = function(loginTime, logoutTime) {
  function toMins(timeString){
      return timeString.slice(0,2)*60 + +timeString.slice(3);
  }
  loginTime = toMins(loginTime);
  logoutTime = toMins(logoutTime);
  if(logoutTime - loginTime)
  firstRoundIndex = Math.ceil(loginTime/15);
  firstRoundTime = 15*firstRoundIndex;
  if (logoutTime > loginTime && logoutTime < firstRoundTime + 15) return 0;
  lastRoundIndex = Math.floor(logoutTime/15) - 1;
  return (lastRoundIndex >= firstRoundIndex) ? lastRoundIndex - firstRoundIndex + 1 :
      96 - (firstRoundIndex - lastRoundIndex - 1);
};
