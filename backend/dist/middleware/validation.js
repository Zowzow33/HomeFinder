"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyValidation = exports.prospectValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
// Auth validation
exports.registerValidation = [
    (0, express_validator_1.body)('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 50 })
        .withMessage('First name cannot exceed 50 characters'),
    (0, express_validator_1.body)('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 50 })
        .withMessage('Last name cannot exceed 50 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (0, express_validator_1.body)('agency')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Agency name cannot exceed 100 characters'),
    (0, express_validator_1.body)('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number')
];
exports.loginValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
];
// Prospect validation
exports.prospectValidation = [
    (0, express_validator_1.body)('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 50 })
        .withMessage('First name cannot exceed 50 characters'),
    (0, express_validator_1.body)('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 50 })
        .withMessage('Last name cannot exceed 50 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['new', 'contacted', 'meeting_scheduled', 'viewing_done', 'offer_made', 'closed', 'lost'])
        .withMessage('Invalid status'),
    (0, express_validator_1.body)('searchCriteria.minBudget')
        .optional()
        .isNumeric()
        .withMessage('Minimum budget must be a number')
        .custom((value, { req }) => {
        if (value < 0)
            throw new Error('Minimum budget cannot be negative');
        return true;
    }),
    (0, express_validator_1.body)('searchCriteria.maxBudget')
        .optional()
        .isNumeric()
        .withMessage('Maximum budget must be a number')
        .custom((value, { req }) => {
        if (value < 0)
            throw new Error('Maximum budget cannot be negative');
        if (req.body.searchCriteria?.minBudget && value < req.body.searchCriteria.minBudget) {
            throw new Error('Maximum budget must be greater than minimum budget');
        }
        return true;
    }),
    (0, express_validator_1.body)('searchCriteria.propertyType')
        .optional()
        .isIn(['apartment', 'house', 'commercial', 'land'])
        .withMessage('Invalid property type'),
    (0, express_validator_1.body)('notes')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Notes cannot exceed 1000 characters'),
    (0, express_validator_1.body)('source')
        .optional()
        .isIn(['website', 'referral', 'advertising', 'social_media', 'other'])
        .withMessage('Invalid source')
];
// Property validation
exports.propertyValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Property title is required')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),
    (0, express_validator_1.body)('type')
        .isIn(['apartment', 'house', 'commercial', 'land'])
        .withMessage('Invalid property type'),
    (0, express_validator_1.body)('transactionType')
        .isIn(['sale', 'rent'])
        .withMessage('Invalid transaction type'),
    (0, express_validator_1.body)('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .custom((value) => {
        if (value < 0)
            throw new Error('Price cannot be negative');
        return true;
    }),
    (0, express_validator_1.body)('surface')
        .isNumeric()
        .withMessage('Surface area must be a number')
        .custom((value) => {
        if (value < 1)
            throw new Error('Surface area must be at least 1 square meter');
        return true;
    }),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['available', 'under_offer', 'sold', 'rented', 'off_market'])
        .withMessage('Invalid status'),
    (0, express_validator_1.body)('address.street')
        .trim()
        .notEmpty()
        .withMessage('Street address is required')
        .isLength({ max: 200 })
        .withMessage('Street address cannot exceed 200 characters'),
    (0, express_validator_1.body)('address.city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .isLength({ max: 100 })
        .withMessage('City cannot exceed 100 characters'),
    (0, express_validator_1.body)('address.postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required')
        .isLength({ max: 20 })
        .withMessage('Postal code cannot exceed 20 characters'),
    (0, express_validator_1.body)('address.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ max: 100 })
        .withMessage('Country cannot exceed 100 characters'),
    (0, express_validator_1.body)('rooms')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Number of rooms must be between 1 and 50'),
    (0, express_validator_1.body)('bedrooms')
        .optional()
        .isInt({ min: 0, max: 20 })
        .withMessage('Number of bedrooms must be between 0 and 20'),
    (0, express_validator_1.body)('bathrooms')
        .optional()
        .isInt({ min: 0, max: 10 })
        .withMessage('Number of bathrooms must be between 0 and 10'),
    (0, express_validator_1.body)('yearBuilt')
        .optional()
        .isInt({ min: 1800, max: new Date().getFullYear() + 5 })
        .withMessage('Year built must be between 1800 and 5 years in the future')
];
//# sourceMappingURL=validation.js.map