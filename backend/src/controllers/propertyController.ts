import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Property, { IProperty } from '../models/Property';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
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

    const propertyData = {
      ...req.body,
      assignedAgent: req.user?.userId
    };

    const property: IProperty = new Property(propertyData);
    await property.save();

    // Populate the assigned agent information
    await property.populate('assignedAgent', 'firstName lastName email');

    res.status(201).json({
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      type, 
      transactionType,
      minPrice,
      maxPrice,
      minSurface,
      maxSurface,
      city,
      search 
    } = req.query;
    
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    
    // Build query
    const query: any = { assignedAgent: req.user?.userId };
    
    if (status) query.status = status;
    if (type) query.type = type;
    if (transactionType) query.transactionType = transactionType;
    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice as string);
      if (maxPrice) query.price.$lte = parseInt(maxPrice as string);
    }
    
    if (minSurface || maxSurface) {
      query.surface = {};
      if (minSurface) query.surface.$gte = parseInt(minSurface as string);
      if (maxSurface) query.surface.$lte = parseInt(maxSurface as string);
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'address.street': { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } }
      ];
    }

    const properties = await Property.find(query)
      .populate('assignedAgent', 'firstName lastName email')
      .sort({ updatedAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Property.countDocuments(query);

    res.json({
      properties,
      pagination: {
        current: pageNumber,
        pages: Math.ceil(total / limitNumber),
        total
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const property = await Property.findOne({ 
      _id: id, 
      assignedAgent: req.user?.userId 
    }).populate('assignedAgent', 'firstName lastName email');

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
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
    
    const property = await Property.findOneAndUpdate(
      { _id: id, assignedAgent: req.user?.userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedAgent', 'firstName lastName email');

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.json({
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const property = await Property.findOneAndDelete({ 
      _id: id, 
      assignedAgent: req.user?.userId 
    });

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPropertyStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Property.aggregate([
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

    const total = await Property.countDocuments({ assignedAgent: req.user?.userId });

    res.json({
      stats,
      total
    });
  } catch (error) {
    console.error('Get property stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};