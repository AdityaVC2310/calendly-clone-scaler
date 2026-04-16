const { Router } = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = Router();

const updateProfileRules = [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty.'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty.'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be 500 characters or fewer.'),
  body('timezone').optional().isString().withMessage('Timezone must be a string.'),
];

// Public
router.get('/:username', userController.getPublicProfile);

// Protected
router.get('/me/profile', authenticate, userController.getProfile);
router.patch('/me/profile', authenticate, updateProfileRules, validate, userController.updateProfile);

module.exports = router;
