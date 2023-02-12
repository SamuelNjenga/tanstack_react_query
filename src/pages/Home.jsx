import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import PeopleIcon from "@mui/icons-material/People";

import Tweet from "../components/tweets/Tweet";
import InfiniteTweet from "../components/tweets/InfiniteTweet";
import TweetInfinite from "../components/tweets/TweetInfinite";
import User from "../components/users/User";
import { getUsers } from "../services/APIUtils";

import MultipleUser from "../components/users/MultipleUser";

const Home = () => {
  const [value, setValue] = useState("1");
  const queryClient = useQueryClient();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onHoverUserLink = () => {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: getUsers,
    });
  };

  return (
    <div>
      <Box sx={{ width: "90%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Tweet App Tabs"
              textColor="secondary"
              indicatorColor="secondary"
              centered
            >
              <Tab
                label="Users"
                value="1"
                icon={<AccountCircleIcon />}
                onMouseEnter={onHoverUserLink}
              />
              <Tab label="Tweets" value="2" icon={<ChatBubbleOutlineIcon />} />
              <Tab label="All Tweets " value="3" icon={<SelectAllIcon />} />
              <Tab label="My Tweets" value="4" icon={<PlaylistPlayIcon />} />
              <Tab label="Multiple Users" value="5" icon={<PeopleIcon />} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <User />
          </TabPanel>
          <TabPanel value="2">
            <Tweet />
          </TabPanel>
          <TabPanel value="3">
            <InfiniteTweet />
          </TabPanel>
          <TabPanel value="4">
            <TweetInfinite />
          </TabPanel>
          <TabPanel value="5">
            <MultipleUser />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Home;
