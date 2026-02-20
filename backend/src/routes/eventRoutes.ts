import express from 'express';
import { authenticate } from '../middleware/auth';
import Event from '../models/Event';
import EventRegistration from '../models/EventRegistration';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
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
});

// Register for event (authenticated)
router.post('/:eventId/register', authenticate, async (req: AuthRequest, res) => {
  try {
    const { eventId, answers } = req.body;
    const userId = req.user!._id;

    console.log('Registration attempt:', { eventId, userId, answers });

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

    // Filter out empty answers for non-required questions
    const filteredAnswers = answers.filter((answer: any) => {
      if (answer.answer === '' || answer.answer === null || answer.answer === undefined) {
        // Check if this question is required
        const question = event.questions.find(q => q.id === answer.questionId);
        return question && question.required;
      }
      return true;
    });

    // Create registration
    const registration = new EventRegistration({
      eventId,
      userId,
      answers: filteredAnswers
    });

    await registration.save();
    console.log('Registration saved to database:', registration._id);

    // Update event attendee count (only if event has createdBy field)
    if (event.createdBy) {
      event.currentAttendees += 1;
      await event.save();
    } else {
      console.log('Event does not have createdBy field, skipping attendee count update');
    }

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event',
      data: registration
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's event registrations (authenticated)
router.get('/user/registrations', authenticate, async (req: AuthRequest, res) => {
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
});

// Check if user is registered for event (authenticated)
router.get('/:eventId/check-registration', authenticate, async (req: AuthRequest, res) => {
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
});

export default router;
