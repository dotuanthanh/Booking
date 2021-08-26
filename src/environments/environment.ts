// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url : 'http://localhost:8080',
  firebaseConfig : {
    apiKey: 'AIzaSyBrzdKSVfCjHaWjHtpUYucmpChrhAMnoGM',
    authDomain: 'houserentals-fc046.firebaseapp.com',
    projectId: 'houserentals-fc046',
    storageBucket: 'houserentals-fc046.appspot.com',
    messagingSenderId: '516871245408',
    appId: '1:516871245408:web:ebb5c4500c8b7927cb3d05',
    measurementId: 'G-2PXL8HBMEZ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
