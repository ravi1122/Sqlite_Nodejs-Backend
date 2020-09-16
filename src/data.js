// export const vss2Data = [
//   {
//     "Signal": "Vehicle.Powertrain.EnergyStorage.FuelSystem",
//     "Description": "Fuel system data",
//     "Type": "Branch",
//     "DataType": null,
//     "Unit": null,
//     "Min": null,
//     "Max": null,
//     "Enum": null,
//     "id": "2ef65b5c8e875276b6b4af7400cb7c72",
//     "status": "enabled"
//   },
//   {
//     "Signal": "Vehicle.Powertrain.EnergyStorage.FuelSystem.InstantConsumption",
//     "Description": "Current consumption in liters per 100 km",
//     "Type": "sensor",
//     "DataType": "float",
//     "Unit": "l/100km",
//     "Min": 0,
//     "Max": null,
//     "Enum": null,
//     "id": "c01ad71ba0315cf1b4fe3e5f74548258",
//     "status": "enabled"
//   },
//   {
//     "Signal": "Vehicle.Powertrain.EnergyStorage.FuelSystem.TankCapacity",
//     "Description": "Capacity of the fuel tank in liters",
//     "Type": "attribute",
//     "DataType": "uint16",
//     "Unit": "liter",
//     "Min": null,
//     "Max": null,
//     "Enum": null,
//     "id": "7d3f4e3c4c795dac93d5496071236c6a",
//     "status": "enabled"
//   },
//   {
//     "Signal": "Vehicle.Powertrain.EnergyStorage.FuelSystem.Level",
//     "Description": "Level in fuel tank as percent of capacity. 0 = empty. 100 = full",
//     "Type": "sensor",
//     "DataType": "unit8",
//     "Unit": "percent",
//     "Min": 0,
//     "Max": 100,
//     "Enum": null,
//     "id": "b3a4e2f57177584c843ceeb30b351e04",
//     "status": "enabled"
//   }
// ]

import 'devextreme/data/odata/store';
import ODataStore from 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

export const dataSourceOptions = {
  store: {
    type: 'odata',
    url: 'http://192.168.43.165:8000/capability'
  },
  select: [
    'Signal',
    'Description',
    'Type',
    'DataType',
    'Unit',
    'Min',
    'Max',
    'Enum',
    'id',
    'status'
  ],
};