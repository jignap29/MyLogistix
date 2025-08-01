import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Button,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWalletDetails } from "../../../redux/walletRelated/walletHandel";
import { getAllCust } from "../../../redux/custRelated/custHandle";
import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";

const ShowWallets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { custList } = useSelector((state) => state.cust);
  const { courierCompanies } = useSelector((state) => state.couriercompany);
  const { transactions, balance, loading } = useSelector((state) => state.wallet);

  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllCust());
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  const handleViewWallet = (user) => {
    setSelectedUser(user);
    dispatch(getWalletDetails({ userId: user._id, userModel: userType }));
    setOpenDialog(true);
  };

  const renderUserList = () => {
    const list = userType === "Customer" ? custList : courierCompanies;
    return (
      <div style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {userType === "Customer"
                    ? `${user.firstName || ""} ${user.lastName || ""}`
                    : user.companyName || user.name}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Wallet">
                    <IconButton onClick={() => handleViewWallet(user)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTransactionType = (type) => {
    const baseStyle = {
      minWidth: 100,
      height: 32,
      borderRadius: 50,
      fontWeight: "bold",
      justifyContent: "center",
      textTransform: "capitalize",
    };

    switch (type) {
      case "credit":
        return <Chip label="Recharge" color="success" sx={baseStyle} />;
      case "debit":
        return <Chip label="Debit" color="error" sx={baseStyle} />;
      case "refund":
        return <Chip label="Refund" color="info" sx={baseStyle} />;
      default:
        return <Chip label={type} sx={baseStyle} />;
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "20px 10px" }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>📋 Wallet Management</h2>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/Admin/wallet")}
            sx={{ whiteSpace: "nowrap" }}
          >
            Recharge Wallet
          </Button>
        </div>

        {/* Select Dropdown */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, display: "block", color: "#333" }}>
            Select User Type
          </label>
          <FormControl fullWidth variant="outlined" size="medium">
            <Select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setSelectedUser(null);
                setOpenDialog(false);
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                -- Select --
              </MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="CourierCompany">Courier Company</MenuItem>
            </Select>
          </FormControl>
        </div>

        {userType && renderUserList()}

        {/* Wallet Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
          <DialogTitle>
            Wallet of{" "}
            {userType === "Customer"
              ? `${selectedUser?.firstName || ""} ${selectedUser?.lastName || ""}`
              : selectedUser?.companyName || selectedUser?.name}
            <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: 16 }}>
                  💰 Current Balance: ₹{balance?.toFixed(2)}
                </p>

                {/* Make table horizontally scrollable on small screens */}
                <div style={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Type</strong></TableCell>
                        <TableCell><strong>Amount (₹)</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions?.length > 0 ? (
                        transactions.map((tx) => (
                          <TableRow key={tx._id}>
                            <TableCell>{renderTransactionType(tx.type)}</TableCell>
                            <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                            <TableCell>{tx.description || "-"}</TableCell>
                            <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} style={{ textAlign: "center" }}>
                            No transactions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: 26,
    color: "#2c3e50",
    fontWeight: 600,
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
};

export default ShowWallets;
