"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLoginAdmin = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _configRedux = require("constants/configRedux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var checkLoginAdmin = function checkLoginAdmin() {
  var result;
  return regeneratorRuntime.async(function checkLoginAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("x-key",process.env.X_API_KEY);
          result = null;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_configRedux.API_URL, "/admin/check-login"), {
            headers: {
              "x-api-key": "mewmew"
            }
          }).then(function (res) {
            // console.log("res",res);
            if (res.status === 200) {
              result = res.data;
            }
          })["catch"](function (err) {
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
};

exports.checkLoginAdmin = checkLoginAdmin;