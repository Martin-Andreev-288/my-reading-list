import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: "LOGIN", payload: res.user });
                toast('Successful registration!');
                return navigate("/");
            })
            .catch((err) => {
                console.log(err);
                toast(err.code);
            })
    }

    return { signup }
}