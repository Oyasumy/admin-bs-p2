"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _loading = _interopRequireDefault(require("./loading"));

var _author = _interopRequireDefault(require("./author"));

var _category = _interopRequireDefault(require("./category"));

var _image = _interopRequireDefault(require("./image"));

var _product = _interopRequireDefault(require("./product"));

var _customer = _interopRequireDefault(require("./customer"));

var _order = _interopRequireDefault(require("./order"));

var _discount = _interopRequireDefault(require("./discount"));

var _shipCode = _interopRequireDefault(require("./shipCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myReducer = (0, _redux.combineReducers)({
  loading: _loading.default,
  authorList: _author.default,
  categoryList: _category.default,
  imageList: _image.default,
  productList: _product.default,
  customerList: _customer.default,
  orderList: _order.default,
  discountList: _discount.default,
  shipCodeList: _shipCode.default
});
var _default = myReducer;
exports.default = _default;