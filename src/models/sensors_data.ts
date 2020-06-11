import { DataTypes, Model } from 'sequelize';

export class SensorData extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    SensorData.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      sensorId: {
        allowNull: false,
        type: DataTypes.STRING(36),
        unique: true,
      },
      time: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      value: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
    }, {
      modelName: 'sensors_data',
      sequelize,
    });
  }

}
