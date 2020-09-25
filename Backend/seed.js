exports.vss2Capability = [
    ["Vehicle.Powertrain.EnergyStorage.FuelSystem", "Fuel system data", "Branch"],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.AverageConsumption",
        "Average consumption in liters per 100 km",
        "sensor",
        "float",
        "l/100km",
        "0",
        "99",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.ConsumptionSinceStart",
        "Fuel amount consumed since start in liters",
        "sensor",
        "float",
        "liter",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.InstantConsumption",
        "Current consumption in liters per 100 km",
        "sensor",
        "float",
        "l/100km",
        "0",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.Level",
        "Level in fuel tank as percent of capacity. 0 = empty. 100 = full",
        "sensor",
        "unit8",
        "percent",
        "0",
        "100",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.LowFuelLevel",
        "Indicates that the fuel level is low (e.g. <50km range)",
        "sensor",
        "Boolean",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.Range",
        "Range in meters.",
        "sensor",
        "unint32",
        "m",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.TankCapacity",
        "Capacity of the fuel tank in liters",
        "attribute",
        "uint16",
        "liter",
    ],
];

exports.vss2Value = [
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem",
        "2ef65b5c8e875276b6b4af7400cb7c72",
        "",
        "enabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.AverageConsumption",
        "5ae2839784a45785bc3fc6677ecec090",
        "",
        "enabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.ConsumptionSinceStart",
        "d3627d6ae8bc5f6bbf871dcaa9d4aa01",
        "",
        "disabled",
    ],

    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.InstantConsumption",
        "c01ad71ba0315cf1b4fe3e5f74548258",
        "",
        "enabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.Level",
        "b3a4e2f57177584c843ceeb30b351e04",
        "",
        "enabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.LowFuelLevel",
        "5118861236be501fbc8385cc55f74deb",
        "",
        "enabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.Range",
        "ec7e69ae0f98517c8306f7d464997de7",
        "",
        "disabled",
    ],
    [
        "Vehicle.Powertrain.EnergyStorage.FuelSystem.TankCapacity",
        "7d3f4e3c4c795dac93d5496071236c6a",
        "",
        "enabled",
    ],
];
