import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userLogin", handleUserUpdate);

    return () => {
      window.removeEventListener("userLogin", handleUserUpdate);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(JSON.parse(localStorage.getItem("user")));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div className="flex justify-between items-center p-4 px-8 shadow-md bg-gradient-to-b rounded-b-lg border-b border-gray-300">
      <div className="flex items-center">
      <img src="/logo.svg" alt="TripMatic Logo" className="h-8 w-auto" /> {/* Smaller logo */}
      <h1 className="ml-3 text-3xl font-bold text-[#4f46e5] hover:text-[#3b3a99] transition duration-300"> {/* Larger text with color */}
      Tripmatic-AI
    </h1>

  </div>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button className="rounded-full bg-[#4f46e5] hover:bg-[#3b3a99]">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full bg-[#4f46e5] hover:bg-[#3b3a99]">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className=" flex justify-center p-2 m-3">
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div>
            <Button
              className="px-5 py-2  rounded-md transition duration-200 shadow-sm bg-[#4f46e5] hover:bg-[#3b3a99]"
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="p-8 max-w-sm bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center">
              <img src="/logo.svg" alt="App Logo" className="w-20 h-20 mb-6" />
              <h2 className="font-bold text-2xl text-gray-800 mb-2">
                Sign In With Google
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to the app with Google authentication.
              </p>
              <Button
                onClick={login}
                className="w-full mt-4 py-3 flex gap-3 items-center justify-center bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
              >
                <FcGoogle className="text-xl" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
