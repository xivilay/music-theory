const fs = require('fs');

const exportAssignment = 'module.exports =';

fs.writeFileSync('dist/names.cjs', `${exportAssignment} {}`);
fs.writeFileSync('dist/cache.cjs', `${exportAssignment} {}`);

import('../dist/index.js').then(({ prebuildCache }) => {
    const { names, cache } = prebuildCache();

    fs.writeFileSync('dist/names.cjs', `${exportAssignment} ${JSON.stringify(names)}`);
    fs.writeFileSync('dist/cache.cjs', `${exportAssignment} ${JSON.stringify(cache)}`);

    console.log('Cache files created.');
});