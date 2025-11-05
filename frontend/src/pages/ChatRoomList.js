import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatRoomList.css';

const ChatRoomList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch chat rooms');
      }
      const data = await response.json();
      setChatRooms(data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      alert('Failed to load chat rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this chat room?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/chat/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat room');
      }

      setChatRooms(chatRooms.filter(room => room._id !== roomId));
    } catch (error) {
      console.error('Error deleting chat room:', error);
      alert('Failed to delete chat room. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading chat rooms...</p>;
  }

  if (!chatRooms.length) {
    return <p>No chat rooms available.</p>;
  }

  return (
    <div className="chatroom-list-container">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Chat Rooms</h1>
      </header>

      <div className="chat-rooms-grid">
        {chatRooms.map(room => (
          <div key={room._id} className="chat-room-card">
            <h2 className="chat-room-title">{room.name}</h2>
            <div className="chat-room-details">
              <p>Participants: {room.participants ? room.participants.length : 0}</p>
              <p>Created: {room.createdAt ? new Date(room.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="chat-room-actions">
              <button 
                className="chat-room-button join-button"
                onClick={() => handleJoinRoom(room._id)}
              >
                Join Room
              </button>
              {room.isOwner && (
                <button 
                  className="chat-room-button delete-button"
                  onClick={() => handleDeleteRoom(room._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
