// migrations/20240722024722-create-user-authentication.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('UserAuthentications', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING, // Use STRING to match the model definition
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('UserAuthentications');
    },
  };
  