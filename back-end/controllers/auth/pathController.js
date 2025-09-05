import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";




// register controller
const register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) return res.json({
            success: false,
            message: 'User Already exists with the same email! please try again'
        })

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,

        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: 'Registration successful..',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'

        })
    }
}


//  login controller

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({
            success: false,
            message: 'User doesn`t exists! Please register first..'
        })
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) return res.json({
            success: false,
            message: 'Incorrect password! Please try again',
        })
        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email,
            userName: checkUser.userName,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'Login Successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName,
            },
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        });
    }
};


//logout

const logout = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: 'Logout successfully',
    });
}



//auth middleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        success: false,
        message: 'Unauthorised user'
    })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorised user',
            error: error.message,
        })
    }

}








export { register, loginUser, logout, authMiddleware };
