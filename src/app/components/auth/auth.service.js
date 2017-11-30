import firebase from 'firebase';

export class AuthService {

  constructor($firebaseAuth) {
    'ngInject';

    this.auth = $firebaseAuth(firebase.auth());
    this.authData = null;
  }

  onSignIn(user) {
    this.authData = user;
    return this.auth.$requireSignIn();
  };

  storeAuthData(data) {
    this.authData = data;
    return this.authData;
  };

  clearAuthData() {
    this.authData = null;
  };

  login(user) {
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  register(user) {
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  logout() {
    return this.auth
      .$signOut()
      .then(() => this.clearAuthData());
  }
  requireAuthentication() {
    return this.auth
      .$waitForSignIn()
      .then((user) => this.onSignIn(user));
  }
  isAuthenticated() {
    return !!this.authData;
  }
  getUser() {
    return this.authData;
  }
}
