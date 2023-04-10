import User from '../models/userSchema';

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	}
	catch (error) {
		res.status(404).json({message: error.message});
	}
}

export const createUser = async (req, res) => {
	
	const newUser = new User(req.body);
	
	try {
		await User.save();
		res.status(201).json(newUser);
	}
	catch (error) {
		res.status(409).json({message: error.message});
	}
}