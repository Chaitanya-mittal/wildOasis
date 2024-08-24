import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const queryClient = useQueryClient();
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      if (event.key === "sb-monsxsuuewqcyclzcxrx-auth-token") {
        // Invalidate the user query when the session changes
        localStorage.removeItem(event.key);
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      }
    };

    // Listen for changes to the session in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [queryClient]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
