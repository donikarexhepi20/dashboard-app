import { useEffect, useState } from "react";
import { SaleItem } from "../types/SaleDataType";
import SaleData from "../data/SalesData.json"
import { SelectChangeEvent } from "@mui/material";
import { DaysEnum, RegionEnum } from "../enums/DashboardEnums";
import { useResizeDetector } from "react-resize-detector";

export const useDashboard = () => {
  const defaultLayouts = {
    lg: [
      { i: "filters", x: 0, y: 0, w: 12, h: 3, static: true },
      { i: "widget", x: 0, y: 3, w: 4, h: 8 },
      { i: "pie", x: 4, y: 3, w: 4, h: 8 },
      { i: "line", x: 8, y: 3, w: 4, h: 8 },
      { i: "bar", x: 0, y: 11, w: 6, h: 10 },
      { i: "table", x: 6, y: 11, w: 6, h: 10 },
    ],
    md: [
      { i: "filters", x: 0, y: 0, w: 12, h: 3, static: true },
      { i: "widget", x: 0, y: 3, w: 6, h: 8 },
      { i: "pie", x: 6, y: 3, w: 6, h: 8 },
      { i: "line", x: 0, y: 11, w: 12, h: 8 },
      { i: "bar", x: 0, y: 19, w: 6, h: 10 },
      { i: "table", x: 6, y: 19, w: 6, h: 10 },
    ],
    sm: [
      { i: "filters", x: 0, y: 0, w: 12, h: 3, static: true },
      { i: "widget", x: 0, y: 3, w: 12, h: 8 },
      { i: "pie", x: 0, y: 11, w: 12, h: 8 },
      { i: "line", x: 0, y: 19, w: 12, h: 8 },
      { i: "bar", x: 0, y: 27, w: 12, h: 10 },
      { i: "table", x: 0, y: 37, w: 12, h: 10 },
    ],
  };

  const [layouts, setLayouts] = useState(defaultLayouts);
  const [originalData] = useState<SaleItem[]>(SaleData);
  const [salesData, setSalesData] = useState<SaleItem[]>(SaleData);
  const [dayFilter, setDayFilter] = useState<DaysEnum>(DaysEnum.ALL);
  const [regionFilter, setRegionFilter] = useState<RegionEnum>(RegionEnum.ALL);
  const [currentLayouts, setCurrentLayouts] = useState(layouts);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboard_layout_v1");
    const savedSales = localStorage.getItem("dashboard_data_v1");

    if (savedLayout) setLayouts(JSON.parse(savedLayout));
    else setLayouts(defaultLayouts);

    if (savedSales) setSalesData(JSON.parse(savedSales));
    else setSalesData(SaleData);
  }, []);

  const handleLayoutUpdate = (_: any, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem("dashboard_layout_v1", JSON.stringify(allLayouts));
  };

  const handleDayFilterChange = (event: SelectChangeEvent) => {
    const filterValue = event.target.value as DaysEnum;
    setDayFilter(filterValue);

    const currentDate = new Date();
    let filteredData = originalData;

    switch (filterValue) {
      case DaysEnum.LAST_7_DAYS:
        const days7Ago = new Date();
        days7Ago.setDate(currentDate.getDate() - 7);
        filteredData = originalData.filter(item => new Date(item.date) >= days7Ago);
        break;

      case DaysEnum.LAST_30_DAYS:
        const days30Ago = new Date();
        days30Ago.setDate(currentDate.getDate() - 30);
        filteredData = originalData.filter(item => new Date(item.date) >= days30Ago);
        break;

      case DaysEnum.LAST_90_DAYS:
        const days90Ago = new Date();
        days90Ago.setDate(currentDate.getDate() - 90);
        filteredData = originalData.filter(item => new Date(item.date) >= days90Ago);
        break;

      case DaysEnum.ALL:
      default:
        filteredData = originalData;
    }

    setSalesData(filteredData);
  };

  const handleRegionFilterChange = (event: SelectChangeEvent) => {
    const filterValue = event.target.value as RegionEnum;
    setRegionFilter(filterValue);

    if (filterValue === RegionEnum.ALL) {
      setSalesData(originalData);
      return;
    }
    setSalesData(originalData.filter(d => d.region === filterValue));
  };

  const handleSaveLayout = () => {
    const dashboardState = {
      layouts: currentLayouts,
      filters: {
        dayFilter,
        regionFilter
      }
    };
    localStorage.setItem("dashboardLayouts", JSON.stringify(dashboardState));
  };

  const handleClick = (data: any) => {
    debugger
    setSelectedProduct(data);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  return {
    salesData,
    dayFilter,
    regionFilter,
    layouts,
    openModal,
    selectedProduct,
    handleClose,
    handleClick,
    handleLayoutUpdate,
    handleSaveLayout,
    handleDayFilterChange,
    handleRegionFilterChange,

  };
};