"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeleteDiscount = exports.getEditDiscount = exports.getAddDiscount = exports.getAllDiscount = exports.getDiscountWithID = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _configRedux = require("constants/configRedux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var getDiscountWithID = function getDiscountWithID(data) {
  var result;
  return regeneratorRuntime.async(function getDiscountWithID$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/discounts/get-discount"), {
            id: data
          }, {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          }).catch(function (err) {
            console.log(err);
          }));

        case 3:
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // get all Discount


exports.getDiscountWithID = getDiscountWithID;

var getAllDiscount = function getAllDiscount() {
  var result;
  return regeneratorRuntime.async(function getAllDiscount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios.default.get("".concat(_configRedux.API_URL, "/discounts"), {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          }).catch(function (err) {
            console.log(err);
          }));

        case 3:
          return _context2.abrupt("return", result);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Add Author


exports.getAllDiscount = getAllDiscount;

var getAddDiscount = function getAddDiscount(data) {
  var result;
  return regeneratorRuntime.async(function getAddDiscount$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/discounts/post"), data, {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          }).catch(function (err) {
            console.log(err);
          }));

        case 3:
          return _context3.abrupt("return", result);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Edit Discount


exports.getAddDiscount = getAddDiscount;

var getEditDiscount = function getEditDiscount(data) {
  var result;
  return regeneratorRuntime.async(function getEditDiscount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios.default.put("".concat(_configRedux.API_URL, "/discounts/update"), data, {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          }).catch(function (err) {
            console.log(err);
          }));

        case 3:
          return _context4.abrupt("return", result);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Delete Author


exports.getEditDiscount = getEditDiscount;

var getDeleteDiscount = function getDeleteDiscount(data) {
  var result;
  return regeneratorRuntime.async(function getDeleteDiscount$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          console.log(data);
          _context5.next = 4;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/discounts/delete"), data, {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          }).catch(function (err) {
            console.log(err);
          }));

        case 4:
          return _context5.abrupt("return", result);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getDeleteDiscount = getDeleteDiscount;