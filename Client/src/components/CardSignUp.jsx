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

export function CardSignUp(props) {
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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Create Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-[#D00000] text-[#FFBA08] hover:bg-[#370617]"
        >
          Create your Account
        </Button>
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
