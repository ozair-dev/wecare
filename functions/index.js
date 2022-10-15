const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({ projectId: "wecare-8081e" });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.makeUpperCase = functions.firestore
  .document("/dummy/{docID}")
  .onCreate((snap, context) => {
    const original = snap.data().original;
    console.log("UpperCasing", context.params.docID, original);
    const upperCase = original.toUpperCase();
    return snap.ref.set({ upperCase }, { merge: true });
  });

exports.initializeUser = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const verificationLink = await admin
    .auth()
    .generateEmailVerificationLink(email);
  functions.logger.log(verificationLink);
});
