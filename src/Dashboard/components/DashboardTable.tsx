import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TableSortLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { SaleItem } from "../types/SaleDataType";
import { DashboardContext, DashboardValues } from "../contexts/DashboardContexts";

const SalesTable = () => {
  const { salesData } = useContext(DashboardContext) as DashboardValues;

  const data = salesData as SaleItem[];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [orderBy, setOrderBy] = useState<keyof SaleItem | "">("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const filteredData =
    categoryFilter === "All"
      ? data
      : data.filter((item) => item.category === categoryFilter);

  const categories = ["All", ...new Set(data.map((i) => i.category))];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCategoryFilter(value);
    setPage(0);
  };


  const handleSort = (property: keyof SaleItem) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? [...filteredData].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    })
    : filteredData;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        mb={2}
        gap={2}
        sx={{ flexShrink: 0 }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
          Sales Table
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ paddingTop: '5px' }}>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={order}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Region</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.unitPrice}</TableCell>
                  <TableCell>${item.total}</TableCell>
                  <TableCell>{item.region}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ flexShrink: 0 }}
      />
    </Box>
  );
};

export default SalesTable;