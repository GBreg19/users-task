import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UsersObject,
  fetchUsers,
  isDeleting,
  isEditing,
} from "@/store/users-slice";

import Layout from "@/components/layout";
import Loader from "../components/loader";
import ErrorMessage from "@/components/error-message";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { SlOptions } from "react-icons/sl";
import Modal from "@/components/modal";
import AlertMessage from "@/components/alert-message";

const UsersTable = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersObject | null>(null);
  const {
    usersData,
    loading,
    error,
    deleting,
    editing,
    successMessage,
    errorMessage,
  } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ actionType: "GET" }));
  }, [dispatch]);

  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = usersData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      setShowAlert(true);

      const timerId = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [successMessage, errorMessage]);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && (
        <>
          <div className="w-4/5">
            <Table className="border-2 border-yellow-500">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedUsers.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell
                        className="font-medium"
                        title={`Click to open ${
                          user.name.split(" ")[0]
                        }'s personal page`}
                      >
                        <Link to={`user/${user.id}`}>{user.name}</Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address.city}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" title="Click for actions">
                              <SlOptions />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedUser(user);
                                dispatch(isEditing(true));
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedUser(user);
                                dispatch(isDeleting(true));
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="flex gap-3 mt-3 justify-center">
              <Button
                className="bg-slate-100 hover:bg-slate-300 text-black"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                className="bg-slate-100 hover:bg-slate-300 text-black"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
          {(deleting || editing) && <Modal selectedUser={selectedUser} />}
          {showAlert && <AlertMessage />}
        </>
      )}
    </Layout>
  );
};

export default UsersTable;
