const UserAuthentication = require('../models/userAuthentication');
const UserData = require('../models/userData');
const bcrypt = require('bcrypt');

// Update User Authentication and Data
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
    try {
        const [userAuth, userData] = await Promise.all([
            UserAuthentication.findByPk(userId),
            UserData.findByPk(userId)
        ]);

        if (!userAuth || !userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateFields = async (model, fields) => {
            for (const [key, value] of Object.entries(fields)) {
                if (value) model[key] = key === 'password' ? await bcrypt.hash(value, 10) : value;
            }
            await model.save();
        };

        await Promise.all([
            updateFields(userAuth, { username, password }),
            updateFields(userData, { firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email })
        ]);

        res.status(200).json({ message: 'User updated successfully', userAuth, userData });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateUser };
