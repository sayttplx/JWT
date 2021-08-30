const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

// Get events
router.get('/', (req, res) => {});

// Create an event
router.post('/', (req, res) => {});

// Update an event
router.put('/:id', (req, res) => {});

// Delete an event
router.delete('/:id', (req, res) => {});

module.exports = router;