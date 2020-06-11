import { DataTypes, Model } from 'sequelize';

export class SensorNotification extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    SensorNotification.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      notificationStatus: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      sensorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        unique: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'sensors_notifications',
      sequelize,
    });
  }

}
