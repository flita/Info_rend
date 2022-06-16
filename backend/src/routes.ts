import { Router } from 'express';
import { CartController } from './controller/cart.controller';
import { OrderController } from './controller/order.controller';
import { UserController } from './controller/user.controller';
import { MenuController } from './controller/menu.controller';

export function getRouter(): Router {
    const router = Router();
    const auth = require('./middleware/auth');
    const body = require('express-validator');

    const userController = new UserController();
    const orderController = new OrderController();
    const cartController = new CartController();
    const menuController = new MenuController();

    //User
    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.get('/users', userController.fetchAll);
    router.post('/createUser', userController.createUser);
    router.delete('/users/:id', userController.deleteUser);

    //Order
    router.get('/orders', orderController.fetchAll);
    router.post('/createOrder', orderController.AddOrder);
    router.delete('/deleteOrder/:id', orderController.deleteOrder);
    router.delete('/deleteAllOrder', orderController.deleteAllOrder);

    //Cart
    router.get('/getMaxPrep', cartController.getMaxPreparation);
    router.get('/getMaxPrice', cartController.getMaxPrice);
    router.get('/order', cartController.fetchAll);
    router.post('/addFinal', cartController.addFinal);
    router.delete('/menu/:id', cartController.deleteCart);

    //Menu
    router.get('/menu', menuController.fetchAll);
    router.post('/createMenu', menuController.addMenu);
    router.delete('/menu/:id', menuController.deleteMenu);

    return router;
}
