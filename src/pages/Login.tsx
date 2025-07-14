import { useForm } from "react-hook-form";
import ZBackground from "../components/zbackground";
import type { LoginForm } from "../types/auth";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "../services/apiService";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);
  const [message, setMessage] = useState<string>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await login(data);
      if (response) {
        setUsername(data.username);
        navigate("/aksamedia");
      } else {
        setMessage("Username atau password salah")
      }
    } catch (error) {
        setMessage("Terjadi kesalahan saat login")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      navigate("/aksamedia");
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen px-4">
      <ZBackground />
      <div className="relative z-10 px-8 py-4 md:px-14 md:py-8 justify-center items-center bg-white shadow rounded w-full md:w-min md:min-w-lg">
        <p className="text-3xl font-semibold">Login Packs...</p>
        <p className="text-base mt-1">
          Ikan hiu pergi jogging....&#40;cakep&#41;
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 my-2"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              id="username"
              type="text"
              placeholder="Masukkan username"
              className={`text-black px-2 py-1 border-2 border-gray-400 rounded-md
              ${
                errors.username
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-400"
              }
                `}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                Username tidak boleh kosong
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              id="password"
              type="password"
              placeholder="Masukan password"
              className={`text-black px-2 py-1 border-2 border-gray-400 rounded-md
              ${
                errors.password
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-400"
              }
                `}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password tidak boleh kosong
              </span>
            )}
          </div>
          {message && (
            <span className="bg-red-200 text-sm px-2 py-1 rounded-md text-red-800">
              {message}
            </span>
          )}
          <button
            type="submit"
            className="bg-zgradient flex justify-center items-center text-white px-4 py-2 rounded-md hover:bg-black transition-colors mt-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
