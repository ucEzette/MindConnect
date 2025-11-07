const { useState } = React;

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    appointmentsToday: 0,
    activeClients: 0,
    sessionsThisMonth: 0,
    averageRating: 0,
    lastMonthSessions: 0,
    lastMonthHours: 0,
    lastMonthRevenue: 0,
    lastMonthAttendance: 0
  });

  React.useEffect(() => {
    // Load real data from localStorage or API
    const loadData = () => {
      const savedAppointments = JSON.parse(localStorage.getItem('therapistAppointments') || '[]');
      const savedStats = JSON.parse(localStorage.getItem('therapistStats') || '{}');
      
      setAppointments(savedAppointments);
      setStats({
        appointmentsToday: savedStats.appointmentsToday || 0,
        activeClients: savedStats.activeClients || 0,
        sessionsThisMonth: savedStats.sessionsThisMonth || 0,
        averageRating: savedStats.averageRating || 0,
        lastMonthSessions: savedStats.lastMonthSessions || 0,
        lastMonthHours: savedStats.lastMonthHours || 0,
        lastMonthRevenue: savedStats.lastMonthRevenue || 0,
        lastMonthAttendance: savedStats.lastMonthAttendance || 0
      });
    };
    
    loadData();
  }, []);

  const Sidebar = () => (
    <aside className="sidebar">
      <h2 className="logo">MIND CONNECT</h2>
      <div className="profile">
        <div className="avatar">JB</div>
        <p>Johnson B</p>
      </div>
      <nav className="nav">
        <ul>
          {[
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { id: 'clients', icon: 'fas fa-users', label: 'Clients' },
            { id: 'messages', icon: 'fas fa-envelope', label: 'Messages' },
            { id: 'chat', icon: 'fas fa-comments', label: 'Chat rooms' },
            { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
            { id: 'billing', icon: 'fas fa-dollar-sign', label: 'Billing' },
            { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
          ].map(item => (
            <li key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
              <i className={item.icon}></i> {item.label}
            </li>
          ))}
          <li className="nav-item logout"><i className="fas fa-sign-out-alt"></i> Logout</li>
        </ul>
      </nav>
    </aside>
  );

  const DashboardPage = () => (
    <div className="page active">
      <header>
        <div>
          <h1>Welcome back, Dr. Johnson!</h1>
        </div>
        <div>
          <p>Here's your practice overview for today, {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <button className="add-appointment-btn"><i className="fas fa-plus"></i> New Appointment</button>
      </header>
      <section className="stats">
        <div className="card">{stats.appointmentsToday}<br /><span>Appointments Today</span></div>
        <div className="card">{stats.activeClients}<br /><span>Active Clients</span></div>
        <div className="card">{stats.sessionsThisMonth}<br /><span>Sessions this month</span></div>
        <div className="card">{stats.averageRating}<br /><span>Average Rating</span></div>
      </section>
      <section className="appointments">
        <h2>Today's Appointments...</h2>
        {appointments.map((apt, index) => (
          <div key={index} className="appointment">
            <p className="time">{apt.time}</p>
            <div className="info">
              <h3>{apt.name}</h3>
              <p>{apt.type}</p>
            </div>
            <button className="notes">Notes</button>
            <button className="start">Start Session</button>
          </div>
        ))}
      </section>
      <section className="summary">
        <div className="last-month">
          <h3>Last Month</h3>
          <p><strong>{stats.lastMonthSessions}</strong> Sessions</p>
          <p><strong>{stats.lastMonthHours}h</strong> Hours spent</p>
          <p><strong>${stats.lastMonthRevenue}</strong> Revenue</p>
          <p><strong>{stats.lastMonthAttendance}%</strong> Attendance</p>
        </div>
        <div className="today">
          <h3>Today</h3>
          <h2>{new Date().getDate()}</h2>
          <p>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
        </div>
      </section>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'clients': return <div className="page"><header><h1>Client Management</h1></header><p className="placeholder">Client management coming soon</p></div>;
      case 'messages': return <div className="page"><header><h1>Messages</h1></header><p className="placeholder">No new messages</p></div>;
      case 'chat': return <div className="page"><header><h1>Chat Rooms</h1></header><p className="placeholder">Chat functionality coming soon</p></div>;
      case 'reports': return <div className="page"><header><h1>Reports</h1></header><p className="placeholder">Reports dashboard coming soon</p></div>;
      case 'billing': return <div className="page"><header><h1>Billing</h1></header><p className="placeholder">Billing management coming soon</p></div>;
      case 'settings': return <div className="page"><header><h1>Settings</h1></header><p className="placeholder">Settings panel coming soon</p></div>;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

try {
  const root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : null;
  if (root) {
    root.render(<Dashboard />);
  } else {
    ReactDOM.render(<Dashboard />, document.getElementById('root'));
  }
} catch (error) {
  console.error('React render error:', error);
  ReactDOM.render(<Dashboard />, document.getElementById('root'));
}