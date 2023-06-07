import NodeCache from 'node-cache';
const cache = new NodeCache();
const dataset = require('../../dataset/dataset.json');
cache.set('dataset', dataset);
export default cache