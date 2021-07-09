import * as functions from "firebase-functions";
import * as adminfunctions from "firebase-admin";

const rf = functions.region("asia-east2");

adminfunctions.initializeApp(functions.config().firebase);
exports.creatRouteSummaryPubSub = rf.pubsub.
topic("topic-creatRouteSummaryPubSub").onPublish((message) => {
    console.log("CALLED creatRouteSummaryPubSub 901 : Date.now() "+
    Date.now());
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    ];
    const dddate = new Date();
    const _month5 = ""+dddate.getUTCMonth();
    const dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
    dddate.getUTCMonth(),
    dddate.getUTCDate()-1, 18, 30, 0, 0));
    const humanDate = ""+(dddate.getUTCDate())+"-"+
    monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
    let ii=0;
    const month = _month5;
    console.log("dddate4 : "+dddate4);
    console.log("month : "+month);
    console.log("humanDate : " + humanDate);
    const epochy = Date.parse(dddate4.toString());
    console.log("epochDate  : "+epochy);
    let totalCow =0;
    let totalBuf =0;
    let totalCustomerOnVacation =0;
    let totalCustomer =0;
    let cowPrice =0;
    let bufPrice =0;
    let productObject: any;
    adminfunctions.firestore().collection("routelist").
    where("isActive", "==", "YES").
    get().
    then((querySnapshot) => {
         querySnapshot.docs.map(async (routelistDoc) => {
            const routeObject = JSON.parse(JSON.stringify(routelistDoc.data()));
            const myJsonObject1= {
                TCowLoaded: "TCowLoaded",
             };
            const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
            myJsonObject["TCowLoaded"] = totalCow;
            await adminfunctions.firestore().collection("products").
            where("isActive", "==", "YES").get().
            then((querySnapshot) => {
                 querySnapshot.docs.map( (doc5) => {
                productObject = JSON.parse(JSON.stringify(doc5.data()));
                  });
                });
           await adminfunctions.firestore().collection("dailydeliveries").
            where("deliveryDate", "==", epochy).
            where("route", "==", routeObject["routeName"]).
            get().
            then((querySnapshot) => {
                 querySnapshot.docs.map(async (doc) => {
                    ii=ii+1;
                    totalCustomer =totalCustomer+1;
            console.log("creatRouteSummary :ii : "+ii+": doc.id : "+doc.id);
            const ddObject = JSON.parse(JSON.stringify(doc.data()));
            const onVacation1 = ddObject["onVacation"];
            console.log("onVacation1 : "+onVacation1);
            if (onVacation1 == "NO") {
                console.log("onVacation1 == NO :ddObject[cow]: "+
                ddObject["cow"]);
                const cow1 = ddObject["cow"];
                const buf1 = ddObject["buf"];
                totalCow = totalCow + cow1;
                totalBuf = totalBuf + buf1;
            console.log("totalCow: "+totalCow+" totalBuf: "+totalBuf);
            } else {
                console.log("onVacation1 == YES YES ");
            totalCustomerOnVacation= totalCustomerOnVacation+1;
            }
            });
            });
            cowPrice= productObject["cowPrice"];
            bufPrice= productObject["bufPrice"];
            myJsonObject["TCowLoaded"] = totalCow;
            myJsonObject["TBufLoaded"] = totalBuf;
            myJsonObject["TCustOnVacation"] = totalCustomerOnVacation;
            myJsonObject["TDBufPrice"] = bufPrice;
            myJsonObject["TDCowPrice"] = cowPrice;
            myJsonObject["cowPrice"] = cowPrice;
            myJsonObject["bufPrice"] = bufPrice;
            myJsonObject["totalCustomers"] = totalCustomer;
            myJsonObject["empName"] = routeObject["empName"];
            myJsonObject["empMobile"] = routeObject["empMobile"];
            myJsonObject["empId"] = routeObject["empEmail"];
            myJsonObject["route"] = routeObject["routeName"];
            myJsonObject["createdate"] = epochy;
            myJsonObject["updateddate"] = epochy;
            myJsonObject["createdby"] = "cronjob";
            myJsonObject["updatedby"] = "cronjob";
            myJsonObject["dStatus"] = "started";
            myJsonObject["dStartTime"] = 0;
            myJsonObject["dEndTime"] = 1;
            myJsonObject["month"] = (parseInt(month)+1);
            myJsonObject["empToken"] = "No Token";
            myJsonObject["TBufDelivered"] = 0;
            myJsonObject["TCowDelivered"] = 0;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["humanDate"] =humanDate;
            const iid = ""+ii+Date.now();
            console.log("iid : "+iid+" humanDate:"+humanDate);
            const iidStr = ""+iid;
            myJsonObject["iid"] =iidStr;
            totalCow=0;
            totalBuf=0;
            totalCustomer=0;
            totalCustomerOnVacation=0;
            await adminfunctions.firestore()
            .doc("ddroutesummary/"+iidStr).set(myJsonObject);
                  });
    });
});

