function swap(truck, i, j) {
    var temp = truck[i];
    truck[i] = truck[j];
    truck[j] = temp;

    return truck
  }

  module.exports = swap