import { Router } from 'express';
import {
  createProspect,
  getProspects,
  getProspectById,
  updateProspect,
  deleteProspect,
  getProspectStats
} from '../controllers/prospectController';
import { authenticate } from '../middleware/auth';
import { prospectValidation } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

// @route   POST /api/prospects
// @desc    Create a new prospect
// @access  Private
router.post('/', prospectValidation, createProspect);

// @route   GET /api/prospects
// @desc    Get all prospects for authenticated agent
// @access  Private
router.get('/', getProspects);

// @route   GET /api/prospects/stats
// @desc    Get prospect statistics
// @access  Private
router.get('/stats', getProspectStats);

// @route   GET /api/prospects/:id
// @desc    Get prospect by ID
// @access  Private
router.get('/:id', getProspectById);

// @route   PUT /api/prospects/:id
// @desc    Update prospect
// @access  Private
router.put('/:id', prospectValidation, updateProspect);

// @route   DELETE /api/prospects/:id
// @desc    Delete prospect
// @access  Private
router.delete('/:id', deleteProspect);

export default router;