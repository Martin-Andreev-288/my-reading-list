import { toast } from "sonner";
import { useNavigate } from "react-router";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth)
            .then(() => {
                toast('Logout successful!');
                return navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                toast(err.code);
            });
    }

    return { logout };
};
