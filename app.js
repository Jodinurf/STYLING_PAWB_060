const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db'); // Pastikan ini menghubungkan ke database Anda
const path = require('path');

const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');

// Rute
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Anda bisa mengubah ini jika menggunakan HTTPS
}));

app.use(express.urlencoded({ extended: true })); // Middleware untuk mengurai data formulir
app.use(express.static(path.join(__dirname, 'public')));

// Menentukan view engine dan layout
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main-layouts');

// Menggunakan rute
app.use('/', authRoutes);
app.use('/todos', todoRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
