import User from '../models/userSchema.js';

export const createUser = async (req, res) => {
	
	const newUser = new User(req.body);
	
	try {
		await User.save();
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
	const { username, passwordHash, salt, email, phone, cart, isAdmin } = req.body;
	const updated = { username, passwordHash, salt, email, phone, cart, isAdmin, _id: id};

	try{
		await User.findByIdAndUpdate(id, updated, {new: true});
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(304).json({ message: error.message });
	}
};

export const deleteUserById = async (req, res) => {
	
	const { id } = req.params;

	try{
		await User.findByIdAndDelete(id);
		res.status(200).json(updated);
	}
	catch (error) {
		console.error(error);
		res.status(204).json({ message: error.message });
	}
};