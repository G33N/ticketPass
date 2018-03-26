import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {
    const snapshot = event.data;
    // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().name) {
        return;
    }

    const val = snapshot.val();

    const mailOptions = {
        to: val.email,
        subject: `Information Request from ${val.name}`,
        html: val.html
    };
    return mailTransport.sendMail(mailOptions).then(() => {
        const exit = `Mail sent to: ${val.email}`
        return exit;
    });
});