import { createCourierRate } from '../../../redux/courierrateRelated/courierrateHandle';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const AddCourierRate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    serviceType: '',
    mode: '',
    minWeight: '',
    zoneA_upto: '',
    zoneA_additional: '',
    zoneB_upto: '',
    zoneB_additional: '',
    zoneC1_upto: '',
    zoneC1_additional: '',
    zoneC2_upto: '',
    zoneC2_additional: '',
    zoneD1_upto: '',
    zoneD1_additional: '',
    zoneD2_upto: '',
    zoneD2_additional: '',
    zoneE_upto: '',
    zoneE_additional: '',
    zoneF_upto: '',
    zoneF_additional: '',
    codCharge_charge: '',
    codCharge_percentage: '',
    fuelSurcharge: '',
  });

  const [companiesLogo, setCompaniesLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompaniesLogo(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage('');
    setSubmissionError('');
    setLoading(true);

    const errors = [];
    for (const key in formData) {
      if (formData[key].trim() === '') {
        errors.push(`${key} is required.`);
      }
    }
    if (!companiesLogo) errors.push('Company logo is required.');

    if (errors.length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    form.append('companiesLogo', companiesLogo);

    dispatch(createCourierRate(form))
      .then(() => {
        setLoading(false);
        setSuccessMessage('Courier rate added successfully ✅');
        setTimeout(() => {
          navigate('/admin/courierrates');
        }, 1500);
      })
      .catch(() => {
        setLoading(false);
        setSubmissionError('Something went wrong ❌');
      });
  };

  const serviceTypes = ['Small', 'Surface', 'Large', 'Express', '10KG', 'Heavy', 'Air'];
  const modes = ['Surface', 'Air'];

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Add Courier Rate 📦</Title>

        {errorMessages.length > 0 && (
          <ErrorMessages>
            {errorMessages.map((msg, idx) => (
              <ErrorMsg key={idx}>{msg}</ErrorMsg>
            ))}
          </ErrorMessages>
        )}

        <InputGroup>
          <Label>Courier Company</Label>
          <StyledInput
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </InputGroup>

        <InputRow>
          <InputGroup>
            <Label>Service Type</Label>
            <StyledSelect name="serviceType" onChange={handleChange}>
              <option value="">Select</option>
              {serviceTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </StyledSelect>
          </InputGroup>
          <InputGroup>
            <Label>Mode</Label>
            <StyledSelect name="mode" onChange={handleChange}>
              <option value="">Select</option>
              {modes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </StyledSelect>
          </InputGroup>
          <InputGroup>
            <Label>Minimum Weight</Label>
            <StyledInput name="minWeight" onChange={handleChange} />
          </InputGroup>
        </InputRow>

        {['A', 'B', 'C1', 'C2', 'D1', 'D2', 'E', 'F'].map((zone) => (
          <InputRow key={zone}>
            <InputGroup>
              <Label>Zone {zone} - Upto Rate</Label>
              <StyledInput name={`zone${zone}_upto`} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Zone {zone} - Additional Rate</Label>
              <StyledInput name={`zone${zone}_additional`} onChange={handleChange} />
            </InputGroup>
          </InputRow>
        ))}

        <InputRow>
          <InputGroup>
            <Label>COD Charge (₹)</Label>
            <StyledInput name="codCharge_charge" onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label>COD Percentage (%)</Label>
            <StyledInput name="codCharge_percentage" onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label>Fuel Surcharge (%)</Label>
            <StyledInput name="fuelSurcharge" onChange={handleChange} />
          </InputGroup>
        </InputRow>

        <InputGroup>
          <Label>Company Logo</Label>
          <StyledInput type="file" name="companiesLogo" onChange={handleFileChange} />
          {previewLogo && <ImagePreview src={previewLogo} alt="Logo Preview" />}
        </InputGroup>

        <StyledButton type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Courier Rate'}
        </StyledButton>

        {successMessage && <BottomMessage>{successMessage}</BottomMessage>}
        {submissionError && <BottomMessage error>{submissionError}</BottomMessage>}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddCourierRate;

// ✅ STYLES — Don't change unless necessary
const StyledContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
`;

const StyledForm = styled.form`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 700;
  color: #2f3e46;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #495057;
`;

const StyledInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;

  &:focus {
    border-color: #339af0;
    outline: none;
    box-shadow: 0 0 0 2px rgba(51, 154, 240, 0.15);
  }
`;

const StyledSelect = styled.select`
  padding: 12px 14px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;

  &:focus {
    border-color: #339af0;
    outline: none;
    box-shadow: 0 0 0 2px rgba(51, 154, 240, 0.15);
  }
`;

const StyledButton = styled.button`
  margin-top: 32px;
  background: #1976d2;
  color: white;
  font-weight: 600;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #1565c0;
  }

  &:disabled {
    background: #90caf9;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.img`
  margin-top: 12px;
  max-height: 120px;
  object-fit: contain;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const ErrorMessages = styled.div`
  margin-bottom: 24px;
  padding: 12px;
  background: #ffe6e6;
  color: #c92a2a;
  border-radius: 8px;
  border: 1px solid #ffa8a8;
`;

const ErrorMsg = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

const BottomMessage = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  color: ${({ error }) => (error ? '#d32f2f' : '#2e7d32')};
`;
