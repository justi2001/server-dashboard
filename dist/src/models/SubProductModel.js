"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const scheme = new mongoose_1.Schema({
    size: String,
    color: String,
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        default: 0,
        required: true,
    },
    discount: {
        type: Number,
    },
    productId: {
        type: String,
        required: true,
    },
    images: [String],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const billProduct = new mongoose_1.Schema({
    size: String,
    color: String,
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        default: 0,
        required: true,
    },
    billId: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
    },
    productId: {
        type: String,
        required: true,
    },
    images: [String],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const SubProductModel = mongoose_1.default.model('subproducts', scheme);
const BillProductModel = mongoose_1.default.model('billProducts', billProduct);
exports.BillProductModel = BillProductModel;
exports.default = SubProductModel;
//# sourceMappingURL=SubProductModel.js.map