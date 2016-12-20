var express = require('express');
var router = express.Router();
// var csrf = require('csurf')


var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
// var csrfProtection = csrf();
// /* GET home page. */
// router.get('/', function(req,res,next){
// 	res.render('index',{title:'Shopping Cart'});
// })


// router.use(csrfProtection);
router.get('/', function(req, res, next) {

var successMsg = req.flash('success')[0];
  Product.find(function(err,docs){
  	// console.log(docs);
  	// console.log(typeof docs);
  	var productChucks = [];//最终传给界面
  	var chuckSize = 4;

  	for(var index = 0; index < docs.length; index += chuckSize){//以2增长
  		productChucks.push(docs.slice(index, index + chuckSize));//二维数组 每4个对象一行
  	}
  	res.render('index',{title: 'shopping cart',products:productChucks, successMsg: successMsg, noMessages: !successMsg});
  })
});

//把cart存在session中
router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});


router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
  if (!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next){
  if (!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.totalPrice});

});

router.post('/checkout', isLoggedIn, function(req, res, next){
  if (!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var order = new Order({
    user: req.user,  //passport help put user in req
    cart: cart,
    name: req.body.name  
  });
  order.save(function(err, result){
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');


  });
  
});
module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  //url: the user try to access
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
