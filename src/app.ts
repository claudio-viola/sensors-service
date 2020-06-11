import { initServer } from './server';
/**
 * [init Runs the server]
 */
async function init (): Promise<void> {
  await initServer();
}

init().then(() => {
  // tslint:disable-next-line: no-console
  console.log(`Server running`);
})
.catch(err => {
  // tslint:disable-next-line: no-console
  console.log(err);
});
