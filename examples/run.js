var experience = require('../');

var project = experience.create({
    debug: true,
    compress: true
});

var helloWorld = new experience.Application(__dirname + '/app/hello-world');

project.add('/helloWorld', helloWorld);

project.listen(8080);
