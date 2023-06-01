import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      userType: user.userType,
      Email: user.Email,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export { signToken };