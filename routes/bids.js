var express = require('express');

var router = express.Router();

let bidController = require('../controllers/bidController')

/**
 * @api {post} /bids bid the auction
 * @apiGroup Bids
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *       "token": "AngapAjaIniToken",
 *       "auctionId": 101,
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {Integer} auctionId id of the auction

 * @apiSuccess {Integer} id id of the bid
 * @apiSuccess {Integer} auctionId id of the auction bided
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is bidding process success ?
 * @apiSuccess {Integer} current_price currently highest bid
 * @apiSuccess {Integer} minimum_next_bidding minimum nominal for the next bidding

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "message": 'bidding success',
 *      "success": true,
 *      "id": 2345,
 *      "auctionId": 101,
 *      "current_price": 40000,
 *      "minimum_next_bidding": 50000,
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *      "message": 'bidding fail',
 *      "success": false,
 *      "id": null,
 *      "auctionId": null,
 *      "current_price": null,
 *      "minimum_next_bidding": null,
 *    }]
 */
router.post('/', bidController.bid)

module.exports = router;
