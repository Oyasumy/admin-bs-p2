"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerProduct = exports.headerShipCode = exports.headerDiscount = exports.headerReport = exports.headerOrder = exports.headerCustomer = exports.headerCategory = exports.headerAuthor = void 0;
var headerAuthor = ["STT", "ID", "Name Author", "Edit", "Delete"];
exports.headerAuthor = headerAuthor;
var headerCategory = ["STT", "ID", "Name Category", "Edit", "Delete"];
exports.headerCategory = headerCategory;
var headerCustomer = ["STT", "ID", "Name Customer", "Phone", "Email", "Address", "Password", "Edit", "Delete"];
exports.headerCustomer = headerCustomer;
var headerOrder = ["STT", "ID", "Date", "State", "Payment method", "Sub Total", "Total", "Type Customer", "Cancel"];
exports.headerOrder = headerOrder;
var headerReport = ["STT", "ID", "Date", "State", "Payment method", "Sub Total", "Total", "Type Customer"];
exports.headerReport = headerReport;
var headerDiscount = ["STT", "ID", "Date Start", "Date End", "Code", "Percent"];
exports.headerDiscount = headerDiscount;
var headerShipCode = ["STT", "ID", "Place", "Price"];
exports.headerShipCode = headerShipCode;
var headerProduct = ["STT", "ID", "Name Product", "Price", "Description", "Name Author", "Name Category", "Images", "Edit", "Delete"];
exports.headerProduct = headerProduct;