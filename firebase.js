const config = {
  apiKey: "AIzaSyDsIC01Bz0ZKDknbiAl1BThcZ-kwADfuWA",
  authDomain: "indicador-blackbelt-fluxo.firebaseapp.com",
  projectId: "indicador-blackbelt-fluxo",
  storageBucket: "indicador-blackbelt-fluxo.appspot.com",
  databaseURL: "https://indicador-blackbelt-fluxo-default-rtdb.firebaseio.com",
  messagingSenderId: "48320948097",
  appId: "1:48320948097:web:c42301eb03a5dedce5aa80",
};

firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref("users");
