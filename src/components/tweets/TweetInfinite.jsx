import React, { useState, useEffect } from "react";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const TweetInfinite = () => {
  const [tweets, setTweets] = useState([]);
  const [lastTweet, setLastTweet] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getTweets();
  }, [lastTweet]);

  const getTweets = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/tweets/all?limit=${limit}&lastTweet=${lastTweet}`
    );
    const newTweets = response.data.result;
    setTweets([...tweets, ...newTweets]);
    setTempId(response.data.lastTweet);
    setHasMore(response.data.hasMore);
  };

  const fetchMore = () => {
    setLastTweet(tempId);
  };

  return (
    <div className="container mt-5" style={{ height: "100vh" }}>
      <div className="columns">
        <div className="column is-centered">
          <InfiniteScroll
            dataLength={tweets.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <table className="table is-striped is-bordered is-fullwidth mt-2">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {tweets.map((tweet, index) => (
                  <tr key={index}>
                    <td>{tweet.message}</td>
                    <td>{tweet.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default TweetInfinite;
