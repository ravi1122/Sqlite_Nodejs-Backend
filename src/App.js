import React from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

import CustomStore from 'devextreme/data/custom_store';
// import { formatDate } from 'devextreme/localization';
import 'whatwg-fetch';

const URL = "http://127.0.0.1:8000";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { events: [] };
  //   this.state = { vss2Value: [] };
  // }

  // componentDidMount() {
  //   fetch(`http://127.0.0.1:8000/capability`)
  //     .then(res => res.json())
  //     .then((vss2Value) => {
  //       this.setState({ vss2Value: vss2Value.data });
  //     })
  // }

  constructor(props) {
    super(props);

    this.state = {
      vss2Value: new CustomStore({
        key: 'Signal',
        load: () => this.sendRequest(`${URL}/capability`),
        insert: (values) => this.sendRequest(`${URL}/entry`, 'POST', {
          values: JSON.stringify(values)
        }),
        update: (key, values) => this.sendRequest(`${URL}/updatevalue`, 'PUT', {
          key: key,
          values: JSON.stringify(values)
        }),
        remove: (key) => this.sendRequest(`${URL}/deletedvalue`, 'DELETE', {
          key: key
        })
      }),
      requests: [],
    };
  }

  sendRequest(url, method, data) {
    method = method || 'GET';
    data = data || {};

    // this.logRequest(method, url, data);

    if (method === 'GET') {
      return fetch(url, {
        method: method,
      }).then(result => result.json().then(json => {
        if (result.ok) return json.data;
        throw json.Message;
      }));
    }

    const params = Object.keys(data).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    }).join('&');

    return fetch(url, {
      method: method,
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },

    }).then(result => {
      if (result.ok) {
        return result.text().then(text => text && JSON.parse(text));
      } else {
        return result.json().then(json => {
          throw json.Message;
        });
      }
    });
  }

  // logRequest(method, url, data) {
  //   const args = Object.keys(data || {}).map(function (key) {
  //     return `${key}=${data[key]}`;
  //   }).join(' ');

  //   const request = [method, url.slice(URL.length), args].join(' ');
  // }

  handleRefreshModeChange(e) {
    this.setState({ refreshMode: e.value });
  }

  render() {
    //const { vss2Value } = this.state;
    const { refreshMode, vss2Value } = this.state
    return (
      // <React.Fragment>
      //   <form action="localhost:8000/entry" method="post">
      //     <h2 style={{ color: "red" }}>{`Test Simulator App`}</h2>
      //     <DataGrid
      //       id="gridContainer"
      //       dataSource={vss2Value}
      //       remoteOperations={true}
      //       // dataSource={dataSourceOptions}
      //       
      //       <Editing
      //         mode="form"
      //         allowUpdating={true}
      //         allowDeleting={true}
      //         allowAdding={true} />

      //       <Column dataField="Signal" caption="Signal" />
      //       <Column dataField="Description" />
      //       <Column dataField="Type" />
      //       <Column dataField="DataType" caption="Data Type" />
      //       <Column dataField="Unit" />
      //       <Column dataField="Min" caption="Minimum" />
      //       <Column dataField="Max" caption="Maximum" />
      //       <Column dataField="Enum" />
      //       <Column dataField="id" caption="ID" />
      //       <Column dataField="value" caption="Value" />
      //       <Column dataField="status" caption="Status" />
      //     </DataGrid>
      //   </form>
      // </React.Fragment>

      <React.Fragment>
        <h2 style={{ color: "red" }}>{`Test Simulator App`}</h2>
        <DataGrid
          showBorders={true}
          dataSource={vss2Value}
          repaintChangesOnly={true}
        >
          <Editing
            refreshMode={refreshMode}
            mode="row"
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
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


      </React.Fragment>


    );
  }
}

export default App;
