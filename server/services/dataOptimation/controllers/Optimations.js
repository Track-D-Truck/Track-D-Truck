const axios = require("axios");
const { TPStorage } = require(`../models`);
const { Truck, Driver } = require(`../models`);
const nextOrder = require("../helpers/lexicographic");
const factorial = require("../helpers/factorial");

let GMAPS_API_KEY = "AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc";

class OptimationController {
  static async test(req, res, next) {
    //DATA TRUCK ACTIVE
    const activeTruck = await Truck.findAll({
      order: [["id", "ASC"]],
      include: [Driver],
      where: {
        status: "available",
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
      name: "Pool Dump Truck",
      location: "-6.891205299999999, 107.6266582",
    };

    let tpa = {
      name: "TPA Legok Nangka",
      location: "-7.020695399999999, 107.9047481",
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
        console.log(err, "<<eror filter TPS");
        next(err);
      });


    //HIT GMAPS API
    let destination = "";
    activeTPS.forEach((element) => {
      destination = destination + "|" + element.location;
    });

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pool.location}&destination=${tpa.location}&waypoints=optimize:true${destination}&sensor=false&key=${GMAPS_API_KEY}`;

    const temp = await axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        let res = response.data.routes[0].legs;
        return res;
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });


    //Route Optimation
    let routeOptimation = [];
    for (let x = 0; x < temp.length - 1; x++) {
      let tps = {
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
   
    let schemas = [];
    // return res.send(routeOptimation)
    //Capacity Optimation
    let init = activeTruck;
    let fctrl = factorial(activeTruck.length);
    let bestCost = 0
    let bestSchema = []

    for (let x = 0; x < fctrl; x++) {
      let vol = 0;
      let final = [];
      let t = 0;
      let t2 = 1;
      let strg = [];
      let totalDistance = 0
      let totalCostSchema = 0
      for (let i = 0; i < routeOptimation.length; i++) {
        vol += routeOptimation[i].volume;

        if (vol <= init[t].capacity) {
          strg.push(routeOptimation[i]);
          if (i == routeOptimation.length - 1) {
            final.push({
              truck: init[t],
              route: strg,
              totalVolume: vol
            });
            t += 1;
          }
        } else {
          final.push({
            truck: init[t],
            route: strg,
            totalVolume: vol - routeOptimation[i].volume
          });
          strg = [];
          vol = routeOptimation[i].volume;
          strg.push(routeOptimation[i]);
          t += 1;

          if (i == routeOptimation.length - 1) {
            final.push({
              truck: init[t],
              route: strg,
              totalVolume: vol
            });
          }
        }

        //Jika truck sudah penuh
        if (t == t2) {
          t2 += 1;
          let destination = "";
          final[t - 1].route.forEach((element) => {
            destination = destination + "|" + element.location;
          });

          final[t - 1].destination = destination;


          //Tembak axios lagi (bukan length terakhir)
          if (destination) {
            const dataSatuan = await axios({
              method: "get",
              url: `https://maps.googleapis.com/maps/api/directions/json?origin=${pool.location}&destination=${tpa.location}&waypoints=optimize:true${destination}&sensor=false&key=${GMAPS_API_KEY}`,
            })
              .then((response) => {
                let res = response.data.routes[0].legs;
                return res;
              })
              .catch((err) => {
                console.log(err);
                res.send(err);
              });

            for (let j = 0; j < dataSatuan.length; j++) {
              totalDistance += dataSatuan[j].distance.value;
            }

            final[t - 1].totalDistance = totalDistance;
            final[t - 1].totalCost = totalDistance * init[t-1].cost
            totalCostSchema += final[t - 1].totalCost
            totalDistance = 0
          }

          //Data yang terakhir && belum ketembak
          if (i == routeOptimation.length - 1 && final[t]) {
            let destination = "";
            final[t].route.forEach((element) => {
              destination = destination + "|" + element.location;
            });

            final[t].destination = destination;
            
            const dataSatuan = await axios({
              method: "get",
              url: `https://maps.googleapis.com/maps/api/directions/json?origin=${pool.location}&destination=${tpa.location}&waypoints=optimize:true${destination}&sensor=false&key=${GMAPS_API_KEY}`,
            })
              .then((response) => {
                let res = response.data.routes[0].legs;
                return res;
              })
              .catch((err) => {
                console.log(err);
                res.send(err);
              });
              
            for (let j = 0; j < dataSatuan.length; j++) {
              totalDistance += dataSatuan[j].distance.value;
            }

            final[t].totalDistance = totalDistance;
            final[t].totalCost = totalDistance * init[t].cost
            totalCostSchema += final[t].totalCost
            totalDistance = 0
          }


        }



      }

      //Cari best Cost
      if(x == 0) {
        bestCost = totalCostSchema
        bestSchema = final
      }

      if(totalCostSchema < bestCost) {
        bestCost = totalCostSchema
        bestSchema = final
      }

      schemas.push({ totalCostSchema: totalCostSchema, schema: final });

      let store = nextOrder(init);
      init = store;
    }

    //HASIL ALL
    // return res.send(schemas);
    //HASIL BEST SCHEMA
    // return res.send({bestCost, bestSchema});
    //HASIL COMBINE
    return res.send({BEST:{bestCost: bestCost, bestSchema: bestSchema}, ALL:schemas});
  }
}

module.exports = OptimationController;
