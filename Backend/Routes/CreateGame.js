// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Game = require('../Model/GameSchema');

// POST: Create Single Game
router.post('/games', async (req, res) => {
    try {
        const newGame = await Game.create({
            Name: req.body.Name,
            Url: req.body.Url,
            Author: req.body.Author,
            Date: req.body.Date
        });
        res.json({ success: true, game: newGame });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET: Read Single Game
router.get('/games/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }
        res.json({ success: true, game });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET: Get All Games
router.get('/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json({ success: true, games });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// PUT: Update Single Game
router.patch('/games/:gameId', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.gameId,
            {
                Name: req.body.Name,
                Url: req.body.Url,
                Author: req.body.Author,
                Date: req.body.Date
            },
            { new: true }
        );
        if (!updatedGame) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }
        res.json({ success: true, game: updatedGame });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// DELETE: Delete Single Game
router.delete('/games/:gameId', async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.gameId);
        if (!deletedGame) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }
        res.json({ success: true, game: deletedGame });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
