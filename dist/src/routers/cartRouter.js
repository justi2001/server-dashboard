"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const router = (0, express_1.Router)();
router.post('/add-new', cartController_1.addProduct);
router.put('/update', cartController_1.updateProductInCart);
router.get('/', cartController_1.getCartItems);
router.delete('/remove', cartController_1.removeCartItem);
router.post('/add-new-address', cartController_1.addNewAddress);
router.get('/get-address', cartController_1.getAddressByUser);
router.delete('/remove-address', cartController_1.deleteAddress);
router.put('/update-address', cartController_1.updateAddress);
exports.default = router;
//# sourceMappingURL=cartRouter.js.map