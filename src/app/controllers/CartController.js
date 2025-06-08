class CartController {
    index(req, res) {
        res.render('cart');
    }
    show(req, res) {
        res.render('cartDetail');
    }
}
module.exports = new CartController();
