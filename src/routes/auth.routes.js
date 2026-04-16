const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = Router();

// ── Validators ────────────────────────────────────────────────────────────────

const registerRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('username')
    .trim().isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username must be 3-30 alphanumeric characters (underscores/hyphens allowed).'),
  body('firstName').trim().notEmpty().withMessage('First name is required.'),
  body('lastName').trim().notEmpty().withMessage('Last name is required.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.'),
];

const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

const refreshRules = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required.'),
];

// ── Routes ────────────────────────────────────────────────────────────────────

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.post('/refresh', refreshRules, validate, authController.refresh);
router.get('/me', authenticate, authController.me);

module.exports = router;
