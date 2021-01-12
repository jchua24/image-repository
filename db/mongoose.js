/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database using connection string */
   // Get the URI of the local database, or the one specified on deployment.
   const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:Winwin2000@cluster0.5wndn.mongodb.net/image-repository?retryWrites=true&w=majority'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
   
   module.exports = { mongoose }  // Export the active connection.