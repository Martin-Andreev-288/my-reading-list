import { toast } from "sonner";
import { useNavigate } from "react-router";

import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const navigate = useNavigate();

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user logged in:', res.user);
                toast('Login successful!');
                return navigate("/");
            })
            .catch((err) => {
                console.log(err);
                toast(err.code);
            })
    }

    return { login };
}