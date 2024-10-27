import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
      setLeaders(response.data.sort((a, b) => b.points - a.points));
    };
    fetchLeaders();
  }, []);

  const fetchHistory = async (userId) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/v1/your-history', { userId });
      setHistory(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchHistory(user._id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {leaders.map((leader) => (
        <div
          key={leader._id}
          className="border p-4 mb-2 cursor-pointer"
          onClick={() => handleUserClick(leader)}
        >
          <span>{leader.name} - {leader.points} points</span>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">History for {selectedUser?.name}</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="mb-2">
              {entry.date}: {entry.points} points
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Leaderboard;
