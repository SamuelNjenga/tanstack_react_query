import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircleLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../services/APIUtils";

import "./User.css";

const User = () => {
  const [open, setOpen] = useState(false);
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["users"],
    onSuccess: () => console.log("SUCCESS"),
    queryFn: getUsers,
    // placeholderData: () => [
    //   { firstName: "Sam", lastName: "Njenga", email: "sam@gmail.com" },
    // ],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <CircleLoader color="#36d7b7" />
      </div>
    );
  }

  if (isError) return <pre>{JSON.stringify(error.message)}</pre>;

  return (
    <div>
      <h4 className="heading--title-text">Users List</h4>
      {data?.data?.map((user) => {
        return <div key={user.id}>{user.firstName}</div>;
      })}
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a user
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <span className="dialog__title">Add a user</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="dialog__subtitle">
              To add a new user, please enter their details here.
            </span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default User;
