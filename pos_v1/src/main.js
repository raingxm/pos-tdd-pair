function printInventory(inputs) {

}

function populateInputs(inputs) {
  var goodMap = {};
  for(var i = 0; i < inputs.length; i++) {
    var barcode = getBarcodeFromEachInput(inputs[i]);
    var amount = getAmountFromEachInput(inputs[i]);
    if(goodMap.hasOwnProperty(barcode)) {
      goodMap[barcode] += amount;
    }else {
      goodMap[barcode] = amount;
    }
  }
  return goodMap;
}

function getItemByBarcode(items, barcode) {
  for(var i = 0; items.length; i++) {
    if(items[i].barcode == barcode) return items[i];
  }
  return null;
}

function getBarcodeFromEachInput(input) {
  if(isWeighingFood(input)) return input.split('-')[0];
  return input;
}

function getAmountFromEachInput(input) {
  if(isWeighingFood(input)) return parseInt(input.split('-')[1]);
  return 1;
}

function isWeighingFood(input) {
  return input.indexOf('-') >= 0;
}