exports.creatRouteSummary55PubSub = rf.pubsub.
topic("topic-creatRouteSummary55PubSub").onPublish((message) => {
    console.log("CALLED creatRouteSummary55PubSub 901 : Date.now() "+
    Date.now());
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    ];
    const dddate = new Date();
    const _month5 = ""+dddate.getUTCMonth();
    const dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
    dddate.getUTCMonth(),
    dddate.getUTCDate()-1, 18, 30, 0, 0));
    const humanDate = ""+(dddate.getUTCDate())+"-"+
    monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
    let ii=0;
    const month = _month5;
    console.log("dddate4 : "+dddate4);
    console.log("month : "+month);
    console.log("humanDate : " + humanDate);
    const epochy = Date.parse(dddate4.toString());
    console.log("epochDate  : "+epochy);
    let totalCow =0;
    let totalBuf =0;
    let totalCustomerOnVacation =0;
    let totalCustomer =0;
    let cowPrice =0;
    let bufPrice =0;
    let productObject: any;
    adminfunctions.firestore().collection("routelist").
    where("isActive", "==", "YES").
    get().
    then((querySnapshot) => {
         querySnapshot.docs.map(async (routelistDoc) => {
            const routeObject = JSON.parse(JSON.stringify(routelistDoc.data()));
            const myJsonObject1= {
                TCowLoaded: "TCowLoaded",
             };
            const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
            myJsonObject["TCowLoaded"] = totalCow;
            await adminfunctions.firestore().collection("products").
            where("isActive", "==", "YES").get().
            then((querySnapshot) => {
                 querySnapshot.docs.map( (doc5) => {
                productObject = JSON.parse(JSON.stringify(doc5.data()));
                  });
                });
           await adminfunctions.firestore().collection("dailydeliveries55").
            where("deliveryDate", "==", epochy).
            where("route", "==", routeObject["routeName"]).
            get().
            then((querySnapshot) => {
                 querySnapshot.docs.map(async (doc) => {
                    ii=ii+1;
                    totalCustomer =totalCustomer+1;
            console.log("creatRouteSummary :ii : "+ii+": doc.id : "+doc.id);
            const ddObject = JSON.parse(JSON.stringify(doc.data()));
            const onVacation1 = ddObject["onVacation"];
            console.log("onVacation1 : "+onVacation1);
            if (onVacation1 == "NO") {
                console.log("onVacation1 == NO :ddObject[cow]: "+
                ddObject["cow"]);
                const cow1 = ddObject["cow"];
                const buf1 = ddObject["buf"];
                totalCow = totalCow + cow1;
                totalBuf = totalBuf + buf1;
            console.log("totalCow: "+totalCow+" totalBuf: "+totalBuf);
            } else {
                console.log("onVacation1 == YES YES ");
            totalCustomerOnVacation= totalCustomerOnVacation+1;
            }
            });
            });
            cowPrice= productObject["cowPrice"];
            bufPrice= productObject["bufPrice"];
            myJsonObject["TCowLoaded"] = totalCow;
            myJsonObject["TBufLoaded"] = totalBuf;
            myJsonObject["TCustOnVacation"] = totalCustomerOnVacation;
            myJsonObject["TDBufPrice"] = bufPrice;
            myJsonObject["TDCowPrice"] = cowPrice;
            myJsonObject["cowPrice"] = cowPrice;
            myJsonObject["bufPrice"] = bufPrice;
            myJsonObject["totalCustomers"] = totalCustomer;
            myJsonObject["empName"] = routeObject["empName"];
            myJsonObject["empMobile"] = routeObject["empMobile"];
            myJsonObject["empId"] = routeObject["empEmail"];
            myJsonObject["route"] = routeObject["routeName"];
            myJsonObject["createdate"] = epochy;
            myJsonObject["updateddate"] = epochy;
            myJsonObject["createdby"] = "cronjob";
            myJsonObject["updatedby"] = "cronjob";
            myJsonObject["dStatus"] = "started";
            myJsonObject["dStartTime"] = 0;
            myJsonObject["dEndTime"] = 1;
            myJsonObject["month"] = (parseInt(month)+1);
            myJsonObject["empToken"] = "No Token";
            myJsonObject["TBufDelivered"] = 0;
            myJsonObject["TCowDelivered"] = 0;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["humanDate"] =humanDate;
            const iid = ""+ii+Date.now();
            console.log("iid : "+iid+" humanDate:"+humanDate);
            const iidStr = ""+iid;
            myJsonObject["iid"] =iidStr;
            totalCow=0;
            totalBuf=0;
            totalCustomer=0;
            totalCustomerOnVacation=0;
            await adminfunctions.firestore()
            .doc("ddroutesummary55/"+iidStr).set(myJsonObject);
                  });
    });
});

