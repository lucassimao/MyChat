let config;

if (process.env.NODE_ENV ==='production'){
    config = require('./prod').config;
} else {
    config = require('./dev').config;
}

export default config;