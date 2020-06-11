import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import * as chaiSubset from 'chai-subset';
import { exec } from 'child-process-promise';
import * as http from 'http';
import { Sequelize } from 'sequelize';
import * as sinon from 'sinon';
import * as config from 'src/config';
import { initServer } from 'src/server';
import * as supertest from 'supertest';

chai.use(chaiExclude);
chai.use(chaiSubset);

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
  {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    dialect: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
  },
);
const sequelizeQueryInterface = sequelize.getQueryInterface();
/**
 * Drops all tables through sequelize]
 */
async function dropTables (): Promise<void> {
  return sequelizeQueryInterface.dropAllTables();
}

const SANDBOX: sinon.SinonSandbox = sinon.createSandbox();
const expect: Chai.ExpectStatic = chai.expect;
let request: supertest.SuperTest<supertest.Test>;

before(async () => {
  // tslint:disable-next-line
  console.log(`**** DROPPING ALL TABLES ****`);
  await dropTables();
  // tslint:disable-next-line
  console.log(`**** RUNNING SEQUELIZE MIGRATIONS ****`);
  await exec(`npm run db:migrate`);
  const app: http.Server = await initServer();
  request = supertest.agent(app);
});

afterEach(async () => {
  SANDBOX.restore();
});

export {
  sinon,
  supertest,
  request,
  SANDBOX,
  expect,
};