export const creatRouteSummary55 = rf.https.onRequest((_request, response) => {
    console.log("CALLED creatRouteSummary55 601 : Date.now() "+Date.now());
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    ];
    let dddate4;
    let humanDate: any;
    let _month5 = ""+_request.query.month5;
    const _date5 = ""+_request.query.date5;
    const _year5 = ""+_request.query.year5;
    console.log("_month5: "+_month5+",_date5:"+_date5+",_year5:"+_year5);
    if (_month5.length <3 && _date5.length <3 && _year5.length <5) {
        dddate4 = new Date(Date.UTC(parseInt(_year5),
        parseInt(_month5),
        parseInt(_date5) - 1, 18, 30, 0, 0));
        humanDate = ""+_date5+"-"+monthNames[(parseInt(_month5))]+"-"+_year5;
    } else {
    const dddate = new Date();
    _month5 = ""+dddate.getUTCMonth();
    dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
    dddate.getUTCMonth(),
    dddate.getUTCDate()-1, 18, 30, 0, 0));
    humanDate = ""+(dddate.getUTCDate())+"-"+
    monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
    }
    let ii=0;
    const month = _month5;
    console.log("dddate4 : "+dddate4);
    console.log("month : "+month);
    console.log("humanDate : " + humanDate);
    const epochy = Date.parse(dddate4.toString());
    console.log("epochDate  : "+epochy);
    let totalCow =0;
    let totalBuf =0;
    let totalCustomerOnVacation =0;
    let totalCustomer =0;
    let cowPrice =0;
    let bufPrice =0;
    let productObject: any;
    adminfunctions.firestore().collection("routelist").
    where("isActive", "==", "YES").
    get().
    then((querySnapshot) => {
         querySnapshot.docs.map(async (routelistDoc) => {
            const routeObject = JSON.parse(JSON.stringify(routelistDoc.data()));
            const myJsonObject1= {
                TCowLoaded: "TCowLoaded",
             };
            const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
            myJsonObject["TCowLoaded"] = totalCow;
            await adminfunctions.firestore().collection("products").
            where("isActive", "==", "YES").get().
            then((querySnapshot) => {
                 querySnapshot.docs.map( (doc5) => {
                productObject = JSON.parse(JSON.stringify(doc5.data()));
                  });
                });
           await adminfunctions.firestore().collection("dailydeliveries55").
            where("deliveryDate", "==", epochy).
            where("route", "==", routeObject["routeName"]).
            get().
            then((querySnapshot) => {
                 querySnapshot.docs.map(async (doc) => {
                    ii=ii+1;
                    totalCustomer =totalCustomer+1;
            console.log("creatRouteSummary :ii : "+ii+": doc.id : "+doc.id);
            const ddObject = JSON.parse(JSON.stringify(doc.data()));
            const onVacation1 = ddObject["onVacation"];
            console.log("onVacation1 : "+onVacation1);
            if (onVacation1 == "NO") {
                console.log("onVacation1 == NO :ddObject[cow]: "+
                ddObject["cow"]);
                const cow1 = ddObject["cow"];
                const buf1 = ddObject["buf"];
                totalCow = totalCow + cow1;
                totalBuf = totalBuf + buf1;
            console.log("totalCow: "+totalCow+" totalBuf: "+totalBuf);
            } else {
                console.log("onVacation1 == YES YES ");
            totalCustomerOnVacation= totalCustomerOnVacation+1;
            }
            });
            });
            cowPrice= productObject["cowPrice"];
            bufPrice= productObject["bufPrice"];
            myJsonObject["TCowLoaded"] = totalCow;
            myJsonObject["TBufLoaded"] = totalBuf;
            myJsonObject["TCustOnVacation"] = totalCustomerOnVacation;
            myJsonObject["TDBufPrice"] = bufPrice;
            myJsonObject["TDCowPrice"] = cowPrice;
            myJsonObject["cowPrice"] = cowPrice;
            myJsonObject["bufPrice"] = bufPrice;
            myJsonObject["totalCustomers"] = totalCustomer;
            myJsonObject["empName"] = routeObject["empName"];
            myJsonObject["empMobile"] = routeObject["empMobile"];
            myJsonObject["empId"] = routeObject["empEmail"];
            myJsonObject["route"] = routeObject["routeName"];
            myJsonObject["createdate"] = epochy;
            myJsonObject["updateddate"] = epochy;
            myJsonObject["createdby"] = "cronjob";
            myJsonObject["updatedby"] = "cronjob";
            myJsonObject["dStatus"] = "started";
            myJsonObject["dStartTime"] = 0;
            myJsonObject["dEndTime"] = 1;
            myJsonObject["month"] = (parseInt(month)+1);
            myJsonObject["empToken"] = "No Token";
            myJsonObject["TBufDelivered"] = 0;
            myJsonObject["TCowDelivered"] = 0;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["deliveryDate"] =epochy;
            myJsonObject["humanDate"] =humanDate;
            const iid = ""+ii+Date.now();
            console.log("iid : "+iid+" humanDate:"+humanDate);
            const iidStr = ""+iid;
            myJsonObject["iid"] =iidStr;
            totalCow=0;
            totalBuf=0;
            totalCustomer=0;
            totalCustomerOnVacation=0;
            await adminfunctions.firestore()
            .doc("ddroutesummary55/"+iidStr).set(myJsonObject);
                  });
    });
});

