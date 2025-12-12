import { useContext, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { DashboardContext, DashboardValues } from "../../contexts/DashboardContexts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@mui/material";

const BarChartComp = () => {
  const { salesData } = useContext(DashboardContext) as DashboardValues;
  const chartRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("sales-chart.pdf");
    }
  };

  return (
    <div>
      <Button onClick={exportToPDF}>Export to PDF</Button>
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComp;