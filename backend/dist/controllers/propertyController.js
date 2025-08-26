"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyStats = exports.deleteProperty = exports.updateProperty = exports.getPropertyById = exports.getProperties = exports.createProperty = void 0;
const express_validator_1 = require("express-validator");
const Property_1 = __importDefault(require("../models/Property"));
const createProperty = async (req, res) => {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        const propertyData = {
            ...req.body,
            assignedAgent: req.user?.userId
        };
        const property = new Property_1.default(propertyData);
        await property.save();
        // Populate the assigned agent information
        await property.populate('assignedAgent', 'firstName lastName email');
        res.status(201).json({
            message: 'Property created successfully',
            property
        });
    }
    catch (error) {
        console.error('Create property error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createProperty = createProperty;
const getProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, type, transactionType, minPrice, maxPrice, minSurface, maxSurface, city, search } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        // Build query
        const query = { assignedAgent: req.user?.userId };
        if (status)
            query.status = status;
        if (type)
            query.type = type;
        if (transactionType)
            query.transactionType = transactionType;
        if (city)
            query['address.city'] = { $regex: city, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = parseInt(minPrice);
            if (maxPrice)
                query.price.$lte = parseInt(maxPrice);
        }
        if (minSurface || maxSurface) {
            query.surface = {};
            if (minSurface)
                query.surface.$gte = parseInt(minSurface);
            if (maxSurface)
                query.surface.$lte = parseInt(maxSurface);
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 'address.street': { $regex: search, $options: 'i' } },
                { 'address.city': { $regex: search, $options: 'i' } }
            ];
        }
        const properties = await Property_1.default.find(query)
            .populate('assignedAgent', 'firstName lastName email')
            .sort({ updatedAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const total = await Property_1.default.countDocuments(query);
        res.json({
            properties,
            pagination: {
                current: pageNumber,
                pages: Math.ceil(total / limitNumber),
                total
            }
        });
    }
    catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProperties = getProperties;
const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property_1.default.findOne({
            _id: id,
            assignedAgent: req.user?.userId
        }).populate('assignedAgent', 'firstName lastName email');
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.json({ property });
    }
    catch (error) {
        console.error('Get property error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPropertyById = getPropertyById;
const updateProperty = async (req, res) => {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        const { id } = req.params;
        const property = await Property_1.default.findOneAndUpdate({ _id: id, assignedAgent: req.user?.userId }, req.body, { new: true, runValidators: true }).populate('assignedAgent', 'firstName lastName email');
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.json({
            message: 'Property updated successfully',
            property
        });
    }
    catch (error) {
        console.error('Update property error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateProperty = updateProperty;
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property_1.default.findOneAndDelete({
            _id: id,
            assignedAgent: req.user?.userId
        });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.json({ message: 'Property deleted successfully' });
    }
    catch (error) {
        console.error('Delete property error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteProperty = deleteProperty;
const getPropertyStats = async (req, res) => {
    try {
        const stats = await Property_1.default.aggregate([
            { $match: { assignedAgent: req.user?.userId } },
            {
                $group: {
                    _id: {
                        status: '$status',
                        type: '$type',
                        transactionType: '$transactionType'
                    },
                    count: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    totalValue: { $sum: '$price' }
                }
            }
        ]);
        const total = await Property_1.default.countDocuments({ assignedAgent: req.user?.userId });
        res.json({
            stats,
            total
        });
    }
    catch (error) {
        console.error('Get property stats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPropertyStats = getPropertyStats;
//# sourceMappingURL=propertyController.js.map