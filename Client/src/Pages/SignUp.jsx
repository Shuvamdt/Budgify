import React, { useState } from "react";
import { CardSignIn } from "../components/CardSignIn";
import { CardSignUp } from "../components/CardSignUp";

const API_URL = "";

const SignUp = ({ signedUp }) => {
  const [toggleSign, setToggleSign] = useState(true);
  const changeToggleSign = () => setToggleSign(!toggleSign);
  return (
    <div className="mx-3 my-15 flex justify-center items-center font-1">
      {toggleSign ? (
        <CardSignUp changeState={changeToggleSign} signedUp={signedUp} />
      ) : (
        <CardSignIn changeState={changeToggleSign} signedUp={signedUp} />
      )}
    </div>
  );
};

export default SignUp;
