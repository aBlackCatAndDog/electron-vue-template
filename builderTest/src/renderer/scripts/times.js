/**
 * response 时间格式化
 * @param { Date } date 时间
 * @param { String } fmt 格式 'yy-MM-dd hh:mm:ss' 'yy/MM/dd hh:mm:ss' ...
 * @returns { String } 格式化之后的时间
 * @example formatDate(new Date('2018-06-04T11:28:45.000000+08:00'),'yy-MM-dd hh:mm:ss'); // -> 2018-06-04 11:28:45
 *          formatDate(new Date('2018-06-04T11:28:45.000000+08:00'),'yy-MM-dd'); // -> 2018-06-04
*/
export const formatDate = function(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

/**
 * 计算两个时间的差值
 * @param { Date } beginTime 开始时间
 * @param { Date } endTime 结束时间
 * @param { String } type 需要返回的结果类型，"d"：相差天数,"h"：相差天数+分钟数,"m"：相差天数+分钟数+秒数,"ms"：相差毫秒数
 * @returns { string/number } 返回开始时间与结束时间根据类型需要的差值
 * @example time_differ("2018-03-01","2018-04-01","d") // -> 31 31天0小时
 *          time_differ("2018-03-01","2018-04-01","h") // -> 31天0小时 
 *          time_differ("2018-03-01","2018-04-01","m") // -> 31天0小时0秒 
 *          time_differ("2018-03-01","2018-04-01","ms") // -> 2678400000
 */
export const time_differ = (beginTime, endTime, type) => {
  let begintime_ms = new Date(beginTime.replace(/-/g, "/")); //begintime 为开始时间
  let endtime_ms = new Date(endTime.replace(/-/g, "/")); // endtime 为结束时间
  let dateDiff = endtime_ms.getTime() - begintime_ms.getTime(); //时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  switch (type) {
    case "d":
      return Math.abs(dayDiff);
    case "h":
      return `${Math.abs(dayDiff)}天${Math.abs(hours)}小时`;
    case "m":
      return `${Math.abs(dayDiff)}天${Math.abs(hours)}小时${Math.abs(minutes)}秒`;
    case "ms":
      return Math.abs(dateDiff);
  }
};

/**
 * request 时间格式化为 iso-8601 带中国时区
 * @param { String/Date } 需要格式化的时间字符串/时间
 * @returns { String } 格式化之后的结果
 * @example toISOString("2018-04-01") // -> 2018-04-01T08:00:00.000000+08:00
 *          toISOString(new Date("2018-04-01")) // -> 2018-04-01T08:00:00.000000+08:00
*/

export const toISOString = function(time){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    var mi = Date.parse(new Date(time));
    var localISOTime = (new Date(mi - tzoffset)).toISOString().split(".")[0]+".000000+08:00";
    return localISOTime;
  }