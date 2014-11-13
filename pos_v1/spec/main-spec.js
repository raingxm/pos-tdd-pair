describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should populate items from input properly', function() {
      var inputs = [
          'ITEM000001',
          'ITEM000001',
          'ITEM000002',
          'ITEM000002',
          'ITEM000003-2',
          'ITEM000005',
      ];
      var expected = {
        'ITEM000001': 2,
        'ITEM000002': 2,
        'ITEM000003': 2,
        'ITEM000005': 1
      };
      var result = populateInputs(inputs);
      expect(result).toEqual(expected);
    });

    it('should get item name unit price from barcode', function() {
      var items = [
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50
          }
      ];
      var itemBarcode = "ITEM000001";
      var expected = {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      };
      var result = getItemByBarcode(items, itemBarcode);
      expect(result).toEqual(expected);
    });

    it('get saving amount', function() {

      var barcode = "ITEM000001";
      var amount = 3;
      var promotes = [ {
          type: 'BUY_TWO_GET_ONE_FREE',
          barcodes: [
              'ITEM000000',
              'ITEM000001',
              'ITEM000005'
          ]
        }
      ];

      var result = getSavingAmount(promotes, barcode, amount);
      var expected = 1;
      expect(result).toEqual(expected);
    });

    it('get shopping list',function(){
      var shoppingItems = {
        'ITEM000001': 5,
        'ITEM000003': 2,
        'ITEM000005': 3
      };
      var result = getShoppingList(shoppingItems);
      var expected = "名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n" +
                     "名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n" +
                     "名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n";
      expect(result).toEqual(expected);
    });

    xit('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
