import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>CoursesCompass.ai</h1>
        <div className="user-info">
          <span>Welcome, {user.name}!</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to CoursesCompass.ai</h2>
          <p>You are successfully logged in.</p>
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
