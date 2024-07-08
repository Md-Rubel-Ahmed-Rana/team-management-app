import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  newPassword: string;
  oldPassword: string;
};

const ChangePassword = () => {
  const [togglePassword, setTogglePassword] = useState<{
    newPassword: boolean;
    oldPassword: boolean;
  }>({
    newPassword: false,
    oldPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const handleChangePassword: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  const handleTogglePassword = (type: string) => {
    setTogglePassword((prev: any) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");

  const isFormValid =
    oldPassword &&
    newPassword &&
    newPassword.length >= 6 &&
    newPassword !== oldPassword;

  return (
    <div className="flex items-center justify-center p-5">
      <div className="dark:bg-gray-700 bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Change Password</h1>
        <p className="mb-2">Change your password carefully</p>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="-mt-px relative mb-4">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              autoFocus
              aria-label="Old Password"
              type={togglePassword.oldPassword ? "text" : "password"}
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
              className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter your old password"
            />
            {errors.oldPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
            <button
              type="button"
              className="absolute top-9 right-2 z-50"
              onClick={() => handleTogglePassword("oldPassword")}
            >
              {togglePassword.oldPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <div className="-mt-px relative mb-4">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              aria-label="New Password"
              type={togglePassword.newPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "New Password must be at least 6 characters",
                },
                validate: (value) =>
                  value !== oldPassword ||
                  "New Password cannot be the same as the Old Password",
              })}
              className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter a new password"
            />
            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
            <button
              type="button"
              className="absolute top-9 right-2 z-50"
              onClick={() => handleTogglePassword("newPassword")}
            >
              {togglePassword.newPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <button
            disabled={!isFormValid}
            type="submit"
            className={`w-full text-white py-2 px-4 rounded ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            } `}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
