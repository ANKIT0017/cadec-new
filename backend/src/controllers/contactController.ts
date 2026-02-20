import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { sendContactEmail } from '../services/emailService';
import { AuthRequest } from '../middleware/auth';

// Submit contact form (public)
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Create contact record
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    await contact.save();

    // Send email asynchronously (non-blocking)
    sendContactEmail({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    }).catch(error => {
      console.error('Email sending failed:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all contact messages (admin only)
export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const { isResolved, search } = req.query;
    let query: any = {};

    // Apply filters
    if (isResolved !== undefined) {
      query.isResolved = isResolved === 'true';
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single contact (admin only)
export const getContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark contact as resolved (admin only)
export const markResolved = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.isResolved = true;
    await contact.save();

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Mark resolved error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete contact (admin only)
export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
