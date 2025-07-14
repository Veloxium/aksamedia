import { useForm } from "react-hook-form";
import IndexLayout from "../layouts/IndexLayout";
import type { UserForm } from "../types/user";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useUserStore from "../store/userStore";

function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  const onSubmit = async (data: UserForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      setUsername(data.username);
      setMessage("Update Profile Berhasil!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IndexLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow shadow-zprimary rounded p-6 max-w-md mx-auto place-items-center mt-10">
          <h1 className="text-2xl font-semibold">Edit Profile User</h1>
          <img
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Destiny"
            alt="avatar"
            className="w-56 h-4w-56 rounded-full my-4"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 my-2 w-full"
          >
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              id="username"
              defaultValue={username}
              type="text"
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
            {message && (
              <span className="bg-green-200 text-sm px-2 py-1 rounded-md text-green-800">
                {message}
              </span>
            )}

            <button
              type="submit"
              className="bg-zgradient flex justify-center items-center text-white px-4 py-2 rounded-md hover:bg-black transition-colors mt-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Simpan"}
            </button>
            <a
              href="/"
              className="bg-gray-100 flex justify-center items-center px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Kembali
            </a>
          </form>
        </div>
      </div>
    </IndexLayout>
  );
}

export default ProfilePage;
