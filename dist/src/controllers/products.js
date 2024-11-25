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
exports.getRelatedProducts = exports.getBestSellers = exports.updateSubProduct = exports.removeSubProduct = exports.filterProducts = exports.getFilterValues = exports.updateProduct = exports.getProductDetail = exports.removeProduct = exports.addSubProduct = exports.getCategoryDetail = exports.addProduct = exports.updateCategory = exports.getProducts = exports.getCategories = exports.deleteCategories = exports.addCategory = void 0;
const CategortModel_1 = __importDefault(require("../models/CategortModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const SubProductModel_1 = __importStar(require("../models/SubProductModel"));
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { parentId, title, description, slug } = body;
    try {
        const category = yield CategortModel_1.default.find({
            $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
        });
        if (category.length > 0) {
            throw Error('Category is existing!!!!');
        }
        const newCate = new CategortModel_1.default(body);
        yield newCate.save();
        res.status(200).json({
            message: 'Products',
            data: newCate,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.addCategory = addCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize } = req.query;
    try {
        const skip = (page - 1) * pageSize;
        const categories = yield CategortModel_1.default.find({
            $or: [{ isDeleted: false }, { isDeleted: null }],
        })
            .skip(skip)
            .limit(pageSize);
        res.status(200).json({
            message: 'Products',
            data: categories,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getCategories = getCategories;
const getCategoryDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const item = yield CategortModel_1.default.findById(id);
        res.status(200).json({
            message: 'Products',
            data: item,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getCategoryDetail = getCategoryDetail;
const findAndRemoveCategoryInProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const item = await CategoryModel.findById(id);
    const items = yield CategortModel_1.default.find({ parentId: id });
    if (items.length > 0) {
        items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () { return yield findAndRemoveCategoryInProducts(item._id); }));
    }
    yield handleRemoveCategoryInProducts(id);
    // const cats = await CategoryModel.find({ parentId: id });
    // if (cats.length > 0) {
    // 	cats.forEach(async (item: any) => {
    // 		const values: any = await getCategoriesIds([], item._id);
    // 		if (values.length > 0) {
    // 			console.log(values);
    // 		} else {
    // 			data.push(item._id);
    // 		}
    // 	});
    // }
    // return data;
});
// @daoquang-livecode
// @bsdaoquang
const handleRemoveCategoryInProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield CategortModel_1.default.findByIdAndDelete(id);
    const products = yield ProductModel_1.default.find({ categories: { $all: id } });
    if (products && products.length > 0) {
        products.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const cats = item._doc.categories;
            const index = cats.findIndex((element) => element === id);
            if (index !== -1) {
                cats.splice(index, 1);
            }
            yield ProductModel_1.default.findByIdAndUpdate(item._id, {
                categories: cats,
            });
        }));
    }
});
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isDeleted } = req.query;
    try {
        yield findAndRemoveCategoryInProducts(id);
        if (isDeleted) {
            yield CategortModel_1.default.findByIdAndDelete(id);
        }
        else {
            yield CategortModel_1.default.findByIdAndUpdate(id, {
                isDeleted: false,
            });
        }
        yield res.status(200).json({
            message: 'Category deleted!!!',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.deleteCategories = deleteCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield CategortModel_1.default.findByIdAndUpdate(id, body);
        const item = yield CategortModel_1.default.findById(id);
        res.status(200).json({
            message: 'Category deleted!!!',
            data: item,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateCategory = updateCategory;
// Products
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newProduct = new ProductModel_1.default(body);
        yield newProduct.save();
        res.status(200).json({
            message: 'Products',
            data: newProduct,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, title, catIds } = req.query;
    yield checkDeletedProduct();
    const filter = {};
    filter.isDeleted = false;
    if (title) {
        filter.slug = { $regex: title };
    }
    if (catIds) {
        const categoriesIds = catIds.includes(',') ? catIds.split(',') : [catIds];
        filter.categories = { $in: categoriesIds };
    }
    try {
        const skip = (page - 1) * pageSize;
        const products = yield ProductModel_1.default.find(filter).skip(skip).limit(pageSize);
        const count = yield ProductModel_1.default.find(filter);
        const total = yield ProductModel_1.default.find({
            isDeleted: false,
        });
        const items = [];
        const pageCount = Math.ceil(count.length / pageSize);
        if (products.length > 0) {
            products.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                const children = yield SubProductModel_1.default.find({
                    productId: item._id,
                    isDeleted: false,
                });
                items.push(Object.assign(Object.assign({}, item._doc), { subItems: children !== null && children !== void 0 ? children : [] }));
                items.length === products.length &&
                    res.status(200).json({
                        message: 'Products',
                        data: {
                            items,
                            totalItems: total.length,
                            pageCount,
                        },
                    });
            }));
        }
        else {
            res.status(200).json({
                message: 'Products',
                data: [],
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getProducts = getProducts;
const getMinMaxPrice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subItems = yield SubProductModel_1.default.find({ productId: id });
    const nums = subItems.map((item) => item.price);
    return [Math.min(...nums), Math.max(...nums)];
});
const getBestSellers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield SubProductModel_1.BillProductModel.find();
        if (products.length > 0) {
        }
        else {
            const items = yield ProductModel_1.default.find().limit(8);
            const data = [];
            items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                data.push(Object.assign(Object.assign({}, item._doc), { price: yield getMinMaxPrice(item._id) }));
                data.length === items.length && res.status(200).json({ data });
            }));
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getBestSellers = getBestSellers;
const checkDeletedProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Get and check deleted product about 30 days from now');
    /*
  
      const productDeleted = await ProductModel.find({
        isDeleted: true
      })
      
  
      productDeleted.forEach(product => {
  
  
      const users = await userModel.find({
        favouritest: {$all: product_id}
      })
  
      if(users.length === 0)
        remove product
      })
    */
});
const getProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const item = yield ProductModel_1.default.findById(id);
        const subProducts = yield SubProductModel_1.default.find({
            productId: id,
            isDeleted: false,
        });
        res.status(200).json({
            message: 'Products',
            data: {
                product: item,
                subProducts,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getProductDetail = getProductDetail;
const removeSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isSoftDelete } = req.query;
    try {
        if (isSoftDelete) {
            yield SubProductModel_1.default.findByIdAndUpdate(id, {
                isDeleted: true,
            });
        }
        else {
            yield SubProductModel_1.default.findByIdAndDelete(id);
        }
        res.status(200).json({
            message: 'Removed!!!',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeSubProduct = removeSubProduct;
const updateSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield SubProductModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: 'Updated!!!',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateSubProduct = updateSubProduct;
const addSubProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const subProduct = new SubProductModel_1.default(body);
        yield subProduct.save();
        res.status(200).json({
            message: 'Add sub product successfully!!!',
            data: subProduct,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.addSubProduct = addSubProduct;
const handleRemoveSubProduct = (items) => __awaiter(void 0, void 0, void 0, function* () {
    items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield SubProductModel_1.default.findByIdAndUpdate(item._id, {
            isDeleted: true,
        });
    }));
});
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const subItems = yield SubProductModel_1.default.find({ productId: id });
        if (subItems.length > 0) {
            yield handleRemoveSubProduct(subItems);
        }
        yield ProductModel_1.default.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        res.status(200).json({
            message: 'Product removed!!',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.removeProduct = removeProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const body = req.body;
    try {
        yield ProductModel_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            message: 'Product updated!!',
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const getFilterValues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield SubProductModel_1.default.find();
        const colors = [];
        const sizes = [];
        const prices = [];
        if (datas.length > 0) {
            datas.forEach((item) => {
                item.color && !colors.includes(item.color) && colors.push(item.color);
                item.size && sizes.push({ label: item.size, value: item.size });
                prices.push(item.price);
            });
        }
        // console.log(datas);
        res.status(200).json({
            message: 'fafa',
            data: {
                colors,
                prices,
                sizes,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getFilterValues = getFilterValues;
const filterProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { colors, size, price, categories } = body;
    let filter = {};
    if (colors && colors.length > 0) {
        filter.color = { $all: colors };
    }
    if (size) {
        filter.size = { $eq: size };
    }
    if (price && price.length > 0) {
        filter['$and'] = [
            {
                price: { $lte: price[1] },
            },
            {
                price: {
                    $gte: price[0],
                },
            },
        ];
    }
    try {
        const subProducts = yield SubProductModel_1.default.find(filter);
        if (categories) {
        }
        else {
        }
        const productIds = [];
        const products = [];
        if (subProducts.length > 0) {
            subProducts.forEach((item) => !productIds.includes(item.productId) &&
                productIds.push(item.productId));
            productIds.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield ProductModel_1.default.findById(id);
                const children = subProducts.filter((element) => element.productId === id);
                const items = Object.assign(Object.assign({}, product._doc), { subItems: children });
                products.push(items);
                if (products.length === productIds.length) {
                    res.status(200).json({
                        data: {
                            items: products,
                            totalItems: products.length,
                        },
                    });
                }
            }));
        }
        else {
            res.status(200).json({ data: [] });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.filterProducts = filterProducts;
const getRelatedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const product = yield ProductModel_1.default.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        const categoryId = product.categories && product.categories.length > 0
            ? product.categories[0]
            : undefined;
        if (!categoryId) {
            throw new Error('Categories not found!');
        }
        const items = yield ProductModel_1.default.find({ categories: { $in: categoryId } });
        const datas = items.length > 4 ? items.splice(0, 4) : items;
        const products = [];
        datas.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            products.push(Object.assign(Object.assign({}, item._doc), { price: yield getMinMaxPrice(item._id) }));
            products.length === datas.length &&
                res.status(200).json({ data: products });
        }));
        // res.status(200).json({ data: products });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.getRelatedProducts = getRelatedProducts;
//# sourceMappingURL=products.js.map