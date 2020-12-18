import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

const TableList = () => {
  return (
    <div className="content">
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
                      {thArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tdArray.map((prop, key) => {
                      return (
                        <tr key={key} onClick={() => console.log(prop)}>
                          {prop.map((prop, key) => {
                            return (
                              <td key={key} >
                                {prop}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default TableList;

{
  /* <Col md={12}>
<Card
  plain
  title="Striped Table with Hover"
  category="Here is a subtitle for this table"
  ctTableFullWidth
  ctTableResponsive
  content={
    <Table hover>
      <thead>
        <tr>
          {thArray.map((prop, key) => {
            return <th key={key}>{prop}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tdArray.map((prop, key) => {
          return (
            <tr key={key}>
              {prop.map((prop, key) => {
                return <td key={key}>{prop}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  }
/>
</Col> */
}
