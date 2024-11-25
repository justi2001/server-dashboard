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
exports.getData = exports.update = exports.getAll = exports.addnew = void 0;
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const addnew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const item = new ReviewModel_1.default(body);
        yield item.save();
        res.status(200).json({
            data: item,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.addnew = addnew;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, limit } = req.query;
    try {
        const items = yield ReviewModel_1.default.find({ parentId: id }).limit(limit !== null && limit !== void 0 ? limit : 5);
        res.status(200).json({
            data: items,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getAll = getAll;
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const items = yield ReviewModel_1.default.find({ parentId: id });
        res.status(200).json({
            data: {
                count: items.reduce((a, b) => a + b.star, 0) / items.length,
                total: items.length,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getData = getData;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield ReviewModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: 'Updated',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.update = update;
//# sourceMappingURL=reviewController.js.map