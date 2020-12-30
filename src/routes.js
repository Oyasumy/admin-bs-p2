import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import TableAuthor from "views/Table/TableAuthor";
import TableCategory from "views/Table/TableCategory";
import TableImage from "views/Table/TableImage";
import TableProduct from "views/Table/TableProduct";
import TableCustomer from "views/Table/TableCustomer";
import TableOrder from "views/Table/TableOrder";
import TableDiscount from "views/Table/TableDiscount";
import TableShipCode from "views/Table/TableShipCode";
import TableReport from "views/Table/TableReport";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    icon: "pe-7s-user",
    component: TableReport,
    layout: "/admin",
  },
  // {
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
    component: TableAuthor,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category List",
    icon: "pe-7s-shuffle",
    component: TableCategory,
    layout: "/admin",
  },
  {
    path: "/customer",
    name: "Customer List",
    icon: "pe-7s-user-female",
    component: TableCustomer,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product List",
    icon: "pe-7s-box1",
    component: TableProduct,
    layout: "/admin",
  },
  {
    path: "/oder",
    name: "Oder List",
    icon: "pe-7s-piggy",
    component: TableOrder,
    layout: "/admin",
  },
  {
    path: "/image",
    name: "Image List",
    icon: "pe-7s-photo",
    component: TableImage,
    layout: "/admin",
  },
  {
    path: "/discount",
    name: "Discount List",
    icon: "pe-7s-cash",
    component: TableDiscount,
    layout: "/admin",
  },
  {
    path: "/ship-code",
    name: "Ship Code List",
    icon: "pe-7s-car",
    component: TableShipCode,
    layout: "/admin",
  },
  // {
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
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin",
  },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
