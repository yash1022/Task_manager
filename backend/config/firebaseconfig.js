var admin = require("firebase-admin");

var serviceAccount = require("");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
