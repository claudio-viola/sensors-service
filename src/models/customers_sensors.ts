import { DataTypes, Model } from 'sequelize';

export class CustomerSensor extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    CustomerSensor.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      customerId: {
        allowNull: false,
        type: DataTypes.STRING(36),
        unique: true,
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
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'customers_sensors',
      sequelize,
    });
  }

}
