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
exports.getProfile = exports.login = exports.resendCode = exports.getVerifiCode = exports.create = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomModel_1 = __importDefault(require("../models/CustomModel"));
const generatorRandomText_1 = require("../utils/generatorRandomText");
const getAccsetoken_1 = require("../utils/getAccsetoken");
const handleSendMail_1 = require("../utils/handleSendMail");
const getVerifiCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, code } = req.query;
    try {
        const customer = yield CustomModel_1.default.findById(id);
        if (!customer) {
            throw new Error('User is not found!!');
        }
        const verifyCode = customer._doc.verifyCode;
        if (code !== verifyCode) {
            throw new Error('Code is invalid!!!');
        }
        yield CustomModel_1.default.findByIdAndUpdate(id, {
            isVerify: true,
            verifyCode: '',
            isDeleted: false,
        });
        const accesstoken = yield (0, getAccsetoken_1.getAccesstoken)({
            _id: customer._id,
            email: customer._doc.email,
            rule: 1,
        });
        delete customer._doc.password;
        delete customer._doc.verifyCode;
        res.status(200).json({
            message: 'Verify successfully!!!',
            data: Object.assign(Object.assign({}, customer._doc), { accesstoken }),
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getVerifiCode = getVerifiCode;
const resendCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = req.query;
    try {
        const code = (0, generatorRandomText_1.generatorRandomText)(6);
        console.log(code);
        yield (0, handleSendMail_1.handleSendMail)({
            from: 'Support Kanban project',
            to: email,
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: `<h1>Mã xác minh${code}</h1>`,
        });
        yield CustomModel_1.default.findByIdAndUpdate(id, { verifyCode: code });
        res.status(200).json({
            message: 'New code',
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.resendCode = resendCode;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield CustomModel_1.default.findOne({ email: body.email });
        console.log(user);
        if (user) {
            throw new Error('User is existing!!!!');
        }
        const code = (0, generatorRandomText_1.generatorRandomText)(6);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashpassword = yield bcrypt_1.default.hash(body.password, salt);
        body.password = hashpassword;
        const newCustomer = new CustomModel_1.default(Object.assign(Object.assign({}, body), { verifyCode: code }));
        yield newCustomer.save();
        delete newCustomer._doc.password;
        delete newCustomer._doc.verifyCode;
        yield (0, handleSendMail_1.handleSendMail)({
            from: 'Support Kanban project',
            to: body.email,
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: `<h1>Mã xác minh${code}</h1>`,
        });
        console.log(code);
        res.status(200).json({
            message: 'Register successfully!!!',
            data: newCustomer,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email, password } = body;
    try {
        const customer = yield CustomModel_1.default.findOne({ email });
        if (!customer) {
            throw new Error('User not found!!!');
        }
        const isMatchPassword = yield bcrypt_1.default.compare(password, customer.password);
        if (!isMatchPassword) {
            throw new Error('Email/Password is not correct!!!');
        }
        const item = customer._doc;
        delete item.password;
        const accesstoken = yield (0, getAccsetoken_1.getAccesstoken)({ _id: item._id, email });
        item.accesstoken = accesstoken;
        res.status(200).json({
            message: 'login successfully!!!',
            data: item,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const user = yield CustomModel_1.default.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).json({
            message: 'Profile',
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=customers.js.map