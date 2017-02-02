# node-toy-app
Personal experiments with node.js

The current project served only for experimenting with node.js, MongoDB and bootstrap.

### How to run

##### Initialize MongoDB
```bash
mongod --dbpath ~/dir/of/your/choice
mongo
use node-toy # type this, inside MongoDB shell, for creating a database
```

##### Run the server
```bash
cd node-toy-app
npm install
node server.js
```

##### Dump records
```bash
mongo
use node-toy
db.clients.find()
```
