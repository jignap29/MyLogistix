import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../../../redux/appointmentRelated/appointmentHandle';
import { getAllOrders } from '../../../redux/orderRelated/orderHandel';
import { Paper, Typography, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../../redux/appointmentRelated/appointmentSlice';
import { underControl } from '../../../redux/appointmentRelated/appointmentSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const generateTimeSlots = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

const AddAppointment = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { status } = useSelector((state) => state.appointment);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { successMessage, error } = useSelector((state) => state.appointment);


  const [formData, setFormData] = useState({
    lrNo: '',
    appointmentDate: '',
    startTime: '',
    endTime: '',
    appointmentId: '',
    poNumber: '',
    asn: '',
    poCopy: null,
  });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  //  useEffect(() => {
  //   if (status === 'added' || status === 'updated') {
  //     setMessage(`Appointment ${status === 'added' ? 'added' : 'updated'} successfully ✅`);
  //     setLoader(false);
  //     setErrors({});
  //     setTimeout(() => {
  //       navigate('/Admin/appointments');
  //       dispatch(underControl());  // you can define this action in your slice if not yet
  //     }, 1500);
  //   } else if (status === 'error') {
  //     setLoader(false);
  //     if (error && typeof error === 'object' && !Array.isArray(error)) {
  //       setErrors(error);
  //       setMessage("");
  //     } else {
  //       setMessage(error || "Something went wrong");
  //     }
  //   }
  // }, [status, navigate, error, dispatch]);


  useEffect(() => {
    if (successMessage) {
      // message will be shown by <MessageText>
      const timer = setTimeout(() => {
        dispatch(resetState());
        navigate('/Admin/ShowAppointments');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, navigate]);






  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.lrNo) newErrors.lrNo = 'LR No is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start Time is required';
    if (!formData.endTime) newErrors.endTime = 'End Time is required';
    if (!formData.poNumber.trim()) newErrors.poNumber = 'PO Number is required';
    if (!formData.asn.trim()) newErrors.asn = 'ASN is required';
    if (!formData.poCopy) newErrors.poCopy = 'PO Copy is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoader(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    dispatch(addAppointment(data));
  };

  const timeSlots = generateTimeSlots();

  return (
    <StyledContainer>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add Appointment
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <InputRow>
            <InputGroup>
              <Label>LR No (Order ID)</Label>
              <StyledSelect name="lrNo" value={formData.lrNo} onChange={handleChange} hasError={!!errors.lrNo}>
                <option value="">Select LR No</option>
                {orders.map((order) => (
                  <option key={order._id} value={order.orderId}>
                    {order.orderId}
                  </option>
                ))}
              </StyledSelect>
              {errors.lrNo && <ErrorText>{errors.lrNo}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>Appointment Date</Label>
              <StyledInput
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                hasError={!!errors.appointmentDate}
              />
              {errors.appointmentDate && <ErrorText>{errors.appointmentDate}</ErrorText>}
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <Label>Start Time</Label>
              <StyledSelect name="startTime" value={formData.startTime} onChange={handleChange} hasError={!!errors.startTime}>
                <option value="">Select Start Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </StyledSelect>
              {errors.startTime && <ErrorText>{errors.startTime}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>End Time</Label>
              <StyledSelect name="endTime" value={formData.endTime} onChange={handleChange} hasError={!!errors.endTime}>
                <option value="">Select End Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </StyledSelect>
              {errors.endTime && <ErrorText>{errors.endTime}</ErrorText>}
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <Label>Appointment ID</Label>
              <StyledInput
                name="appointmentId"
                value={formData.appointmentId}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label>PO Number</Label>
              <StyledInput
                name="poNumber"
                value={formData.poNumber}
                onChange={handleChange}
                hasError={!!errors.poNumber}
              />
              {errors.poNumber && <ErrorText>{errors.poNumber}</ErrorText>}
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <Label>ASN</Label>
              <StyledInput
                name="asn"
                value={formData.asn}
                onChange={handleChange}
                hasError={!!errors.asn}
              />
              {errors.asn && <ErrorText>{errors.asn}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>PO Copy</Label>
              <StyledInput
                type="file"
                name="poCopy"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                hasError={!!errors.poCopy}
              />
              {formData.poCopy && typeof formData.poCopy === 'object' && (
                <small>{formData.poCopy.name}</small>
              )}
              {errors.poCopy && <ErrorText>{errors.poCopy}</ErrorText>}
            </InputGroup>
          </InputRow>

          <StyledButton type="submit" disabled={loader}>
            Submit
          </StyledButton>


          {message && <MessageText error={status === 'error'}>{message}</MessageText>}
        </form>
      </Paper>

      {successMessage && (
        <MessageText error={false}>
          {successMessage}
        </MessageText>
      )}

      {error && (
        <MessageText error={true}>
          {typeof error === 'string' ? error : error.message || 'Something went wrong'}
        </MessageText>
      )}


    </StyledContainer>




  );
};

export default AddAppointment;

// === STYLES ===

const StyledContainer = styled.div`
  padding: 2rem;
  background: #ffffff;
  min-height: 100vh;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #495057;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }
`;

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }
`;

const StyledButton = styled.button`
  margin-top: 30px;
  background: #339af0;
  color: white;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #1c7ed6;
  }

  &:disabled {
    background: #74c0fc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
`;

