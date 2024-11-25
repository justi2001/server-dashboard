"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierForm = void 0;
exports.supplierForm = [
    {
        key: 'name',
        value: 'name',
        label: 'Supplier name',
        placeholder: 'Enter supplier name',
        type: 'defautl',
        required: true,
        message: 'Enter supplier name',
        default_value: '',
        displayLength: 400,
    },
    {
        key: 'email',
        value: 'Email',
        label: 'Supplier Email',
        placeholder: 'Enter supplier Email',
        type: 'defautl',
        default_value: '',
        displayLength: 150,
    },
    {
        key: 'active',
        value: 'active',
        label: 'Supplier active',
        placeholder: 'Enter supplier active',
        type: 'number',
        default_value: '',
        displayLength: 150,
    },
    {
        key: 'product',
        value: 'product',
        label: 'Supplier product',
        placeholder: 'Entersupplier product',
        type: 'defautl',
        message: 'Enter supplier product',
        default_value: '',
        displayLength: 150,
    },
    {
        key: 'categories',
        value: 'categories',
        label: 'Categories',
        placeholder: 'Select product category',
        default_value: [],
        type: 'select',
        lookup_items: [],
        message: '',
        displayLength: 150,
    },
    {
        key: 'price',
        value: 'price',
        label: 'Buying price',
        placeholder: 'Enter buying price',
        type: 'number',
        message: '',
        default_value: '',
        displayLength: 150,
    },
    {
        key: 'contact',
        value: 'contact',
        label: 'Contact Number',
        placeholder: 'Enter supplier contact number',
        type: 'tel',
        message: '',
        default_value: '',
        displayLength: 150,
    },
    {
        key: 'type',
        value: 'isTaking',
        label: 'Talking',
        placeholder: '',
        type: 'checkbox',
        message: '',
        default_value: null,
        displayLength: 150,
    },
];
//# sourceMappingURL=supplier.js.map