import * as functions from "firebase-functions";
import * as adminfunctions from "firebase-admin";

const rf = functions.region("asia-east2");

console.log("Hello PUSH NOTIFICATION TESTING 67");
adminfunctions.initializeApp(functions.config().firebase);

export const milkDelivery = rf.https.onRequest((_request, response) => {
response.send("pushNotifications------*****  mobile wildcard ALL   firebase");
});

// const e = "/customers";  ///dailydeliveries/2021-06-12T20:18:54.704494
const e = "/dailydeliveries/2021-06-12T20:18:54.704494";
console.log("Hello 23 PUSH NOTIFICATION TESTING "+e);
exports.updateUser = rf.firestore
    .document("/dailydeliveries/2021-06-12T20:18:54.704494")
    .onUpdate((change, context) => {
        console.log("23 June UPDATE Function token1 token1 "+e);
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();
      console.log("New Delivered status "+newValue.status);
      // ...or the previous value before this update
      const previousValue = change.before.data();
      console.log("Previous Delivered status "+previousValue.status);
      // access a particular field as you would any JS property
      const delivered = newValue.status;
      const customername = newValue.custName;
      const token1 = newValue.custToken;
      console.log("Customer Name "+customername);
      console.log("token1 "+token1);
      let dt ="Good Morning! "+customername+" Sir/Madam. Milk is delivered";
      let db ="Good Morning! "+customername+" Sir/Madam. Milk is delivered";
if (delivered == "N") {
      dt="Good Morning! "+customername+"Sir/Madam.Milk delivery is reverted";
      db="Good Morning!"+customername+"Sir/Madam.Milk deliverery is reverted";
    }
      // perform desired operations ...
      const p = {
        notification: {
            title: dt,
            body: db,
            sound: "default",
        },
    };

    const p1 = {
        notification: {
            title: "Hello topic TESTING9",
            body: "Hello topic TESTING9-BODY",
            sound: "default",
        },
    };

    const op = {
        priority: "high",
        timeToLive: 60 * 60 * 24,
    };

    adminfunctions.messaging().sendToDevice(token1, p);
    console.log("Notifications have been sent and tokens cleaned up.");
    return adminfunctions.messaging().sendToTopic("PUSHNOTI", p1, op);
    });
