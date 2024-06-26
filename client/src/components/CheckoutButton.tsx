import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

const CheckoutButton = () => {
    const { 
        isAuthenticated, 
        isLoading: 
        isAuthLoading, 
        loginWithRedirect, 
    } = useAuth0();

    const { pathname } = useLocation();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }

    if (!isAuthenticated) {
        return (
            <Button 
                className="bg-orange-500 flex-1"
                onClick={onLogin}
            >
                Login in to checkout
            </Button>
        );
    }

    if (isAuthLoading) {
        return <LoadingButton />
    }
};

export default CheckoutButton;