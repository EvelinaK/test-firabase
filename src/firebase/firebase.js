// import * as firebase from "firebase/app";

// import * as firebase from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyATHoLXg83EsfPbE9bJw2HN2QpvzUXi4QU",
//   authDomain: "eva-store-63625.firebaseapp.com",
//   databaseURL:
//     "https://eva-store-63625-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "eva-store-63625",
//   storageBucket: "eva-store-63625.appspot.com",
//   messagingSenderId: "519572611639",
//   appId: "1:519572611639:web:aac33c06df345d30e115b2",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const database = getDatabase(firebaseApp);
// console.log(database);
// console.log(firebase);

// const storage = getStorage(firebaseApp);

// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// console.log(db);

// const frb = { db, auth, database, storage };
// export default frb;

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyATHoLXg83EsfPbE9bJw2HN2QpvzUXi4QU",
  authDomain: "eva-store-63625.firebaseapp.com",
  databaseURL:
    "https://eva-store-63625-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eva-store-63625",
  storageBucket: "eva-store-63625.appspot.com",
  messagingSenderId: "519572611639",
  appId: "1:519572611639:web:aac33c06df345d30e115b2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage().ref();
