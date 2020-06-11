import { DataTypes, Model } from 'sequelize';

export class SensorThreshold extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    SensorThreshold.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      sensorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        unique: true,
      },
      threshold: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'sensors_thresholds',
      sequelize,
    });
  }

}
