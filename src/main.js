import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import { connect } from "react-redux";
import { compose } from "redux";
import Loading from "views/Loading";
import { checkLoginAdmin } from "apis/apiLogin";
import { useState } from "react";
import { LOGIN_WEB } from "constants/configRedux";

const Main = (props) => {
const [isShow, setIsShow] = useState(true)
  const { isLoading } = props;
  console.log("show load :",isLoading);

  useEffect(() => {
    // checkInit();
  }, [])
  const checkInit=async()=>{
    await checkLoginAdmin().then(res=>{
      if (res.msg!=="ok") {
        setIsShow(false);
        window.location.replace(LOGIN_WEB);
      }else{

        setIsShow(true);
      }
    }).catch(er=>{
      console.log("er",er);
    })
  }
  return (
    <>
     {isShow? <>
        {isLoading ? <Loading /> : null}
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </>
    :null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});
const mapDispatchToProps = (dispatch) => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Main);
