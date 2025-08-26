import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Prospect, { IProspect } from '../models/Prospect';

export const createProspect = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
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

    const prospect: IProspect = new Prospect(prospectData);
    await prospect.save();

    // Populate the assigned agent information
    await prospect.populate('assignedAgent', 'firstName lastName email');

    res.status(201).json({
      message: 'Prospect created successfully',
      prospect
    });
  } catch (error) {
    console.error('Create prospect error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProspects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    
    // Build query
    const query: any = { assignedAgent: req.user?.userId };
    
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

    const prospects = await Prospect.find(query)
      .populate('assignedAgent', 'firstName lastName email')
      .sort({ updatedAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Prospect.countDocuments(query);

    res.json({
      prospects,
      pagination: {
        current: pageNumber,
        pages: Math.ceil(total / limitNumber),
        total
      }
    });
  } catch (error) {
    console.error('Get prospects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProspectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const prospect = await Prospect.findOne({ 
      _id: id, 
      assignedAgent: req.user?.userId 
    }).populate('assignedAgent', 'firstName lastName email');

    if (!prospect) {
      res.status(404).json({ message: 'Prospect not found' });
      return;
    }

    res.json({ prospect });
  } catch (error) {
    console.error('Get prospect error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProspect = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
      return;
    }

    const { id } = req.params;
    
    const prospect = await Prospect.findOneAndUpdate(
      { _id: id, assignedAgent: req.user?.userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedAgent', 'firstName lastName email');

    if (!prospect) {
      res.status(404).json({ message: 'Prospect not found' });
      return;
    }

    res.json({
      message: 'Prospect updated successfully',
      prospect
    });
  } catch (error) {
    console.error('Update prospect error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProspect = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const prospect = await Prospect.findOneAndDelete({ 
      _id: id, 
      assignedAgent: req.user?.userId 
    });

    if (!prospect) {
      res.status(404).json({ message: 'Prospect not found' });
      return;
    }

    res.json({ message: 'Prospect deleted successfully' });
  } catch (error) {
    console.error('Delete prospect error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProspectStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Prospect.aggregate([
      { $match: { assignedAgent: req.user?.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Prospect.countDocuments({ assignedAgent: req.user?.userId });

    res.json({
      stats,
      total
    });
  } catch (error) {
    console.error('Get prospect stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};