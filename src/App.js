import React from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';

const API = "http://127.0.0.1:8000";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vss2Value: new CustomStore({
        key: 'Signal',
        load: this.onLoad,
        insert: this.onInsert,
        update: this.onUpdate,
        remove: this.onRemove,
      }),
      requests: [],
    };
  }

  onLoad = () => {
    return this.sendRequest("/capabilities")
  }

  onInsert = (values) => {
    return this.sendRequest("/capabilities", "POST", values)
  }

  onUpdate = (key, values) => {
    return this.sendRequest(`/capabilities/${key}`, "PUT", {
      key,
      values,
    });
  };

  onRemove = (key) => {
    return this.sendRequest(`/capabilities/${key}`, "DELETE")
  };

  sendRequest(url, method, data) {
    const config = {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) config.body = JSON.stringify(data);
    return fetch(`${API}${url}`, config)
      .then((resp) => resp.json())
      .catch((err) => {
        console.log("err=---------> ", err)
      });
  }

  render() {
    const { vss2Value } = this.state;
    return (
      <React.Fragment>
        <h2 style={{ color: "red" }}>{`Test Simulator App`}</h2>
        <DataGrid showBorders dataSource={vss2Value} repaintChangesOnly >
          <Editing
            mode="form"
            refreshMode
            allowAdding
            allowDeleting
            allowUpdating
          />
          <Column dataField="Signal" caption="Signal"></Column>
          <Column dataField="Description"></Column>
          <Column dataField="Type"></Column>
          <Column dataField="DataType" caption="Data Type"></Column>
          <Column dataField="Unit"></Column>
          <Column dataField="Min" caption="Minimum"></Column>
          <Column dataField="Max" caption="Maximum"></Column>
          <Column dataField="Enum"></Column>
          <Column dataField="id" caption="ID"></Column>
          <Column dataField="value" caption="Value"></Column>
          <Column dataField="status" caption="Status"></Column>
        </DataGrid>
      </React.Fragment >
    );
  }
}

export default App;
