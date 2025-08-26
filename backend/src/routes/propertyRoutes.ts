import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertyStats
} from '../controllers/propertyController';
import { authenticate } from '../middleware/auth';
import { propertyValidation } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private
router.post('/', propertyValidation, createProperty);

// @route   GET /api/properties
// @desc    Get all properties for authenticated agent
// @access  Private
router.get('/', getProperties);

// @route   GET /api/properties/stats
// @desc    Get property statistics
// @access  Private
router.get('/stats', getPropertyStats);

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Private
router.get('/:id', getPropertyById);

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private
router.put('/:id', propertyValidation, updateProperty);

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private
router.delete('/:id', deleteProperty);

export default router;