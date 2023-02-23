const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Connectar-se a MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'social_network';

mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const db = client.db(dbName);

  // Creació de les rutes
  app.get('/', (req, res) => {
    res.send('Bienvenido a la red social!');
  });

  app.get('/posts', (req, res) => {
    db.collection('posts').find({}).toArray((err, posts) => {
      if (err) throw err;
      res.send(posts);
    });
  });

  // Arrancar el servidor
  app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
  });
});
