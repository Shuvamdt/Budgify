import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React from "react";

//const API_URL = "http://localhost:3000";
const API_URL = "https://budgify-hjq2.vercel.app";

export function CardSignIn(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await axios.post(
        `${API_URL}/login`,
        {
          username: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      alert("Login successful!");
      window.location.href = "/my-account";
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
    setFormData({ email: "", password: "" });
  };
  return (
    <Card className="w-full max-w-sm text-[#03071E] bg-[#F48C06]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription className="text-[#DC2F02]">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button onClick={props.changeState} variant="link">
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#D00000] text-[#FFBA08] hover:bg-[#370617] py-2"
          >
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full bg-[#E85D04] border-0 hover:bg-[#FAA307]"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
