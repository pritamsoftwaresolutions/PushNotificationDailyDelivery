import * as functions from "firebase-functions";
import * as adminfunctions from "firebase-admin";

const rf = functions.region("asia-east2");

console.log("Hello PUSH NOTIFICATION TESTING ");
adminfunctions.initializeApp(functions.config().firebase);

export const helloworld = rf.https.onRequest((_request, response) => {
response.send("pushNotifications------***** 55 firebase");
});

const e = "/dailydelivery/AFHbRPNcrBUVRWz0Aj4j";
console.log("Hello PUSH NOTIFICATION TESTING "+e);
exports.updateUser = rf.firestore
    .document("dailydelivery/AFHbRPNcrBUVRWz0Aj4j")
    .onUpdate((change, context) => {
        console.log("NONONONONO 7 IN UPDATE Function "+e);
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();
      console.log("IN UPDATE Function "+newValue.name);
      // ...or the previous value before this update
      const previousValue = change.before.data();
      console.log("PDATE Function "+previousValue.name);
      // access a particular field as you would any JS property
      const name = newValue.name;
      console.log("UPDATE Function "+name);

      // perform desired operations ...
      const p = {
        notification: {
            title: "Hello device TESTING9",
            body: "Hello device TESTING9-BODY",
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
