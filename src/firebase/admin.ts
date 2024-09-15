import admin from "firebase-admin";

let adminInstance: admin.app.App;

async function initFirebase() {
  if (!adminInstance) {
    if (admin.apps.length === 0) {
      adminInstance = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // privateKey의 줄바꿈 문자를 올바르게 처리합니다.
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
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
