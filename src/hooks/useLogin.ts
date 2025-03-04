import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: "LOGIN", payload: res.user });
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