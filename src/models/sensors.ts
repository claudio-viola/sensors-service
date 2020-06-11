import { DataTypes, Model } from 'sequelize';

export class Sensor extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    Sensor.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      id: {
        primaryKey: true,
        type: DataTypes.STRING(36),
        unique: true,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'sensors',
      sequelize,
    });
  }

}
