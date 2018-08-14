export default (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });
};
