import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
      setFriends(response.data);
    };
    fetchFriends();
  }, []);

  const increasePoints = async (id) => {
    await axios.patch(`http://localhost:7000/api/user/v1/claim-points/${id}`);
    // Re-fetch friends to update points
    const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
    setFriends(response.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Friends List</h2>
      {friends.map((friend) => (
        <div
          key={friend._id}
          className="border p-4 mb-2 flex justify-between items-center cursor-pointer"
          onClick={() => increasePoints(friend._id)}
        >
          <span>{friend.name}</span>
          <span>{friend.points} points</span>
        </div>
      ))}
    </div>
  );
};

export default Home;
