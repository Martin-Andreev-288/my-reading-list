import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";

function Login() {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FormInput type="email" label="email" name="identifier" />
            <FormInput type="password" name="password" />

            <SubmitBtn text="Login" className="w-full mt-4" />
            <p className="text-center mt-4">
              Not a member yet?
              <Button type="button" asChild variant="link">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Login;
