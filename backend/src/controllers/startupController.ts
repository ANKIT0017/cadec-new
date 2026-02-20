import { Request, Response } from 'express';
import Startup from '../models/Startup';
import { AuthRequest } from '../middleware/auth';

// Get all startups (public)
export const getStartups = async (req: Request, res: Response) => {
  try {
    const { status, category, search } = req.query;
    let query: any = { isActive: true };

    // Apply filters
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const startups = await Startup.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: startups.length,
      data: startups
    });
  } catch (error) {
    console.error('Get startups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single startup (public)
export const getStartup = async (req: Request, res: Response) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup || !startup.isActive) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.json({
      success: true,
      data: startup
    });
  } catch (error) {
    console.error('Get startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create startup (admin only)
export const createStartup = async (req: AuthRequest, res: Response) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();

    res.status(201).json({
      success: true,
      data: startup
    });
  } catch (error) {
    console.error('Create startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update startup (admin only)
export const updateStartup = async (req: AuthRequest, res: Response) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    Object.assign(startup, req.body);
    await startup.save();

    res.json({
      success: true,
      data: startup
    });
  } catch (error) {
    console.error('Update startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete startup (admin only)
export const deleteStartup = async (req: AuthRequest, res: Response) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    await Startup.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Startup deleted successfully'
    });
  } catch (error) {
    console.error('Delete startup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
