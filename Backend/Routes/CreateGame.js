// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Game = require('../Model/GameSchema');

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Create a new game entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Url:
 *                 type: string
 *               Author:
 *                 type: string
 *             example:
 *               Name: "Deep Sea"
 *               Url: "Will change later"
 *               Author: "Subham omar"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 game:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ea17562f708edcbba3411b"
 *                     Name:
 *                       type: string
 *                       example: "Deep Sea"
 *                     Url:
 *                       type: string
 *                       example: "Will change later"
 *                     Author:
 *                       type: string
 *                       example: "Subham omar"
 *                     Date:
 *                       type: string
 *                       example: "2023-08-26T15:16:38.044Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 */

// POST: Create Single Game
router.post('/games', async (req, res) => {
    try {

        if (!req.body.Name || !req.body.Url || !req.body.Author) {
            return res.status(400).json({ success: false, error: 'Required parameters are missing' });
        }
        
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

/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     summary: Get a single game
 *     description: Get details of a single game by its ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the game
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 game:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ea1bb067e1765e973c8823"
 *                     Name:
 *                       type: string
 *                       example: "Deep Sea"
 *                     Url:
 *                       type: string
 *                       example: "Will change later"
 *                     Author:
 *                       type: string
 *                       example: "Subham omar"
 *                     Date:
 *                       type: string
 *                       example: "2023-08-26T15:35:12.646Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *       404:
 *         description: Game not found
 */

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

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     description: Get a list of all games.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 games:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64e9e11e76a8a3a256d63bfc"
 *                       Name:
 *                         type: string
 *                         example: "scdcs"
 *                       Url:
 *                         type: string
 *                         example: "sdcsdc"
 *                       Author:
 *                         type: string
 *                         example: "dcsdcsd"
 *                       Date:
 *                         type: string
 *                         example: "2023-08-08T00:00:00.000Z"
 *                       __v:
 *                         type: number
 *                         example: 0
 *                   example:
 *                     - _id: "64e9e11e76a8a3a256d63bfc"
 *                       Name: "scdcs"
 *                       Url: "sdcsdc"
 *                       Author: "dcsdcsd"
 *                       Date: "2023-08-08T00:00:00.000Z"
 *                       __v: 0
 *                     - _id: "64ea17522f708edcbba34117"
 *                       Name: "Deep Sea"
 *                       Url: "Will change later"
 *                       Author: "Subham omar"
 *                       Date: "2023-08-26T15:16:34.529Z"
 *                       __v: 0
 *                     - _id: "64ea17542f708edcbba34119"
 *                       Name: "Deep Sea"
 *                       Url: "Will change later"
 *                       Author: "Subham omar"
 *                       Date: "2023-08-26T15:16:36.416Z"
 *                       __v: 0
 *                     - _id: "64ea17562f708edcbba3411b"
 *                       Name: "Deep Sea"
 *                       Url: "Will change later"
 *                       Author: "Subham omar"
 *                       Date: "2023-08-26T15:16:38.044Z"
 *                       __v: 0
 */

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

/**
 * @swagger
 * /games/{gameId}:
 *   patch:
 *     summary: Update a single game
 *     description: Update details of a single game by its ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameInput'
 *           example:
 *             Name: "The party Scene"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 game:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ea1bb067e1765e973c8823"
 *                     Name:
 *                       type: string
 *                       example: "The party Scene"
 *                     Url:
 *                       type: string
 *                       example: "Will change later"
 *                     Author:
 *                       type: string
 *                       example: "Subham omar"
 *                     Date:
 *                       type: string
 *                       example: "2023-08-26T15:35:12.646Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *       404:
 *         description: Game not found
 */
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

/**
 * @swagger
 * /games/{gameId}:
 *   delete:
 *     summary: Delete a single game
 *     description: Delete a single game by its ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the game
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 game:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ea1bb067e1765e973c8823"
 *                     Name:
 *                       type: string
 *                       example: "The party Scene"
 *                     Url:
 *                       type: string
 *                       example: "Will change later"
 *                     Author:
 *                       type: string
 *                       example: "Subham omar"
 *                     Date:
 *                       type: string
 *                       example: "2023-08-26T15:35:12.646Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *       404:
 *         description: Game not found
 */

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
