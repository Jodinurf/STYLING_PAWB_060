const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Controller untuk Register User
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Register Error:', err);
            return res.status(500).send('Gagal mendaftarkan user');
        }
        res.status(200).send('User berhasil didaftarkan');
    });
};

// Controller untuk Render Register Page
const renderRegisterPage = (req, res) => {
    res.render('register', {
        layout: 'layouts/main-layouts',
        title: 'Register',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Render Login Page
const renderLoginPage = (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layouts',
        title: 'Login',
        showNavbar: false,
        showFooter: false,
        error: null,
    });
};

// Controller untuk Login User
const loginUser = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            console.log('User not found:', username);
            return res.status(400).send('User not found');
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error('Bcrypt Error:', err);
                return res.status(500).send('Error checking password');
            }

            if (!isMatch) {
                console.log('Incorrect password for user:', username);
                return res.status(401).send('Incorrect password');
            }

            req.session.userId = results[0].id;
            console.log('Login successful, userId set to:', req.session.userId);
            res.redirect('/');
        });
    });
};

// Controller untuk Logout User
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
};

// Export semua controller
module.exports = {
    registerUser,
    renderRegisterPage,
    renderLoginPage,
    loginUser,
    logoutUser,
};
