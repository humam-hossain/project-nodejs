const Product = require("../models/product");

// show all products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/admin-product-list", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log("controller Product.fetchAll() failed!\n");
      console.log(err);
    });
};

// add product
exports.getAddProduct = (req, res, next) => {
  res.render("admin/admin-product-edit", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );

  product
    .save()
    .then((result) => {
      //   console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// edit product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const id = req.params.productID;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/admin-product-edit", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        edit: editMode,
        product: product,
      });
    })
    .catch((err) => {
      // console.log("controller/getEditProduct/Product.findById(id) failed!\n");
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl, id);

  product
    .save()
    .then((result) => {
      console.log("Updated Products!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      // console.log("controller/postEditProduct()/product.save() failed!");
      console.log(err);
    });
};

// delete products
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  // console.log(productId);
  Product.deleteById(productId)
    .then((result) => {
      console.log(productId + " is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/admin/products");
};
