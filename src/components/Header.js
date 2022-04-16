import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

function Header() {
    const { signOut, user } = useAuthenticator((context) => [context.signOut, context.user]);

    return (
        <header className="w-full min-h-[4rem] h-16 flex items-center shadow">
            <nav className="container flex justify-between">
                <ul>
                    <li>
                        <NavLink to="/" className="border-0 font-bold">
                            🥕 Rate My Meal
                        </NavLink>
                    </li>
                </ul>
                {!user && 
                    <ul className="flex flex-row">
                        <li className="mr-3">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Signup</NavLink>
                        </li>
                    </ul>
                }
                {user &&
                    <ul className="flex flex-row">
                        <li className="pr-2.5 mr-2.5 border-r">
                            <p className="m-0 text-zinc-400">@{user.username}</p>
                        </li>
                        <li className="mr-5">
                            <NavLink to="/create">Create Meal</NavLink>
                        </li>
                        <li>
                            <button onClick={signOut}>SignOut</button>
                        </li>
                    </ul>
                }
            </nav>

        </header>
    );
}

export default Header;
