import drop from './drop';
import create from './create';
import migrate from './migrate';

export default async function() {
  await drop();
  await create();
  await migrate();
}