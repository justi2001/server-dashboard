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
exports.getChapDetail = exports.getChappters = void 0;
const axios_1 = __importDefault(require("axios"));
const baseurl = 'https://nettruyenww.com';
const getChappters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { api } = req.query;
    try {
        const results = yield (0, axios_1.default)({
            url: baseurl + api,
            method: 'get',
        });
        res.status(200).json({
            message: 'Chapters',
            data: results.data,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getChappters = getChappters;
const getChapDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapId, chuong } = req.query;
    try {
        const items = [];
        // for (let index = 0; index < 11; index++) {
        const result = yield (0, axios_1.default)({
            url: `https://nettruyenww.com/truyen-tranh/vo-luyen-dinh-phong/chuong-1152/534296`,
            method: 'get',
        });
        const item = {};
        const pages = result.data.split('<div class="page-chapter">');
        for (let index = 1; index < pages.length; index++) {
            index < 12 && console.log(pages[index]);
        }
        res.status(200).json({
            message: '',
            data: result.data,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(403).json({
            message: error.message,
        });
    }
});
exports.getChapDetail = getChapDetail;
//# sourceMappingURL=nettruyen.js.map