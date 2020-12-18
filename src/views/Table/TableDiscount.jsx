import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm, Container } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerDiscount } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionDiscount from "../../actions/actionDiscount";
import { main } from "commons/checkData.js";
import { getAllCategory, getAddCategory, getDeleteCategory } from "apis/apiCategory.js";
import { getAllDiscount, getAddDiscount, getEditDiscount, getDeleteDiscount } from "apis/apiDiscount.js";

import moment from "moment";
import vi from "moment/locale/vi";

import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { parseISO } from "date-fns";

const TableDiscount = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, discountState } = props;
  const { handleSetDiscount, handleSetLoad } = props.actionDiscount;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  // console.log(isLoading, discountState);
  // console.log("ac",actionDiscount);

  useEffect(() => {
    console.log("Category ,", discountState);
    loadData();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(discountState.length / postPage));
  }, [discountState, pageNumber, postPage]);

  const loadData = async () => {
    await getAllDiscount()
      .then((res) => {
        console.log("re", res);
        if (res.result.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetDiscount(res.result);
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

  // Edit data
  const EditData = (data) => {
    setDataEdit(data);
    setTitle("Edit Discount!!");
    setShowModal(true);
  };
  // Add Data
  const AddData = () => {
    setDataEdit({});
    setShowModal(true);
    setTitle("Add Discount!!");
  };
  // Call Api to DELETE
  const DeleteData = async (data) => {
    console.log(data);
    setOpenConfirm(false);
    await getDeleteDiscount({ id: data.iddiscount })
      .then((res) => {
        console.log(res);
        if (res) {
          loadData();
          ref.current.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                Success <b>Delete data</b> - mew mew.
              </div>
            ),
            level: "info",
            position: "tr",
            autoDismiss: 5,
          });
          // handleDeleteCategory({ NameCategory: data.NameCategory, CategoryID: data.CategoryID });
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.log(err);
        // Show message failed
        ref.current.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              Failed <b>Delete data</b> - OR Category name being used.
            </div>
          ),
          level: "warning",
          position: "tr",
          autoDismiss: 5,
        });
      });
  };
  // Call Api to ADD or EDIT
  const onEnter = async (data) => {
    console.log("Enter", data);

    if (data.id !== -1) {
      // Call api to edit author
      await getEditDiscount(data)
        .then((response) => {
          console.log(response);
          // Redux edit data
          if (response !== null) {
            console.log("true");
            loadData();
            // Hide modal
            setShowModal(false);
            // Show message success
            ref.current.addNotification({
              title: <span data-notify="icon" className="pe-7s-gift" />,
              message: (
                <div>
                  Success <b>Edit data</b> - mew mew.
                </div>
              ),
              level: "info",
              position: "tr",
              autoDismiss: 5,
            });
            // handleEditCategory({ NameCategory: data.name, CategoryID: data.id });
          }
        })
        .catch((err) => {
          console.log(err);
          // Hide modal
          setShowModal(false);
          // Show message failed
          ref.current.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                Failed <b>Edit data</b> - mew mew.
              </div>
            ),
            level: "warning",
            position: "tr",
            autoDismiss: 5,
          });
        });
    } else {
      await getAddDiscount(data)
        .then((response) => {
          console.log(response);
          if (response) {
            loadData();
            // Hide modal
            setShowModal(false);
            // Show message success
            ref.current.addNotification({
              title: <span data-notify="icon" className="pe-7s-gift" />,
              message: (
                <div>
                  Success <b>Add data</b> - mew mew.
                </div>
              ),
              level: "info",
              position: "tr",
              autoDismiss: 5,
            });
            // handleAddCategory({ NameCategory: data.name, CategoryID: response.result });
          }
        })
        .catch((err) => {
          console.log(err);
          // Hide modal
          setShowModal(false);
          // Show message failed
          ref.current.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                Failed <b>Add data</b> - mew mew.
              </div>
            ),
            level: "warning",
            position: "tr",
            autoDismiss: 5,
          });
        });
    }
  };
  var product = [...discountState];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = product.splice(indexOfFirstPost, postPage);

  return (
    <div className="content">
      <Confirm open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={() => DeleteData(dataDelete)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }} />
      <ModelShow title={title} isShow={showModal} onCancelData={() => setShowModal(false)} onEnter={(e) => onEnter(e)} dataEdit={dataEdit} />
      <NotificationSystem ref={ref} style={style} />
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Striped Table with Hover"
              discountState="Here is a subtitle for this table"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {headerDiscount.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {discountState.length > 0
                      ? currentPost.map((prop, key) => {
                          const newDateStart = moment(prop.dateStart).locale("vi", vi).format("MMMM Do YYYY, h:mm:ss a");
                          const newDateEnd = moment(prop.dateEnd).locale("vi", vi).format("MMMM Do YYYY, h:mm:ss a");

                          return (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.iddiscount}</td>
                              <td>{newDateStart}</td>
                              <td>{newDateEnd}</td>
                              <td>{prop.code}</td>
                              <td>{prop.percent} %</td>
                              <td>
                                <Button bsStyle="info" fill type="submit" onClick={() => EditData(prop)}>
                                  Edit
                                </Button>
                              </td>
                              <td>
                                <Button
                                  bsStyle="warning"
                                  fill
                                  type="submit"
                                  onClick={() => {
                                    setDataDelete(prop);
                                    setOpenConfirm(true);
                                  }}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              }
            />
            <Pagination defaultActivePage={currentPage} pointing secondary totalPages={pageNumber} onPageChange={(e, d) => handlePagination(d)} style={{ float: "right" }} />
            <Button bsStyle="danger" fill type="submit" onClick={() => AddData()}>
              Add
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
  discountState: state.discountList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionDiscount: bindActionCreators({ ...actionDiscount }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableDiscount);

const ModelShow = ({ isShow, title, onCancelData, onEnter, dataEdit }) => {
  const [state, setState] = useState({ code: "", id: -1, per: 0 });
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      // console.log("ed", dataEdit);
      setState({ code: dataEdit.code, id: dataEdit.iddiscount, per: dataEdit.percent });
      setStartDate(parseISO(dataEdit.dateStart));
      setEndDate(parseISO(dataEdit.dateEnd));
    } else {
      setDisable(true);
      setState({ code: "", id: -1, per: 0 });
      setStartDate();
      setEndDate();
    }
  }, [dataEdit]);
  // check disable button
  useEffect(() => {
    // console.log("check bu",startDate,endDate);
    if (state.code) {
      if (state.code.length >= 3 && state.code.length <= 20) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [state.code]);
  // function
  // Cancel
  const onCancel = () => {
    setState({});
    onCancelData();
  };

  return (
    <Modal dimmer="blurring" open={isShow} onClose={() => setOpen(false)} style={{ height: "700px", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Container>
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
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Code"
            value={state.code}
            onChange={(e, v) => {
              // console.log(v.value);
              if (v.value === "") {
                setState({ ...state, code: v.value });
              }
              if (main([v.value])) {
                setState({ ...state, code: v.value });
              }
            }}
          />
          <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
            Code
          </Label>
          {/* Percent */}
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Percent"
            value={state.per}
            style={{ marginLeft: "10px" }}
            type="number"
            onChange={(e, v) => {
              // console.log(v.value);
              if (parseInt(v.value) || v.value !== "-") {
                if (Math.sign(v.value) > 0) {
                  setState({ ...state, per: v.value });
                }
                // setState({ ...state, per: v.value });
              }
            }}
          />
          <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
            Percent
          </Label>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic negative onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic positive onClick={() => onEnter({ ...state, dt: startDate, de: endDate })} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
