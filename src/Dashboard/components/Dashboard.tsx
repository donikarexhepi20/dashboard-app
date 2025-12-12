import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from "@mui/material";
import { Responsive, Layout } from "react-grid-layout";
import { useResizeDetector } from "react-resize-detector";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import SalesWidget from "./widgets/SalesWidgets";
import PieChartComp from "../components/charts/PieChart";
import LineChartComp from "./charts/LineChart";
import BarChartComp from "./charts/BarChart";
import SalesTable from "./DashboardTable";
import { RegionEnum, DaysEnum } from "../enums/DashboardEnums";
import { DashboardContext, DashboardValues } from "../contexts/DashboardContexts";

const DashboardPage = () => {
  const { regionFilter, layouts, handleDayFilterChange, handleLayoutUpdate, dayFilter, handleRegionFilterChange, handleSaveLayout } = useContext(DashboardContext) as DashboardValues;
  const { width, ref } = useResizeDetector();

  return (
    <Box ref={ref} sx={{ p: 2, width: "100%" }}>
      {width && (
        <Responsive
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 12, sm: 12 }}
          rowHeight={40}
          width={width}
          onLayoutChange={handleLayoutUpdate}
        >
          <div key="filters">
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                sx={{
                  minWidth: { xs: "100%", sm: 200 },
                  flex: { xs: "1 1 100%", sm: "0 0 auto" },
                }}
              >
                <InputLabel>Filter by Days</InputLabel>
                <Select value={dayFilter} label="Filter by Days" onChange={handleDayFilterChange}>
                  <MenuItem value={DaysEnum.ALL}>All Days</MenuItem>
                  <MenuItem value={DaysEnum.LAST_7_DAYS}>Last 7 Days</MenuItem>
                  <MenuItem value={DaysEnum.LAST_30_DAYS}>Last 30 Days</MenuItem>
                  <MenuItem value={DaysEnum.LAST_90_DAYS}>Last 90 Days</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  minWidth: { xs: "100%", sm: 200 },
                  flex: { xs: "1 1 100%", sm: "0 0 auto" },
                }}
              >
                <InputLabel>Filter by Region</InputLabel>
                <Select value={regionFilter} label="Filter by Region" onChange={handleRegionFilterChange}>
                  <MenuItem value={RegionEnum.ALL}>All</MenuItem>
                  <MenuItem value={RegionEnum.EUROPE}>Europe</MenuItem>
                  <MenuItem value={RegionEnum.ASIA}>Asia</MenuItem>
                  <MenuItem value={RegionEnum.AFRICA}>Africa</MenuItem>
                  <MenuItem value={RegionEnum.NORTH_AMERICA}>North America</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" onClick={handleSaveLayout} sx={{ ml: "auto" }}>
                Save Layout
              </Button>
            </Paper>
          </div>
          <div key="widget">
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", cursor: "move" }}>
              <SalesWidget />
            </Paper>
          </div>

          <div key="pie">
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", cursor: "move" }}>
              <PieChartComp />
            </Paper>
          </div>

          <div key="line">
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", cursor: "move" }}>
              <LineChartComp />
            </Paper>
          </div>

          <div key="bar">
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", cursor: "move" }}>
              <BarChartComp />
            </Paper>
          </div>

          <div key="table">
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", overflow: "auto", cursor: "move" }}>
              <SalesTable />
            </Paper>
          </div>
        </Responsive>
      )}
    </Box>
  );
};

export default DashboardPage;