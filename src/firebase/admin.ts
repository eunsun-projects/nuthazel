import admin, { ServiceAccount } from "firebase-admin";
import * as token from "../../nuthazel-firebase-key.json";

let adminInstance: admin.app.App;

async function initFirebase() {
  if (!adminInstance) {
    if (admin.apps.length === 0) {
      adminInstance = admin.initializeApp({
        credential: admin.credential.cert(token as ServiceAccount),
        storageBucket: "gs://nuthazel-d445c.appspot.com",
      });
      // console.log("nuthazel Initialized new");
    } else {
      adminInstance = admin.app();
      // console.log("Firebase already initialized");
    }
  }
  return adminInstance;
}

const adminReady = await initFirebase();

export default adminReady;
