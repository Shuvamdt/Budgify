import React, { useState } from "react";
import { CardSignIn } from "../components/CardSignIn";
import { CardSignUp } from "../components/CardSignUp";

const SignUp = ({ signedUpFunc }) => {
  const [toggleSign, setToggleSign] = useState(true);
  const changeToggleSign = () => setToggleSign(!toggleSign);
  return (
    <div className="mx-3 my-15 flex justify-center items-center font-1">
      {toggleSign ? (
        <CardSignUp changeState={changeToggleSign} setSignedUp={signedUpFunc} />
      ) : (
        <CardSignIn changeState={changeToggleSign} setSignedUp={signedUpFunc} />
      )}
    </div>
  );
};

export default SignUp;
