"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useInitialFetch = () => {
  // Fetch the current user using Clerk's useUser hook
  const { user: currentUser } = useUser();

  // State variables to manage user data and loading state
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Create an AbortController to handle aborting the fetch if needed
  const controller = new AbortController();

  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      setLoading(true);

      try {
        // Make a POST request to the server to update or create user data
        let data = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${currentUser?.id}`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              id: currentUser?.id,
              name: currentUser?.fullName,
              img: currentUser?.hasImage
                ? currentUser?.imageUrl
                : `https://robohash.org/${currentUser?.firstName}`,
              email: currentUser?.emailAddresses,
              bio: "",
            }),
          }
        );

        // Parse the response data
        let userData = await data.json();
        setUser(userData.user[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    // Call the fetchUser function when the component using this hook mounts
    fetchUser();

    // Cleanup function to abort the fetch if the component unmounts
    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [currentUser?.id]);

  // Return the user data and loading state for the component to use
  return [user, loading];
};

export default useInitialFetch;
