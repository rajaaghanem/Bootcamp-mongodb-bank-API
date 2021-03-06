const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get all products
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});


//Can deposit cash to a user
router.patch("/api/users/deposite/:id", handleDeposite);

async function handleDeposite(req, res) {
  const _id = req.params.id;
  const amount = req.body.amount;

  console.log("amount", amount);

  const updates = Object.keys(req.body);
  const allowedUpdates = ["amount"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send("user not found");
    const editedUser = depositingUser(user, amount);
    const updatedUser = await User.findByIdAndUpdate(_id, editedUser, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) return res.status(404).send();
    res.status(200).send(updatedUser);

  } catch (e) {
    res.status(400).send(e.message);
  }
}

//update the cash in user and return user
function depositingUser(user, moneyAmount) {
  const newUser = {
    passID: user.passID,
    cash: user.cash + moneyAmount,
    credit: user.credit,
  };
  return newUser;
}


//add credit amount to the user 
router.patch("/api/users/credit/:id", handleCredit);

async function handleCredit(req, res){
    const _id = req.params.id;
    const amount = req.body.amount;
 
    if (amount < 0) res.status(404).send("Can't update credit with negative number");

    try{
        const user = await User.findById(_id);
        if (!user) return res.status(404).send("user not found");
        const editedUser = creditUser(user, amount);
        const updatedUser = await User.findByIdAndUpdate(_id, editedUser, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) return res.status(404).send();
    res.status(200).send(updatedUser);

    }catch(e){
        res.status(400).send(e.message);
    }

}

function creditUser(user, moneyAmount){
    const newUser = {
        passID: user.passID,
        cash: user.cash,
        credit: user.credit + moneyAmount,
      };
      return newUser;
}

//withdraw money from user
router.patch("/api/users/withdraw/:id", handleWithdraw);

async function handleWithdraw (req, res){
    const _id = req.params.id;
    // const _idRecieve = req.body.id;
    const amount = req.body.amount;

    console.log(amount);
    try{
        const user = await User.findById(_id);
        console.log(user.cash + user.credit);

        if (!user) return res.status(404).send();
        if ((user.cash + user.credit) > amount) {

            theUser = enoughMoney(user, amount);
            const updatedUser = await User.findByIdAndUpdate(_id, theUser, {
                new: true,
                runValidators: true,
            })
            if (!updatedUser) return res.status(404).send();
            res.status(200).send(updatedUser);
        }else{
            res.status(400).send("Not enough money");
        }

    }catch(e){
            res.status(400).send(e.message);
        }
}

function enoughMoney(theUser, moneyAmount) {
    theUser = { passID:theUser.passID, cash: theUser.cash - moneyAmount, credit: theUser.credit};
  
    if (theUser.cash < 0)
      theUser = {
        passID: theUser.passID,
        credit: theUser.credit + theUser.cash,
        cash: 0,
      };
  
    return theUser;
  }


  router.patch("/api/users/transfer/:id", handleTransfer);

  async function handleTransfer (req, res){
    const _idTrans = req.params.id;
    const _idRecieve = req.body.id;
    const amount = req.body.amount;

    if (amount < 0) res.status(404).send("Can't transfer negative number");
 
    try{
        const transfer = await User.findById(_idTrans);
        const recevier = await User.findById(_idRecieve);
        if(!(transfer || recevier)) return res.status(404).send("user not found");

        if (transfer.cash + transfer.credit > amount) {
            tranferUser = enoughMoney(transfer, amount);
            reciverUser = { passID:recevier.passID, cash:recevier.cash, credit: recevier.credit + amount };

            const updatedTrans = await User.findByIdAndUpdate(_idTrans, tranferUser, {
                new: true,
                runValidators: true,
            })

            const updatedrecevier = await User.findByIdAndUpdate(_idRecieve, reciverUser, {
                new: true,
                runValidators: true,
            })

            res.status(200).send([updatedTrans , updatedrecevier]);
        }else {
            res.status(404).send("Not enough money");
        }
        
    }catch(e){
        res.status(400).send(e.message);
    }
  }


module.exports = router;
