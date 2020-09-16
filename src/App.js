import React from 'react';
//import Button from 'devextreme-react/button'; //lookup
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
// import axios from 'axios';

// import { dataSourceOptions } from './data.js';
import 'devextreme/data/odata/store';
import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.state = {
      vss2Value: []
    }
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    this.onRowInserting = this.logEvent.bind(this, 'RowInserting');
    this.onRowInserted = this.logEvent.bind(this, 'RowInserted');
    this.onRowUpdating = this.logEvent.bind(this, 'RowUpdating');
    this.onRowUpdated = this.logEvent.bind(this, 'RowUpdated');
    this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onRowRemoved = this.logEvent.bind(this, 'RowRemoved');

    this.clearEvents = this.clearEvents.bind(this);
  }

  logEvent(eventName) {
    this.setState((state) => {
      return { events: [eventName].concat(state.events) };
    });
  }

  clearEvents() {
    this.setState({ events: [] });
  }

  componentDidMount() {
    fetch(`http://192.168.43.165:8000/capability`)
      .then(res => console.log(res.json()))
      .then((vss2Value) => {
        this.setState({ vss2Value: vss2Value });
      })
  }

  // console.log( `vss2Value` )

  render() {
    const { vss2Value } = this.state;
    return (
      <React.Fragment>
        <h2>{`Test Simulator App`}</h2>
        <DataGrid
          id="gridContainer"
          //dataSource={vss2Data}
          remoteOperations={true}
          // dataSource={dataSourceOptions}
          allowColumnReordering={true}
          showBorders={true}
          onEditingStart={this.onEditingStart}
          onInitNewRow={this.onInitNewRow}
          onRowInserting={this.onRowInserting}
          onRowInserted={this.onRowInserted}
          onRowUpdating={this.onRowUpdating}
          onRowUpdated={this.onRowUpdated}
          onRowRemoving={this.onRowRemoving}
          onRowRemoved={this.onRowRemoved}>


          <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} />

          <Column dataField="Signal" caption="Signal" />
          <Column dataField="Description" />
          <Column dataField="Type" />
          <Column dataField="DataType" caption="Data Type" />
          <Column dataField="Unit" />
          <Column dataField="Min" caption="Minimum" />
          <Column dataField="Max" caption="Maximum" />
          <Column dataField="Enum" />
          <Column dataField="id" caption="ID" />
          <Column dataField="status" caption="Status" />

        </DataGrid>


      </React.Fragment>
    );
  }
}

export default App;
