const db = require('../config/db');

// Render the contact form page with existing contact messages
const renderContactPage = (req, res) => {
    const sql = 'SELECT * FROM contact_messages ORDER BY timestamp DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact', {
            layout: 'layouts/main-layouts',
            title: 'Contact Us',
            showNavbar: true,
            showFooter: true,
            contactMessages: results, // Pass contact messages to the view
        });
    });
};

// Handle contact form submission
const submitContactForm = (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error submitting contact form:', err);
            return res.status(500).send('Error submitting contact form');
        }
        res.redirect('/contact'); // Redirect after form submission
    });
};

// Retrieve all contact messages (for admin view or message viewing)
const getContactMessages = (req, res) => {
    const sql = 'SELECT * FROM contact_messages ORDER BY timestamp DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact-messages', {
            layout: 'layouts/main-layouts',
            title: 'Contact Messages',
            messages: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

module.exports = {
    renderContactPage,
    submitContactForm,
    getContactMessages,
};
