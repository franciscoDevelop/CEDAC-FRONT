// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:5233/api',
    noReuseRoutes: ['login', 'register', 'forgot-password', 'reset-password'],
    session: {
        uid: 'c73a4eb3', //prefijo para las variables de sesión
        time: 10, //minutos de duración de la sesión sin actividad
        check: 5000, //segundos verificación de la sesión via apiRest
    },
};
