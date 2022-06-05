import { useEffect, useState, createContext, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

interface ContextState {
  _id: string;
  nombre: string;
  email: string;
}

interface IAuthContext {
  auth?: ContextState;
  isLoading: boolean;
  setAuth: (auth: ContextState) => void;
}

const initialState = {
  auth: {
    _id: "",
    nombre: "",
    email: "",
  },
  isLoading: true,
  setAuth: () => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState<ContextState | undefined>({
    _id: "",
    nombre: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const authenticateUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient("/usuarios/profile", config);
        setAuth({ ...data.usuario });
        navigate("/proyectos");
      } catch (error) {
        setAuth(undefined);
        console.log(error);
      }
      setIsLoading(false);
    };

    authenticateUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ auth, isLoading, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
