import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm, Segment, Image, Container, Grid as GridS, Message, TextArea, Select } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerReport } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getAllOrder, setCancelOrder, getOrderDetail, changeStateOrderApi } from "apis/apiOrder";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionOrder from "../../actions/actionOrder";
import { main } from "commons/checkData.js";
import { getEditAuthor } from "apis/apiAuthor.js";
import { getAddAuthor } from "apis/apiAuthor.js";
import { getInfoCustomer, getInfoGuest } from "apis/apiCustomer.js";
import { getDiscountWithID } from "apis/apiDiscount.js";
import moment from "moment";
import vi from "moment/locale/vi";
import { getShipCodeWithID } from "apis/apiShipCode.js";
// import { DateRangePicker } from "react-nice-dates";

// Date time
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { parseISO } from "date-fns";

const TableReport = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, orders } = props;
  const { handleSetOrder, handleSetLoad, handleEditAuthor, handleAddAuthor, handleDeleteAuthor } = props.actionOrder;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  // State date time
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // New Order sort with date time
  const [newOrderList, setNewOrderList] = useState(orders);

  // Sort by State Order
  const [sortByState, setSortByState] = useState("all");
  const [tempDataBeforeSortState, setTempDataBeforeSortState] = useState(newOrderList);

  // Sort by Method Payment
  const [sortByMethodPayment, setSortByMethodPayment] = useState("all");
  const [tempDataBeforeSortMethodPayment, setTempDataBeforeSortMethodPayment] = useState(tempDataBeforeSortState);

  // State Total Price
  const [totalPrice, setTotalPrice] = useState(0);

  // State Sort State
  const countryOptions = [
    { key: "1", value: "all", text: "all" },
    { key: "2", value: "pending", text: "pending" },
    { key: "3", value: "cancel", text: "cancel" },
    { key: "4", value: "done", text: "done" },
    { key: "5", value: "shipping", text: "shipping" },
  ];
  // State Sort Method Payment
  const methodOptions = [
    { key: "1", value: "all", text: "all" },
    { key: "2", value: "cash", text: "cash" },
    { key: "3", value: "card", text: "card" },
  ];

  // console.log(isLoading, orders);
  // console.log("ac",actionOrder);

  useEffect(() => {
    console.log("author ,", orders);
    loadData();
  }, []);

  // Sort by State Order
  useEffect(() => {
    var newData = [];
    if (sortByState === "all") {
      setTempDataBeforeSortState(newOrderList);
    } else if (sortByState === "done") {
      newData = newOrderList.filter((m) => m.trangthai === "done");
      setTempDataBeforeSortState(newData);
    } else if (sortByState === "cancel") {
      newData = newOrderList.filter((m) => m.trangthai === "cancel");
      setTempDataBeforeSortState(newData);
    } else if (sortByState === "shipping") {
      newData = newOrderList.filter((m) => m.trangthai === "shipping");
      setTempDataBeforeSortState(newData);
    } else if (sortByState === "pending") {
      newData = newOrderList.filter((m) => m.trangthai === "pending");
      setTempDataBeforeSortState(newData);
    }
  }, [sortByState, newOrderList]);

  // Sort by Method
  useEffect(() => {
    var newData = [];
    if (sortByMethodPayment === "all") {
      setTempDataBeforeSortMethodPayment(tempDataBeforeSortState);
    } else if (sortByMethodPayment === "cash") {
      newData = tempDataBeforeSortState.filter((m) => m.phuongthucthanhtoan === "cash");
      setTempDataBeforeSortMethodPayment(newData);
    } else if (sortByMethodPayment === "card") {
      newData = tempDataBeforeSortState.filter((m) => m.phuongthucthanhtoan === "card");
      // console.log("new",newData);
      setTempDataBeforeSortMethodPayment(newData);
    }
  }, [sortByMethodPayment, tempDataBeforeSortState]);

  // Sort data with date time
  useEffect(() => {
    if (startDate && endDate) {
      const newOrder = orders.filter((m) => moment(m.ngaydat).isAfter(startDate) && moment(m.ngaydat).isBefore(endDate));
      setNewOrderList(newOrder);
    } else {
      setNewOrderList(orders);
    }
  }, [startDate, endDate, orders]);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(tempDataBeforeSortMethodPayment.length / postPage));
  }, [tempDataBeforeSortMethodPayment, pageNumber, postPage]);

  const loadData = async () => {
    await getAllOrder()
      .then((res) => {
        console.log("rs", res);
        if (res.result.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetOrder(res.result);
        }
      })
      .then(() => {
        // Set load false]
        handleSetLoad(false);
        // show notification success
        ref.current.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              Success <b>Load data</b> - mew mew.
            </div>
          ),
          level: "info",
          position: "tr",
          autoDismiss: 5,
        });
      })
      .catch((err) => {
        console.log("err", err);
        handleSetLoad(false);
        // show notification failed
        ref.current.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              Failed <b>Load</b> - mew mew.
            </div>
          ),
          level: "warning",
          position: "tr",
          autoDismiss: 5,
        });
      });
  };

  // Set current page
  const handlePagination = (data) => {
    setCurrentPage(data.activePage);
  };

  // Update Total Price
  useEffect(() => {
    if (tempDataBeforeSortMethodPayment.length > 0) {
      var total = 0;
      tempDataBeforeSortMethodPayment.forEach((element) => {
        total += element.tongtienthu;
      });
      setTotalPrice(total);
    }else{
      setTotalPrice(0);

    }
  }, [tempDataBeforeSortMethodPayment]);
  // Change State order
  const Api = async (prop) => {
    console.log(prop);
    // setShowModal(true);
    var newRes = { order: prop };
    // get detail order
    await getOrderDetail(prop.idoder)
      .then((res) => {
        if (res.msg === "ok") {
          newRes = { ...newRes, detail: res.result };
        }
      })
      .then(async () => {
        // Get  fee ship code
        if (prop.idShipcode) {
          await getShipCodeWithID(prop.idShipcode)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, shipcode: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        }
      })
      .then(async () => {
        // Get  Discount
        if (prop.idDisscount) {
          await getDiscountWithID(prop.idDisscount)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, discount: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        }
      })
      .then(async () => {
        // Get  customer information
        if (prop.idCustomer) {
          await getInfoCustomer(prop.idCustomer)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, customer: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        } else {
          // Get  guest information
          await getInfoGuest(prop.idCustomerStrange)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, customer: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        }
      })
      .then(() => {
        setShowModal(true);
        setDataEdit(newRes);
      })
      .catch((er) => {
        console.log("er", er);
      });
  };

  var product = [...tempDataBeforeSortMethodPayment];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = product.splice(indexOfFirstPost, postPage);

  return (
    <div className="content">
      <NotificationSystem ref={ref} style={style} />
      <ModelShow title={title} isShow={showModal} onCancelData={() => setShowModal(false)} dataEdit={dataEdit} />
      <Grid fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {/* Select Date */}
              <div>
                <h3>Select Date</h3>
                <DateRangePicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} minimumLength={1} format="dd MMM yyyy" locale={enGB}>
                  {/* <DateRangePicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} minimumDate={new Date()} minimumLength={1} format="dd MMM yyyy" locale={enGB}> */}
                  {({ startDateInputProps, endDateInputProps, focus }) => (
                    <div className="date-range">
                      <input className={"input input-date-time" + (focus === START_DATE ? " -focused" : "")} {...startDateInputProps} placeholder="Start date" />
                      <span className="date-range_arrow" />
                      <input style={{ marginLeft: "20px" }} className={"input input-date-time" + (focus === END_DATE ? " -focused" : "")} {...endDateInputProps} placeholder="End date" />
                    </div>
                  )}
                </DateRangePicker>
              </div>

              {/* Select State */}
              <div>
                <h3>Select Sate</h3>
                <Select style={{ height: "fit-content" }} placeholder="Select your State" options={countryOptions} value={sortByState} onChange={(e, { value }) => setSortByState(value)} />
              </div>

              {/*  Select Method Payment */}
              <div>
                <h3>Select Method Payment</h3>
                <Select style={{ height: "fit-content" }} placeholder="Select your method" options={methodOptions} value={sortByMethodPayment} onChange={(e, { value }) => setSortByMethodPayment(value)} />
              </div>
            </div>

            <Card
              title="Striped Table with Hover"
              category="Here is a subtitle for this table"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {headerReport.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tempDataBeforeSortMethodPayment.length > 0
                      ? currentPost.map((prop, key) => {
                          const color = prop.idCustomer ? "teal" : "gray";
                          var dis = true;
                          var colorTT = "gray";
                          var nameBut = "Approve";
                          if (prop.trangthai === "pending") {
                            dis = false;
                          } else if (prop.trangthai === "approve") {
                            colorTT = "orange";
                            nameBut = "Ship";
                          } else if (prop.trangthai === "shipping") {
                            colorTT = "violet";
                            nameBut = "Done";
                          } else if (prop.trangthai === "cancel") {
                            colorTT = "red";
                            nameBut = "Show Detail";
                          } else {
                            colorTT = "teal";
                          }
                          // parse date time
                          const newDate = moment(prop.ngaydat).locale("vi", vi).format("MMMM Do YYYY, h:mm:ss a");
                          return (
                            <tr key={key} onClick={() => Api(prop)}>
                              <td>{key}</td>
                              <td>{prop.idoder}</td>
                              <td>{newDate}</td>
                              <td>
                                <Label color={colorTT}>{prop.trangthai}</Label>
                              </td>
                              <td>
                                <Label color={prop.phuongthucthanhtoan === "cash" ? "yellow" : "olive"}>{prop.phuongthucthanhtoan}</Label>
                              </td>
                              <td>{prop.tongtiendonhang}</td>
                              <td>{prop.tongtienthu}</td>
                              <td>
                                <Label color={color}>{prop.idCustomer ? "Customer" : "Guess"}</Label>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              }
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size="massive" color="blue">
                Total : ${totalPrice.toFixed(3)}
              </Label>
              <Pagination defaultActivePage={currentPage} pointing secondary totalPages={pageNumber} onPageChange={(e, d) => handlePagination(d)} style={{ float: "right" }} />
            </div>
            {/* <Button bsStyle="danger" fill type="submit" onClick={() => AddData()}>
              Add
            </Button> */}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
  orders: state.orderList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionOrder: bindActionCreators({ ...actionOrder }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableReport);

const ModelShow = ({ isShow, onCancelData, dataEdit }) => {
  // const [state, setState] = useState({ name: "", id: -1 });
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  // Check data Edit
  // console.log("ed", dataEdit.idreceiver);

  useEffect(() => {
    if (dataEdit.order) {
      if (dataEdit.order.trangthai !== "cancel") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(true);
    }
  }, [dataEdit]);
  // function
  // Cancel
  const onCancel = () => {
    onCancelData();
  };

  // component
  const showProduct = (prop, ship) => {
    // console.log("p", ship);
    var result = null;
    result = prop.map((pro, i) => {
      return (
        <GridS.Row key={i} style={{ marginLeft: "5%" }}>
          <Segment>
            <Label as="a" color="red" ribbon>
              Name Product: {pro.NameProduct}
            </Label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", overflow: "hidden" }}>
              <Image src={pro.url || pro[0].url} style={{ width: "50px" }} />
              <Label color="blue">
                <span>Name Author: {pro.NameAuthor} </span>
              </Label>
              <Label color="red">
                <span>Quantity: {pro.quantity} </span>
              </Label>
              <Label color="brown">
                <span>Price: {pro.PriceProduct} </span>
              </Label>
              <Label color="brown">
                <span>Total: {pro.PriceProduct * pro.quantity} $ </span>
              </Label>
            </div>
          </Segment>
        </GridS.Row>
      );
    });
    return result;
  };

  // Show information Receiver
  const showReceiver = (data) => {
    // console.log("ok", data);
    var result = null;
    if (data.idreceiver) {
      result = (
        <Table style={{ marginTop: "2em" }}>
          <thead>
            <tr>
              <th>Name Receiver</th>
              <th>Phone Receiver</th>
              <th>Address Receiver</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{data.address}</td>
            </tr>
          </tbody>
        </Table>
      );
    }

    return result;
  };
  return (
    <Modal dimmer="blurring" open={isShow} onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>Detail Order!!</Modal.Header>
      <Modal.Content>
        {/* Products */}
        <Container>
          {/* Show Customer */}
          <h3>Information Customer!!</h3>
          <GridS columns="equal">
            {dataEdit.customer ? (
              <Segment style={{}}>
                <Label color="grey">
                  <span>Name Customer: {dataEdit.customer.NameCustomer || dataEdit.customer.name} </span>
                </Label>
                <Label color="grey">
                  <span>Phone Customer: {dataEdit.customer.PhoneCustomer || dataEdit.customer.phone} </span>
                </Label>
                <Label color="grey">
                  <span>Email Customer: {dataEdit.customer.EmailCustomer || dataEdit.customer.email} </span>
                </Label>
                <Label color="grey" style={{ marginTop: "5px" }}>
                  <span>Address Customer: {dataEdit.customer.AddressCustomer || dataEdit.customer.address} </span>
                </Label>
                <Label color="violet" style={{ marginTop: "5px" }}>
                  <span>
                    Date Order:{" "}
                    {dataEdit.order
                      ? moment(dataEdit.order.ngaydat || "")
                          .locale("vi", vi)
                          .format("MMMM Do YYYY, h:mm:ss a")
                      : ""}{" "}
                  </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </GridS>
          {/* Show Ship code */}

          {/* Show Information Receiver */}
          <Container>{dataEdit.order ? showReceiver(dataEdit.order) : null}</Container>

          {/* Show list product */}
          <h3>List Order!!</h3>
          <GridS columns="equal">{dataEdit.detail ? showProduct(dataEdit.detail, dataEdit.shipcode) : ""}</GridS>

          {/* Show Ship Code */}
          <Container columns="equal">
            {dataEdit.shipcode ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="grey">
                  <span>Ship Code fee: {dataEdit.shipcode.cost} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>

          {/* Show Discount */}
          <Container columns="equal" style={{ marginTop: "5px" }}>
            {dataEdit.discount ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="purple">
                  <span>Discount percent: {dataEdit.discount.percent} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>
          {/* Total cost */}
          <Container columns="equal" style={{ marginTop: "5px" }}>
            {dataEdit.order ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="orange">
                  <span>Total Cost: {dataEdit.order.tongtienthu} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>
        </Container>
        {/* Cancel order  */}
        {dataEdit.order ? (
          dataEdit.order.cancel ? (
            <Container style={{ marginTop: "5px" }}>
              <Message warning>
                <h3>The order was canceled!</h3>
                <p>{dataEdit.order.cancel}.</p>
              </Message>
            </Container>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic negative onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
