const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middlewares/validate");
const {
    registerSchema,
    loginSchema
} = require("../validators/authValidator");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a learner account
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: learner@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: password123
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid registration data
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: learner@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid login data
 *       401:
 *         description: Invalid email or password
 *       403:
 *         description: Account is suspended
 *       500:
 *         description: Internal server error
 */
router.post("/login", validate(loginSchema), login);

module.exports = router;
