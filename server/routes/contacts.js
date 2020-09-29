const express = require('express');
const auth = require('../middleware/auth');
const {encrypt,decrypt} = require('../middleware/crypto');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      date: -1
    });
    if(contacts && contacts.length>0)
    {
    contacts.forEach(element => {
      element.SSN=decrypt(element.SSN);
      
    });
  }
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add new contacts
// @access  Private
router.post(
  '/',
  [
    [
      check('firstName', 'Please enter a firstName')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName,telephoneNumber, address, SSN } = req.body;

    try {
      const newContact = new Contact({
        firstName, lastName,telephoneNumber, address, SSN
      });
      newContact.SSN=encrypt(newContact.SSN);
      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update Contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {firstName, lastName,telephoneNumber, address, SSN} = req.body;

  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (telephoneNumber) contactFields.telephoneNumber = telephoneNumber;
  if (address) contactFields.address = address;
  if (SSN) contactFields.SSN =encrypt(SSN);

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    if (!req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete Contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    if (!req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
