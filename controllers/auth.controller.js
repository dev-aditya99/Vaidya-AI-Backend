import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/jwtToken.js";
import createUniqueUserID from "../utils/createUniqueUserID.js";
import getRandomColor from "../utils/createRandomColors.js";


// sign up user 
export const signupUser = async (req, res) => {
    try {
        // distructing the data from req.body 
        const { first_name, last_name, email, password, confirm_password } = req.body;

        // check condition for password matches to confirm_password or not 
        if (password != confirm_password) {
            return res.status(400).json({ error: "Password doesn't match" })
        }

        // find a user by email 
        const user = await User.findOne({ email });

        // if user exist by that email, then send an error to client side 
        if (user) {
            return res.status(400).json({ error: "This user already exist." })
        }

        // create a unique user_id 
        const user_id = await createUniqueUserID(first_name, last_name, email);

        // Hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // get random color 
        const bgColor = getRandomColor();

        const fullName = `${first_name.replace(/\s+/g, '')}+${last_name.replace(/\s+/g, '')}`;

        // define avatars for user profiles
        const profile_pic = `https://ui-avatars.com/api/?name=${fullName}&size=200&background=${bgColor}&color=fff`

        // create new user 
        const newUser = new User({
            first_name,
            last_name,
            user_id,
            email,
            password: hashedPassword,
            profile_pic
        })

        if (newUser) {
            // generate JWT token 
            generateTokenAndSetCookie(newUser?._id, res);

            // save the new user 
            await newUser.save();

            // send an json response
            res.status(201).json({
                msg: "User Sign Up Successfully",
                _id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                user_id: newUser.user_id,
                profile_pic: newUser.profile_pic,
            })
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }

    } catch (error) {
        console.error("Error in Sign Up Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// login user 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // if user not found 
        if (!user) {
            return res.status(401).json({ error: "Invalid Email" });
        }

        // check password is correct or not 
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // if password is incorrect 
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Wrong Password" });
        }

        // generate token 
        generateTokenAndSetCookie(user?._id, res);

        // send an json response
        res.status(201).json({
            msg: "User Login Successfully",
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            user_id: user.user_id,
            profile_pic: user.profile_pic,
        })
    } catch (error) {
        console.error("Error in Login Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// logout user 
export const logoutUser = async (req, res) => {
    try {
        await res.cookie("uuid", "", { maxAge: 0 });
        res.status(201).json({ msg: "User Logged Out Successfully" })
    } catch (error) {
        console.error("Error in Logout Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}