// controllers/walletController.js

const Wallet = require('../models/walletSchema');
const Customer = require('../models/User'); 
const CourierCompany = require('../models/couriercompanySchema'); 

// Recharge wallet using userId and userModel from request body
const rechargeWallet = async (req, res) => {
  try {
    const { userId, amount, description, userModel } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId is required' });
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    if (!userModel || !['Customer', 'CourierCompany'].includes(userModel)) {
      return res.status(400).json({ message: 'Invalid userModel' });
    }

    let user;
    if (userModel === 'Customer') {
      user = await Customer.findById(userId);
    } else if (userModel === 'CourierCompany') {
      user = await CourierCompany.findById(userId);
    }

    if (!user) return res.status(404).json({ message: `${userModel} not found` });

    let wallet = await Wallet.findOne({ userId, userModel });
    if (!wallet) {
      wallet = new Wallet({ userId, userModel, balance: 0, transactions: [] });
    }

    wallet.balance += amount;
    wallet.transactions.push({ type: 'credit', amount, description: description || 'Wallet Recharge' });

    await wallet.save();

    return res.json({ message: 'Wallet recharged', balance: wallet.balance, transactions: wallet.transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  rechargeWallet,
};


// Debit wallet
const debitWallet = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    if (wallet.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    wallet.balance -= amount;
    wallet.transactions.push({ type: 'debit', amount, description: description || 'Wallet Debit' });

    await wallet.save();

    return res.json({ message: 'Amount debited', balance: wallet.balance, transactions: wallet.transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Refund wallet
const refundWallet = async (req, res) => {
  try {
    const { userId, amount, description, userModel } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, userModel: userModel || 'Customer', balance: 0, transactions: [] });
    }

    wallet.balance += amount;
    wallet.transactions.push({ type: 'refund', amount, description: description || 'Wallet Refund' });

    await wallet.save();

    return res.json({ message: 'Refund successful', balance: wallet.balance, transactions: wallet.transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get wallet info by userId (pass in query or body)
const getWallet = async (req, res) => {
  try {
    // You can choose to get userId from query or body, example query:
    const userId = req.query.userId || req.body.userId;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    return res.json({ balance: wallet.balance, transactions: wallet.transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all wallets
const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ updatedAt: -1 });

    // Optional: Populate names for display (Customer or CourierCompany)
    const enrichedWallets = await Promise.all(wallets.map(async (wallet) => {
      let userInfo = null;
      if (wallet.userModel === 'Customer') {
        userInfo = await Customer.findById(wallet.userId).select('name mobile');
      } else if (wallet.userModel === 'CourierCompany') {
        userInfo = await CourierCompany.findById(wallet.userId).select('companyName phone');
      }

      return {
        ...wallet.toObject(),
        userDetails: userInfo,
      };
    }));

    return res.status(200).json(enrichedWallets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch wallets' });
  }
};

module.exports = {
  rechargeWallet,
  debitWallet,
  refundWallet,
  getWallet,
  getAllWallets, 
};


