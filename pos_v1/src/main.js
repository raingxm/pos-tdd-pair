function printInventory(inputs) {

}

function populateInputs(inputs) {
  var goodMap = {};
  var barcode = "";
  var amount = 0;
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].indexOf('-') >= 0) {
      barcode = inputs[i].split('-')[0];
      amount = parseInt(inputs[i].split('-')[1]);
      goodMap[barcode] = amount;
      continue;
    }

    barcode = inputs[i];
    if(goodMap[barcode]) {
      goodMap[barcode]++;
    }else {
      goodMap[barcode] = 1;
    }
  }
  return goodMap;
}
