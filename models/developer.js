module.exports = (sequelize, DataTypes) => {
  return sequelize.define('developer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'], // will only allow letters
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true
      }
    },
    experience: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        min: 0
      }
    },
    photo: {
      type: DataTypes.STRING
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        not: ["[a-z]",'i'], // will not allow letters
        notEmpty: true
      }
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    timeZone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: -12,
        max: 12
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        models.developer.belongsToMany(models.skill, { through: 'DeveloperSkill' });
        models.developer.belongsToMany(models.project, { through: 'DeveloperProject' });
      }
    }
  });
};
