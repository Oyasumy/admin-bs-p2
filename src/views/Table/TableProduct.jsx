import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Pagination, Confirm, GridRow, Form, Divider, Label, Dropdown, TextArea } from "semantic-ui-react";
import { Modal, Button as ButtonSemantic, Input } from "semantic-ui-react";

import Card from "components/Card/Card.jsx";
import { headerProduct } from "variables/HeaderTable";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { style } from "../../variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import Button from "../../components/CustomButton/CustomButton.jsx";
// imp action
import * as actionProduct from "../../actions/actionProduct";
import * as actionImage from "../../actions/actionImage";
import * as actionCategory from "../../actions/actionCategory";
import * as actionAuthor from "../../actions/actionAuthor";
//
import { main } from "commons/checkData.js";
import { getAllProduct, getEditProduct, getAddProduct, getDeleteProduct } from "apis/apiProduct.js";

import { getAllImage } from "apis/apiImage.js";
import { getAllAuthor } from "apis/apiAuthor.js";
import { getAllCategory } from "apis/apiCategory.js";

const TableCategory = (props) => {
  //
  const ref = useRef(null);
  const { isLoading, products, imagesState, authorState, categoryState, actionImage, actionAuthor, actionCategory } = props;
  const { handleSetProducts, handleSetLoad, handleEditProducts, handleAddProducts, handleDeleteProducts } = props.actionProduct;

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

  useEffect(() => {
    loadData();
    loadImage();
    loadAuthor();
    loadCate();
  }, []);

  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(products.length / postPage));
  }, [products, pageNumber, postPage]);

  const loadData = async () => {
    await getAllProduct(0)
      .then((res) => {
        if (res.resultResponse.length > 0) {
          // Set load true
          handleSetLoad(true);
          // set data
          handleSetProducts(res.resultResponse);
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
    setTitle("Edit Product!!");
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
    setOpenConfirm(false);
    await getDeleteProduct({ id: data.ProductID })
      .then((res) => {
        if (res) {
          handleDeleteProducts({ ProductID: data.ProductID });
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .then(() => loadImage())
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
  const onEnter = async (data, authorEdit, categoryEdit, images) => {
    const { AuthorID, NameAuthor } = authorEdit;
    const { CategoryID, NameCategory } = categoryEdit;

    var listImg = [];
    images.forEach((element) => {
      listImg.push(element.idimages);
    });
    const { DescriptionProduct, NameProduct, PriceProduct, QuantityProduct, ProductID } = data;
    const newP = { name: NameProduct, price: PriceProduct, description: DescriptionProduct, quantity: QuantityProduct, id: ProductID, idAuthor: AuthorID, idCategory: CategoryID, data: listImg };

    var ndt = { DescriptionProduct, NameProduct, PriceProduct, QuantityProduct, ProductID, AuthorID, NameAuthor, CategoryID, NameCategory, images };

    if (data.ProductID > 0) {
      // Call api to edit author
      await getEditProduct(newP)
        .then((response) => {
          // Redux edit newP
          if (response) {
            handleEditProducts(ndt);
          } else {
            throw new Error("Something error!!");
          }
        })
        .then(() => loadImage())
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
      await getAddProduct(newP)
        .then((response) => {
          if (response) {
            handleAddProducts({ ...ndt, ProductID: response.result.insertId });
          } else {
            throw new Error("Something error!!");
          }
        })
        .then(() => loadImage())
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
  // Get list Image State
  const loadImage = async () => {
    await getAllImage().then((res) => {
      if (res.results.length > 0) {
        // set data
        actionImage.handleSetImages(res.results);
      }
    });
  };
  // Get List cate
  const loadCate = async () => {
    await getAllCategory().then((res) => {
      if (res.result.length > 0) {
        actionCategory.handleSetCategory(res.result);
      }
    });
  };
  // Get List Author
  const loadAuthor = async () => {
    await getAllAuthor().then((res) => {
      if (res.result.length > 0) {
        actionAuthor.handleSetAuthor(res.result);
      }
    });
  };
  var product = [...products];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = product.splice(indexOfFirstPost, postPage);

  return (
    <div className="content" style={{ height: "fit-content" }}>
      <Confirm open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={() => DeleteData(dataDelete)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }} />
      <ModelShow
        title={title}
        isShow={showModal}
        onCancelData={() => setShowModal(false)}
        onEnter={(e, a, c, i) => onEnter(e, a, c, i)}
        dataEdit={dataEdit}
        imagesState={imagesState}
        authorState={authorState}
        categoryState={categoryState}
        productState={products}
      />
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
                      {headerProduct.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0
                      ? currentPost.map((prop, key) => {
                          Object.keys(prop.images).map((img, i) => {});
                          return (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.ProductID}</td>
                              <td>{prop.NameProduct}</td>
                              <td>{prop.PriceProduct}</td>
                              <td style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100px", whiteSpace: "nowrap" }}>{prop.DescriptionProduct}</td>
                              <td>{prop.NameAuthor}</td>
                              <td>{prop.NameCategory}</td>
                              <td style={{ display: "flex" }}>
                                {Object.keys(prop.images).map((img, i) => {
                                  return <img key={i} src={prop.images[i].url} style={{ width: "50px", height: "50px" }} />;
                                })}
                              </td>
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
  products: state.productList.data,
  imagesState: state.imageList.data,
  authorState: state.authorList.data,
  categoryState: state.categoryList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionProduct: bindActionCreators({ ...actionProduct }, dispatch),
  actionImage: bindActionCreators({ ...actionImage }, dispatch),
  actionAuthor: bindActionCreators({ ...actionAuthor }, dispatch),
  actionCategory: bindActionCreators({ ...actionCategory }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableCategory);

const ModelShow = ({ isShow, title, onCancelData, onEnter, dataEdit, imagesState, authorState, categoryState, productState }) => {
  const [state, setState] = useState({ images: {}, id: -1 });
  const [open, setOpen] = useState(isShow);
  const [imageEdit, setImageEdit] = useState([]);
  const [authorEdit, setAuthorEdit] = useState({});
  const [categoryEdit, setCategoryEdit] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      var newData = [];
      var { DescriptionProduct, NameProduct, PriceProduct, QuantityProduct, ProductID, images, AuthorID, CategoryID, NameAuthor, NameCategory } = dataEdit;
      for (let i = 0; i < Object.keys(images).length; i++) {
        newData.push(images[i]);
      }
      setState({ DescriptionProduct, NameProduct, PriceProduct, QuantityProduct, ProductID, images: newData, AuthorID, CategoryID, NameAuthor, NameCategory });
      setImageEdit(newData);

      setAuthorEdit({ NameAuthor, AuthorID });
      setCategoryEdit({ NameCategory, CategoryID });
    } else {
      setState({ DescriptionProduct: "", NameProduct: "", PriceProduct: "", QuantityProduct: "", ProductID: -1, images: [] });
      setImageEdit([]);
    }
  }, [dataEdit]);

  // Check disable button
  useEffect(() => {
    var { DescriptionProduct, NameProduct, PriceProduct, QuantityProduct, ProductID } = state;
    // if (!DescriptionProduct || !NameProduct || !PriceProduct || !QuantityProduct || !ProductID || imageEdit.length === 0 || Object.keys(authorEdit).length === 0 || Object.keys(categoryEdit).length === 0) {
    if (!DescriptionProduct || !NameProduct || !PriceProduct || !QuantityProduct || !ProductID || Object.keys(authorEdit).length === 0 || Object.keys(categoryEdit).length === 0) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [state, imageEdit, authorEdit, categoryEdit]);

  // function
  // Cancel
  const onCancel = () => {
    onCancelData();
  };
  // remove image when click
  const setRemoveImage = (i) => {
    var newData = [];
    if (i > 0) {
      newData = [...imageEdit.slice(0, i), ...imageEdit.slice(i + 1)];
    } else {
      newData = [...imageEdit.slice(i + 1)];
    }
    setImageEdit(newData);
  };

  // add image when click
  const setAddImage = (image) => {
    if (imageEdit.length >= 3) return;
    var newI = [...imageEdit];
    newI.push(image);
    setImageEdit(newI);
  };
  // Author Option
  useEffect(() => {
    if (authorState.length > 0) {
      var newData = [];
      authorState.forEach((element) => {
        var nl = {
          key: element.NameAuthor,
          text: element.NameAuthor,
          value: element,
        };
        newData.push(nl);
      });
      setAuthorOptions(newData);
    }
  }, [authorState]);
  // Category Option
  useEffect(() => {
    if (categoryState.length > 0) {
      var newData = [];
      categoryState.forEach((element) => {
        var nl = {
          key: element.NameCategory,
          text: element.NameCategory,
          value: element,
        };
        newData.push(nl);
      });
      setCategoryOptions(newData);
    }
  }, [categoryState]);
  return (
    <Modal dimmer="blurring" open={isShow} onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto" }}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content scrolling>
        <Form>
          {/* // Name  */}
          <Form.Field inline>
            <Input
              icon="users"
              iconPosition="left"
              placeholder="Name Product"
              style={{ padding: "5px" }}
              value={state.NameProduct}
              onChange={(e, v) => {
                if (v.value.length > 20) return;
                if (v.value === "") {
                  setState({ ...state, NameProduct: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, NameProduct: v.value });
                }
              }}
            />
            <Label pointing="left">Please enter Name Product</Label>
          </Form.Field>
          {/* // Quantity , Price */}
          <Form.Field inline>
            <Input
              type="number"
              icon="users"
              iconPosition="left"
              placeholder="Quantity Product"
              style={{ padding: "5px" }}
              value={state.QuantityProduct}
              onChange={(e, v) => {
                if (parseInt(v.value) <= 0 || v.value.length > 7) return;
                if (v.value === "") {
                  setState({ ...state, QuantityProduct: parseInt(v.value) });
                }
                if (main([parseInt(v.value)])) {
                  setState({ ...state, QuantityProduct: parseInt(v.value) });
                }
              }}
            />
            <Label pointing="left">Please enter Quantity Product</Label>

            <Input
              type="number"
              icon="users"
              iconPosition="left"
              placeholder="Price Product"
              style={{ padding: "5px" }}
              value={state.PriceProduct}
              onChange={(e, v) => {
                if (parseInt(v.value) <= 0 || v.value.length > 7) return;
                if (v.value === "") {
                  setState({ ...state, PriceProduct: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, PriceProduct: v.value });
                }
              }}
            />
            <Label pointing="left">Please enter Price Product</Label>
          </Form.Field>
          {/* // Description */}
          <Form.Field>
            <TextArea
              icon="users"
              iconPosition="left"
              placeholder="Description Product"
              style={{ padding: "5px"}}
              value={state.DescriptionProduct}
              onChange={(e, v) => {
                if (v.value.length > 200) return;
                if (v.value === "") {
                  setState({ ...state, DescriptionProduct: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, DescriptionProduct: v.value });
                }
              }}
            />
            <Label pointing="above">Please enter Description Product</Label>
          </Form.Field>
          <Divider />
          {/* // Image Product */}
          <Form.Field>
            {imageEdit.length > 0
              ? imageEdit.map((img, i) => {
                  return <img key={i} src={imageEdit[i].url} style={{ width: "50px", height: "50px" }} onClick={() => setRemoveImage(i)} />;
                })
              : null}
          </Form.Field>
          <Divider />
          {/* // image State */}
          <Form.Field>
            {imagesState.length > 0
              ? imagesState.map((img, i) => {
                  const ck = imagesState[i].idProduct === state.ProductID || imagesState[i].idProduct === null ? true : false;
                  const st = !ck ? 0.6 : 1;
                  return <img key={i} src={imagesState[i].url} style={{ width: "100px", height: "100px", opacity: st }} onClick={() => (ck ? setAddImage(imagesState[i]) : null)} />;
                })
              : null}
          </Form.Field>
          <Divider />
          {/* // Author,Category Product */}
          <Form.Field>
            {/* // Author Product */}
            <Label pointing="below">Please enter Author Product</Label>
            <Dropdown placeholder={authorEdit.NameAuthor} selection defaultValue={authorEdit} options={authorOptions} onChange={(e, { value }) => setAuthorEdit(value)} />
            {/* // Category */}
            <Divider />
            <Label pointing="below">Please enter Category Product</Label>
            <Dropdown placeholder={categoryEdit.NameCategory} selection defaultValue={categoryEdit} options={categoryOptions} onChange={(e, { value }) => setCategoryEdit(value)} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic negative onClick={() => onCancel()}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic positive disabled={disableSubmit} onClick={() => onEnter(state, authorEdit, categoryEdit, imageEdit)}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};
