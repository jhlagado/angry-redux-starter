import firebase from 'firebase';

export class AuthService {

  constructor($firebaseAuth, $ngRedux) {
    'ngInject';

    this.auth = $firebaseAuth(firebase.auth());
    this.dispatch = $ngRedux.dispatch;

    $ngRedux.subscribe(() => {
      const state = $ngRedux.getState();
      this.authData = state.auth.authData;
    });

    this.storeAuthData(null);
  }

  storeAuthData(authData) {
    this.dispatch({type:'AUTH_STORE_DATA', payload: {authData}});
  };

  login(user) {
    this.dispatch({type:'AUTH_LOGGING_IN', payload: user});
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  register(user) {
    this.dispatch({type:'AUTH_REGISTERING', payload: user});
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  logout() {
    this.dispatch({type:'AUTH_LOGGING_OUT'});
    return this.auth
      .$signOut()
      .then(() => this.storeAuthData(null));
  }
  requireAuthentication() {
    return this.auth
      .$waitForSignIn()
      .then((user) => {
        this.storeAuthData(user);
        return this.auth.$requireSignIn();
      });
  }

  isAuthenticated() {
    return !!this.authData;
  }
  getUser() {
    return this.authData;
  }
}
