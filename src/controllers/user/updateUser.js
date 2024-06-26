const bcrypt = require('bcrypt');
const User = require('../../models/user');
const logger = require('../../utils/logger');

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            user.username = username;
            user.password = await bcrypt.hash(password, 10); 
            user.firstName = firstName;
            user.lastName = lastName;
            user.address = address;
            user.occupation = occupation;
            user.birthdate = birthdate;
            user.maritalStatus = maritalStatus;
            user.sex = sex;
            user.email = email;
            await user.save();
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

module.exports = updateUser;
