"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nettruyen_1 = require("../controllers/nettruyen");
const router = (0, express_1.Router)();
router.get('/chapter', nettruyen_1.getChappters);
router.get('/chapter-detail', nettruyen_1.getChapDetail);
exports.default = router;
//# sourceMappingURL=nettruyenRouter.js.map