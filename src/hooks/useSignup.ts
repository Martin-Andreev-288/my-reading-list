import { toast } from "sonner";
import { useNavigate } from "react-router";

import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
    const navigate = useNavigate();

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user signed up:', res.user);
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