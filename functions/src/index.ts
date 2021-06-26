import * as functions from "firebase-functions";
import * as adminfunctions from "firebase-admin";

const rf = functions.region("asia-east2");

adminfunctions.initializeApp(functions.config().firebase);
export const createDailyDelivery = rf.https.onRequest((_request, response) => {
console.log("CALLED ecreateDailyDelivery 21 : Date.now() "+Date.now());
let ii=0;
const dddate = new Date();
const month = dddate.getUTCMonth();
const dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(), dddate.getUTCMonth(),
dddate.getUTCDate()-1, 18, 30, 0, 0));
console.log("dddate1 : "+dddate4);
const epochy = Date.parse(dddate4.toString());
console.log("epochDate : "+epochy);
adminfunctions.firestore().collection("customers1").get().
then((querySnapshot) => {
    const tempDoc = querySnapshot.docs.map(async (doc) => {
        ii=ii+1;
     console.log("createDailyDelivery :ii : "+ii+": doc.id : "+doc.id);
     const myJsonObject1= {
        custId: "custId",
     };
    console.log("JSON.stringify(doc.data)  :  "+JSON.stringify(doc.data()));
    const userObject = JSON.parse(JSON.stringify(doc.data()));
   const vstart = userObject["vStartDate"];
   const vend = userObject["vEndDate"];
   const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
   myJsonObject["empName"] = "";
   myJsonObject["empMobile"] = "";
   myJsonObject["cow"] = 0;
   myJsonObject["buf"] = 0;
   myJsonObject["cowPrice"] = 0;
   myJsonObject["bufPrice"] = 0;
   myJsonObject["empId"] = "";
    myJsonObject["deliveryDate"] = epochy;
    myJsonObject["createdate"] = epochy;
    myJsonObject["updateddate"] = epochy;
    myJsonObject["createdby"] = "cronjob";
    myJsonObject["updatedby"] = "cronjob";
    myJsonObject["status"] = "started";
    myJsonObject["custId"] = userObject["uuid"];
    myJsonObject["custName"] = userObject["custName"];
    myJsonObject["custMobile"] = userObject["custMobile"];
    myJsonObject["custAddress"] = "Palladium Homes";
    myJsonObject["custToken"] = userObject["custToken"];
    myJsonObject["route"] ="";
    myJsonObject["month"] = month;
    myJsonObject["onVacation"]="no";
   console.log("(vstart < Date.now() && Date.now() < vend) : "+
   (vstart <= Date.now() && Date.now() <=vend));
   if (vstart < Date.now() && Date.now() < vend) {
    console.log(myJsonObject["custName"] +" is on Vacation today");
    myJsonObject["onVacation"]="yes";
   }
     await adminfunctions.firestore()
    .doc("dailydeliveries/"+ii+Date.now()).set(myJsonObject);
     return myJsonObject;
   });
console.log("JSON.stringify(tempDoc) :  "+JSON.stringify(tempDoc));
      });
});

console.log("Hello PUSH NOTIFICATION TESTING 70");
export const getCSHFreeWebHook = rf.https.onRequest((_request, response) => {
    console.log("CALLED CSH FREE getCSHFreeWebHook: response1.statusCode ");
    const orderId = _request.body.orderId || _request.query.orderId;
    const orderAmount = _request.body.orderAmount || _request.query.orderAmount;
    console.log("orderAmount :"+orderAmount+"orderId: "+orderId);
    response.status(200).send("orderAmount :"+orderAmount+"orderId: "+orderId);
});

const e = "/dailydeliveries";
console.log("Hello 24 June PUSH NOTIFICATION TESTING "+e);
exports.updateMilkDelivery = rf.firestore
    .document("/dailydeliveries/{id}")
    .onUpdate((change, context) => {
        console.log("24 June UPDATE Function token1 token1 "+e);
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
if (delivered == "loaded") {
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
