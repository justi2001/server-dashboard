"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDisCountCode = exports.remove = exports.update = exports.getPromotions = exports.addNew = void 0;
const PromotionModel_1 = __importDefault(require("../models/PromotionModel"));
const addNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const item = new PromotionModel_1.default(body);
        yield item.save();
        res.status(200).json({
            message: 'Added',
            data: item,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.addNew = addNew;
const checkDisCountCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const item = yield PromotionModel_1.default.findOne({ code });
        if (!item) {
            throw new Error('Invalid code');
        }
        if (item.numOfAvailable <= 0) {
            throw new Error('Code is unavailable');
        }
        const now = Date.now();
        if (new Date(item.startAt).getTime() > now) {
            throw new Error('code is not start time');
        }
        if (item.endAt && now > new Date(item.endAt).getTime()) {
            throw new Error('code is ended');
        }
        res.status(200).json({
            message: 'Promotion values',
            data: {
                value: item._doc.value,
                type: item._doc.type,
            },
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.checkDisCountCode = checkDisCountCode;
const getPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    try {
        const items = yield PromotionModel_1.default.find({ isDeleted: false }).limit(limit);
        res.status(200).json({
            message: 'Added',
            data: items,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPromotions = getPromotions;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield PromotionModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: 'Updated',
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield PromotionModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Deleted',
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.remove = remove;
//# sourceMappingURL=protions.js.map