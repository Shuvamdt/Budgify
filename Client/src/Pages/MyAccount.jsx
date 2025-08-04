import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LinkPlaid from "../components/LinkPlaid";
import axios from "axios";

//const API_URL = "http://localhost:3000";
const API_URL = "https://budgify-hjq2.vercel.app";

const MyAccount = () => {
  const [email, setEmail] = useState("");
  async function fetch() {
    try {
      const userEmail = await axios.get(`${API_URL}/get-account-info`, {
        withCredentials: true,
      });
      setEmail(userEmail.data.email);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  const handleSignout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      window.location.href = "/signup";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="m-5 px-4 py-2 rounded-lg border border-[#F48C06]">
      <div className="flex flex-col sm:flex-row items-center">
        <Avatar className="h-50 w-50 m-3">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="p-2 m-5 font-1 text-[50px]">{email.split("@")[0]}</h1>
      </div>
      <ul className="font-1 mx-5 px-2 my-2 py-1 flex-col">
        <li className="px-2 my-4 flex justify-around">
          <h1>My Email- {email}</h1>
        </li>
        <li className="flex justify-center items-center my-4">
          <Button
            variant="outline"
            className="bg-[#E85D04] hover:bg-[#D00000] border-0"
          >
            <LinkPlaid />
          </Button>
        </li>
        <li className="flex justify-center items-center">
          <Button
            onClick={handleSignout}
            variant="outline"
            className="bg-[#E85D04] hover:bg-[#D00000] border-0"
          >
            Sign Out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default MyAccount;
