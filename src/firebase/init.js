import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCm-LlHeuvqvv5V-bQEoLI02gQ-hE78ilI",
  authDomain: "vuejs-ninjs-smoothies.firebaseapp.com",
  databaseURL: "https://vuejs-ninjs-smoothies.firebaseio.com",
  projectId: "vuejs-ninjs-smoothies",
  storageBucket: "vuejs-ninjs-smoothies.appspot.com",
  messagingSenderId: "167418625215"
};
firebase.initializeApp(config);

export default firebase.firestore();
