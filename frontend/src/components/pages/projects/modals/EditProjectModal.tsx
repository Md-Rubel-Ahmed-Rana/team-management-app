import React, { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProjectMutation } from "@/features/project";
import { IProject } from "@/interfaces/project.interface";
import toast from "react-hot-toast";
import { SocketContext } from "@/context/SocketContext";

const EditProjectModal = ({ isEdit, setIsEdit, project }: any) => {
  const { socket }: any = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IProject>>({
    mode: "onChange",
  });
  const closeModal = () => {
    setIsEdit(false);
  };
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const handleEditProject: SubmitHandler<Partial<IProject>> = async (data) => {
    const result: any = await updateProject({
      id: project.id,
      data,
    });
    if (result?.data?.success) {
      result?.data?.data?.forEach((memberId: string) => {
        if (memberId) {
          socket.emit("notification", memberId);
        }
      });
      toast.success(
        result?.data?.message || "Your project updated successfully!"
      );
      closeModal();
    } else {
      toast.error(
        result?.error?.data?.message ||
          "Your project wasn't updated successfully!"
      );
      closeModal();
    }
  };

  return (
    <Transition appear show={isEdit} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-25" />
        </Transition.Child>

        <div className=" fixed inset-0 flex flex-col items-center justify-center">
          <div className="p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="lg:w-[400px] w-[300px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white lg:p-6 p-3 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleEditProject)}>
                    <h3 className="text-xl font-bold">Edit Project</h3>

                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">Name</p>
                      <input
                        {...register("name", {
                          required: "Project name is required",
                        })}
                        type="text"
                        id="name"
                        defaultValue={project?.name}
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  p-2 outline-none   shadow-sm sm:text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">Category</p>
                      <input
                        {...register("category", {
                          required: "Project category is required",
                        })}
                        type="text"
                        id="category"
                        defaultValue={project?.category}
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  p-2 outline-none   shadow-sm sm:text-sm"
                      />
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between gap-2">
                      <button
                        disabled={isLoading}
                        onClick={closeModal}
                        type="button"
                        className={`w-full  rounded-full py-1 lg:py-3 ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        } dark:text-white mx-auto outline-none border-2 text-sm`}
                      >
                        {isLoading ? "Loading..." : "Cancel"}
                      </button>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className={`border w-full  rounded-full py-1 lg:py-3 outline-none bg-blue-700 text-white text-md ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        }`}
                      >
                        {isLoading ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProjectModal;
