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
  for(var i = 0; i < items.length; i++) {
    if(items[i].barcode == barcode) return items[i];
  }
  return null;
}

function getSavingAmount(promotes, barcode, amount) {
  var free=0;
  for(var i=0;i<promotes.length;i++){
    if(promotes[i].type=="BUY_TWO_GET_ONE_FREE"){
      free += getSavingAmountWhenBuyTwoFreeOne(promotes[i].barcodes,barcode,amount);
    }
  }
  return free;
}

function getSavingAmountWhenBuyTwoFreeOne(barcodes,barcode,amount){
  for(var j=0;j<barcodes.length;j++){
    if(barcodes[j]==barcode){
      return Math.floor(amount / 3);
    }
  }
  return 0;
}

function getShoppingList(shoppingItems) {
  var result = "";
  for(var barcode in shoppingItems) {
    result += generateEachItemInfo(barcode, shoppingItems);
  }
  return result;
}

function generateEachItemInfo(barcode, shoppingItems) {
    var amount = shoppingItems[barcode];
    var item = getItemByBarcode(loadAllItems(), barcode);
    var savingAmount = getSavingAmount(loadPromotions(), barcode, amount);
    var totalPrice = (amount - savingAmount) * item.price;
    return "名称：" + item.name + "，数量：" + amount + item.unit +
        "，单价：" + item.price.toFixed(2) + "(元)，小计：" + totalPrice.toFixed(2) +"(元)\n";
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
