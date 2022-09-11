const firebaseConfig = {
  apiKey: "AIzaSyCQCVoHj9OMnwt1RjjajN8lgNcjd9E06KQ",
  authDomain: "chat-a2b60.firebaseapp.com",
  projectId: "chat-a2b60",
  storageBucket: "chat-a2b60.appspot.com",
  messagingSenderId: "231414536513",
  appId: "1:231414536513:web:0a74a34716d60e2d43e9c0",
  measurementId: "G-BVL1VJPYBL"
};

export const FIREBASE_DATA_BUCKET = {
  AUTH: {
    SIGN_IN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
    SIGN_UP: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
    ID_TOKEN: "idToken",
    EXPIRES_IN: "expiresIn",
    ERRORS: {
      SIGN_IN_ERRORS: {
        EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
        INVALID_PASSWORD: "The password is invalid",
        USER_DISABLED: "The user account has been disabled by an administrator."
      },
      SIGN_UP_ERRORS: {
        EMAIL_EXISTS: "The email address is already in use by another account.",
        OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
        TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later."
      }
    }
  },
  USERS_STORAGE: {
    URL: "https://chat-a2b60-default-rtdb.europe-west1.firebasedatabase.app"
  }
};
