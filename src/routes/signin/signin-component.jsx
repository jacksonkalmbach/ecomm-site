import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/signUpForm/signUpForm.component";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>sign in page</h1>
      <button onClick={logGoogleUser}>
        Sign In with Google
      </button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;