import fs from 'fs';

fs.writeFileSync('dist/names.js', 'export default {}');
fs.writeFileSync('dist/cache.js', 'export default {}');

import {prebuildCache} from '../dist/index.js';

const {names, cache} = prebuildCache();

fs.writeFileSync('dist/names.js', `export default ${JSON.stringify(names)}`);
fs.writeFileSync('dist/cache.js', `export default ${JSON.stringify(cache)}`);

console.log("Cache files created.");