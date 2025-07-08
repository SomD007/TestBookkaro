import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './orgDashboard.css';
import { useNavigate } from 'react-router-dom'; // To navigate to pages

const OrgDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');  // Store the logged-in user's name
  const [username, setUsername] = useState('');  // Store the logged-in user's username
  
  const navigate = useNavigate(); // Setup navigate function to redirect when new event is clicked

  const dummyEvents = [
  {
    id: 1,
    name: 'Tech Conference 2025',
    status: 'Live',
    ticketsSold: 120,
    ticketsRemaining: 30,
    date: '2025-08-01',
    time: '10:00 AM',
    location: 'Bangalore, India'
  },
  {
    id: 2,
    name: 'Art Expo',
    status: 'Draft',
    ticketsSold: 0,
    ticketsRemaining: 100,
    date: '2025-09-15',
    time: '2:00 PM',
    location: 'Delhi, India'
  },
  {
    id: 3,
    name: 'Music Fest',
    status: 'Canceled',
    ticketsSold: 200,
    ticketsRemaining: 0,
    date: '2025-07-20',
    time: '6:00 PM',
    location: 'Mumbai, India'
  }
];







  // Fetch the logged-in user's info when the component mounts
  useEffect(() => {
    // Call the backend to get the current user details (name and username)
    axios.get('http://localhost:5000/api/get-current-user', { withCredentials: true })
      .then((response) => {
        if (response.data.username && response.data.name) {
          setUsername(response.data.username);  // Store the username
          setUserName(response.data.name);      // Store the name
        } else {
          console.error("Error: User not logged in.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });





    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning 🌞');
    } else if (hour < 18) {
      setGreeting('Good Afternoon ☀️');
    } else {
      setGreeting('Good Evening 🌙');
    }
  }, []);

  // Function to navigate to the 'New Event' form
  const newEventForm = () => {
    navigate("/org/newevent"); // Redirect to NewEvent page
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="greeting-container">
          {/* Display greeting with the logged-in user's name */}
          <h1>
            {greeting}, {userName ? <pre>{userName}</pre> : <p>Loading...</p>} 👋
          </h1>
          <p>Here’s what’s happening with your events today.</p>
          <p>Your username: {username}</p>
        </div>

        <div className="profile-section">
          <button className="profile-button">Organizer ▾</button>
          {/* Dropdown menu to edit profile or logout */}
          {/* Add your logout functionality here */}
        </div>
      </header>

      <div className="create-event-section">
        <button className="create-event-button" onClick={newEventForm}>+ Create New Event</button>
      </div>

      {/* Dummy events table */}
      <section className="events-list">
        <h2>All Events</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Status</th>
              <th>Tickets</th>
              <th>Date/Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace dummyEvents with actual events when you have real data */
            
            
            
            
            
            }
            {dummyEvents.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td className={`status ${event.status.toLowerCase()}`}>{event.status}</td>
                <td>{event.ticketsSold} / {event.ticketsSold + event.ticketsRemaining}</td>
                <td>{event.date} @ {event.time}</td>
                <td>{event.location}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn cancel">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrgDashboard;
