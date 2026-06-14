const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Content</h3>
          <p className="text-2xl font-bold">12</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Blogs</h3>
          <p className="text-2xl font-bold">7</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Projects</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
