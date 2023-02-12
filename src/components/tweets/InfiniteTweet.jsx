import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircleLoader } from "react-spinners";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { createTweet, getAllTweets } from "../../services/APIUtils";

import "../users/User.css";

const InfiniteTweet = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({ message: "", userId: "", noOfLikes: "" });

  const {
    data,
    error,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["all tweets", "infinite"],
    // getNextPageParam: (prevData) => prevData.hasMore,
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ lastTweet = 0 }) => getAllTweets(lastTweet),
  });

  const mutation = useMutation(() => {
    createTweet(item);
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

  if (status === "loading") {
    return (
      <div>
        <CircleLoader color="#36d7b7" />
      </div>
    );
  }

  if (status === "error") return <pre>{JSON.stringify(error.message)}</pre>;

  console.log("INFINITE DATA", data);
  console.log("HAS NEXT", hasNextPage);
  return (
    <div>
      <h4 className="heading--title-text">Tweets List</h4>
      {data?.pages[0].data?.result?.map((tweet) => {
        return <div key={tweet.id}>{tweet.id}</div>;
      })}
      <hr />
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      <hr />
      <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Add a tweet
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={mutation.mutate}>
        <DialogTitle>
          <span className="dialog__title">Add a tweet</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="dialog__subtitle">
              To post a new tweet, please enter details here.
            </span>
          </DialogContentText>
          <TextField
            autoFocus
            name="message"
            value={item.message}
            onChange={handleChange}
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            name="userId"
            value={item.userId}
            onChange={handleChange}
            margin="dense"
            id="userId"
            label="User Id"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            value={item.noOfLikes}
            onChange={handleChange}
            margin="dense"
            id="noOfLikes"
            name="noOfLikes"
            label="Number Of Likes"
            type="text"
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
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InfiniteTweet;
