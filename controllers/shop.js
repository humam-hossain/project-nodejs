const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      // console.log("controller Prduct.fetchAll() error: ");
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      // console.log("controller Prduct.fetchAll() error: ");
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productID;

  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        docTitle: "product",
        path: "/products",
        product: product,
      });
    })
    .catch((err) => {
      // console.log("controller Product.findById() error: ");
      console.log(err);
    });
};

// exports.getCart = (req, res, next) => {
//   Cart.getCart((cart) => {
//     // console.log(cart);
//     Product.fetchAll((products) => {
//       const cartProducts = [];

//       for (product of products) {
//         const cartProductsData = cart.products.find(
//           (prod) => prod.id == product.id
//         );

//         if (cartProductsData) {
//           cartProducts.push({
//             productData: product,
//             qty: cartProductsData.qty,
//           });
//         }
//       }

//       // console.log(cartProducts);
//       res.render("shop/cart", {
//         path: "/cart",
//         docTitle: "Your cart",
//         products: cartProducts,
//       });
//     });
//   });
// };

exports.postCart = (req, res, next) => {
  const { productID } = req.body;
  console.log(productID);
  
  Product.findById(productID).then(product=>{
    // console.log(product);
    return req.user.addToCart(product);
  }).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  });
  res.redirect("/products");
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.prodId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     docTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     docTitle: "Checkout",
//   });
// };
