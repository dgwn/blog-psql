const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year_written", {
      type: DataTypes.INTEGER,
      validate: {
        isInYearRange(value) {
          const currentYear = new Date().getFullYear();
          if (parseInt(value) < 1991 || parseInt(value) > currentYear) {
            throw new Error("Year must be between 1991 and present");
          }
        }
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year_written");
  }
};
