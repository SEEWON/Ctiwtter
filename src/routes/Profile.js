import { authService } from "fbase";
import { signOut } from "firebase/auth";
import React from "react";

export default () => {
        const onLogOutClick = () => signOut(authService);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};