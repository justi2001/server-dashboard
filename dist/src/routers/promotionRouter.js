"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protions_1 = require("../controllers/protions");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get('/', protions_1.getPromotions);
router.use(verifyToken_1.verifyToken);
router.get('/check', protions_1.checkDisCountCode);
router.post('/add-new', protions_1.addNew);
router.put('/update', protions_1.update);
router.delete('/remove', protions_1.remove);
exports.default = router;
//# sourceMappingURL=promotionRouter.js.map