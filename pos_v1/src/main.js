function printInventory(inputs) {
  var result = "***<没钱赚商店>购物清单***\n";
  result += getShoppingList(populateInputs(inputs));
  result +='----------------------\n' +
  '挥泪赠送商品：\n';
  result += getGiftList(populateInputs(inputs));
  result+='----------------------\n';
  result += getTotalList(populateInputs(inputs));
  result +='**********************';
  console.log(result);
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
    result += generateEachItemInfo(barcode, shoppingItems, false);
  }
  return result;
}

function generateEachItemInfo(barcode, shoppingItems, isGift) {
    var amount = shoppingItems[barcode];
    var item = getItemByBarcode(loadAllItems(), barcode);
    var savingAmount = getSavingAmount(loadPromotions(), barcode, amount);
    var totalPrice = (amount - savingAmount) * item.price;
    if(!isGift){
      return "名称：" + item.name + "，数量：" + amount + item.unit +
          "，单价：" + item.price.toFixed(2) + "(元)，小计：" + totalPrice.toFixed(2) +"(元)\n";
    }
    return savingAmount+"" != "0" ? "名称："+item.name+"，数量："+savingAmount+item.unit+"\n" : "";
}

function getGiftList(shoppingItems){
  var result = "";
  for(var barcode in shoppingItems){
    result += generateEachItemInfo(barcode, shoppingItems, true);
  }
  return result;
}

function getTotalList(shoppingItems) {
  var totalPayedPrice = 0;
  var totalSavingPrice = 0;
  for(var barcode in shoppingItems) {
    var amount = shoppingItems[barcode];
    var item = getItemByBarcode(loadAllItems(), barcode);
    var savingAmount = getSavingAmount(loadPromotions(), barcode, amount);
    totalSavingPrice += savingAmount * item.price;
    totalPayedPrice += (amount - savingAmount) * item.price;
  }
  return '总计：' + totalPayedPrice.toFixed(2) + '(元)\n' +
        '节省：' + totalSavingPrice.toFixed(2) + '(元)\n';
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
