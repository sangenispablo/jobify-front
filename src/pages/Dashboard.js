import { useEffect } from "react";

const Dashboard = () => {
  const fecthData = async () => {
    try {
      const response = await fetch("http://localhost:4000");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fecthData();
  }, []);
  return <h1>Dashboard</h1>;
};
export default Dashboard;
