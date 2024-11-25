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
exports.updateAddress = exports.deleteAddress = exports.getAddressByUser = exports.addNewAddress = exports.updateProductInCart = exports.removeCartItem = exports.getCartItems = exports.addProduct = void 0;
const AddressModel_1 = __importDefault(require("../models/AddressModel"));
const CartModel_1 = __importDefault(require("../models/CartModel"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        if (id) {
            yield CartModel_1.default.findByIdAndUpdate(id, body);
            res.status(200).json({
                data: [],
                message: 'Update cart to DB!!!',
            });
        }
        else {
            const item = new CartModel_1.default(body);
            yield item.save();
            res.status(200).json({
                data: item,
                message: 'Update cart to DB!!!',
            });
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.addProduct = addProduct;
const updateProductInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield CartModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({ message: 'Done', data: [] });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateProductInCart = updateProductInCart;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        const items = yield CartModel_1.default.find({ createdBy: uid });
        res.status(200).json({ data: items });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getCartItems = getCartItems;
const removeCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield CartModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'fafa', data: [] });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.removeCartItem = removeCartItem;
const addNewAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { isDefault } = body;
    const uid = req.uid;
    try {
        const item = new AddressModel_1.default(body);
        yield item.save();
        if (isDefault) {
            const defaultAddressItem = yield AddressModel_1.default.findOne({
                $and: [{ createdBy: uid }, { isDefault: true }],
            });
            if (defaultAddressItem) {
                yield AddressModel_1.default.findByIdAndUpdate(defaultAddressItem._id, {
                    isDefault: false,
                });
            }
        }
        else {
            res.status(200).json({ message: 'fafa', data: item });
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.addNewAddress = addNewAddress;
const getAddressByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.uid;
    try {
        const items = yield AddressModel_1.default.find({ createdBy: id });
        res.status(200).json({ message: 'fafa', data: items });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAddressByUser = getAddressByUser;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        yield AddressModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteAddress = deleteAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.query;
    try {
        yield AddressModel_1.default.findByIdAndUpdate(id, body);
        const item = yield AddressModel_1.default.findById(id);
        res.status(200).json({ message: 'Update', data: item });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateAddress = updateAddress;
//# sourceMappingURL=cartController.js.map