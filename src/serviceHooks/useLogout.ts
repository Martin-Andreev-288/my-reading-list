import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const logout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" });
                toast.success('Logout successful!');
                return navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.code);
            });
    }

    return { logout };
};