const Transaction = require("../models/transaction");


const addTransaction = async (req, res, next) => {
    try {
      const transType = req.body.transType;
      const amount = req.body.amount;
      const category =req.body.category;
  
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   const errArray = errors.array();
      //   const err = new Error(errArray[0].msg);
      //   err.statusCode = 422;
      //   err.data = errArray;
      //   throw err;
      // }
  

      const transaction = new Transaction({
        transType: transType,
        amount: amount,
        category: category,
      });
      const savedTransaction = await transaction.save();
  
      res.status(201).json({
        message: "Transaction saved!",
        TransactionId: savedTransaction._id,
      });
    } catch (err) {
      next(err);
    }
  };


  const getTransaction = async (req, res, next) => {
    const TransactionId = req.TransactionId;
  
    try {
      const user = await User.findById(userId);
  
      if (!userId || !user) {
        const err = new Error("User Unauthenticated!");
        err.statusCode = 401;
        throw err;
      }
  
      res.status(200).json({
        message: "User Fetched!",
        userId: user._id.toString(),
        email: user.email,
        phone: user.phone,
        fname: user.fname,
        lname: user.lname,
        pages: user.pages,
      });
    } catch (err) {
      next(err);
    }
  };
