import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MonthlyIncome() {
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const API_URL = "https://two47withgrocery-backend.onrender.com";

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/monthly-income`,);

        // ✅ backend sends { monthlyIncome: [], totalIncome: number }
        setData(res.data.monthlyIncome || []);
        setTotalIncome(res.data.totalIncome || 0);
      } catch (err) {
        console.error("Error fetching income data:", err);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Income Report</h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalIncome" fill="rgb(252, 107, 3)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Total Income */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-medium">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">₹ {totalIncome}</p>
      </div>
    </div>
  );
}

export default MonthlyIncome;
