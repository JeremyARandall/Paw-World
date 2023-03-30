import accountMessage from '../models/accountMessage.js';

export const getAccounts = async (req, res) => {
	try {
		const accountMessages = await accountMessage.find();
		res.status(200).json(accountMessage);
	}
	catch (error) {
		res.status(404).json({message: error.message});
	}
}

export const createAccount = async (req, res) => {
	
	const newAccount = new accountMessage(req.body);
	
	try {
		await newAccount.save();
		res.status(201).json(newAccount);
	}
	catch (error) {
		res.status(409).json({message: error.message});
	}
}