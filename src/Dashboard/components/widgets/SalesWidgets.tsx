import { Typography } from "@mui/material";
import { DashboardContext, DashboardValues } from "../../contexts/DashboardContexts";
import { useContext } from "react";

export default function SalesWidget() {
  const { salesData } = useContext(DashboardContext) as DashboardValues;
  const totalSales = salesData?.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      <Typography variant="h6">Total Sales</Typography>
      <Typography variant="h3" fontWeight={700}>
        ${totalSales?.toLocaleString()}
      </Typography>
    </>
  );
}
