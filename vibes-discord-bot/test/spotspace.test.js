import spotspace from 'spotspace';

test("spotspace", async () => {
  const ss = spotspace({prefixUrl: 'http://spot-dev.space:2000'});
  const { Space, LedgerEntry } = ss.models;
  const space0 = new Space({name: 'hello'});
  await space0.save();
  console.log(space0);
  const a = await Space.findOne({where: {id: 1}});
  expect(a).not.toBe(null);
});