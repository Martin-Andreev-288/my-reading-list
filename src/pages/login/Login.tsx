import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
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
              Not a member yet?
              <Button type="button" asChild variant="link">
                <Link to="/signup">Register</Link>
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Login;
