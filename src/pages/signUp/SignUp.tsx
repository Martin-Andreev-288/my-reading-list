import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { useSignup } from "@/serviceHooks/useSignup";
import { useRef, useState } from "react";
import { videos } from "@/assets";
import { FaBookOpen } from "react-icons/fa";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bgVideo = useRef(
    videos[Math.floor(Math.random() * videos.length)]
  ).current;
  const { signup } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute z-0 w-full h-full object-cover blur-[2px]"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/50 z-0" />
      {/* Register Card */}
      <div className="relative z-10 h-full grid place-items-center">
        <Card className="w-96 bg-muted/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <FaBookOpen className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span>Welcome to</span>
                <span className="font-semibold mt-2">My Reading List!</span>
              </div>
              <FaBookOpen className="w-5 h-5 text-primary" />
            </CardTitle>

            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground mt-2">
                Begin tracking your literary adventures today
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <SubmitBtn text="Register" className="w-full mt-4" />

              <p className="text-center mt-4">
                Already part of our story?
                <Button type="button" asChild variant="link">
                  <Link to="/login">Login</Link>
                </Button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Signup;