exports.createDailyDeliveryPubSub = rf.pubsub.
topic("topic-createDailyDeliveryPubSub").onPublish((message) => {
    console.log("CALLED createDailyDeliveryPubSub 302 : Date.now() "+
    Date.now());
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    ];
    const dddate = new Date();
    const _month5 = ""+dddate.getUTCMonth();
    const dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
    dddate.getUTCMonth(),
    dddate.getUTCDate()-1, 18, 30, 0, 0));
    const humanDate = ""+(dddate.getUTCDate())+"-"+
    monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
    let ii=0;
    const month = _month5;
    console.log("dddate4 : "+dddate4);
    console.log("month : "+month);
    console.log("humanDate : " + humanDate);
    const epochy = Date.parse(dddate4.toString());
console.log("epochDate  : "+epochy);
const VacationEpoc = epochy;
console.log("VacationEpoc : "+VacationEpoc+" epochy: "+epochy);
let productObject: any;
const totalCow =0;
adminfunctions.firestore().collection("customers1").get().
then((querySnapshot) => {
    querySnapshot.docs.map(async (doc) => {
        ii=ii+1;
     console.log("createDailyDelivery :ii : "+ii+": doc.id : "+doc.id);
     const myJsonObject1= {
        custId: "custId",
     };
    await adminfunctions.firestore().collection("products").
     where("isActive", "==", "YES").get().
     then((querySnapshot) => {
          querySnapshot.docs.map( (doc) => {
             ii=ii+1;
          console.log("products :ii : "+ii+": doc.id : "+doc.id);
         console.log("productsJSON.stringify(doc.data):  "+
         JSON.stringify(doc.data()));
         productObject = JSON.parse(JSON.stringify(doc.data()));
         console.log("productObject :  "+productObject);
     console.log("JSON.stringify(doc.data()):  "+JSON.stringify(doc.data()));
           });
         });
    console.log("JSON.stringify(doc.data)  :  "+JSON.stringify(doc.data()));
    const userObject = JSON.parse(JSON.stringify(doc.data()));
   const vstart = userObject["vStartDate"];
   const vend = userObject["vEndDate"];
   const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
   myJsonObject["cow"] = userObject["cow"];
   const cow1 = userObject["cow"];
   console.log("cow1: "+cow1);
   myJsonObject["buf"] = userObject["buf"];
   myJsonObject["cowPrice"] = productObject["cowPrice"];
   myJsonObject["bufPrice"] = productObject["bufPrice"];
    myJsonObject["deliveryDate"] = epochy;
    myJsonObject["createdate"] = epochy;
    myJsonObject["updateddate"] = epochy;
    myJsonObject["createdby"] = "cronjob";
    myJsonObject["updatedby"] = "cronjob";
    myJsonObject["status"] = "started";
    myJsonObject["custId"] = userObject["uuid"];
    myJsonObject["custName"] = userObject["custName"];
    myJsonObject["custEmail"] = userObject["custEmail"];
    myJsonObject["custMobile"] = userObject["custMobile"];
    myJsonObject["custAddress"] = userObject["custAddress"];
    myJsonObject["custToken"] = userObject["custToken"];
    myJsonObject["route"] =userObject["route"];
    myJsonObject["humanDate"] =humanDate;
    const iid = ""+ii+Date.now();
    console.log("iid : "+iid);
    const iidStr = ""+iid;
    myJsonObject["iid"] =iidStr;
    const route1 = userObject["route"];
    await adminfunctions.firestore().collection("routelist").
    where("routeName", "==", route1).
    where("isActive", "==", "YES").get().
    then((querySnapshot) => {
         querySnapshot.docs.map( (doc) => {
            ii=ii+1;
         console.log("routelist :ii : "+ii+": doc.id : "+doc.id);
        console.log("routelist.stringify(doc.data):  "+
        JSON.stringify(doc.data()));
        const routelistObject = JSON.parse(JSON.stringify(doc.data()));
        console.log("routelistObject :  "+routelistObject);
        myJsonObject["empName"] = routelistObject["empName"];
   myJsonObject["empMobile"] = routelistObject["empMobile"];
   myJsonObject["empId"] = routelistObject["empEmail"];
          });
        });
    myJsonObject["month"] = (parseInt(month)+1);
    myJsonObject["onVacation"]="NO";
    console.log("VacationEpoc : "+VacationEpoc);
   console.log("(vstart < Date.now() && Date.now() < vend) : "+
   (vstart <= VacationEpoc && VacationEpoc <=vend));
   if (vstart <= VacationEpoc && VacationEpoc < vend) {
    console.log(myJsonObject["custName"] +" is on Vacation today");
    myJsonObject["onVacation"]="YES";
   } else {
    console.log(myJsonObject["custName"] +" is NOT NOT on Vacation today");
   }
     await adminfunctions.firestore()
    .doc("dailydeliveries/"+iidStr).set(myJsonObject);
     return myJsonObject;
   });
console.log("totalCow:  "+totalCow);
      });
  });

