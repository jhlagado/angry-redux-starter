// import firebase from 'firebase';

export const authMiddleware = ($log, $firebaseAuth) => {
    'ngInject';

    return store => next => (action) => {

      const middlewares = {

        // INIT() {
        //   store.dispatch({
        //     type: 'INIT_AUTH',
        //     payload: {
        //       auth: $firebaseAuth(firebase.auth()),
        //       authData: null,
        //     },
        //   })
        // },

        // AUTH_ON_LOGIN() {
        //   action.payroll.auth.$requireSignIn().then(() => {

        //   });
        //   store.dispatch({
        //     type: 'INIT_AUTH',
        //     payload: {

        //       authData: null,
        //     },
        //   })
        // },
      }

      if (action.type in middlewares) {
        if (middlewares[action.type]() == null) next(action);
      }
      else
        next(action);
    };
}
