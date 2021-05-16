import * as functions from "firebase-functions";
import * as adminfunctions from "firebase-admin";

const rf = functions.region("asia-east2");

console.log("Hello PUSH NOTIFICATION TESTING 5");
adminfunctions.initializeApp(functions.config().firebase);

export const helloworld = rf.https.onRequest((_request, response) => {
response.send("pushNotifications------*****  mobile wildcard ALL firebase");
});

const e = "/customers";
console.log("Hello PUSH NOTIFICATION TESTING "+e);
exports.updateUser = rf.firestore
    .document("/customers/{mobile}")
    .onUpdate((change, context) => {
        console.log("16 May UPDATE Function "+e);
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();
      console.log("New Delivered status "+newValue.delivered);
      // ...or the previous value before this update
      const previousValue = change.before.data();
      console.log("Previous Delivered status "+previousValue.delivered);
      // access a particular field as you would any JS property
      const delivered = newValue.delivered;
      const customername = newValue.name;
      console.log("Customer Name "+customername);
      let dt ="Good Morning! "+customername+" sir. Milk is delivered";
      let db ="Good Morning! "+customername+" sir. Milk is delivered at & by";
if (delivered == "N") {
      dt="Good Morning! "+customername+" sir. Milk delivery is reverted";
      db ="Good Morning! "+customername+" sir. Milk deliverery is reverted";
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
    const t1 ="dxmfa6O7Qam4031rUbpZUs:APA91bGz7g_fcKSmr6yPA3t3ib5OgZIDdL";
    const t2=t1+"RoEovjjOXRhq4gR9Gd5mZI2COdT4AU8dxNejbAO3EnfyyUl2F_";
    const t3 =t2+"UcxY9MHc6PAmjOL6p7-TI13-uY2RoS1WOr616aZjHFXa1sJvfLAq7Ouy";
    adminfunctions.messaging().sendToDevice(t3, p);
    console.log("Notifications have been sent and tokens cleaned up.");
    return adminfunctions.messaging().sendToTopic("PUSHNOTI", p1, op);
    });
