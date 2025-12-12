import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ProductDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  product: any;
}

const ProductDetailsDialog = ({ open, onClose, product }: ProductDetailsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {product?.product} - Details
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {product && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Property</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>{product.product}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Unit Price</TableCell>
                <TableCell>${product.unitPrice}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell><strong>${product.total}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Region</TableCell>
                <TableCell>{product.region}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{product.date}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;