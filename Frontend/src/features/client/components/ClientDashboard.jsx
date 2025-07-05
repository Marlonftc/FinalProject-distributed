import ThemeToggle from './ThemeToggle';

const ClientDashboard = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h1>Client Dashboard</h1>
      <ThemeToggle userId={userId} />
    </div>
  );
};

export default ClientDashboard;
