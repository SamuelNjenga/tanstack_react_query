import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircleLoader } from "react-spinners";
import { useMutation, useQuery, useQueries } from "@tanstack/react-query";

import { createUser, getUsers, getUser } from "../../services/APIUtils";

import "./User.css";

const MultipleUser = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({ firstName: "", lastName: "", email: "" });

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["users"],
    onSuccess: () => console.log("SUCCESS"),
    queryFn: getUsers,
    // placeholderData: () => [
    //   { firstName: "Sam", lastName: "Njenga", email: "sam@gmail.com" },
    // ],
  });

  const mutation = useMutation(() => {
    createUser(item);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setItem({ ...item, [event.target.name]: value });
  };

  if (isLoading) {
    return (
      <div>
        <CircleLoader color="#36d7b7" />
      </div>
    );
  }

  if (isError) return <pre>{JSON.stringify(error.message)}</pre>;

  console.log("DATA", data);

  const queries = useQueries({
    queries: (data?.data ?? []).map((user) => {
      return {
        queryKey: ["users", user.id],
        queryFn: () => getUser(user.id),
      };
    }),
  });
  console.log("QUERIES", queries);

  return (
    <div>
      <h4 className="heading--title-text">Users List</h4>
      {data?.data?.map((user) => {
        return <div key={user.id}>{user.firstName}</div>;
      })}
      <hr />
      <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Add a user
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={mutation.mutate}>
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
            name="firstName"
            value={item.firstName}
            onChange={handleChange}
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            name="lastName"
            value={item.lastName}
            onChange={handleChange}
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            value={item.email}
            onChange={handleChange}
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            onClick={() => {
              mutation.mutate(item);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MultipleUser;
