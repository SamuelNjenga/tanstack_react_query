import React, { useState } from "react";

import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import Tweet from "../components/tweets/Tweet";
import User from "../components/users/User";

const Home = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              <Tab label="Users" value="1" icon={<AccountCircleIcon />} />
              <Tab label="Tweets" value="2" icon={<ChatBubbleOutlineIcon />} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <User />
          </TabPanel>
          <TabPanel value="2">
            <Tweet />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Home;
