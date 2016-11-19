// array : tags, developers, attachments
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('project', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    version: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
        max: 100
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        models.project.belongsToMany(models.customer, { through: 'CustomerProject' });
        models.project.belongsToMany(models.developer, { through: 'DeveloperProject' });
      }
    }
  });
};
