import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { useLogin } from "@/serviceHooks/useLogin";
import { useRef, useState } from "react";
import { videos } from "@/assets";
import { FaBookOpen } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bgVideo = useRef(
    videos[Math.floor(Math.random() * videos.length)]
  ).current;
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover blur-[2px]"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/50 z-0" />
      {/* Login Card */}
      <div className="relative z-10 h-full grid place-items-center">
        <Card className="w-96 bg-muted/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <FaBookOpen className="w-5 h-5 text-primary" />
              My Reading List
              <FaBookOpen className="w-5 h-5 text-primary" />
            </CardTitle>
            <div className="text-center space-y-2"></div>
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

              <SubmitBtn text="Login" className="w-full mt-4" />

              <p className="text-center mt-4">
                New to the library?
                <Button type="button" asChild variant="link">
                  <Link to="/signup">Register</Link>
                </Button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Login;
