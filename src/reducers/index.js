import { combineReducers } from "redux";
import loading from "./loading";
import authorList from "./author";
import categoryList from "./category";
import imageList from "./image";
import productList from "./product";
import customerList from "./customer";
import orderList from "./order";
import discountList from "./discount";
import shipCodeList from "./shipCode";
const myReducer = combineReducers({
  loading,
  authorList,
  categoryList,
  imageList,
  productList,
  customerList,
  orderList,
  discountList,
  shipCodeList,
});
export default myReducer;
