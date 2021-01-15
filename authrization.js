const User = require(`./models/users`);

module.exports.hod = async function (req, res, next) {
  try {
    const hodUser = await User.findOne({ _id: req.user._id });
    if (hodUser.userType != 'HOD') {
      return res.status(401).send('Not Authorized');
    }
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
