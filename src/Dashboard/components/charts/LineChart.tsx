import { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardContext, DashboardValues } from "../../contexts/DashboardContexts";

const LineChartComp = () => {
  const { salesData } = useContext(DashboardContext) as DashboardValues;
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default LineChartComp;
