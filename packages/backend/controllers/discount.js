import Discount from '../models/discountSchema.js';

export const getDiscounts = async (req, res) => {

    try {
        const discounts = await Discount.find({}); //have the DB find discounts
        res.json(discounts); //return the discounts to calling function
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id); //find discount by its id and respond with it in json form
        if (discount) {
            res.send(discount);
        } else {
            res.status(404).send({ message: 'Discount Not Found' });
        }
    } catch (error) {
        console.error(error); //write error
        res.status(500).json({ message: error.message });
    }
};

export const createDiscount = async (req, res) => {

    const newDiscount = new Discount(req.body);

    try {
        await newDiscount.save();
        res.status(201).json(newDiscount);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};