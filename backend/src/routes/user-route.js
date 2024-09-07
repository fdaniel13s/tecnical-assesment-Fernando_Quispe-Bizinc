const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Retrieve a list of users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of users to return
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/getAll', userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.get('/getById/:id', userController.getUserById);

module.exports = router;