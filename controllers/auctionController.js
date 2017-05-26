let axios = require('axios')
let _ = require('lodash')
let moment = require('moment')
var slug = require('slug')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')
let auctionWinnerJob = require('../helpers/auctionWinnerJob')

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  create: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      new: false,
      weight: 0,
      description: null,
      location: null,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Buat lelang gagal ):',
    }
    // console.log('isi request : ', req.body);
    // upload image first
    // imageUploader.uploadToBukaLapak(req, res)

    // get brand first
    axios({
      method: 'get',
      url: blEndPoint + 'categories/'+ req.body.categoryId +'/attributes.json',
      auth: {
        username: req.body.bukalapakId,
        password: req.body.token
      }
    }).then((attributes) => {
      // console.log('isi attributes : ', attributes.data);
      let productData = {
        product: {
          category_id: req.body.categoryId,
          name: req.body.title,
          new: req.body.new,
          price: req.body.max_price,
          negotiable: true,
          weight: req.body.weight,
          stock: 1,
          description_bb: req.body.title + ' ini sedang di lelang di BukaLelang App, silahkan unduh aplikasi BukaLelang untuk mengikuti lelang sekarang! Deskripsi barang : ' + req.body.description,
          product_detail_attributes: {}
        },
        images: req.body.imagesId,
      }
      // add attributes to product
      let attributesLength = attributes.data.attributes.length
      if (attributesLength != 0) {
        for (var i = 0; i < attributesLength; i++) {
          productData.product.product_detail_attributes[attributes.data.attributes[i].fieldName] = attributes.data.attributes[i].options[0] || 'null'
        }
      }

      // creat product to BL
      axios({
        method: 'post',
        url: blEndPoint + 'products.json',
        auth: {
          username: req.body.bukalapakId,
          password: req.body.token
        },
        data: productData
      }).then((responseAfterCreateProduct) => {
        // console.log('response dari BL setelah coba create product : ', responseAfterCreateProduct.data);
        switch (responseAfterCreateProduct.data.status) {
          case 'ERROR':
            finalResult.message = responseAfterCreateProduct.data.message
            res.json(finalResult)
            break;
          case 'OK':
            // create auction in local
            console.log('isi endDateFromAndroid', req.body.endDateFromAndroid);
            let endDate = null
            if (req.body.endDateFromAndroid != null) {
              endDate = moment(req.body.endDateFromAndroid,"DD-MM-YYYY HH:mm").utcOffset(420).format()
            } else {
              endDate = req.body.end_date
            }

            if (endDate == null) {
              console.log('kemari');
              endDate = moment().add(2, 'days').format()
            }

            console.log('endDate', endDate);
            models.Auction.create({
              productId: responseAfterCreateProduct.data.product_detail.id,
              title: req.body.title,
              slug: slug(req.body.title + ' ' +responseAfterCreateProduct.data.product_detail.id, {lower: true}) ,
              images: responseAfterCreateProduct.data.product_detail.images[0],
              categoryId: req.body.categoryId,
              min_price: req.body.min_price,
              max_price: req.body.max_price,
              description: req.body.description,
              new: req.body.new,
              weight: req.body.weight,
              kelipatan_bid: req.body.kelipatan_bid,
              location: responseAfterCreateProduct.data.product_detail.city,
              start_date: new Date(),
              end_date: endDate,
              userId: req.body.userId
            }).then((auction) => {
              // save all images one by one
              let images = []
              for (var i = 0; i < responseAfterCreateProduct.data.product_detail.images.length; i++) {
                images.push({
                  imageUrl: responseAfterCreateProduct.data.product_detail.images[i],
                  smallImageUrl: responseAfterCreateProduct.data.product_detail.small_images[i],
                  auctionId: auction.id
                })
              }
              models.ProductImage.bulkCreate(images).then(() => {
                console.log('YEAH! all images inserted');
              })

              // ambil nama category nya
              models.Category.findById(auction.categoryId).then(category => {
                if (category) {
                  finalResult.id = auction.id
                  finalResult.productId = auction.productId
                  finalResult.title = auction.title
                  finalResult.slug = auction.slug
                  finalResult.images = responseAfterCreateProduct.data.product_detail.images
                  finalResult.small_images = responseAfterCreateProduct.data.product_detail.small_images
                  finalResult.categoryId = auction.categoryId
                  finalResult.category = category.name
                  finalResult.new = auction.new
                  finalResult.weight = auction.weight
                  finalResult.description = auction.description
                  finalResult.location = responseAfterCreateProduct.data.product_detail.city
                  finalResult.min_price = auction.min_price
                  finalResult.max_price = auction.max_price
                  finalResult.kelipatan_bid = auction.kelipatan_bid
                  finalResult.start_date = auction.start_date
                  finalResult.end_date = auction.end_date
                  finalResult.success = true
                  finalResult.status = "OK"
                  finalResult.userId = auction.userId
                  finalResult.message = 'Sukses buat lelang!'

                  auctionWinnerJob.auctionWinnerJob(auction.id, auction.end_date) //Check winner every auction

                  global.io.emit('new-auction', finalResult);

                  res.json(finalResult)

                } else {
                  console.log('tidak ada category dengan id : ', auction.categoryId);
                }
              })
            }).catch(err => {
              console.log('error when try create auction in localdb', err);
              res.json(finalResult)
            })
            break;
          default:
          res.json(finalResult)
        }
      }).catch((err) => {
        console.log('error when trying to create product to BL : ', err);
        res.json(finalResult)
      })
    }).catch((err) => {
      console.log('error when try to get attributes : ', err);
    })
  },

  getAllAuctions: (req, res) => {
    let limitPerPage = req.query.limit || 10
    let page = req.query.page || 1
    let offset = (page - 1) * limitPerPage

    let finalResult = {
      success: false,
      status: "ERROR",
      message: 'Fail get list of auctions',
      limit: null,
      page: null,
      auctions: []
    }

    models.Auction.findAll({
      include:[{
        model: models.Category
      },{
        model: models.User
      },{
        model: models.Bid
      },{
        model: models.ProductImage
      }],
      limit: limitPerPage,
      offset: offset,
      order: [['id', 'DESC']]
    }).then(auctions => {
      // res.json(auctions)
      let auctionsArr = JSON.parse(JSON.stringify(auctions));
      auctionsArr = _.orderBy(auctionsArr, ['id'], ['desc'])
      let takeLatestAuction = _.take(auctionsArr, 10)
      const newAuctions = takeLatestAuction.map(auction => {
        return Object.assign({}, auction, {
          isRunning: moment(auction.end_date).format() >= moment().format() ? 1 : 0,
          running: moment(auction.end_date).format() >= moment().format() ? true : false,
          images: convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl'),
          small_images: convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl'),
          categoryName: auction.Category.name,
          current_price: auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid,
          name: auction.User.name,
          time_left: getMinutesBetweenDates(new Date(), new Date(auction.end_date))
        })
      });
      // cleaning unnecessary data
      for (var i = 0; i < newAuctions.length; i++) {
        delete newAuctions[i].Category
        delete newAuctions[i].User
        delete newAuctions[i].Bids
        delete newAuctions[i].ProductImages
        delete newAuctions[i].categoryId
        delete newAuctions[i].createdAt
        delete newAuctions[i].updatedAt
      }

      finalResult.success = true
      finalResult.status = "OK"
      finalResult.limit = limitPerPage
      finalResult.page = page
      finalResult.message = 'success load list of auctions'
      finalResult.auctions = newAuctions
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try list auction in localdb', err);
      res.json(finalResult)
    })
  },
  searchByTitle: (req, res) => {
    console.log('--------------', req.query.query);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: 'Fail get list of auctions',
      auctions: []
    }

    models.Auction.findAll({
      include:[{
        model: models.Category
      },{
        model: models.User
      },{
        model: models.Bid
      },{
        model: models.ProductImage
      }],
      where: {
        title:{
          $ilike:`%${req.query.query}%`
        }
      }
    }).then(auctions => {
      if (auctions.length == 0) {
        finalResult.message = 'auction with title : ' + req.query.query + ' : not found'
        res.json(finalResult)
      }
      let auctionsArr = JSON.parse(JSON.stringify(auctions));
      auctionsArr = _.orderBy(auctionsArr, ['id'], ['desc'])
      let takeLatestAuction = _.take(auctionsArr, 15)
      const newAuctions = takeLatestAuction.map(auction => {
        return Object.assign({}, auction, {
          isRunning: moment(auction.end_date).format() >= moment().format() ? 1 : 0,
          running: moment(auction.end_date).format() >= moment().format() ? true : false,
          images: convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl'),
          small_images: convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl'),
          categoryName: auction.Category.name,
          current_price: auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid,
          name: auction.User.name,
          time_left: getMinutesBetweenDates(new Date(), new Date(auction.end_date))
        })
      });

      for (var i = 0; i < newAuctions.length; i++) {
        delete newAuctions[i].Category
        delete newAuctions[i].User
        delete newAuctions[i].Bids
        delete newAuctions[i].ProductImages
        delete newAuctions[i].categoryId
        delete newAuctions[i].createdAt
        delete newAuctions[i].updatedAt
      }
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.message = 'success load list of auctions with title : ' + req.query.query + ' : found ' + auctions.length + ' auctions'
      finalResult.auctions = newAuctions
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try list auction in localdb', err);
      res.json(finalResult)
    })
  },

  timeLeft: (req, res) => {
    // init repsonse
    var finalResult = {
      time_left: null,
      end_date: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findById(req.params.id).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.id + ' tidak ditemukan'
        res.json(finalResult)
      }
      var endDate = new Date(auction.end_date);
      finalResult.time_left = getMinutesBetweenDates(new Date(), endDate)

      finalResult.end_date = auction.end_date
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.message = 'Sukses ngambil time left auction'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult)
    })
  },
  show: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: 0,
      isRunning: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.ProductImage
      }, {
        model: models.Category
      }]
    }).then(auction => {
      // console.log('isi auciton L --------', auction.Category);
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.id + ' tidak ditemukan'
        res.json(finalResult)
      }
      finalResult.id = auction.id
      finalResult.productId = auction.productId
      finalResult.title = auction.title
      finalResult.slug = auction.slug
      finalResult.images = convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl')
      finalResult.small_images = convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl')
      finalResult.categoryId = auction.categoryId
      finalResult.categoryName = auction.Category.name
      finalResult.new = auction.new
      finalResult.weight = auction.weight
      finalResult.description = auction.description
      finalResult.min_price = auction.min_price
      finalResult.max_price = auction.max_price
      finalResult.kelipatan_bid = auction.kelipatan_bid
      finalResult.start_date = auction.start_date
      finalResult.end_date = auction.end_date
      finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
      finalResult.running = moment(auction.end_date).format() >= moment().format() ? true : false
      finalResult.isRunning = moment(auction.end_date).format() >= moment().format() ? 1 : 0
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.userId = auction.userId
      finalResult.message = 'Sukses ngambil satu auction'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult)
    })
  },
  findAuctionBySlug: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: null,
      isRunning: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findOne({
      where: {
        slug: req.params.slug
      },
      include: [{
        model: models.ProductImage
      }, {
        model: models.Category
      }]
    }).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan slug ' + req.params.slug + ' tidak ditemukan'
        res.json(finalResult)
      }
      finalResult.id = auction.id
      finalResult.productId = auction.productId
      finalResult.title = auction.title
      finalResult.slug = auction.slug
      finalResult.images = convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl')
      finalResult.small_images = convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl')
      finalResult.categoryId = auction.categoryId
      finalResult.categoryName = auction.Category.name
      finalResult.new = auction.new
      finalResult.weight = auction.weight
      finalResult.description = auction.description
      finalResult.min_price = auction.min_price
      finalResult.max_price = auction.max_price
      finalResult.kelipatan_bid = auction.kelipatan_bid
      finalResult.start_date = auction.start_date
      finalResult.end_date = auction.end_date
      finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
      finalResult.running = moment(auction.end_date).format() >= moment().format() ? true : false
      finalResult.isRunning = moment(auction.end_date).format() >= moment().format() ? 1 : 0
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.userId = auction.userId
      finalResult.message = 'Sukses ngambil satu auction berdasarkan slug'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult)
    })
  },

  bidHistory: (req, res) => {
    console.log('isi request params', req.params);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: 'Fail to get list of bid history',
      auction_detail: {
        id: null,
        title: null,
        bid_count: 0
      },
      bid_history: []
    }

    models.Auction.findById(req.params.id).then(auction => {
      if (auction) {
        models.Bid.findAll({
          where: {
            auctionId: req.params.id
          },
          include: [{
            model: models.User
          }]
        }).then(bids => {
          let bidsLength = bids.length
          if (bidsLength != 0) {
            let sortedBids = _.orderBy(bids, ['id'], ['desc'])
            let lastestTenBids = _.take(sortedBids, 10)
            let bidHistoryArr = JSON.parse(JSON.stringify(lastestTenBids))
            const newBidHistory = bidHistoryArr.map(bid => {
              return Object.assign({}, bid, {
                name_of_bidder: bid.User.name,
                avatarUrl: bid.User.avatarUrl,
                bid_nominal: bid.current_bid,
                bidding_time: bid.createdAt
              })
            })

            for (var i = 0; i < newBidHistory.length; i++) {
              delete newBidHistory[i].User
              delete newBidHistory[i].id
              delete newBidHistory[i].userId
              delete newBidHistory[i].auctionId
              delete newBidHistory[i].updatedAt
              delete newBidHistory[i].createdAt
              delete newBidHistory[i].current_bid
              delete newBidHistory[i].User
            }

            finalResult.message = 'success get bid history'
            finalResult.success = true
            finalResult.status = "OK"
            finalResult.auction_detail.id = auction.id
            finalResult.auction_detail.bid_count = bidsLength
            finalResult.auction_detail.title = auction.title
            finalResult.bid_history = newBidHistory

            res.json(finalResult)
          } else {
            finalResult.success = true
            finalResult.message = 'No bid history for this auction yet'
            res.json(finalResult)
          }
        })
      } else {
        finalResult.message = 'auction dengan id ' + req.params.id + ' tidak di temukan'
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('Error when try to get auction by id : ', err);
    })
  }
}

// to get milisecond of time left
function getMinutesBetweenDates(startDate, endDate) {
  var diff = endDate.getTime() - startDate.getTime();
  return diff;
}

function convertArrayOfObjectIntoArray(arrayOfImages, propertyName) {
  let images = []
  for (var i = 0; i < arrayOfImages.length; i++) {
    images.push(arrayOfImages[i][propertyName])
  }
  return images
}
