import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
import { Controller } from "./controller";

export class CartController extends Controller {
    repository = getRepository(Cart);

    fetchAll = async (req, res, next) => {
        try {
            const entities = await this.repository.find();

            res.status(200).json(entities);
        } catch (err) {
            res.status(404).json({message: "No found!"})
        }
    }

    deleteCart = async (req, res, next) => {
        try {
            const entity = await this.repository.findOneOrFail(req.params.id);

            if(!entity) {
                res.status(404).json({message: 'No such Entity to delete!'});
                return;
            }

            const del = await this.repository.delete(req.params.id);

            res.status(200).json(del);
        } catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }

    getMaxPreparation = async (req, res) => {
        try {
            const entity = await this.repository.query("SELECT MAX(preparation) as maxPreparation FROM orders");
            
            if(!entity) {
                res.status(404).json('No Entity Found To Be Deleted!');
                return;
            }

            res.json(entity);
        } catch(err) {
            console.log('No Entity');
        }
    };

    getMaxPrice = async (req, res) => {
        try {
            const entity = await this.repository.query("SELECT SUM(price) as sumPrice FROM orders");

            if(!entity) {
                res.status(404).json('No Entity Found To Be Deleted!');
                return;
            }
            

            res.json(entity);
        } catch(err) {
            console.log('No Entity');
        }
    };

    getOrderId = async (req, res) => {
        try {
            const entity = await this.repository.query("SELECT id FROM orders");

            if(!entity) {
                res.status(404).json('No Entity Found To Be Deleted!');
                return;
            }
            

            res.json(entity);
        } catch(err) {
            console.log('No Entity');
        }
    };

    addFinal = async (req, res) => {
        const price = req.body.price;
        const preparation = req.body.preparation;
        const uploaderId = req.body.uploaderId;
        const menuId = req.body.uploaderId;

        try {
            const order = {
                price: price,
                preparation: preparation,
                uploaderId: uploaderId,
                menuId: menuId
            };

            const result = await this.repository.save(order);
        } catch(err) {
            console.log(err);
            return;
        }

        res.status(201).json({ message: 'Added Order Successfully!'})
    }


}