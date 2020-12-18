import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerAuthor } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getAllAuthor } from "apis/apiAuthor";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionAuthor from "../../actions/actionAuthor";
import { main } from "commons/checkData.js";
import { getEditAuthor } from "apis/apiAuthor.js";
import { getAddAuthor } from "apis/apiAuthor.js";
import { getDeleteAuthor } from "apis/apiAuthor.js";

const TableAuthor = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, authors } = props;
  const { handleSetAuthor, handleSetLoad, handleEditAuthor, handleAddAuthor, handleDeleteAuthor } = props.actionAuthor;

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

  // console.log(isLoading, authors);
  // console.log("ac",actionAuthor);

  useEffect(() => {
    console.log("author ,", authors);
    loadData();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(authors.length / postPage));
  }, [authors, pageNumber, postPage]);

  const loadData = async () => {
    await getAllAuthor()
      .then((res) => {
        if (res.result.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetAuthor(res.result);
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
    setTitle("Edit Author!!");
    setShowModal(true);
  };
  // Add Data
  const AddData = () => {
    setDataEdit({});
    setShowModal(true);
    setTitle("Add Author!!");
  };
  // Call Api to DELETE
  const DeleteData = async (data) => {
    console.log(data);
    setOpenConfirm(false);
    await getDeleteAuthor({ id: data.AuthorID })
      .then((res) => {
        console.log(res);
        if (res) {
          handleDeleteAuthor({ NameAuthor: data.NameAuthor, AuthorID: data.AuthorID });
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .then(() => {
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
      await getEditAuthor({ nameAuthor: data.name, id: data.id })
        .then((response) => {
          console.log(response);
          // Redux edit data
          handleEditAuthor({ NameAuthor: data.name, AuthorID: data.id });
        })
        .then(() => {
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
      await getAddAuthor(data)
        .then((response) => {
          console.log(response);
          handleAddAuthor({ NameAuthor: data.name, AuthorID: response.result });
        })
        .then(() => {
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
  var product = [...authors];
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
                      {headerAuthor.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {authors.length > 0
                      ? currentPost.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.AuthorID}</td>
                              <td>{prop.NameAuthor}</td>
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
  authors: state.authorList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionAuthor: bindActionCreators({ ...actionAuthor }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableAuthor);

const ModelShow = ({ isShow, title, onCancelData, onEnter, dataEdit }) => {
  const [state, setState] = useState({ name: "", id: -1 });
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      setState({ name: dataEdit.NameAuthor, id: dataEdit.AuthorID });
    } else {
      setDisable(true);
      setState({ name: "", id: -1 });
    }
  }, [dataEdit]);
  // check disable button
  useEffect(() => {
    console.log("check bu");
    if (state.name) {
      if (state.name.length >= 3 && state.name.length <= 20) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [state.name]);
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
        <Input
          icon="users"
          iconPosition="left"
          placeholder="Author"
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
        <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
          Name Author
        </Label>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic negative onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic positive onClick={() => onEnter(state)} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
