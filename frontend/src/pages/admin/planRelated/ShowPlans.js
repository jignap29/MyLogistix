// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//     Paper,
//     Box,
//     IconButton,
//     Typography,
//     CircularProgress,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Button,
//     Snackbar,
//     Alert
// } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { getAllPlans, updatePlan } from '../../../redux/planRelated/planHandle';
// import { deletePlan } from '../../../redux/planRelated/planHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import { GreenButton } from '../../../components/buttonStyles';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import styled from 'styled-components';

// const ShowPlans = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { plansList, loading, error } = useSelector((state) => state.plan);
//     const { currentUser } = useSelector(state => state.user);

//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);

//     useEffect(() => {
//         dispatch(getAllPlans());
//     }, [dispatch]);

//     if (error) {
//         console.error(error);
//     }

//     const deleteHandler = (deleteID) => {
//         dispatch(deletePlan(deleteID))
//             .then(() => dispatch(getAllPlans()));
//     };

//     const handleEdit = (plan) => {
//         setSelectedPlan(plan);
//         setOpen(true);
//     };

//     const handleUpdate = () => {
//         if (!selectedPlan) return;

//         dispatch(updatePlan(selectedPlan.id, selectedPlan))
//             .then(() => {
//                 setOpen(false);
//                 setOpenSnackbar(true);
//                 dispatch(getAllPlans());
//             });
//     };

//     const planColumns = [
//         { id: 'planname', label: 'Plan Name', minWidth: 200 },
//         { id: 'amount', label: 'Amount', minWidth: 150 },
//         { id: 'activated', label: 'Activated', minWidth: 100 },
//     ];

//     const planRows = plansList?.map((plan) => ({
//         planname: plan.planname,
//         amount: plan.amount,
//         activated: plan.activated ? 'Yes' : 'No',
//         id: plan._id,
//     }));

//     const PlanButtonHaver = ({ row }) => (
//         <>
//             <IconButton onClick={() => handleEdit(row)}>
//                 <EditIcon color="primary" />
//             </IconButton>
//             <IconButton onClick={() => deleteHandler(row.id)}>
//                 <DeleteIcon color="error" />
//             </IconButton>
//         </>
//     );

//     const actions = [
//         {
//             icon: <NoteAddIcon color="primary" />,
//             name: 'Add New Plan',
//             action: () => navigate("/Admin/addplan")
//         },
//     ];

//     return (
//         <StyledContainer>
//             {loading ? (
//                 <LoaderWrapper>
//                     <CircularProgress size={50} color="primary" />
//                 </LoaderWrapper>
//             ) : (
//                 <>
//                     <StyledHeader>
//                         <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//                             Subscription Plans
//                         </Typography>
//                         <GreenButton variant="contained" onClick={() => navigate("/Admin/addplan")}>Add Plan</GreenButton>
//                     </StyledHeader>

//                     <StyledPaper>
//                         {plansList?.length > 0 ? (
//                             <TableTemplate buttonHaver={PlanButtonHaver} columns={planColumns} rows={planRows} />
//                         ) : (
//                             <NoPlanMessage>No Plans available</NoPlanMessage>
//                         )}
//                     </StyledPaper>

//                     <SpeedDialTemplate actions={actions} />

//                     {/* 🟢 Edit Plan Modal */}
//                     <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
//                         <DialogTitle>Edit Plan</DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 fullWidth margin="dense" label="Plan Name"
//                                 value={selectedPlan?.planname || ""}
//                                 onChange={(e) => setSelectedPlan({ ...selectedPlan, planname: e.target.value })}
//                             />
//                             <TextField
//                                 fullWidth margin="dense" label="Amount" type="number"
//                                 value={selectedPlan?.amount || ""}
//                                 onChange={(e) => setSelectedPlan({ ...selectedPlan, amount: e.target.value })}
//                             />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setOpen(false)}>Cancel</Button>
//                             <Button onClick={handleUpdate} color="primary">Update</Button>
//                         </DialogActions>
//                     </Dialog>

//                     {/* ✅ Snackbar Popup for Successful Update */}
//                     <Snackbar
//                         open={openSnackbar}
//                         autoHideDuration={3000} 
//                         onClose={() => setOpenSnackbar(false)}
//                         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//                     >
//                         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
//                             Plan updated successfully!
//                         </Alert>
//                     </Snackbar>
//                 </>
//             )}
//         </StyledContainer>
//     );
// };

// export default ShowPlans;

// // 🔹 Styled Components
// const StyledContainer = styled(Box)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const StyledHeader = styled(Box)`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   margin-bottom: 20px;
// `;

// const StyledPaper = styled(Paper)`
//   width: 100%;
//   max-width: 1500px;
//   overflow: hidden;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(10px);
//   padding: 20px;
// `;

// const NoPlanMessage = styled(Typography)`
//   text-align: center;
//   font-size: 1.2rem;
//   color: white;
//   padding: 20px;
// `;

// const LoaderWrapper = styled(Box)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// ShowPlans.jsx


