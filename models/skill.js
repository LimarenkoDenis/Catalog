module.exports = (sequelize, DataTypes) => {
  return sequelize.define('skill', {
    technology: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => {
        models.skill.belongsToMany(models.developer, { through: 'DeveloperSkill' });
      }
    }
  });
};
