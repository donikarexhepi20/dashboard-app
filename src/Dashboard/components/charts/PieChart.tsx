import { useContext, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardContext, DashboardValues } from "../../contexts/DashboardContexts";
import PieChartDetailsModal from "../PieChartDetailsModal";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const PieChartComp = () => {
  const { salesData, handleClick, openModal, handleClose, selectedProduct } = useContext(DashboardContext) as DashboardValues;


  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].name}</p>
          <p style={{ margin: '5px 0 0 0', color: payload[0].fill }}>
            Total: ${payload[0].value}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            Click for details
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={salesData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="total"
            nameKey="product"
            label
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            {salesData?.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <PieChartDetailsModal
        open={openModal}
        onClose={handleClose}
        product={selectedProduct} />
    </>

  );
};

export default PieChartComp;