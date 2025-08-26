"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prospectController_1 = require("../controllers/prospectController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
// @route   POST /api/prospects
// @desc    Create a new prospect
// @access  Private
router.post('/', validation_1.prospectValidation, prospectController_1.createProspect);
// @route   GET /api/prospects
// @desc    Get all prospects for authenticated agent
// @access  Private
router.get('/', prospectController_1.getProspects);
// @route   GET /api/prospects/stats
// @desc    Get prospect statistics
// @access  Private
router.get('/stats', prospectController_1.getProspectStats);
// @route   GET /api/prospects/:id
// @desc    Get prospect by ID
// @access  Private
router.get('/:id', prospectController_1.getProspectById);
// @route   PUT /api/prospects/:id
// @desc    Update prospect
// @access  Private
router.put('/:id', validation_1.prospectValidation, prospectController_1.updateProspect);
// @route   DELETE /api/prospects/:id
// @desc    Delete prospect
// @access  Private
router.delete('/:id', prospectController_1.deleteProspect);
exports.default = router;
//# sourceMappingURL=prospectRoutes.js.map