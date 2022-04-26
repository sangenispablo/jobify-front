import { useEffect } from "react";

const Dashboard = () => {

  const fecthData = async () => {
    try {
      // const response = await fetch("/data.json");
      const response = await fetch("/api/v1");
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
