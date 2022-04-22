const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const StockController = require('../app/controllers/StockController');

router.get('/', HomeController.homePage);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

router.post('/stocks', StockController.stocksCreate);
router.get('/stocks', StockController.stocksFindAll);
router.get('/stocks/:id', StockController.stocksFind);
router.put('/stocks/:id', StockController.stocksUpdate);
router.delete('/stocks/:id', StockController.stocksDelete);

module.exports = router;