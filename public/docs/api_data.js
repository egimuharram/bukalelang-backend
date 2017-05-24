define({ "api": [
  {
    "type": "get",
    "url": "/auctions/:id",
    "title": "get auction by id",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>URL of image of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load list of auctions',\n    id: 23,\n    productId: '31fsa21',\n    title: 'Tamiya super cepat',\n    images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',\n    category: 'Mainan',\n    new: false,\n    weight: 1000,\n    description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n    min_price: 200000,\n    max_price: 3000000,\n    current_price: 600000,\n    kelipatan_bid: 20000,\n    start_date: '2017-04-16T18:22:54.846+07:00',\n    end_date: '2017-05-16T18:22:54.846+07:00'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'Auction with id 3 doesnt exist',\n    id: null,\n    productId: null,\n    title: null,\n    images: null,\n    category: null,\n    new: false,\n    weight: 0,\n    description: null,\n    min_price: 0,\n    max_price: 0,\n    current_price: 0,\n    kelipatan_bid: 0,\n    start_date: null,\n    end_date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsId",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/bid-history",
    "title": "get bid history",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load list of bid history',\n      auction_detail: {\n        id: 3,\n        title: 'Tamiya tanpa gaya gravitasi',\n        bid_count: 2\n      },\n   bid_history: [\n           {\n             name_of_bidder: 'Diky Arga',\n             bid_nominal: 70000,\n             bidding_time: '2017-05-17T18:22:54.846+07:00'\n           },\n           {\n             name_of_bidder: 'Eri Selalu',\n             bid_nominal: 60000,s\n             bidding_time: '2017-05-16T18:22:54.846+07:00'\n           }\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'Auction with id 3 doesnt exist',\n      auction_detail: {\n        id: null,\n        title: null,\n        bid_count: 0\n      },\n   bid_history: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdBidHistory",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/bid-history"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/:id/time-left",
    "title": "get time left of the auction by id",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "time_left",
            "description": "<p>time left of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load list of auctions',\n      time_left: 111000,\n    end_date: '2017-05-16T18:22:54.846+07:00'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'Auction with id 3 doesnt exist',\n      time_left: null,\n    end_date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsIdTimeLeft",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/:id/time-left"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions?limit=5&&page=2",
    "title": "get all auctions",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "auctions",
            "description": "<p>List of auctions.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.images",
            "description": "<p>URL of images of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auctions.new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": 'Success load list of auctions',\n  \"page\": 2,\n     \"limit\": 5,\n  \"auctions\": [\n        {\n         id: 23,\n         productId: '31fsa21',\n         title: 'Tamiya super cepat',\n         images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',\n         category: 'Mainan',\n         new: false,\n         weight: 1000,\n         description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n         min_price: 200000,\n         max_price: 3000000,\n         current_price: 600000,\n         kelipatan_bid: 20000,\n         start_date: '2017-04-16T18:22:54.846+07:00',\n         end_date: '2017-05-16T18:22:54.846+07:00'\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"message\": 'Fail load list of auctions',\n     \"page\": null,\n     \"limit\": null,\n  \"auctions\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsLimit5Page2",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions?limit=5&&page=2"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/search?query=tamiya",
    "title": "search auctions by title",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "auctions",
            "description": "<p>List of auctions.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.images",
            "description": "<p>URL of images of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auctions.new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auctions.description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctions.kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "auctions.end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": 'Success load list of auctions by title Tamiya',\n  \"auctions\": [\n        {\n         id: 23,\n         productId: '31fsa21',\n         title: 'Tamiya super cepat',\n         images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',\n         category: 'Mainan',\n         new: false,\n         weight: 1000,\n         description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n         min_price: 200000,\n         max_price: 3000000,\n         current_price: 600000,\n         kelipatan_bid: 20000,\n         start_date: '2017-04-16T18:22:54.846+07:00',\n         end_date: '2017-05-16T18:22:54.846+07:00'\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"message\": 'Fail load list of auctions',\n  \"auctions\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsSearchQueryTamiya",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/search?query=tamiya"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auctions/slug/:slug",
    "title": "get auction by slug",
    "group": "Auction",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Slug URL of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>URL of image of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "category",
            "description": "<p>category of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>current price of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load list of auctions',\n    id: 23,\n    productId: '31fsa21',\n    title: 'Tamiya super cepat',\n    slug: 'kamera-antik-jaman-belanda-8853e3',\n    images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',\n    category: 'Mainan',\n    new: false,\n    weight: 1000,\n    description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',\n    min_price: 200000,\n    max_price: 3000000,\n    current_price: 600000,\n    kelipatan_bid: 20000,\n    start_date: '2017-04-16T18:22:54.846+07:00',\n    end_date: '2017-05-16T18:22:54.846+07:00'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'Auction with id 3 doesnt exist',\n    id: null,\n    productId: null,\n    title: null,\n    slug: null,\n    images: null,\n    category: null,\n    new: false,\n    weight: 0,\n    description: null,\n    min_price: 0,\n    max_price: 0,\n    current_price: 0,\n    kelipatan_bid: 0,\n    start_date: null,\n    end_date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "GetAuctionsSlugSlug",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions/slug/:slug"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auctions",
    "title": "create auctions",
    "group": "Auction",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"userId\": 2,\n  \"bukalapakId\": 231232131,\n  \"token\": \"IniToken\",\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"categoryId\": 145,\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"imagesId\": 11122121, 11122333,\n  \"end_date\": 2017-09-14T00:00:00Z,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>bukalapakId of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token of logged in user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction, note : Nama barang hanya boleh berupa huruf, angka, spasi dan simbol &amp; . -,</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product (minimal 30 char)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auctions</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "imagesId",
            "description": "<p>image_id after upload image to BL (array of ids)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product at BL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>Url of image of auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category of the auction</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "new",
            "description": "<p>product is new or second ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "weight",
            "description": "<p>weight of the product using gram</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "min_price",
            "description": "<p>minimal / start price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "max_price",
            "description": "<p>maximal / buy now price of auctions</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "kelipatan_bid",
            "description": "<p>nominal lipatan of next bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>date of auction start, default is after published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>date end of auction, default is one week</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 23,\n  \"productId\": '42dfs34',\n  \"title\": \"Lelang Gundam Langka & Istimewa\",\n  \"images\": [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/lalalala.jpg?1352105447\"],\n     \"small_images: [\"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/IMG00475-20121105-1431.jpg?1352105447\", \"https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/lalalala.jpg?1352105447\"]\n  \"categoryId\": 145,\n  \"category\": 'Mainan',\n  \"new\": false,\n  \"weight\": 5000,\n  \"description\": \"Gundam dapet dari pembuatnya langsung lho\",\n  \"min_price\": 50000,\n  \"max_price\": 200000,\n  \"kelipatan_bid\": 10000,\n  \"end_date\": 2017-09-14T00:00:00Z,\n  \"userId\": 2,\n  \"success\": true,\n  \"message\": 'buat lelang berhasil',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"id\": null,\n   \"productId\": null,\n  \"title\": null,\n  \"images\": [],\n     \"small_images\": [],\n  \"categoryId\": null,\n  \"category\": null,\n  \"new\": false,\n  \"weight\": 0,\n  \"description\": null,\n  \"min_price\": 0,\n  \"max_price\": 0,\n  \"kelipatan_bid\": 0,\n  \"end_date\": null,\n  \"userId\": null,\n  \"success\": false,\n  \"message\": 'Buat lelang gagal ):',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auctions.js",
    "groupTitle": "Auction",
    "name": "PostAuctions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auctions"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "login",
    "group": "Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"dikyarga\",\n   \"password\": \"this_is_my_password!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>id of user in BukaLapak</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full Name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "saldo",
            "description": "<p>Balance of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success or not ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for authorization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"saldo\": 123000,\n  \"basic_token\": 'basic fjksafjkajkdsfsjfkdsafksafksa=',\n  \"token\": 'lalalalululululolololo',\n  \"success\": true,\n  \"message\": 'login success',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"saldo\": null,\n  \"basic_token\": null,\n  \"token\": null,\n  \"success\": false,\n  \"message\": 'email atau password salah',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostAuthLogin",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auth/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "register",
    "group": "Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Diky Arga\",\n  \"email\": \"dikyarga.id@gmail.com\",\n  \"username\": \"dikyarga\",\n   \"password\": \"this_is_my_password!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bukalapakId",
            "description": "<p>id of user in BukaLapak</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full Name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "saldo",
            "description": "<p>Balance of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success or not ?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for authorization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"bukalapakId\": 123121,\n  \"name\": \"Diky Arga\",\n  \"username\": \"dikyarga\",\n  \"email\": 'dikyarga.id@gmail.com',\n  \"saldo\": 123000,\n  \"token\": 'lalalalululululolololo',\n  \"basic_token\": 'basic fjksafjkajkdsfsjfkdsafksafksa=',\n  \"success\": true,\n  \"message\": 'login success',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"id\": null,\n  \"bukalapakId\": null,\n  \"name\": null,\n  \"username\": null,\n  \"email\": null,\n  \"saldo\": null,\n  \"token\": null,\n  \"basic_token\": null,\n  \"success\": false,\n  \"message\": 'email sudah terdaftar',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostAuthRegister",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/auth/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/bids",
    "title": "bid the auction",
    "group": "Bids",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"userid\": 2,\n  \"token\": \"IniToken\",\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userid",
            "description": "<p>userId of user</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token of logged in user</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"auctionId\": 101,\n  \"nextBid\": 120000,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "auctionId",
            "description": "<p>id of the auction</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "nextBid",
            "description": "<p>nominal of bidding offered</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>id of the bid</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "auctionId",
            "description": "<p>id of the auction bided</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bidding_time",
            "description": "<p>time of bidding</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is bidding process success ?</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "current_price",
            "description": "<p>currently highest bid</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "minimum_next_bidding",
            "description": "<p>minimum nominal for the next bidding</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'bidding success',\n  \"success\": true,\n  \"id\": 2345,\n  \"auctionId\": 101,\n  \"username\": 'dikyarga',\n  \"name\": 'Diky Arga',\n  \"bidding_time\": '2017-04-16 17:12:40.126+08',\n  \"current_price\": 40000,\n  \"minimum_next_bidding\": 50000,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": 'bidding fail',\n  \"success\": false,\n  \"id\": null,\n  \"username\": null,\n  \"name\": null,\n  \"id\": null,\n  \"bidding_time\": null,\n  \"current_price\": null,\n  \"minimum_next_bidding\": null,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/bids.js",
    "groupTitle": "Bids",
    "name": "PostBids",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/bids"
      }
    ]
  },
  {
    "type": "get",
    "url": "/ping",
    "title": "Ping server",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"status\": \"up\",\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Status",
    "name": "GetPing",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/ping"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "get user detail informations",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load detail of user',\n      user_detail: {\n        id: 3,\n        name: 'Diky Arga',\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'User with id 3 not found',\n      user_detail: {\n        id: null,\n        name: null,\n      }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersId",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id/auctions-joined",
    "title": "get list of auctions joined",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is request success ?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Success load list of auction joined',\n      user_detail: {\n        id: 3,\n        name: 'Diky Arga',\n        auctionsJoinedCount: 5,\n        wonAuctionsCount: 2\n      },\n   auctionsJoined: [\n           {\n             auctionId: 2,\n             running: true,\n             title: 'Gundam ukuran asli'\n           },\n           {\n             auctionId: 3,\n             running: false,\n             title: 'Tamiya tanp gravitasi'\n           },\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   success: false,\n   message: 'User with id 3 not found',\n      user_detail: {\n        id: null,\n        name: null,\n        auctionsJoinedCount: 0,\n        wonAuctionsCount: 0\n      },\n   auctionsJoined: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersIdAuctionsJoined",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/:id/auctions-joined"
      }
    ]
  }
] });
