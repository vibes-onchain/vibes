import cacheManager from "cache-manager";
import fsStore from "cache-manager-fs-hash";
import fs from "fs-extra";

let options = {store: 'memory', max: 0, ttl: 0}
if (process.env.APP_USE_CACHE === "1") {
  const CACHE_DIR = `${process.env.APP_TMP || "./tmp"}/AppCache`;
  fs.ensureDirSync(CACHE_DIR);
  options = {
    store: fsStore,
    options: {
      path: CACHE_DIR,
      ttl: 5 * 60, //time to life in seconds
      subdirs: true, //create subdirectories to reduce the
      zip: false, //zip files to save diskspace (default: false)
    },
  };
}

const AppCache = cacheManager.caching(options);

export default AppCache;
