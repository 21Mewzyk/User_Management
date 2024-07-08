const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');
const bcrypt = require('bcrypt');

// Update User Authentication and Data
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
    try {
        const userAuth = await UserAuthentication.findByPk(userId);
        const userData = await UserData.findByPk(userId);

        if (userAuth && userData) {
            if (username) userAuth.username = username;
            if (password) userAuth.password = await bcrypt.hash(password, 10);
            if (firstName) userData.firstName = firstName;
            if (lastName) userData.lastName = lastName;
            if (address) userData.address = address;
            if (occupation) userData.occupation = occupation;
            if (birthdate) userData.birthdate = birthdate;
            if (maritalStatus) userData.maritalStatus = maritalStatus;
            if (sex) userData.sex = sex;
            if (email) userData.email = email;

            await userAuth.save();
            await userData.save();

            res.status(200).json({ message: 'User updated successfully', userAuth, userData });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateUser };
