const lodash = require('lodash');
const delay = require('delay');
const pMap = require('p-map');

if (false) {
  const order = {
    naem: 'xx',
    listItem: [{
      name: [{
        price: {
          min: 100,
        },
      }],
    }],
  };

  const product = {
    a: {
      b: {
        c: {
          d: 5,
        },
      },
    },
  };

  lodash.get(order, 'listItem[0].name[0].price.min', 0); // Value
  lodash.has(order, 'listItem[0].name[0].price.min'); // True Fale
  lodash.set(product, 'a.b.c.d', 5); // Set
}

if (false) {
  const api = async () => {
    console.time('API');
    const list = [30, 12, 3, 20, 5, 6, 7, 8];
    await pMap(list, async (item, index) => {
      await delay(item * 1000);
      console.log({
        end: item,
        index,
      });
    }, {
      concurrency: 5,
    });
    console.timeEnd('API');
  };

  api();
}
