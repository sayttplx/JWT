const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

// Now all headers need a token to get access
const isAuth = require('../middleware/is-auth')

// Get events
router.get('/', isAuth, (req, res) => {
    res.send('This worked');
 });

// Create an event
router.post('/', isAuth, (req, res) => { });

// Update an event
router.put('/:id', isAuth, (req, res) => { });

// Delete an event
router.delete('/:id', isAuth, (req, res) => { });

module.exports = router;