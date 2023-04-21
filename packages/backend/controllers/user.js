import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

export const createUser = async (req, res) => {

	const newUser = new User(req.body);

	try {
		await newUser.save();
		res.status(201).json(newUser);
	}
	catch (error) {
		console.error(error);
		res.status(409).json({ message: error.message });
	}
};

export const getUsers = async (req, res) => {

	try {
		const users = await User.find();
		res.status(200).json(users);
	}
	catch (error) {
		console.error(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserById = async (req, res) => {

	try {
		const user = await User.findById(req.params.id);
		if (user) {
			res.send(user);
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export const updateUserById = async (req, res) => {

	const { id } = req.params;
	const { username, passwordHash, salt, firstName, lastName, email, phone, cart, isAdmin } = req.body;
	const updated = { username, passwordHash, salt, firstName, lastName, email, phone, cart, isAdmin, _id: id };

	try {
		await User.findByIdAndUpdate(id, updated, { new: true });
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteUserById = async (req, res) => {

	const { id } = req.params;

	try {
		await User.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};

export const login = expressAsyncHandler(async (req, res) => {
	const user = await User.findOne({ username: req.body.username });
	if (user) {
		if (req.body.passwordHash === user.passwordHash) {
			res.send({
				_id: user._id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				token: generateToken(user)

			});
			return;
		}
		res.status(401).send({ message: 'Invalid username or password, please try again.' });
	}
});