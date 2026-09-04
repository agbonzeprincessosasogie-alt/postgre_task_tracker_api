const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppDataSource = require("../config/data-source");

const registerUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const userRepository =
            AppDataSource.getRepository("User");

        const existingUser =
            await userRepository.findOneBy({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            email,
            password: hashedPassword
        });

        const savedUser =
            await userRepository.save(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser.id,
                email: savedUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const userRepository =
            AppDataSource.getRepository("User");

        const user =
            await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET, {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser
};