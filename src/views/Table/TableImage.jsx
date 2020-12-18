import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

// Semantic
import { Confirm, Grid as GridSe, Image } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input, Label } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerCategory } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";
// imp Upload image
import ImageUploader from "react-images-upload";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionImage from "../../actions/actionImage";

import { getAllImage, getDeleteImage, getAddImage } from "apis/apiImage.js";

const TableImage = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, image } = props;
  const { handleSetImages, handleSetLoad, handleAddImages, handleDeleteImages } = props.actionImage;

  // Modal State
  const [isChoose, setIsChoose] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(6);
  const [pageNumber, setPageNumber] = useState(0);

  // console.log(isLoading, image);
  // console.log("ac", actionImage);

  useEffect(() => {
    // console.log("Category ,", image);
    loadData();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(image.length / postPage));
  }, [image, pageNumber, postPage]);

  const loadData = async () => {
    // Set loading

    handleSetLoad(true);
    // Call Api
    await getAllImage()
      .then((res) => {
        console.log(res);
        if (res.results.length > 0) {
          // set data
          handleSetImages(res.results);
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

  // Add Data
  const AddData = () => {
    setDataEdit({});
    setShowModal(true);
    setTitle("Add Images!!");
  };
  // Call Api to DELETE
  const DeleteData = async (data) => {
    console.log(data, Object.keys(data).length);
    if (Object.keys(data).length <= 0 || !data) return;
    // Set loading

    handleSetLoad(true);

    // Call Api to delete
    setOpenConfirm(false);
    await getDeleteImage({ public_id: data.public_id })
      .then((res) => {
        console.log(res);
        if (res) {
          handleDeleteImages(data);
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
        handleSetLoad(false);
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

  // Set image
  const ImageSet = (data) => {
    if (data.idimages === isChoose.idimages) return;
    console.log(data);
    setIsChoose(data);
  };
  // Call Api to ADD or EDIT
  const onEnter = async (data) => {
    console.log("Enter", data[0]);

    // Set loading

    setShowModal(false);
    handleSetLoad(true);
    await getAddImage(data[0])
      .then((response) => {
        console.log(response);
        // Hide modal
        if (response) {
          handleAddImages(response.result);
        } else {
          throw new Error("Error upload!");
        }
      })
      .then(() => {
        // Set loading
        handleSetLoad(false);
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
         // Set loading
         handleSetLoad(false);
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
  };
  var product = [...image];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = product.splice(indexOfFirstPost, postPage);

  return (
    <div className="content">
      <Confirm open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={() => DeleteData(isChoose)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }} />
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
                <GridSe columns='4' divided>
                  <GridSe.Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    {image.length > 0
                      ? currentPost.map((prop, key) => {
                          var styleC = null;
                          if (parseInt(isChoose.idimages) === parseInt(prop.idimages)) {
                            styleC = { backgroundColor: "rgba(255, 99, 71, 0.5)" };
                          }
                          return (
                            <GridSe.Column
                              key={key}
                              onClick={() => {
                                if (!prop.idProduct) {
                                  ImageSet(prop);
                                }
                              }}
                              style={styleC}>
                              <Image src={prop.url} />
                              {prop.idProduct ? <small style={{ position: "absolute", top: "2px", right: "5px", opacity: ".5" }}>Images has used</small> : null}
                            </GridSe.Column>
                          );
                        })
                      : null}
                  </GridSe.Row>
                </GridSe>
              }
            />
            <Pagination defaultActivePage={currentPage} pointing secondary totalPages={pageNumber} onPageChange={(e, d) => handlePagination(d)} style={{ float: "right" }} />
            <Button bsStyle="danger" fill type="submit" onClick={() => AddData()}>
              Add
            </Button>
            <Button bsStyle="warning" fill type="submit" onClick={() => setOpenConfirm(true)} style={{ marginLeft: "10px" }}>
              Delete Image
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
  image: state.imageList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionImage: bindActionCreators({ ...actionImage }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableImage);

const ModelShow = ({ isShow, title, onCancelData, onEnter }) => {
  const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);
  const [picture, setPicture] = useState([]);

  // check disable button
  useEffect(() => {
    console.log("check bu");
    if (picture) {
      if (picture.length > 0) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [picture]);
  // function
  // Cancel
  const onCancel = () => {
    setPicture([]);
    onCancelData();
  };
  const onDrop = (picture) => {
    setPicture(picture);
  };

  return (
    <Modal dimmer="blurring" open={isShow} onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <ImageUploader withPreview={true} singleImage={true} withIcon={true} buttonText="Choose images" onChange={onDrop} imgExtension={[".jpg", ".gif", ".png", ".gif"]} maxFileSize={5242880} />
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic negative onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic positive onClick={() => onEnter(picture)} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
