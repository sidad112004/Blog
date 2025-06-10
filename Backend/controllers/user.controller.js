import Asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js";
import ApiRespoance from "../utils/ApiResponse.js";


const userinfo = Asynchandler(async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).select("-password -RefreshToken ");
    if (!user) {
        throw new ApiError(400, "user not found")
    };
    res.status(200).json(new ApiRespoance(200, user, "user info"))
});


const registerUser = Asynchandler(async (req, res) => {

    const { name, username, email, password,bio } = req.body;

    if (!name || !username || !email || !password) {

        throw new ApiError(400, "Please provide all fields")

    }

    const checkusername = await User.findOne({ username });

    if (checkusername) {

        throw new ApiError(400, "Username already exists")
    }

    const checkemail = await User.findOne({ email });

    if (checkemail) {

        throw new ApiError(400, "Email already exists")

    }
   
    try {
        const user = await User.create(
            {
                name,
                username,
                email,
                password,      
                bio
            });

        if (!user) {
            throw new ApiError(400, "user not created")
        }

        const finaluser = await User.findById(user._id).select("-password -RefreshToken");
        res
            .status(201)
            .json(
                new ApiRespoance(201, finaluser, "user created")
            );
    }
    catch (error) {
        throw new ApiError(400, "problem in registering user")
    }
})


const loginUser = Asynchandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Please provide all fields")
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(400, "user not found")
    }
    const checkpassword = await user.ispasswordcorrect(password)

    if (!checkpassword) {
        throw new ApiError(400, "Invalid password")
    }

    const finaluser = await User.findById(user._id).select("-password -RefreshToken ");


    const RefreshToken = await user.getJwtToken();

    user.RefreshToken = RefreshToken;

    await user.save();

    res
        .status(200)
        .cookie("RefreshToken", RefreshToken,
            {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24
            }
        )
        .json(new ApiRespoance(200, finaluser, "user logged in"))

});

const logoutUser = Asynchandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(400, "user is not found")
    }

    await User.updateOne({ _id: user._id }, { RefreshToken: undefined });

    const logoutuser = await User.findById(user._id).select("-password -RefreshToken")

    if (!logoutuser) {
        throw new ApiError(400, "logout user in not found")
    }

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .clearCookie("RefreshToken", options)
        .json(
            new ApiRespoance(
                200,
                logoutuser,
                "user logout"
            )
        )
})

const updateProfile = Asynchandler(async (req, res) => {
  const id = req.user._id;
  const { name, username, email, bio } = req.body;

  const existingUsername = await User.findOne({ username, _id: { $ne: id } });
  if (existingUsername) {
    throw new ApiError(400, "Username is already taken.");
  }
  
  const existingEmail = await User.findOne({ email, _id: { $ne: id } });
  if (existingEmail) {
    throw new ApiError(400, "Email is already in use.");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name, username, email, bio },
    { new: true, runValidators: true }
  ).select("-password -RefreshToken");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  res.status(200).json(new ApiRespoance(200, user, "Profile updated successfully"));
});



export { userinfo,registerUser, loginUser, logoutUser,updateProfile };