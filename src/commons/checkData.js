const xss = require("xss");

// Check Xss
const checkXss = (source) => {
  if (source===0) return true;
  if (!source){
    return false
  }
  var html = xss(source, {
    whiteList: ["-"], // empty, means filter out all tags
    stripIgnoreTag: true, // filter out all HTML not in the whitelist
    stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
  });
  // console.log("s",source);
  // console.log("h",html);
  if ((source.toString() === html) === false) {
    return false;
  }
  return true;
};

const main = (arrayData) => {
  var result = true;
  arrayData.map((item) => {
    // console.log("item",item);
    if (checkXss(item) === false) {
      result = false;
    }
  });
  // console.log("re",result);
  return result;
};

module.exports.checkXss = checkXss;
module.exports.main = main;
