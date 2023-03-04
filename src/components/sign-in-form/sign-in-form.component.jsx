import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignUpContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

import { 
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect email or password.');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email.');
          break;
        default:
          console.log(error);
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email' 
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email
          }}
        />

        <FormInput 
          label='Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password
          }}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button 
            type="button" 
            onClick={signInWithGoogle} 
            buttonType={BUTTON_TYPE_CLASSES.google}
          > Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm;