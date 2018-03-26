// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://ticketsapidev.apphb.com/api/',
  firebase: {
    apiKey: 'AIzaSyAUlOmbKLIoAXLtRDFdAyaosTXEMGdRqfM',
    authDomain: 'ticketpass-40a36.firebaseapp.com',
    databaseURL: 'https://ticketpass-40a36.firebaseio.com',
    projectId: 'ticketpass-40a36',
    storageBucket: 'ticketpass-40a36.appspot.com',
    messagingSenderId: '333925203345'
  }
};
