import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import nookies from "nookies";
import useSWR from "swr";
import fetcher from "../util/fetcher";

const AuthContext = createContext({});
const provider = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        authUser.getIdToken().then((token) => {
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
          });
          authUser.getIdTokenResult().then((res) => {
            setUser((prevState) => ({
              ...prevState,
              admin: res.claims.admin ? true : false,
            }));
          });
          nookies.set(undefined, "token", token, { path: "/" });
        });
      } else {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (res) => {
          console.log("res", res.user.uid);
          const uid = res.user.uid;
          fetch("api/setAdmin", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid }),
          });
        }
      );
      return res.user;
    } catch (error) {
      console.log("signup error: ", error);
      throw new Error(error.code);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const providerLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, providerLogin }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
