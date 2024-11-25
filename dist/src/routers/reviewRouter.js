"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get('/', reviewController_1.getAll);
router.use(verifyToken_1.verifyToken);
router.post('/add-new', reviewController_1.addnew);
router.put('/update', reviewController_1.update);
router.get('/get-start-count', reviewController_1.getData);
exports.default = router;
//# sourceMappingURL=reviewRouter.js.map