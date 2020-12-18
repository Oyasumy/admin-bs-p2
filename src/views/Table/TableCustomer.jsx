import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm, Container, Select } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerCustomer } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
// import { getAllAuthor } from "apis/apiAuthor";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionCustomer from "../../actions/actionCustomer";
import { main } from "commons/checkData.js";
import { getEditCustomer, getAddCustomer, getDeleteCustomer, getAllCustomer, getEditPassCustomer } from "apis/apiCustomer.js";

import { province as data } from "../../commons/data";
const TableAuthor = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, customers } = props;
  const { handleSetCustomer, handleSetLoad, handleEditCustomer, handleAddCustomer, handleDeleteCustomer } = props.actionCustomer;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  // console.log(isLoading, customers);
  // console.log("ac",actionCustomer);

  useEffect(() => {
    console.log("CUS ,", customers);
    loadData();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(customers.length / postPage));
  }, [customers, pageNumber, postPage]);

  const loadData = async () => {
    await getAllCustomer()
      .then((res) => {
        if (res.result.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetCustomer(res.result);
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
              Success <b>Load data</b> .
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
    setTitle("Edit Customer!!");
    setShowModal(true);
  };
  // Add Data
  const AddData = () => {
    setDataEdit({});
    setShowModal(true);
    setTitle("Add Customer!!");
  };
  // Call Api to DELETE
  const DeleteData = async (data) => {
    console.log(data);
    setOpenConfirm(false);
    await getDeleteCustomer({ id: data.CustomerID })
      .then((res) => {
        console.log(res);
        if (res) {
          loadData();
          // handleDeleteCustomer({ NameCustomer: data.NameCustomer, CustomerID: data.CustomerID });
          // Show message success
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
              Failed <b>Delete data</b> - mew mew.
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
      await getEditCustomer(data)
        .then((response) => {
          console.log(response);
          // Redux edit data
          if (response) {
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
          }
          // handleEditCustomer({ NameCustomer: data.name, CustomerID: data.id });
        })

        .catch((err) => {
          console.log(err);
          setShowModal(false);
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
      await getAddCustomer(data)
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
          }
          // handleAddCustomer({ NameCustomer: data.name, CustomerID: response.result.insertId, PhoneCustomer: data.phone, EmailCustomer: data.email, AddressCustomer: data.address, PasswordCustomer: data.pass });
        })
        .then(() => {})
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
  // Call Api to edit pass
  const onEditPass = async (v, cus) => {
    console.log("p", v, cus);
    if (v.pass) {
      await getEditPassCustomer({ pass: v.pass, id: cus.CustomerID })
        .then((res) => {
          console.log("res", res);
          if (res.msg === "ok") {
            loadData();

            // Hide modal
            setShowEditPass(false);
            // Show message success
            ref.current.addNotification({
              title: <span data-notify="icon" className="pe-7s-gift" />,
              message: (
                <div>
                  Success <b>Edit Password Customer</b>.
                </div>
              ),
              level: "info",
              position: "tr",
              autoDismiss: 5,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // Hide modal
          setShowEditPass(false);
          // Show message failed
          ref.current.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                Failed <b>Edit Password</b> .
              </div>
            ),
            level: "warning",
            position: "tr",
            autoDismiss: 5,
          });
        });
    }
  };
  var product = [...customers];
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
              category="Here is a subtitle for this table"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {headerCustomer.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0
                      ? currentPost.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.CustomerID}</td>
                              <td>{prop.NameCustomer}</td>
                              <td>{prop.PhoneCustomer}</td>
                              <td>{prop.EmailCustomer}</td>
                              <td>{prop.AddressCustomer}</td>
                              <td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{prop.PasswordCustomer}</td>
                              <td>
                                <Button bsStyle="info" fill type="submit" onClick={() => EditData(prop)}>
                                  Edit
                                </Button>
                              </td>
                              <td>
                                <ModalUpdatePass isShow={showEditPass} setShow={(s) => setShowEditPass(s)} onEditPass={(v) => onEditPass(v, prop)} />
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
  customers: state.customerList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionCustomer: bindActionCreators({ ...actionCustomer }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableAuthor);

const ModelShow = ({ isShow, title, onCancelData, onEnter, dataEdit }) => {
  const [state, setState] = useState({ name: "", phone: "", email: "", address: "", pass: "", id: -1 });
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  const [province, setProvince] = useState("");
  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      setState({ name: dataEdit.NameCustomer, phone: dataEdit.PhoneCustomer, email: dataEdit.EmailCustomer, address: dataEdit.AddressCustomer.split(',')[0], id: dataEdit.CustomerID });
    } else {
      setDisable(true);
      setState({ name: "", id: -1 });
    }
  }, [dataEdit]);
  // check disable button
  useEffect(() => {
    console.log("check bu");
    if (state.name && state.phone) {
      console.log("ph", state.phone.length);
      if (state.name.length >= 3 && state.name.length <= 20 && state.phone.length === 10) {
        setDisable(false);
      }
      //  else if (state.phone.length >= 3 && state.phone.length <= 20) {
      //     setDisable(false);
      //   }
      else {
        setDisable(true);
      }
    }
  }, [state.name, state.phone]);
  // function
  // Cancel
  const onCancel = () => {
    setState({});
    onCancelData();
  };

  return (
    <Modal dimmer="blurring" open={isShow} size="small" onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Container textAlign="center">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            {/* Name */}
            <Input
              icon="users"
              iconPosition="left"
              placeholder="Name Customer"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.name}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, name: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, name: v.value });
                }
              }}
            />
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Name Customer
            </Label> */}

            {/* Phone */}

            <Input
              icon="users"
              iconPosition="left"
              placeholder="Phone Customer"
              type="number"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.phone}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, phone: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, phone: v.value });
                }
              }}
            />
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Phone Customer
            </Label> */}
          </div>

          {/* Email */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Email Customer
            </Label> */}

            <Input
              icon="users"
              iconPosition="left"
              placeholder="Address Customer"
              style={{ width: "300px", marginLeft: "5px" }}
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

            <Select placeholder="Select your province" options={data} onChange={(e, { value }) => setProvince(value)}  style={{ width: "300px", marginLeft: "5px" }}/>

            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Email Customer
            </Label> */}
          </div>

          {/* Pass */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <Input
              icon="users"
              iconPosition="left"
              placeholder="Email Customer"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.email}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, email: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, email: v.value });
                }
              }}
            />
            {title === "Add Customer!!" ? (
              <Input
                icon="users"
                iconPosition="left"
                style={{ width: "300px", marginLeft: "5px" }}
                placeholder="Password Customer"
                type="password"
                value={state.pass}
                onChange={(e, v) => {
                  // console.log(v.value);
                  if (v.value === "") {
                    setState({ ...state, pass: v.value });
                  }
                  if (main([v.value])) {
                    setState({ ...state, pass: v.value });
                  }
                }}
              />
            ) : null}
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Password Customer
            </Label> */}
          </div>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic color="black" onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic content="Yep, that's me" labelPosition="right" icon="checkmark" onClick={() => onEnter({ ...state, address: state.address + "," + province })} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};

const ModalUpdatePass = ({ isShow, setShow, onEditPass }) => {
  const [state, setState] = useState({});
  return (
    <Modal onClose={() => setShow(false)} size="small" style={{ height: "fit-content", margin: "auto" }} onOpen={() => setShow(true)} open={isShow} trigger={<Button>Edit Pass</Button>}>
      <Modal.Header>Update Password Customer</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h3>Update new password</h3>
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Password Customer"
            type="password"
            value={state.pass}
            onChange={(e, v) => {
              // console.log(v.value);
              if (v.value === "") {
                setState({ ...state, pass: v.value });
              }
              if (main([v.value])) {
                setState({ ...state, pass: v.value });
              }
            }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic color="black" onClick={() => setShow(false)}>
          Nope
        </ButtonSemantic>
        <ButtonSemantic content="Yep, that's me" labelPosition="right" icon="checkmark" onClick={() => onEditPass(state)} positive />
      </Modal.Actions>
    </Modal>
  );
};
