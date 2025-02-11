const express = require('express');
const Mainrouter = express.Router();
const upload = require('../middleware/multer');
const MovieModel = require('../models/MovieModel');
const fs = require('fs');
Mainrouter.get('/', async (req, res) => {
    const movies = await MovieModel.find({});
    res.render('main', { movies });
});

Mainrouter.get('/add-movie', (req, res) => {
    res.render('add-movie');
});

Mainrouter.post('/add-movie', upload, async (req, res) => {
    const movie = req.body;
    movie.image = req.file.filename;

    await MovieModel.create(movie);

    console.log(movie);
    res.redirect('/');
});


Mainrouter.get('/edit/:id', async (req, res) => {
    const movie = await MovieModel.findById(req.params.id);
   res.render('edit-movie', { movie });
});

Mainrouter.post('/update/:id', upload, async (req, res) => {
    const movie = await MovieModel.findById(req.params.id);
    try {
        if (req.file) {
            fs.unlinkSync(`public/uploads/${movie.image}`);
            req.body.image = req.file.filename;
        }
        await MovieModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

Mainrouter.get('/delete/:id', async (req, res) => {
    const movie = await MovieModel.findById(req.params.id);
    try {
        if (movie) {
            fs.unlinkSync(`public/uploads/${movie.image}`);
        }
        await MovieModel.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

module.exports = Mainrouter;