exports.createDailyDelivery55PubSub = rf.pubsub.
topic("topic-createDailyDelivery55").onPublish((message) => {
    console.log("CALLED createDailyDelivery55PubSub 502 : Date.now() "+
    Date.now());
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
    ];
    const dddate = new Date();
    const _month5 = ""+dddate.getUTCMonth();
    const dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
    dddate.getUTCMonth(),
    dddate.getUTCDate()-1, 18, 30, 0, 0));
    const humanDate = ""+(dddate.getUTCDate())+"-"+
    monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
    let ii=0;
    const month = _month5;
    console.log("dddate4 : "+dddate4);
    console.log("month : "+month);
    console.log("humanDate : " + humanDate);
    const epochy = Date.parse(dddate4.toString());
console.log("epochDate  : "+epochy);
const VacationEpoc = epochy;
console.log("VacationEpoc : "+VacationEpoc+" epochy: "+epochy);
let productObject: any;
const totalCow =0;
adminfunctions.firestore().collection("customers1").get().
then((querySnapshot) => {
    querySnapshot.docs.map(async (doc) => {
        ii=ii+1;
     console.log("createDailyDelivery :ii : "+ii+": doc.id : "+doc.id);
     const myJsonObject1= {
        custId: "custId",
     };
    await adminfunctions.firestore().collection("products").
     where("isActive", "==", "YES").get().
     then((querySnapshot) => {
          querySnapshot.docs.map( (doc) => {
             ii=ii+1;
          console.log("products :ii : "+ii+": doc.id : "+doc.id);
         console.log("productsJSON.stringify(doc.data):  "+
         JSON.stringify(doc.data()));
         productObject = JSON.parse(JSON.stringify(doc.data()));
         console.log("productObject :  "+productObject);
     console.log("JSON.stringify(doc.data()):  "+JSON.stringify(doc.data()));
           });
         });
    console.log("JSON.stringify(doc.data)  :  "+JSON.stringify(doc.data()));
    const userObject = JSON.parse(JSON.stringify(doc.data()));
   const vstart = userObject["vStartDate"];
   const vend = userObject["vEndDate"];
   const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
   myJsonObject["cow"] = userObject["cow"];
   const cow1 = userObject["cow"];
   console.log("cow1: "+cow1);
   myJsonObject["buf"] = userObject["buf"];
   myJsonObject["cowPrice"] = productObject["cowPrice"];
   myJsonObject["bufPrice"] = productObject["bufPrice"];
    myJsonObject["deliveryDate"] = epochy;
    myJsonObject["createdate"] = epochy;
    myJsonObject["updateddate"] = epochy;
    myJsonObject["createdby"] = "cronjob";
    myJsonObject["updatedby"] = "cronjob";
    myJsonObject["status"] = "started";
    myJsonObject["custId"] = userObject["uuid"];
    myJsonObject["custName"] = userObject["custName"];
    myJsonObject["custEmail"] = userObject["custEmail"];
    myJsonObject["custMobile"] = userObject["custMobile"];
    myJsonObject["custAddress"] = userObject["custAddress"];
    myJsonObject["custToken"] = userObject["custToken"];
    myJsonObject["route"] =userObject["route"];
    myJsonObject["humanDate"] =humanDate;
    const iid = ""+ii+Date.now();
    console.log("iid : "+iid);
    const iidStr = ""+iid;
    myJsonObject["iid"] =iidStr;
    const route1 = userObject["route"];
    await adminfunctions.firestore().collection("routelist").
    where("routeName", "==", route1).
    where("isActive", "==", "YES").get().
    then((querySnapshot) => {
         querySnapshot.docs.map( (doc) => {
            ii=ii+1;
         console.log("routelist :ii : "+ii+": doc.id : "+doc.id);
        console.log("routelist.stringify(doc.data):  "+
        JSON.stringify(doc.data()));
        const routelistObject = JSON.parse(JSON.stringify(doc.data()));
        console.log("routelistObject :  "+routelistObject);
        myJsonObject["empName"] = routelistObject["empName"];
   myJsonObject["empMobile"] = routelistObject["empMobile"];
   myJsonObject["empId"] = routelistObject["empEmail"];
          });
        });
    myJsonObject["month"] = (parseInt(month)+1);
    myJsonObject["onVacation"]="NO";
    console.log("VacationEpoc : "+VacationEpoc);
   console.log("(vstart < Date.now() && Date.now() < vend) : "+
   (vstart <= VacationEpoc && VacationEpoc <=vend));
   if (vstart <= VacationEpoc && VacationEpoc < vend) {
    console.log(myJsonObject["custName"] +" is on Vacation today");
    myJsonObject["onVacation"]="YES";
   } else {
    console.log(myJsonObject["custName"] +" is NOT NOT on Vacation today");
   }
     await adminfunctions.firestore()
    .doc("dailydeliveries55/"+iidStr).set(myJsonObject);
     return myJsonObject;
   });
console.log("totalCow:  "+totalCow);
      });
  });

