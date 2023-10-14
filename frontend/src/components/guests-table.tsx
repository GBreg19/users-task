import {
  UsersObject,
  fetchUsers,
  isAdding,
  isDeleting,
  isEditing,
} from "@/store/users-slice";
import { Link } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";

const GuestsTable = () => {
  const [selectedUser, setSelectedUser] = useState<UsersObject | null>(null);
  const { usersData, deleting, editing, adding } = useAppSelector(
    (state) => state.users
  );

  const dispatch = useAppDispatch();

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

  return (
    <>
      <Table className="">
        <TableHeader className="bg-black">
          <TableRow className="font-Noto-BoldIta">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="flex items-center justify-end">
              <div>
                <Button
                  onClick={() => dispatch(isAdding(true))}
                  className="mb-2 bg-slate-100 hover:bg-slate-200 text-black"
                >
                  Add User
                </Button>
                <div>{adding && <Modal adding />}</div>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedUsers.map((user) => {
            return (
              <TableRow key={user._id} className="font-Noto-Reg">
                <TableCell
                  className="font-medium"
                  title={`Click to open ${
                    user.name.split(" ")[0]
                  }'s personal page`}
                >
                  <Link to={`user/${user._id}`}>{user.name}</Link>
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
      {(deleting || editing) && <Modal selectedUser={selectedUser} />}
    </>
  );
};

export default GuestsTable;
