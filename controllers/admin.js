const admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Joi = require('joi');

const schemaSignup = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string(),
    // .email({ tlds: { allow: true } }),
    password: Joi.string().min(8).required(),
    phone: Joi.number().required(),
});

const schemaSignin = Joi.object({
    userName: Joi.string(),
    // .email({ tlds: { allow: true } }),
    password: Joi.string().min(8).required(),
});
class Controller {

    // get all patients
    getAll(req, res, next) {
        admin.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new admin(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    ////////////////////////////////////////////
    ////////////////  Signup  //////////////////
    ////////////////////////////////////////////

    async signup(req, res) {
        //validate data entry to new user
        const { error } = schemaSignup.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        //validate if the user is exist or not
        const emailExist = await admin.findOne({ userName: req.body.userName })
        if (emailExist) return res.status(400).send("the userName is exists");
        //Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create a new user
        const admins = new admin({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword,
            phone: req.body.phone,
        })
        //add to user to database
        try {
            const newAdmin = await admins.save()
            res.status(200).json({ newAdmin })
        }
        catch (error) {
            res.status(404).send({ message: error.message })
        }
    }

    //delete
    delete(req, res, next) {
        admin.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
            if (err) {
                res.status(404).json(err)
            }
            else {
                res.status(200).json("deleted successfully ")
                console.log("Deleted price : ", docs);
            }
        });
    }
    //update
    async update(req, res, next) {
        let { id } = req.params;
        const { name, phone, userName, password } = req.body;
        const oldAdmin = await admin.findById(id);
        if (name) oldAdmin.name = name;
        if (phone) oldAdmin.phone = phone;
        if (userName) oldAdmin.userName = userName;
        if (password) oldAdmin.password = password;


        await oldAdmin.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };

    ////////////////////////////////////////////
    ////////////////  Signin  //////////////////
    ////////////////////////////////////////////
    async signin(req, res) {
        const admins = await admin.findOne({ userName: req.body.userName })
        //validate data entry to new user
        const { error } = schemaSignin.validate(req.body)
        if (error) return res.status(400).send({ status: 400, message: error.details[0].message })
        //Check if email is exsist
        if (!admins) return res.status(400).send({ status: 400, message: 'the userName or password is wrong' });
        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, admins.password)
        if (!validPassword) return res.status(400).send({ status: 400, message: 'the userName or password is wrong' })
        // if all information is true
        // Create a token and assign it to the user
        const token = jwt.sign({ _id: admins._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).status(200).send({ status: 200, message: 'success', admin: admins, Token: token })
    }
}



const controller = new Controller();
module.exports = controller;