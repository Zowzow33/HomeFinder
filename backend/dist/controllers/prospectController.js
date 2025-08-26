"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProspectStats = exports.deleteProspect = exports.updateProspect = exports.getProspectById = exports.getProspects = exports.createProspect = void 0;
const express_validator_1 = require("express-validator");
const Prospect_1 = __importDefault(require("../models/Prospect"));
const createProspect = async (req, res) => {
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
        const prospectData = {
            ...req.body,
            assignedAgent: req.user?.userId
        };
        const prospect = new Prospect_1.default(prospectData);
        await prospect.save();
        // Populate the assigned agent information
        await prospect.populate('assignedAgent', 'firstName lastName email');
        res.status(201).json({
            message: 'Prospect created successfully',
            prospect
        });
    }
    catch (error) {
        console.error('Create prospect error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createProspect = createProspect;
const getProspects = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        // Build query
        const query = { assignedAgent: req.user?.userId };
        if (status) {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        const prospects = await Prospect_1.default.find(query)
            .populate('assignedAgent', 'firstName lastName email')
            .sort({ updatedAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const total = await Prospect_1.default.countDocuments(query);
        res.json({
            prospects,
            pagination: {
                current: pageNumber,
                pages: Math.ceil(total / limitNumber),
                total
            }
        });
    }
    catch (error) {
        console.error('Get prospects error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProspects = getProspects;
const getProspectById = async (req, res) => {
    try {
        const { id } = req.params;
        const prospect = await Prospect_1.default.findOne({
            _id: id,
            assignedAgent: req.user?.userId
        }).populate('assignedAgent', 'firstName lastName email');
        if (!prospect) {
            res.status(404).json({ message: 'Prospect not found' });
            return;
        }
        res.json({ prospect });
    }
    catch (error) {
        console.error('Get prospect error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProspectById = getProspectById;
const updateProspect = async (req, res) => {
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
        const prospect = await Prospect_1.default.findOneAndUpdate({ _id: id, assignedAgent: req.user?.userId }, req.body, { new: true, runValidators: true }).populate('assignedAgent', 'firstName lastName email');
        if (!prospect) {
            res.status(404).json({ message: 'Prospect not found' });
            return;
        }
        res.json({
            message: 'Prospect updated successfully',
            prospect
        });
    }
    catch (error) {
        console.error('Update prospect error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateProspect = updateProspect;
const deleteProspect = async (req, res) => {
    try {
        const { id } = req.params;
        const prospect = await Prospect_1.default.findOneAndDelete({
            _id: id,
            assignedAgent: req.user?.userId
        });
        if (!prospect) {
            res.status(404).json({ message: 'Prospect not found' });
            return;
        }
        res.json({ message: 'Prospect deleted successfully' });
    }
    catch (error) {
        console.error('Delete prospect error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteProspect = deleteProspect;
const getProspectStats = async (req, res) => {
    try {
        const stats = await Prospect_1.default.aggregate([
            { $match: { assignedAgent: req.user?.userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        const total = await Prospect_1.default.countDocuments({ assignedAgent: req.user?.userId });
        res.json({
            stats,
            total
        });
    }
    catch (error) {
        console.error('Get prospect stats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProspectStats = getProspectStats;
//# sourceMappingURL=prospectController.js.map