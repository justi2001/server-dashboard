"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const router = (0, express_1.Router)();
router.post('/add-new', customers_1.create);
router.put('/verify', customers_1.getVerifiCode);
router.get('/resend-verify', customers_1.resendCode);
router.get('/profile', customers_1.getProfile);
router.post('/login', customers_1.login);
exports.default = router;
//# sourceMappingURL=customerRouter.js.map