// // ✅ Fixed: Safe map, only required columns, view button, full plan edit
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//     Paper, Box, IconButton, Typography, CircularProgress,
//     Dialog, DialogActions, DialogContent, DialogTitle,
//     TextField, Button, Snackbar, Alert
// } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { getAllPlans, updatePlan, deletePlan } from '../../../redux/planRelated/planHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import { GreenButton } from '../../../components/buttonStyles';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import styled from 'styled-components';

// const ShowPlans = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { plansList = [], loading } = useSelector((state) => state.plan);

//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [openEdit, setOpenEdit] = useState(false);
//     const [openView, setOpenView] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);

//     useEffect(() => {
//         dispatch(getAllPlans());
//     }, [dispatch]);

//     const deleteHandler = (deleteID) => {
//         dispatch(deletePlan(deleteID)).then(() => dispatch(getAllPlans()));
//     };

//     const handleEdit = (plan) => {
//         setSelectedPlan(plan);
//         setOpenEdit(true);
//     };

//     const handleView = (plan) => {
//         setSelectedPlan(plan);
//         setOpenView(true);
//     };

//     const handleUpdate = () => {
//         if (!selectedPlan) return;
//         dispatch(updatePlan(selectedPlan._id, selectedPlan)).then(() => {
//             setOpenEdit(false);
//             setOpenSnackbar(true);
//             dispatch(getAllPlans());
//         });
//     };

//     const planColumns = [
//         { id: 'name', label: 'Plan Name', minWidth: 150 },
//         { id: 'price', label: 'Price', minWidth: 100 },
//         { id: 'baseRate', label: 'Base Rate', minWidth: 100 },
//         { id: 'docketCharge', label: 'Docket Charge', minWidth: 100 },
//     ];

//     const planRows = Array.isArray(plansList)
//         ? plansList.map((plan) => ({
//             ...plan,
//             id: plan._id
//         }))
//         : [];

//     const PlanButtonHaver = ({ row }) => (
//         <>
//             <IconButton onClick={() => handleView(row)}>
//                 <VisibilityIcon color="primary" />
//             </IconButton>
//             <IconButton onClick={() => handleEdit(row)}>
//                 <EditIcon color="secondary" />
//             </IconButton>
//             <IconButton onClick={() => deleteHandler(row.id)}>
//                 <DeleteIcon color="error" />
//             </IconButton>
//         </>
//     );

//     const actions = [
//         {
//             icon: <NoteAddIcon color="primary" />,
//             name: 'Add New Plan',
//             action: () => navigate("/Admin/addplan")
//         },
//     ];

//     return (
//         <StyledContainer>
//             {loading ? (
//                 <LoaderWrapper>
//                     <CircularProgress size={50} color="primary" />
//                 </LoaderWrapper>
//             ) : (
//                 <>
//                     <StyledHeader>
//                         <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//                             Subscription Plans
//                         </Typography>
//                         <GreenButton variant="contained" onClick={() => navigate("/Admin/addplan")}>Add Plan</GreenButton>
//                     </StyledHeader>
//                     <StyledPaper>
//                         {planRows.length > 0 ? (
//                             <TableTemplate buttonHaver={PlanButtonHaver} columns={planColumns} rows={planRows} />
//                         ) : (
//                             <NoPlanMessage>There is No Plan</NoPlanMessage>
//                         )}
//                     </StyledPaper>
//                     <SpeedDialTemplate actions={actions} />

//                     {/* Edit Dialog */}
//                     <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
//                         <DialogTitle>Edit Plan</DialogTitle>
//                         <DialogContent>
//                             {Object.keys(selectedPlan || {}).map((key) => (
//                                 key !== '_id' && (
//                                     <TextField
//                                         key={key}
//                                         fullWidth
//                                         margin="dense"
//                                         label={key}
//                                         value={selectedPlan[key] || ''}
//                                         onChange={(e) => setSelectedPlan({ ...selectedPlan, [key]: e.target.value })}
//                                     />
//                                 )
//                             ))}
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
//                             <Button onClick={handleUpdate} color="primary">Update</Button>
//                         </DialogActions>
//                     </Dialog>

//                     {/* View Dialog */}
//                     <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth>
//                         <DialogTitle>Plan Details</DialogTitle>
//                         <DialogContent>
//                             {selectedPlan && Object.entries(selectedPlan).map(([key, value]) => (
//                                 <Typography key={key} variant="body2" gutterBottom>
//                                     <strong>{key}:</strong> {String(value)}
//                                 </Typography>
//                             ))}
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setOpenView(false)}>Close</Button>
//                         </DialogActions>
//                     </Dialog>

//                     <Snackbar
//                         open={openSnackbar}
//                         autoHideDuration={3000}
//                         onClose={() => setOpenSnackbar(false)}
//                         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//                     >
//                         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
//                             Plan updated successfully!
//                         </Alert>
//                     </Snackbar>
//                 </>
//             )}
//         </StyledContainer>
//     );
// };

// export default ShowPlans;

// const StyledContainer = styled(Box)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const LoaderWrapper = styled(Box)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// const StyledHeader = styled(Box)`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   margin-bottom: 20px;
// `;

// const StyledPaper = styled(Paper)`
//   width: 100%;
//   max-width: 1500px;
//   overflow: hidden;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(10px);
//   padding: 20px;
// `;

