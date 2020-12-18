import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm, Container } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerShipCode } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionShipCode from "../../actions/actionShipCode";
import { main } from "commons/checkData.js";
import { getAllDiscount, getAddDiscount, getEditDiscount, getDeleteDiscount } from "apis/apiDiscount.js";

import { getAllShipCode, getEditShipCode, getAddShipCode, getDeleteShipCode } from "apis/apiShipCode.js";

const TableShipCode = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, shipCodeState } = props;
  const { handleSetShipCode, handleSetLoad } = props.actionShipCode;

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

  // console.log(isLoading, shipCodeState);
  // console.log("ac",actionShipCode);

  useEffect(() => {
    console.log("Category ,", shipCodeState);
    loadData();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(shipCodeState.length / postPage));
  }, [shipCodeState, pageNumber, postPage]);

  const loadData = async () => {
    await getAllShipCode()
      .then((res) => {
        console.log("re", res);
        if (res.result.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetShipCode(res.result);
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
              Success <b>Load data</b>.
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
              Failed <b>Load</b>.
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
    setTitle("Edit Ship Code!!");
    setShowModal(true);
  };
  // Add Data
  const AddData = () => {
    setDataEdit({});
    setShowModal(true);
    setTitle("Add Ship Code!!");
  };
  // Call Api to DELETE
  const DeleteData = async (data) => {
    console.log(data);
    setOpenConfirm(false);
    await getDeleteShipCode({ id: data.idshipCode })
      .then((res) => {
        console.log(res);
        if (res) {
          loadData();
          ref.current.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                Success <b>Delete data</b>.
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
      await getEditShipCode(data)
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
                  Success <b>Edit data</b>.
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
                Failed <b>Edit data</b>.
              </div>
            ),
            level: "warning",
            position: "tr",
            autoDismiss: 5,
          });
        });
    } else {
      await getAddShipCode(data)
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
                  Success <b>Add data</b>.
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
                Failed <b>Add data</b>.
              </div>
            ),
            level: "warning",
            position: "tr",
            autoDismiss: 5,
          });
        });
    }
  };
  var product = [...shipCodeState];
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
              shipCodeState="Here is a subtitle for this table"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {headerShipCode.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {shipCodeState.length > 0
                      ? currentPost.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.idshipCode}</td>
                              <td>{prop.address}</td>
                              <td>{prop.cost}</td>
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
  shipCodeState: state.shipCodeList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionShipCode: bindActionCreators({ ...actionShipCode }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableShipCode);

const ModelShow = ({ isShow, title, onCancelData, onEnter, dataEdit }) => {
  const [state, setState] = useState({ cost: "", id: -1, address: "" });
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      // console.log("ed", dataEdit);
      setState({ cost: dataEdit.cost, id: dataEdit.idshipCode, address: dataEdit.address });
    } else {
      setDisable(true);
      setState({ cost: "", id: -1, address: "" });
    }
  }, [dataEdit]);
  // check disable button
  useEffect(() => {
    // console.log("check bu",startDate,endDate);
    if (state.cost) {
      if (state.cost.length >= 1 && state.cost <= 100) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [state.cost]);
  // function
  // Cancel
  const onCancel = () => {
    setState({});
    onCancelData();
  };

  return (
    <Modal dimmer="blurring" open={isShow} onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Container>
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Address"
            value={state.address}
            onChange={(e, v) => {
              // console.log(v.value);
              if (v.value === "") {
                setState({ ...state, address: v.value });
              }
              if (main([v.value])) {
                setState({ ...state, address: v.value });
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
            value={state.cost}
            style={{ marginLeft: "10px" }}
            type="number"
            onChange={(e, v) => {
              // console.log(v.value);
              if (parseInt(v.value) || v.value !== "-") {
                if (Math.sign(v.value) > 0) {
                  setState({ ...state, cost: v.value });
                }
                // setState({ ...state, address: v.value });
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
        <ButtonSemantic positive onClick={() => onEnter({ ...state })} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
