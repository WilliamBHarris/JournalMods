const { Router } = require("express");
const { UniqueConstraintError } = require("sequelize/lib/errors");


const router = require("express").Router();
const { UserModel } = require("../models");

router.post("/register", async (req, res) => {
  let { email, password } = req.body.user;
try{
  const User = await UserModel.create({
    email,
    password,
  });
  res.status(201).json({
      message: "User is registered!",
      user: User
});
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: 'Email already in use',
        })
    } else {
    res.status(500).json({
        message: 'Failed to register user',
    });
}
}
});

router.post('/login', async (req, res) => {
    let { email, password} = req.body.user;
    try { 
        const loginUser = await UserModel.findOne({
        where: {
            email: email,
        },
    });
    if(loginUser){
    res.status(200).json({
        user: loginUser,
        message: 'User is logged in!'
    });
} else {
    res.status(401).json({
        message: 'login failed'
    });
}
} catch (error) {
    res.status(500).json({
        message: 'Failed login'
    })
}
});

module.exports = router;
