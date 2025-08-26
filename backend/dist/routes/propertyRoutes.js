"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controllers/propertyController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
// @route   POST /api/properties
// @desc    Create a new property
// @access  Private
router.post('/', validation_1.propertyValidation, propertyController_1.createProperty);
// @route   GET /api/properties
// @desc    Get all properties for authenticated agent
// @access  Private
router.get('/', propertyController_1.getProperties);
// @route   GET /api/properties/stats
// @desc    Get property statistics
// @access  Private
router.get('/stats', propertyController_1.getPropertyStats);
// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Private
router.get('/:id', propertyController_1.getPropertyById);
// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private
router.put('/:id', validation_1.propertyValidation, propertyController_1.updateProperty);
// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private
router.delete('/:id', propertyController_1.deleteProperty);
exports.default = router;
//# sourceMappingURL=propertyRoutes.js.map