var experience = require('../../../');

var project = experience.create({
    debug: true,
    compress: true,
    sessions: {
        secret: 'keyboard cat'
    },
    mongoose: {
        sessions: 'mongodb://server/experience_sessions'
    }
});

var app = new experience.Application(__dirname);

project.add('/', app);

project.listen(8080);
