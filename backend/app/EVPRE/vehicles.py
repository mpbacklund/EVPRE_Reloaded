# this should really be moved over into the database, but I will put it here for now

FORDFOCUSELECTRIC2012 = {
    "fastsimIndex": 1,
    "kwh": 23,
    "mass": 1337,
    "air_resistance": 0.28,
    "area": 2.24
}

CHEVSPARK2016 = {
    "fastsimIndex": 2,
    "kwh": 21,
    "mass": 1028,
    "air_resistance": 0.32,
    "area": 1.96
}

NISSANLEAF24KWH2016 = {
    "fastsimIndex": 3,
    "kwh": 24,
    "mass": 1477,
    "air_resistance": 0.28,
    "area": 2.28
}

NISSANLEAF30KWH2016 = {
    "fastsimIndex": 4,
    "kwh": 30,
    "mass": 1516,
    "air_resistance": 0.28,
    "area": 2.28
}

vehicle_dict = {
    "FORDFOCUSELECTRIC2012": FORDFOCUSELECTRIC2012,
    "CHEVSPARK2016": CHEVSPARK2016,
    "NISSANLEAF24KWH2016": NISSANLEAF24KWH2016,
    "NISSANLEAF30KWH2016": NISSANLEAF30KWH2016
}

def getVehicleInfo(vehicleName):
    return vehicle_dict.get(vehicleName, None)