// const NoPlanMessage = styled(Typography)`
//   text-align: center;
//   font-size: 1.2rem;
//   color: white;
//   padding: 20px;
// `;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPlans, deletePlan, updatePlan } from '../../../redux/planRelated/planHandle';
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  InputLabel,
  Input,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styled from 'styled-components';

const ShowPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plansList, loading } = useSelector((state) => state.plan);

  const [viewPlan, setViewPlan] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePlan(id)).then(() => dispatch(getAllPlans()));
  };

  const handleEditClick = (plan) => {
    setEditPlan(plan);
    setEditedValues(plan);
  };

  const handleChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await dispatch(updatePlan(editPlan._id, editedValues));
      setEditPlan(null);
      dispatch(getAllPlans());
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const renderTable = () => {
    if (loading) {
      return <LoaderContainer><CircularProgress /></LoaderContainer>;
    }

    if (!Array.isArray(plansList)) {
      return <p>❌ Invalid data format. Expected an array of plans.</p>;
    }

    if (plansList.length === 0) {
      return <p>No plans found.</p>;
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Base Rate</th>
            <th>Docket %</th>
            {/* <th>ODA</th>
            <th>Users</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plansList.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.name}</td>
              <td>₹{plan.price}</td>
              <td>₹{plan.baseRate}</td>
              <td>{plan.docketCharge}%</td>
              {/* <td>₹{plan.odaCharge}</td>
              <td>{plan.additionalUsers}</td> */}
              <td>{plan.isActive ? "✅ Active" : "❌ Inactive"}</td>
              <td>
                <IconButton onClick={() => setViewPlan(plan)}><VisibilityIcon color="primary" /></IconButton>
                <IconButton onClick={() => handleEditClick(plan)}><EditIcon color="secondary" /></IconButton>
                <IconButton onClick={() => handleDelete(plan._id)}><DeleteIcon color="error" /></IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h2>📦 Subscription Plans</h2>
        <AddButton onClick={() => navigate('/Admin/addplan')}>+ Add Plan</AddButton>
      </Header>

      {renderTable()}

      {/* View Dialog */}
      <Dialog open={!!viewPlan} onClose={() => setViewPlan(null)} fullWidth>
        <DialogTitle>Plan Details</DialogTitle>
        <DialogContent>
          {/* {viewPlan && Object.entries(viewPlan).map(([key, value]) => (
            <Typography key={key}><strong>{key}:</strong> {String(value)}</Typography>
          ))} */}
          {viewPlan &&
  Object.entries(viewPlan)
    .filter(([key]) => key !== '_id' && key !== '__v')
    .map(([key, value]) => (
      <Typography key={key}>
        <strong>{key}:</strong> {String(value)}
      </Typography>
    ))}

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPlan(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editPlan} onClose={() => setEditPlan(null)} fullWidth>
        <DialogTitle>Edit Plan</DialogTitle>
        <DialogContent>
          {editPlan && (
            <>
              <InputLabel>Name</InputLabel>
              <Input name="name" value={editedValues.name || ''} onChange={handleChange} fullWidth />

              <InputLabel>Price</InputLabel>
              <Input name="price" type="number" value={editedValues.price || ''} onChange={handleChange} fullWidth />

              <InputLabel>Base Rate</InputLabel>
              <Input name="baseRate" type="number" value={editedValues.baseRate || ''} onChange={handleChange} fullWidth />

              <InputLabel>Docket %</InputLabel>
              <Input name="docketCharge" type="number" value={editedValues.docketCharge || ''} onChange={handleChange} fullWidth />

              <InputLabel>ODA Charge</InputLabel>
              <Input name="odaCharge" type="number" value={editedValues.odaCharge || ''} onChange={handleChange} fullWidth />

              <InputLabel>Additional Users</InputLabel>
              <Input name="additionalUsers" type="number" value={editedValues.additionalUsers || ''} onChange={handleChange} fullWidth />

              <div style={{ marginTop: '1rem' }}>
                <InputLabel>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editedValues.isActive || false}
                    onChange={handleCheckboxChange}
                  />
                  {' '}Is Active
                </InputLabel>

                <InputLabel>
                  <input
                    type="checkbox"
                    name="ndrCallSetup"
                    checked={editedValues.ndrCallSetup || false}
                    onChange={handleCheckboxChange}
                  />
                  {' '}NDR Call Setup
                </InputLabel>

                <InputLabel>
                  <input
                    type="checkbox"
                    name="autoTrackSetup"
                    checked={editedValues.autoTrackSetup || false}
                    onChange={handleCheckboxChange}
                  />
                  {' '}Auto Track Setup
                </InputLabel>

                <InputLabel>
                  <input
                    type="checkbox"
                    name="courierPrioritySetup"
                    checked={editedValues.courierPrioritySetup || false}
                    onChange={handleCheckboxChange}
                  />
                  {' '}Courier Priority Setup
                </InputLabel>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPlan(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ShowPlans;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-weight: 600;
    color: #343a40;
  }
`;

const AddButton = styled.button`
  background-color: #339af0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1c7ed6;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;
