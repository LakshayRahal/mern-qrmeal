
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");

// const registerUser = async (req, res) => {  
//   const { userName, email, password } = req.body;

//   if (!userName || !email || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required" });
//   }

//   if (!email.endsWith("@bennett.edu.in")) {
//     return res.status(400).json({
//       success: false,
//       message: "Please use your university email address (@bennett.edu.in)",
//     });}

//   try {
//     const checkUser = await User.findOne({ email: email });
//     if (checkUser) {
//       console.log(checkUser);
//       return res.status(400).json({
//         success: false,
//         message: "User already exists. Please try with a different email",
//       });
//     }

//     console.log("Received Data:", req.body);

//     const hashPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       userName,
//       email,
//       password: hashPassword,
//     });

//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Registration Successful",
//       user: newUser,
//     });
//   } catch (e) {
//     console.error("Error Saving User:", e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (!email.endsWith('@bennett.edu.in')) {
    return res.status(400).json({
      success: false,
      message: 'Please use your university email address (@bennett.edu.in)',
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists. Please try with a different email',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: 'Registration Successful',
      user: newUser,
    });
  } catch (e) {
    console.error('Error Saving User:', e);
    return res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};



const loginUser = async (req, res) => {
  const { email, password, name, fromOAuth } = req.body;

  try {
    if (fromOAuth) {
      // OAuth Login (e.g., Microsoft or Google)
      // Check if the user exists by email
      let user = await User.findOne({ email });

      if (!user) {
        // If user doesn't exist, create a new user without password
        user = new User({
          userName: name || "Unnamed User", // Set default name if not provided
          email,
          role: "student", // Default role, can be changed based on your needs
        });

        await user.save(); // Save the user to the database
      }

      // Generate JWT token for OAuth user
      const token = jwt.sign(
        {
          id: user._id,
          userName: user.userName,
          role: user.role,
          email: user.email,
        },
        "CLIENT_SECRET_KEY", // Replace with a proper secret key
        { expiresIn: "60m" }
      );

      // Send token and user data as response
      res.cookie("token", token, { httpOnly: true, secure: false }).json({
        success: true,
        message: "Logged in via OAuth successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          userName: user.userName,
        },
        token,
      });
    } else {
      // Manual Login (with email and password)
      const checkUser = await User.findOne({ email });

      if (!checkUser) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist. First Register",
        });
      }

      // Compare the password
      const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
      if (!checkPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Password! Please try again",
        });
      }

      // Token creation for authentication
      const token = jwt.sign(
        {
          id: checkUser._id,
          userName: checkUser.userName,
          role: checkUser.role,
          email: checkUser.email,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "60m" }
      );

      // Send token and user details in response
      res.cookie("token", token, { httpOnly: true, secure: false }).json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: checkUser._id,
          email: checkUser.email,
          role: checkUser.role,
          userName: checkUser.userName,
        },
        token,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};



// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const checkuser = await User.findOne({ email });

//     if (!checkuser) {
//       return res.json({
//         success: false,
//         message: "User doesn't exist. First Register",
//       });
//     }

//     const checkPasswordMatch = await bcrypt.compare(
//       password,
//       checkuser.password
//     );
//     if (!checkPasswordMatch) {
//       return res.json({
//         success: false,
//         message: "Incorrect Password! Please try again",
//       });
//     }

//     // Token creation for authentication
//     const token = jwt.sign(
//       {
//         id: checkuser._id,
//         userName: checkuser.userName,
//         role: checkuser.role,
//         email: checkuser.email,
//       },
//       "CLIENT_SECRET_KEY",
//       { expiresIn: "60m" }
//     );

//     // Send token and user details in response
//     res.cookie("token", token, { httpOnly: true, secure: false }).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         id: checkuser._id,
//         email: checkuser.email,
//         role: checkuser.role,
//         userName: checkuser.userName,
//       }, // Make sure to include user details
//       token,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };




// log out portion
const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

// stay loggined
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
