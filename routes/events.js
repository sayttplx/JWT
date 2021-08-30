const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

// Now all headers need a token to get access
const isAuth = require('../middleware/is-auth');


// Get events
router.get('/', isAuth, async (req, res) => {

    // Get all of the events
    try {
        const events = await Event.find();
        res.status(200).json({ events });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create an event
router.post('/', isAuth, async (req, res) => {
    // From the body request
    const { title, description, date } = req.body;

    try {
        // Create an event model
        const event = new Event({
            title,
            description,
            date
        });
        // Save it to the database
        const newEvent = await event.save();

        res.status(201).json({ event: newEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }

});

// Update an event 
router.put('/:id', isAuth, async (req, res) => {
    // Check for the params
    const eventID = req.params.id;
    // Check for the body
    const { title, description, date } = req.body;


    // Fill in the updated version
    const updatedEvent = {}
    if (title) updatedEvent.title = title
    if (description) updatedEvent.description = description
    if (date) updatedEvent.date = date

    // Create a new variable with the new updated event
    const event = await Event.findByIdAndUpdate(eventID,
        { $set: updatedEvent },
        { new: true })

    // Pass it back in
    res.status(201).json({ event });

    try {
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Delete an event
router.delete('/:id', isAuth, async (req, res) => {
    const eventID = req.params.id;

    try {
        await Event.findByIdAndRemove(eventID)
        res.status(200).json({ msg: 'Event Removed' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
});
module.exports = router;