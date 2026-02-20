import { Request, Response } from 'express';
import Event from '../models/Event';
import EventRegistration from '../models/EventRegistration';
import { AuthRequest } from '../middleware/auth';

// Get all events (public)
export const getEvents = async (req: Request, res: Response) => {
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
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single event (public)
export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!event || !event.isActive) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register for event (authenticated)
export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, answers } = req.body;
    const userId = req.user!._id;

    // Check if event exists and is open for registration
    const event = await Event.findById(eventId);
    if (!event || !event.isActive) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.isRegistrationOpen) {
      return res.status(400).json({ message: 'Registration is closed for this event' });
    }

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if user already registered
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    // Validate answers against event questions
    const requiredQuestions = event.questions.filter(q => q.required);
    const answeredQuestionIds = answers.map((a: any) => a.questionId);
    
    for (const question of requiredQuestions) {
      if (!answeredQuestionIds.includes(question.id)) {
        return res.status(400).json({ 
          message: `Required question not answered: ${question.question}` 
        });
      }
    }

    // Create registration
    const registration = new EventRegistration({
      eventId,
      userId,
      answers
    });

    await registration.save();

    // Update event attendee count
    event.currentAttendees += 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event',
      data: registration
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's event registrations (authenticated)
export const getUserRegistrations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;

    const registrations = await EventRegistration.find({ userId })
      .populate('eventId', 'title date location category')
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user is registered for event (authenticated)
export const checkRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.user!._id;

    const registration = await EventRegistration.findOne({
      eventId,
      userId
    });

    res.json({
      success: true,
      isRegistered: !!registration,
      registration: registration || null
    });
  } catch (error) {
    console.error('Check registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create event (admin only)
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user!._id
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event (admin only)
export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event (admin only)
export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



