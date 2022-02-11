export default async function doSleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}