const { useState } = React;

const PatientDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [stats, setStats] = useState({
    daysActive: 0,
    chatRooms: 0,
    aiConversations: 0,
    upcomingSessions: 0
  });

  // Calculate actual stats
  React.useEffect(() => {
    const calculateStats = () => {
      // Days active - calculate from registration date or last activity
      const registrationDate = new Date('2024-01-01'); // Replace with actual registration date
      const today = new Date();
      const daysActive = Math.floor((today - registrationDate) / (1000 * 60 * 60 * 24));
      
      // Get actual data from localStorage or API
      const chatRooms = parseInt(localStorage.getItem('joinedChatRooms') || '0');
      const aiConversations = parseInt(localStorage.getItem('aiConversations') || '0');
      const upcomingSessions = parseInt(localStorage.getItem('upcomingSessions') || '0');
      
      setStats({
        daysActive,
        chatRooms,
        aiConversations,
        upcomingSessions
      });
    };
    
    calculateStats();
  }, []);

  const Sidebar = () => (
    <div className="sidebar">
      <h2>MIND CONNECT</h2>
      <div className="user">
        <div className="avatar">JD</div>
        <span>JAMES DUSH</span>
      </div>
      <ul>
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'chatroom', label: 'Chat room' },
          { id: 'aiassistant', label: 'AI Assistant' },
          { id: 'appointments', label: 'Appointments' },
          { id: 'findtherapist', label: 'Find therapist' },
          { id: 'resources', label: 'Resources' },
          { id: 'myprogress', label: 'My progress' },
          { id: 'settings', label: 'Settings' },
          { id: 'logout', label: 'Logout' }
        ].map((item) => (
          <li key={item.id} className={activePage === item.id ? 'active' : ''} 
              onClick={() => setActivePage(item.id)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );

  const DashboardPage = () => (
    <div className="main">
      <div className="alert">
        <strong>Need Immediate Help?</strong> 
        If you're having thoughts of self-harm or suicide, please reach out for immediate support.
        <button>GET CRISIS HELP</button>
      </div>
      <h1>Welcome back, James!</h1>
      <p>Here's your mental health dashboard for today</p>

      <div className="stats">
        <div className="card"><strong>{stats.daysActive}</strong><br />DAYS ACTIVE</div>
        <div className="card"><strong>{stats.chatRooms}</strong><br />Chat rooms joined</div>
        <div className="card"><strong>{stats.aiConversations}</strong><br />AI conversations</div>
        <div className="card"><strong>{stats.upcomingSessions}</strong><br />Upcoming sessions</div>
      </div>

      <div className="sections">
        <div className="section">
          <h3>Quick support</h3>
          <button>Chat with AI Assistant</button>
          <button>Support Room</button>
          <button>Emergency service</button>
        </div>

        <div className="section">
          <h3>Your sessions</h3>
          {(() => {
            const sessions = JSON.parse(localStorage.getItem('patientSessions') || '[]');
            return sessions.length > 0 ? sessions.map((session, index) => (
              <button key={index}>{session}</button>
            )) : <p style={{color: '#718096', fontStyle: 'italic'}}>No upcoming sessions</p>;
          })()}
        </div>

        <div className="section">
          <h3>Wellness activity</h3>
          <button>5 min Breathing ex.</button>
          <button>Daily Mood Check-in</button>
          <button>Guided meditation</button>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'chatroom': return <div className="main"><h1>Chat Room</h1><p>Chat functionality coming soon</p></div>;
      case 'aiassistant': return <div className="main"><h1>AI Assistant</h1><p>AI Assistant coming soon</p></div>;
      case 'appointments': return <div className="main"><h1>Appointments</h1><p>Appointments management coming soon</p></div>;
      case 'findtherapist': return <div className="main"><h1>Find Therapist</h1><p>Therapist finder coming soon</p></div>;
      case 'resources': return <div className="main"><h1>Resources</h1><p>Resources coming soon</p></div>;
      case 'myprogress': return <div className="main"><h1>My Progress</h1><p>Progress tracking coming soon</p></div>;
      case 'settings': return <div className="main"><h1>Settings</h1><p>Settings panel coming soon</p></div>;
      case 'logout': return <div className="main"><h1>Logged Out</h1><p>You have been logged out</p></div>;
      default: return <DashboardPage />;
    }
  };

  return (
    <>
      <Sidebar />
      {renderPage()}
    </>
  );
};

try {
  const root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : null;
  if (root) {
    root.render(<PatientDashboard />);
  } else {
    ReactDOM.render(<PatientDashboard />, document.getElementById('root'));
  }
} catch (error) {
  console.error('React render error:', error);
  ReactDOM.render(<PatientDashboard />, document.getElementById('root'));
}
