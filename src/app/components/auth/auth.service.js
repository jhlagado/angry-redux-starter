import firebase from 'firebase';
import { bindActionCreators } from 'redux';

export class AuthService {

  constructor($firebaseAuth, $ngRedux) {
    'ngInject';

    this.auth = $firebaseAuth(firebase.auth());
    this.authData = null;
    this.dispatch = $ngRedux.dispatch;

    const actionCreators = {
      login: (user) => ({
        type: 'AUTH_LOGIN',
        payload: {
          user,
        },
      }),
    };

    this.actions = bindActionCreators(actionCreators, $ngRedux.dispatch);
  }

  onLogin(user) {
    this.dispatch({type:'AUTH_ON_LOGIN', payload: {user}});
    this.authData = user;
    return this.auth.$requireSignIn();
  };

  storeAuthData(data) {
    this.dispatch({type:'AUTH_STORE_AUTH_DATA', payload: {authData: data}});
    this.authData = data;
    return this.authData;
  };

  onLogout() {
    this.dispatch({type:'AUTH_STORE_AUTH_DATA', payload: {authData: null}});
    this.authData = null;
  };

  login(user) {
    this.dispatch({type:'AUTH_LOGIN', payload: user});
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  register(user) {
    this.dispatch({type:'AUTH_REGISTER', payload: user});
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => this.storeAuthData(data));
  }
  logout() {
    this.dispatch({type:'AUTH_LOGOUT'});
    return this.auth
      .$signOut()
      .then(() => this.onLogout());
  }
  requireAuthentication() {
    return this.auth
      .$waitForSignIn()
      .then((user) => this.onLogin(user));
  }
  isAuthenticated() {
    return !!this.authData;
  }
  getUser() {
    return this.authData;
  }
}
