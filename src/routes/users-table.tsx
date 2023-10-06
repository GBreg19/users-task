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
  const [selectedUser, setSelectedUser] = useState<UsersObject | null>(null);
  const [success, setSuccess] = useState(false);
  const { usersData, loading, error, deleting, editing } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      setSuccess(usersData.some((user) => user !== selectedUser));

      const timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [usersData]);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => {
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
          {(deleting || editing) && <Modal selectedUser={selectedUser} />}
          {success && <AlertMessage setFunc={setSuccess} />}
        </>
      )}
    </Layout>
  );
};

export default UsersTable;
