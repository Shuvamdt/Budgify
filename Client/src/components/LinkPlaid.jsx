import React, { useEffect, useCallback, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

const LinkPlaid = () => {
  const [linkToken, setLinkToken] = useState(null);
  useEffect(() => {
    async function createLinkToken() {
      const response = await axios.post(
        "http://localhost:3000/create_link_token",
        null,
        { withCredentials: true }
      );
      setLinkToken(response.data.link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token) => {
    await axios.post(
      "http://localhost:3000/exchange_public_token",
      {
        public_token,
      },
      { withCredentials: true }
    );

    alert("Bank account connected! You can now fetch transactions.");
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    institution_id: "ins_109508",
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Bank (Plaid Sandbox)
    </button>
  );
};

export default LinkPlaid;
