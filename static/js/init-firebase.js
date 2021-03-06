// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBG9t7y-9XIbGQUgmXjEjOR7VnmSAHkSiA",
    authDomain: "warwickesports-50930.firebaseapp.com",
    databaseURL: "https://warwickesports-50930.firebaseio.com",
    projectId: "warwickesports-50930",
    storageBucket: "warwickesports-50930.appspot.com",
    messagingSenderId: "459505288896",
    appId: "1:459505288896:web:0dd6ed38994fb16ad40f25",
    measurementId: "G-RBSZ34YQB5"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();

var storageRef = storage.ref();
var imagesRef = storageRef.child('images');
const newsRef = firebase
    .firestore()
    .collection("news-website");