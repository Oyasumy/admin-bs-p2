"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dashboard = _interopRequireDefault(require("views/Dashboard.jsx"));

var _UserProfile = _interopRequireDefault(require("views/UserProfile.jsx"));

var _TableList = _interopRequireDefault(require("views/TableList.jsx"));

var _Typography = _interopRequireDefault(require("views/Typography.jsx"));

var _Icons = _interopRequireDefault(require("views/Icons.jsx"));

var _Maps = _interopRequireDefault(require("views/Maps.jsx"));

var _Notifications = _interopRequireDefault(require("views/Notifications.jsx"));

var _Upgrade = _interopRequireDefault(require("views/Upgrade.jsx"));

var _TableAuthor = _interopRequireDefault(require("views/Table/TableAuthor"));

var _TableCategory = _interopRequireDefault(require("views/Table/TableCategory"));

var _TableImage = _interopRequireDefault(require("views/Table/TableImage"));

var _TableProduct = _interopRequireDefault(require("views/Table/TableProduct"));

var _TableCustomer = _interopRequireDefault(require("views/Table/TableCustomer"));

var _TableOrder = _interopRequireDefault(require("views/Table/TableOrder"));

var _TableDiscount = _interopRequireDefault(require("views/Table/TableDiscount"));

var _TableShipCode = _interopRequireDefault(require("views/Table/TableShipCode"));

var _TableReport = _interopRequireDefault(require("views/Table/TableReport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dashboardRoutes = [{
  path: "/dashboard",
  name: "Dashboard",
  icon: "pe-7s-graph",
  component: _Dashboard.default,
  layout: "/admin"
}, {
  path: "/report",
  name: "Report",
  icon: "pe-7s-user",
  component: _TableReport.default,
  layout: "/admin"
}, // {
//   path: "/user",
//   name: "User Profile",
//   icon: "pe-7s-user",
//   component: UserProfile,
//   layout: "/admin",
// },
{
  path: "/author",
  name: "Author List",
  icon: "pe-7s-note2",
  component: _TableAuthor.default,
  layout: "/admin"
}, {
  path: "/category",
  name: "Category List",
  icon: "pe-7s-shuffle",
  component: _TableCategory.default,
  layout: "/admin"
}, {
  path: "/customer",
  name: "Customer List",
  icon: "pe-7s-user-female",
  component: _TableCustomer.default,
  layout: "/admin"
}, {
  path: "/product",
  name: "Product List",
  icon: "pe-7s-box1",
  component: _TableProduct.default,
  layout: "/admin"
}, {
  path: "/oder",
  name: "Oder List",
  icon: "pe-7s-piggy",
  component: _TableOrder.default,
  layout: "/admin"
}, {
  path: "/image",
  name: "Image List",
  icon: "pe-7s-photo",
  component: _TableImage.default,
  layout: "/admin"
}, {
  path: "/discount",
  name: "Discount List",
  icon: "pe-7s-cash",
  component: _TableDiscount.default,
  layout: "/admin"
}, {
  path: "/ship-code",
  name: "Ship Code List",
  icon: "pe-7s-car",
  component: _TableShipCode.default,
  layout: "/admin"
}, // {
//   path: "/typography",
//   name: "Typography",
//   icon: "pe-7s-news-paper",
//   component: Typography,
//   layout: "/admin",
// },
{
  path: "/icons",
  name: "Icons",
  icon: "pe-7s-science",
  component: _Icons.default,
  layout: "/admin"
}, {
  path: "/maps",
  name: "Maps",
  icon: "pe-7s-map-marker",
  component: _Maps.default,
  layout: "/admin"
}, {
  path: "/notifications",
  name: "Notifications",
  icon: "pe-7s-bell",
  component: _Notifications.default,
  layout: "/admin"
} // {
//   upgrade: true,
//   path: "/upgrade",
//   name: "Upgrade to PRO",
//   icon: "pe-7s-rocket",
//   component: Upgrade,
//   layout: "/admin",
// },
];
var _default = dashboardRoutes;
exports.default = _default;