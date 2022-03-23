const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Budget = require("../models/budget");
var MongoClient = require('mongodb').MongoClient;
var url = "";


const list = async (req, res, next) => {
    const email = req.email;
  
    try {
      const budget = await Budget.findOne({ email: email })
  
      if (!email) {
        const err = new Error("User not found!");
        err.statusCode = 401;
        throw err;
      }
  
      res.status(200).json({
        message: "Budget Fetched!",
        email: budget.email,
        budget:budget.budget
      });
    } catch (err) {
      next(err);
    }
  };

  const add = async (req, res, next) => {
    const email = req.email;
    const budget = req.budget;
  MongoClient.connect(url, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { email: email, budget: budget };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
};
 
  // router.post("/budget/add", isAuth, budgetController.add);
// router.put("/budget/update", isAuth, budgetController.update);
