import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UsersObject,
  fetchUsers,
  isAdding,
  isDeleting,
  isEditing,
} from "@/store/users-slice";
import { Button } from "./ui/button";
import UserForm from "./guest-form";
import UserCard from "./guest-card";
import { useState } from "react";

interface ModalProps {
  selectedUser?: UsersObject | null;
  adding?: boolean;
}

const Modal = ({ selectedUser, adding }: ModalProps) => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const { editing, deleting } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();

  const cancelAction = () => {
    dispatch(isDeleting(false));
    dispatch(isEditing(false));
    dispatch(isAdding(false));
  };

  const userDeleteHandler = async () => {
    if (selectedUser) {
      try {
        await dispatch(
          fetchUsers({ actionType: "DELETE", id: selectedUser._id })
        );
        dispatch(isDeleting(false));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div
        onClick={cancelAction}
        className="fixed top-0 left-0 w-full h-full z-40 bg-white/[0.1] backdrop-blur-sm"
      ></div>
      {adding && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-1 shadow-lg duration-200 flex flex-col gap-5 rounded-lg">
          {" "}
          <UserForm />{" "}
        </div>
      )}
      {editing && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-1 shadow-lg duration-200 flex flex-col gap-5 rounded-lg">
          {isEditingUser && <UserForm user={selectedUser} />}
          {!isEditingUser && (
            <UserCard
              user={selectedUser}
              setIsEditing={setIsEditingUser}
              modal
            />
          )}
        </div>
      )}
      {deleting && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-6 shadow-lg duration-200 flex flex-col gap-5 rounded-lg">
          <h1 className="font-bold text-xl">Are you sure?</h1>
          <p>
            This action cannot be undone and will permanently remove the user
            and their data from our servers.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={cancelAction}
              className="bg-slate-100 text-black hover:bg-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={userDeleteHandler}
              className="bg-slate-100 text-black hover:bg-slate-300"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
