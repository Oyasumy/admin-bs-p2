"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeleteAuthor = exports.changeStateOrderApi = exports.getOrderDetail = exports.setCancelOrder = exports.getAllOrder = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _configRedux = require("constants/configRedux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var getAllOrder = function getAllOrder() {
  var result;
  return regeneratorRuntime.async(function getAllOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios.default.get("".concat(_configRedux.API_URL, "/oder"), {
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
}; // Cancel order


exports.getAllOrder = getAllOrder;

var setCancelOrder = function setCancelOrder(data) {
  var result;
  return regeneratorRuntime.async(function setCancelOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/oder/cancel-order"), data, {
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
}; // Get detail order with Order ID


exports.setCancelOrder = setCancelOrder;

var getOrderDetail = function getOrderDetail(data) {
  var result;
  return regeneratorRuntime.async(function getOrderDetail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/oder/get-detail-order"), {
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
          return _context3.abrupt("return", result);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Change state order


exports.getOrderDetail = getOrderDetail;

var changeStateOrderApi = function changeStateOrderApi(data) {
  var result;
  return regeneratorRuntime.async(function changeStateOrderApi$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/oder/change-state-order"), data, {
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


exports.changeStateOrderApi = changeStateOrderApi;

var getDeleteAuthor = function getDeleteAuthor(data) {
  var result;
  return regeneratorRuntime.async(function getDeleteAuthor$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          console.log(data);
          _context5.next = 4;
          return regeneratorRuntime.awrap(_axios.default.post("".concat(_configRedux.API_URL, "/authors/delete"), {
            data: data
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

        case 4:
          return _context5.abrupt("return", result);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getDeleteAuthor = getDeleteAuthor;