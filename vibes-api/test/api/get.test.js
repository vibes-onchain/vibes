import fetchTwins from 'test:/AppFetcher/fetchTwins';
import doTwinsMatch from 'test:/AppFetcher/doTwinsMatch';

test('GET /', async () => {
  const twins = await fetchTwins('/');
  const [ok, errors] = doTwinsMatch(twins)
  expect(errors).toEqual([]);
})