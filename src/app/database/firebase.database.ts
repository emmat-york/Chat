const firebaseConfig = {
  apiKey: "AIzaSyCQCVoHj9OMnwt1RjjajN8lgNcjd9E06KQ",
  authDomain: "chat-a2b60.firebaseapp.com",
  projectId: "chat-a2b60",
  storageBucket: "chat-a2b60.appspot.com",
  messagingSenderId: "231414536513",
  appId: "1:231414536513:web:0a74a34716d60e2d43e9c0",
  measurementId: "G-BVL1VJPYBL"
};

export const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;

export const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;