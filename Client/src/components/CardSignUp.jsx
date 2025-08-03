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

const API_URL = "http://localhost:3000";

export function CardSignUp(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/register`, formData);

      const msg = res.data;
      alert(msg);
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <Card className="w-full max-w-sm text-[#03071E] bg-[#F48C06]">
      <CardHeader>
        <CardTitle>Sign up with your email</CardTitle>
        <CardDescription className="text-[#DC2F02]">
          Enter your email below to create your account
        </CardDescription>
        <CardAction>
          <Button onClick={props.changeState} variant="link">
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            <Label htmlFor="password">Create Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#D00000] text-[#FFBA08] hover:bg-[#370617]"
          >
            Create your Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full bg-[#E85D04] border-0 hover:bg-[#FAA307]"
        >
          Sign up with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
