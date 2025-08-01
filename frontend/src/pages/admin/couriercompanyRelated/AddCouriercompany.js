import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourierCompany } from '../../../redux/couriercompanyRelated/couriercompanyHandle';
import { underControl } from '../../../redux/couriercompanyRelated/couriercompanySlice';
import { getAllPlans } from '../../../redux/planRelated/planHandle';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCourierCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.couriercompany);
  const { plansList, loading: planLoading } = useSelector((state) => state.plan);

  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    companyName: '',
    gstNo: '',
    panCardNo: '',
    aadharNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    remittancePreference: '',
    codPlan: '',
    shippingPlan: '', // ⬅️ Plan will be set from dropdown
    bankHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [files, setFiles] = useState({
    companyLogo: null,
    cancelledChequeImage: null,
    idProof: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

 


  useEffect(() => {
    if (status === 'added') {
      setMessage("Courier company added successfully ✅");
      setLoading(false);
      setErrors({});
      setTimeout(() => {
        navigate('/Admin/couriercompanys');
        dispatch(underControl());
      }, 1500);
    } else if (status === 'updated') {
      setMessage("Courier company updated successfully ✅");
      setLoading(false);
      setErrors({});
      setTimeout(() => {
        navigate('/Admin/couriercompanys');
        dispatch(underControl());
      }, 1500);
    } else if (status === 'error') {
      setLoading(false);
      if (error && typeof error === 'object' && !Array.isArray(error)) {
        setErrors(error);
        setMessage("");
      } else {
        setMessage(error || "Something went wrong");
      }
    }
  }, [status, navigate, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({ ...files, [name]: selectedFiles[0] });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateFields = () => {
    const errors = {};
    const requiredFields = [
      "name", "contactNo", "companyName", "gstNo", "panCardNo",
      "aadharNo", "address", "city", "state", "pincode",
      "remittancePreference", "codPlan", "shippingPlan", "bankHolderName",
      "bankName", "accountNumber", "ifscCode"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field} is required.`;
      }
    });

    if (!files.companyLogo) errors.companyLogo = "Company Logo is required.";
    if (!files.cancelledChequeImage) errors.cancelledChequeImage = "Cancelled Cheque is required.";
    if (!files.idProof) errors.idProof = "ID Proof is required.";

    if (formData.contactNo && !/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = "Contact No must be a valid 10-digit number.";
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be a valid 6-digit number.";
    }

    if (formData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      errors.ifscCode = "IFSC Code must be valid.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    const clientErrors = validateFields();

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setLoading(false);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    Object.entries(files).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    const { success, errors: serverErrors } = await dispatch(createCourierCompany(payload));

    if (success) {
      setMessage("Courier Company added successfully ✅");
    } else {
      const formattedErrors = {};
      if (typeof serverErrors === 'object') {
        Object.entries(serverErrors).forEach(([field, val]) => {
          formattedErrors[field] = val;
        });
      } else {
        formattedErrors.general = "Something went wrong.";
      }
      setErrors(formattedErrors);
    }

    setLoading(false);
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Add Courier Company 🚚</Title>

        {errors.general && <ErrorMsg>{errors.general}</ErrorMsg>}

        <InputRow>
          <InputGroup>
            <Label>Name</Label>
            <StyledInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              hasError={!!errors.name}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Contact No</Label>
            <StyledInput
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              hasError={!!errors.contactNo}
            />

            {errors.contactNo && <FieldError>{errors.contactNo}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Company Name</Label>
            <StyledInput
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              hasError={!!errors.companyName}
            />
            {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>GST No</Label>
            <StyledInput
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
              hasError={!!errors.gstNo}
            />
            {errors.gstNo && <FieldError>{errors.gstNo}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>PAN Card No</Label>
            <StyledInput
              name="panCardNo"
              value={formData.panCardNo}
              onChange={handleChange}
              hasError={!!errors.panCardNo}
            />
            {errors.panCardNo && <FieldError>{errors.panCardNo}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Aadhar No</Label>
            <StyledInput
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              hasError={!!errors.aadharNo}
            />
            {errors.aadharNo && <FieldError>{errors.aadharNo}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Address</Label>
            <StyledInput
              name="address"
              value={formData.address}
              onChange={handleChange}
              hasError={!!errors.address}
            />
            {errors.address && <FieldError>{errors.address}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>City</Label>
            <StyledInput
              name="city"
              value={formData.city}
              onChange={handleChange}
              hasError={!!errors.city}
            />
            {errors.city && <FieldError>{errors.city}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>State</Label>
            <StyledInput
              name="state"
              value={formData.state}
              onChange={handleChange}
              hasError={!!errors.state}
            />
            {errors.state && <FieldError>{errors.state}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Pincode</Label>
            <StyledInput
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              hasError={!!errors.pincode}
            />
            {errors.pincode && <FieldError>{errors.pincode}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Remittance Preference</Label>
            <StyledInput
              name="remittancePreference"
              value={formData.remittancePreference}
              onChange={handleChange}
              hasError={!!errors.remittancePreference}
            />
            {errors.remittancePreference && <FieldError>{errors.remittancePreference}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>COD Plan</Label>
            <StyledInput
              name="codPlan"
              value={formData.codPlan}
              onChange={handleChange}
              hasError={!!errors.codPlan}
            />
            {errors.codPlan && <FieldError>{errors.codPlan}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Shipping Plan</Label>
            <Select
              name="shippingPlan"
              value={formData.shippingPlan}
              onChange={handleChange}
              hasError={!!errors.shippingPlan}
            >
              <option value="">Select a plan</option>
              {planLoading ? (
                <option disabled>Loading plans...</option>
              ) : plansList.length > 0 ? (
                plansList.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.name}
                  </option>
                ))
              ) : (
                <option disabled>No plans found</option>
              )}

            </Select>
            {errors.shippingPlan && <FieldError>{errors.shippingPlan}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Bank Holder Name</Label>
            <StyledInput
              name="bankHolderName"
              value={formData.bankHolderName}
              onChange={handleChange}
              hasError={!!errors.bankHolderName}
            />
            {errors.bankHolderName && <FieldError>{errors.bankHolderName}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Bank Name</Label>
            <StyledInput
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              hasError={!!errors.bankName}
            />
            {errors.bankName && <FieldError>{errors.bankName}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Account Number</Label>
            <StyledInput
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              hasError={!!errors.accountNumber}
            />
            {errors.accountNumber && <FieldError>{errors.accountNumber}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>IFSC Code</Label>
            <StyledInput
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              hasError={!!errors.ifscCode}
            />
            {errors.ifscCode && <FieldError>{errors.ifscCode}</FieldError>}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Company Logo</Label>
            <StyledInput
              type="file"
              name="companyLogo"
              onChange={handleFileChange}
              hasError={!!errors.companyLogo}
            />
            {errors.companyLogo && <FieldError>{errors.companyLogo}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>Cancelled Cheque</Label>
            <StyledInput
              type="file"
              name="cancelledChequeImage"
              onChange={handleFileChange}
              hasError={!!errors.cancelledChequeImage}
            />
            {errors.cancelledChequeImage && <FieldError>{errors.cancelledChequeImage}</FieldError>}
          </InputGroup>
          <InputGroup>
            <Label>ID Proof</Label>
            <StyledInput
              type="file"
              name="idProof"
              onChange={handleFileChange}
              hasError={!!errors.idProof}
            />
            {errors.idProof && <FieldError>{errors.idProof}</FieldError>}
          </InputGroup>
        </InputRow>

        <StyledButton type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Courier Company"}
        </StyledButton>

        {message && <MessageText error={status === 'error'}>{message}</MessageText>}

      </StyledForm>
    </StyledContainer>
  );
};

export default AddCourierCompany;

// ✅ STYLES – Do not change
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  min-height: 100vh;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
`;

const StyledForm = styled.form`
  margin-top: 50px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-top: -80px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin-top: -40px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  margin-top:30px;
  font-weight: 600;
  color: #343a40;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
  text-align: center;
`;

const FieldError = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    min-width: 100%;
  }
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
  transition: border 0.3s ease;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }
`;

const StyledButton = styled.button`
  margin-top: 20px;
  background: #339af0;
  color: white;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1c7ed6;
  }

  &:disabled {
    background: #74c0fc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ced4da')};
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s ease;
  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#339af0')};
    outline: none;
  }
`;