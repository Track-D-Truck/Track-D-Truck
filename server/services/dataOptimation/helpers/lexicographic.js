const swap = require("./swap");

//Lexicographic
function nextOrder(truck) {
//   count++;
  var largestI = -1
  for (var i = 0; i < truck.length - 1; i++) {
    if (truck[i].dataValues.id < truck[i + 1].dataValues.id) {
      largestI = i;
    }
  }

  if (largestI == -1) {
      return truck
  }

  var largestJ = -1
  for (var j = 0; j < truck.length; j++) {
    if (truck[largestI].dataValues.id < truck[j].dataValues.id) {
      largestJ = j;
    }
  }

  let newTruckArr = swap(truck, largestI, largestJ);

  let endArray = newTruckArr.splice(largestI + 1);
  endArray.reverse();
  newTruckArr = newTruckArr.concat(endArray);

  return newTruckArr
}

module.exports = nextOrder;
