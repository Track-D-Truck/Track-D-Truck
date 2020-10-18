const axios = require("axios");
const { TPStorage } = require(`../models`);
const { Truck, Driver } = require(`../models`);

let GMAPS_API_KEY = 'AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc'

class OptimationController {
  static async test(req, res, next) {
    //DATA REUCK ACTIVE
    const activeTruck = await Truck.findAll({
      include: [Driver],
      where: {
        status: "available"
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err, "<<eror filter truck");
        next(err);
      });

    //DATA POOL, TPA & TPS ACTIVE
    let pool = {
      name: "Pool Truck",
      location: "-6.86666, 107.60000",
    };

    let tpa = {
      name: "TPA",
      location: "-7.001580400000001, 107.9028182",
    };

    const activeTPS = await TPStorage.findAll({
      where: {
        status: "active",
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err, "<<eror filter truck");
        next(err);
      });

    //HIT GMAPS API
    let destination = "";
    activeTPS.forEach((element) => {
      destination = destination + "|" + element.location;
    });

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pool.location}&destination=${tpa.location}&waypoints=optimize:true${destination}&sensor=false&key=${GMAPS_API_KEY}`;

    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let temp = response.data.routes[0].legs;
        return temp;
      })
      .then((temp) => {
        //Route Optimation
        let routeOptimation = [];
        for (let x = 0; x < temp.length - 1; x++) {
          let tps = {
            // distance: temp[x].distance.text,
            // duration: temp[x].duration.text,
            address: temp[x].end_address,
            location: `${temp[x].end_location.lat}, ${temp[x].end_location.lng}`,
          };
          for (let i = 0; i < activeTPS.length; i++) {
            if (tps.location == activeTPS[i].location) {
              tps.name = activeTPS[i].name;
              tps.volume = activeTPS[i].volume;
            } else if (x == temp.length - 1) {
              (tps.name = "TPA"), (tps.volume = 0);
            }
          }
          routeOptimation.push(tps);
        }

        //Capacity Optimation
        let vol = 0;
        let final = [];
        let t = 0;
        let strg = [];
        for (let i = 0; i < routeOptimation.length; i++) {
          vol += routeOptimation[i].volume;

          if (vol <= activeTruck[t].capacity) {
            strg.push(routeOptimation[i]);
            if (i == routeOptimation.length - 1) {
              final.push({ truck: activeTruck[t], route: strg });
            }
          } else {
            final.push({ truck: activeTruck[t], route: strg });
            strg = [];
            vol = routeOptimation[i].volume;
            strg.push(routeOptimation[i]);
            t += 1;

            if (i == routeOptimation.length - 1) {
              final.push({ truck: activeTruck[t], route: strg });
            }
          }
        }

        return res.send(final);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  // static runAll(req, res, next) {
  //   let resultTps = [
  //     {
  //       name: "Terminal Dago",
  //       lat: -6.867195,
  //       long: 107.621516,
  //       volume: 8,
  //     },
  //     {
  //       name: "Cihampeulas",
  //       lat: -6.888166,
  //       long: 107.60394,
  //       volume: 3,
  //     },
  //     {
  //       name: "Gor Saparua",
  //       lat: -6.908792,
  //       long: 107.615854,
  //       volume: 6,
  //     },
  //     {
  //       name: "Dipatiukur",
  //       lat: -6.888166,
  //       long: 107.60394,
  //       volume: 2,
  //     },
  //   ];

  //   let resultTruck = [
  //     {
  //       id: 1,
  //       driver: "Ari",
  //       code: "truck1",
  //       cost: 10000,
  //       capacity: 10,
  //       available: ["monday", "friday"],
  //     },
  //     {
  //       id: 2,
  //       driver: "Adit",
  //       code: "truck2",
  //       cost: 10000,
  //       capacity: 7,
  //       available: ["monday", "friday"],
  //     },
  //     {
  //       id: 3,
  //       driver: "Aripin",
  //       code: "truck3",
  //       cost: 10000,
  //       capacity: 10,
  //       available: ["monday", "friday"],
  //     },
  //   ];

  //   let vol = 0;
  //   let final = [];
  //   let t = 0;
  //   let temp = [];
  //   for (let i = 0; i < resultTps.length; i++) {
  //     vol += resultTps[i].volume;

  //     if (vol <= resultTruck[t].capacity) {
  //       temp.push(resultTps[i]);
  //       if (i == resultTps.length - 1) {
  //         resultTruck[t].route = temp;
  //         final.push(resultTruck[t]);
  //       }
  //     } else {
  //       resultTruck[t].route = temp;
  //       final.push(resultTruck[t]);
  //       temp = [];
  //       vol = resultTps[i].volume;
  //       temp.push(resultTps[i]);
  //       t += 1;

  //       if (i == resultTps.length - 1) {
  //         resultTruck[t].route = temp;
  //         final.push(resultTruck[t]);
  //       }
  //     }
  //   }

  //   return res.send(final);
  // }
}

module.exports = OptimationController;
