const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/middleware');
const authController = require('../controllers/authController');

// Routes untuk Register
router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.registerUser);

// Routes untuk Login
router.get('/login', authController.renderLoginPage);
router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

router.get('/', isLoggedIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;
