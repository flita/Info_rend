import { getRepository } from "typeorm";
import { AddMenu } from "../entity/Menu";
import { Controller } from "./controller";

export class MenuController extends Controller{
    repository = getRepository(AddMenu);

    fetchAll = async (req, res, next) => {
        try {
            const entities = await this.repository.find();

            res.status(200).json(entities);
        } catch (err) {
            res.status(404).json({message: "No Menu found!"})
        }
    }

    addMenu = async (req, res, next) => {
        const foodName = req.body.foodName;
        const imgUrl = req.body.imgUrl;
        const category = req.body.category;
        const description = req.body.description;
        const price = req.body.price;
        const preparation = req.body.preparation;

        try {
            const order = {
                foodName: foodName,
                imgUrl: imgUrl,
                category: category,
                description: description,
                price: price,
                preparation: preparation,
            };

            const result = await this.repository.save(order);
        } catch(err) {
            console.log(err);
            return;
        }

        res.status(201).json({ message: 'Added Menu Successfully!'})
    }

    deleteMenu = async (req, res, next) => {
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
    
}