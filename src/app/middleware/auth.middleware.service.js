import firebase from 'firebase';

export const authMiddleware = ($log, $firebaseAuth) => {
    'ngInject';

    return store => next => (action) => {
      $log.info(action.type);
      if (action.type === 'INIT') {
        $log.info('Init action');
        store.dispatch({
          type: 'INIT_AUTH',
          payload: {
            auth: $firebaseAuth(firebase.auth()),
            authData: null,
          },
        })
      }
      next(action);
    };
}