export const createDailyDelivery55 =
rf.https.onRequest((_request, response) => {
console.log("CALLED ecreateDailyDelivery 501 : Date.now() "+Date.now());
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December",
];
let dddate4;
let humanDate: any;
let _month5 = ""+_request.query.month5;
const _date5 = ""+_request.query.date5;
const _year5 = ""+_request.query.year5;
console.log("_month5: "+_month5+",_date5:"+_date5+",_year5:"+_year5);
if (_month5.length <3 && _date5.length <3 && _year5.length <5) {
    dddate4 = new Date(Date.UTC(parseInt(_year5),
    parseInt(_month5),
    parseInt(_date5) - 1, 18, 30, 0, 0));
    humanDate = ""+_date5+"-"+monthNames[(parseInt(_month5))]+"-"+_year5;
} else {
const dddate = new Date();
_month5 = ""+dddate.getUTCMonth();
dddate4 = new Date(Date.UTC(dddate.getUTCFullYear(),
dddate.getUTCMonth(),
dddate.getUTCDate()-1, 18, 30, 0, 0));
humanDate = ""+(dddate.getUTCDate())+"-"+
monthNames[(parseInt(_month5))]+"-"+dddate.getUTCFullYear();
}
let ii=0;
const month = _month5;
console.log("dddate4 : "+dddate4);
console.log("humanDate : " + humanDate);
const epochy = Date.parse(dddate4.toString());
console.log("epochDate  : "+epochy);
const VacationEpoc = epochy;
console.log("VacationEpoc : "+VacationEpoc+" epochy: "+epochy);
let productObject: any;
const totalCow =0;
adminfunctions.firestore().collection("customers1").get().
then((querySnapshot) => {
    querySnapshot.docs.map(async (doc) => {
        ii=ii+1;
     console.log("createDailyDelivery :ii : "+ii+": doc.id : "+doc.id);
     const myJsonObject1= {
        custId: "custId",
     };
    await adminfunctions.firestore().collection("products").
     where("isActive", "==", "YES").get().
     then((querySnapshot) => {
          querySnapshot.docs.map( (doc) => {
             ii=ii+1;
          console.log("products :ii : "+ii+": doc.id : "+doc.id);
         console.log("productsJSON.stringify(doc.data):  "+
         JSON.stringify(doc.data()));
         productObject = JSON.parse(JSON.stringify(doc.data()));
         console.log("productObject :  "+productObject);
     console.log("JSON.stringify(doc.data()):  "+JSON.stringify(doc.data()));
           });
         });
    console.log("JSON.stringify(doc.data)  :  "+JSON.stringify(doc.data()));
    const userObject = JSON.parse(JSON.stringify(doc.data()));
   const vstart = userObject["vStartDate"];
   const vend = userObject["vEndDate"];
   const myJsonObject = JSON.parse(JSON.stringify(myJsonObject1));
   myJsonObject["cow"] = userObject["cow"];
   const cow1 = userObject["cow"];
   console.log("cow1: "+cow1);
   myJsonObject["buf"] = userObject["buf"];
   myJsonObject["cowPrice"] = productObject["cowPrice"];
   myJsonObject["bufPrice"] = productObject["bufPrice"];
    myJsonObject["deliveryDate"] = epochy;
    myJsonObject["createdate"] = epochy;
    myJsonObject["updateddate"] = epochy;
    myJsonObject["createdby"] = "cronjob";
    myJsonObject["updatedby"] = "cronjob";
    myJsonObject["status"] = "started";
    myJsonObject["custId"] = userObject["uuid"];
    myJsonObject["custName"] = userObject["custName"];
    myJsonObject["custEmail"] = userObject["custEmail"];
    myJsonObject["custMobile"] = userObject["custMobile"];
    myJsonObject["custAddress"] = userObject["custAddress"];
    myJsonObject["custToken"] = userObject["custToken"];
    myJsonObject["route"] =userObject["route"];
    myJsonObject["humanDate"] =humanDate;
    const iid = ""+ii+Date.now();
    console.log("iid : "+iid);
    const iidStr = ""+iid;
    myJsonObject["iid"] =iidStr;
    const route1 = userObject["route"];
    await adminfunctions.firestore().collection("routelist").
    where("routeName", "==", route1).
    where("isActive", "==", "YES").get().
    then((querySnapshot) => {
         querySnapshot.docs.map( (doc) => {
            ii=ii+1;
         console.log("routelist :ii : "+ii+": doc.id : "+doc.id);
        console.log("routelist.stringify(doc.data):  "+
        JSON.stringify(doc.data()));
        const routelistObject = JSON.parse(JSON.stringify(doc.data()));
        console.log("routelistObject :  "+routelistObject);
        myJsonObject["empName"] = routelistObject["empName"];
   myJsonObject["empMobile"] = routelistObject["empMobile"];
   myJsonObject["empId"] = routelistObject["empEmail"];
          });
        });
    myJsonObject["month"] = (parseInt(month)+1);
    myJsonObject["onVacation"]="NO";
    console.log("VacationEpoc : "+VacationEpoc);
   console.log("(vstart < Date.now() && Date.now() < vend) : "+
   (vstart <= VacationEpoc && VacationEpoc <=vend));
   if (vstart <= VacationEpoc && VacationEpoc < vend) {
    console.log(myJsonObject["custName"] +" is on Vacation today");
    myJsonObject["onVacation"]="YES";
   } else {
    console.log(myJsonObject["custName"] +" is NOT NOT on Vacation today");
   }
     await adminfunctions.firestore()
    .doc("dailydeliveries55/"+iidStr).set(myJsonObject);
     return myJsonObject;
   });
console.log("totalCow:  "+totalCow);
      });
});


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


export const cleanUpActivity55 = rf.https.onRequest((_request, response) => {
    const batch = adminfunctions.firestore().batch();
    adminfunctions.firestore().collection("ddroutesummary55").get().
            then((querySnapshot) => {
            querySnapshot.docs.map((ddroutesummaryDoc55) => {
                console.log("In IF  ddroutesummary55");
                ddroutesummaryDoc55.ref.delete();
                console.log("AFter deletion ddroutesummary55");
                batch.delete(ddroutesummaryDoc55.ref);
              });
              return batch.commit();
        });
    const batch1 = adminfunctions.firestore().batch();
    adminfunctions.firestore().collection("dailydeliveries55").get().
        then((querySnapshot) => {
            querySnapshot.docs.map((dailydeliveriesDoc55) => {
                console.log("In dailydeliveries55");
                dailydeliveriesDoc55.ref.delete();
                console.log("AFter deletion dailydeliveries55");
                batch1.delete(dailydeliveriesDoc55.ref);
              });
              return batch1.commit();
        });
});
