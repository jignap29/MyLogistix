// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addStuff } from '../../../redux/userRelated/userHandle';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { CircularProgress } from '@mui/material';
// import Popup from '../../../components/Popup';
// import styled from 'styled-components';

// const AddPlan = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, response, error } = useSelector(state => state.user);

//   const [planname, setPlanName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [activated, setActivated] = useState(true);
//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   const fields = { planname, amount, activated };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setLoader(true);
//     dispatch(addStuff(fields, "Plan"));
//   };

//   useEffect(() => {
//     if (status === 'added') {
//       navigate('/Admin/plans');
//       dispatch(underControl());
//     } else if (status === 'error') {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, navigate, error, response, dispatch]);

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={submitHandler}>
//         <Title>Add Plan 📜</Title>

//         <Label>Plan Name</Label>
//         <StyledInput type="text" value={planname} onChange={(e) => setPlanName(e.target.value)} required />

//         <Label>Amount</Label>
//         <StyledInput type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

//         <Label>Activated</Label>
//         <StyledCheckbox type="checkbox" checked={activated} onChange={(e) => setActivated(e.target.checked)} />

//         <StyledButton type="submit" disabled={loader}>
//           {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Plan'}
//         </StyledButton>
//       </StyledForm>
//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };

// export default AddPlan;

// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f8f9fa;
// `;

// const StyledForm = styled.form`
//   background: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 400px;
//   display: flex;
//   flex-direction: column;
//   position: absolute;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   margin-top: 10px;
// `;

// const StyledInput = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: 100%;
// `;

// const StyledCheckbox = styled.input`
//   margin-top: 5px;
// `;

// const StyledButton = styled.button`
//   background: #007bff;
//   color: white;
//   padding: 10px;
//   margin-top: 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background: #0056b3;
//   }
// `;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addStuff, updateUser } from '../../../redux/userRelated/userHandle';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { CircularProgress } from '@mui/material';
// import Popup from '../../../components/Popup';
// import styled from 'styled-components';

// const AddPlan = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { status, response, error } = useSelector(state => state.user);

//   const [plan, setPlan] = useState({
//     name: '',
//     baseRate: '',
//     docketCharge: '',
//     minCharge: '',
//     ODA: '',
//     appointmentDeliveries: '',
//     integrations: false,
//     whatsappUpdates: false,
//     prioritySupport: false,
//     freeNDRCallSetup: false,
//     additionalUser: '',
//   });
//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (status === 'added' || status === 'updated') {
//       navigate('/Admin/plans');
//       dispatch(underControl());
//     } else if (status === 'error') {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, navigate, error, response, dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPlan(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setLoader(true);
//     if (id) {
//       dispatch(updateUser(id, plan, "Plan"));
//     } else {
//       dispatch(addStuff(plan, "Plan"));
//     }
//   };

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={submitHandler}>
//         <Title>{id ? "Update Plan ✏️" : "Add Plan 📜"}</Title>

//         <Label>Plan Name</Label>
//         <StyledInput type="text" name="name" value={plan.name} onChange={handleChange} required />

//         <Label>Base Rate</Label>
//         <StyledInput type="number" name="baseRate" value={plan.baseRate} onChange={handleChange} required />

//         <Label>Docket Charge</Label>
//         <StyledInput type="number" name="docketCharge" value={plan.docketCharge} onChange={handleChange} required />

//         <Label>Minimum Charge</Label>
//         <StyledInput type="number" name="minCharge" value={plan.minCharge} onChange={handleChange} required />

//         <Label>ODA</Label>
//         <StyledInput type="number" name="ODA" value={plan.ODA} onChange={handleChange} required />

//         <Label>Appointment Deliveries</Label>
//         <StyledInput type="number" name="appointmentDeliveries" value={plan.appointmentDeliveries} onChange={handleChange} required />

//         <Label>Integrations</Label>
//         <StyledCheckbox type="checkbox" name="integrations" checked={plan.integrations} onChange={handleChange} />

//         <Label>WhatsApp Updates</Label>
//         <StyledCheckbox type="checkbox" name="whatsappUpdates" checked={plan.whatsappUpdates} onChange={handleChange} />

//         <Label>Priority Support</Label>
//         <StyledCheckbox type="checkbox" name="prioritySupport" checked={plan.prioritySupport} onChange={handleChange} />

//         <Label>Free NDR Call Setup</Label>
//         <StyledCheckbox type="checkbox" name="freeNDRCallSetup" checked={plan.freeNDRCallSetup} onChange={handleChange} />

//         <Label>Additional User</Label>
//         <StyledInput type="number" name="additionalUser" value={plan.additionalUser} onChange={handleChange} required />

//         <StyledButton type="submit" disabled={loader}>
//           {loader ? <CircularProgress size={24} color="inherit" /> : id ? "Update Plan" : "Add Plan"}
//         </StyledButton>
//       </StyledForm>
//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };

// export default AddPlan;

// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f8f9fa;
// `;

// const StyledForm = styled.form`
//   background: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 400px;
//   display: flex;
//   flex-direction: column;
//   position: absolute;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   margin-top: 10px;
// `;

// const StyledInput = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: 100%;
// `;

// const StyledCheckbox = styled.input`
//   margin-top: 5px;
// `;

// const StyledButton = styled.button`
//   background: #007bff;
//   color: white;
//   padding: 10px;
//   margin-top: 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background: #0056b3;
//   }
// `;





// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addStuff, updateUser } from '../../../redux/userRelated/userHandle';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { CircularProgress } from '@mui/material';
// import Popup from '../../../components/Popup';
// import styled from 'styled-components';

// const AddPlan = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { status, response, error } = useSelector(state => state.user);

//   const [plan, setPlan] = useState({
//     name: '',
//     price: '',
//     baseRate: '',
//     docketCharge: '',
//     minCharge: '',
//     odaCharge: '',
//     appointmentDeliveries: '',
//     integrations: false,
//     whatsappUpdates: false,
//     prioritySupport: false,
//     ndrCallSetup: false,
//     additionalUsers: '',
//   });

//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (status === 'added' || status === 'updated') {
//       navigate('/Admin/plans');
//       dispatch(underControl());
//     } else if (status === 'error') {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, navigate, error, response, dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPlan(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setLoader(true);
//     if (id) {
//       dispatch(updateUser(id, plan, "Plan"));
//     } else {
//       dispatch(addStuff(plan, "Plan"));
//     }
//   };

//   return (
//     <StyledContainer>
//       <StyledForm onSubmit={submitHandler}>
//         <Title>{id ? "Update Plan ✏️" : "Add Plan 📜"}</Title>

//         <InputRow>
//           <InputGroup>
//             <Label>Plan Name</Label>
//             <StyledInput type="text" name="name" value={plan.name} onChange={handleChange} required />
//           </InputGroup>
//           <InputGroup>
//             <Label>Price (₹)</Label>
//             <StyledInput type="number" name="price" value={plan.price} onChange={handleChange} required />
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>Base Rate (₹)</Label>
//             <StyledInput type="number" name="baseRate" value={plan.baseRate} onChange={handleChange} required />
//           </InputGroup>
//           <InputGroup>
//             <Label>Docket Charge (%)</Label>
//             <StyledInput type="number" name="docketCharge" value={plan.docketCharge} onChange={handleChange} required />
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>Minimum Charge (₹)</Label>
//             <StyledInput type="number" name="minCharge" value={plan.minCharge} onChange={handleChange} required />
//           </InputGroup>
//           <InputGroup>
//             <Label>ODA Charge (₹)</Label>
//             <StyledInput type="number" name="odaCharge" value={plan.odaCharge} onChange={handleChange} required />
//           </InputGroup>
//         </InputRow>

//         <InputRow>
//           <InputGroup>
//             <Label>Appointment Deliveries (₹)</Label>
//             <StyledInput type="number" name="appointmentDeliveries" value={plan.appointmentDeliveries} onChange={handleChange} required />
//           </InputGroup>
//           <InputGroup>
//             <Label>Additional Users</Label>
//             <StyledInput type="number" name="additionalUsers" value={plan.additionalUsers} onChange={handleChange} required />
//           </InputGroup>
//         </InputRow>

//         <CheckboxRow>
//           <CheckboxGroup>
//             <StyledCheckbox type="checkbox" name="integrations" checked={plan.integrations} onChange={handleChange} />
//             <Label>Integrations</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <StyledCheckbox type="checkbox" name="whatsappUpdates" checked={plan.whatsappUpdates} onChange={handleChange} />
//             <Label>WhatsApp Updates</Label>
//           </CheckboxGroup>
//         </CheckboxRow>

//         <CheckboxRow>
//           <CheckboxGroup>
//             <StyledCheckbox type="checkbox" name="prioritySupport" checked={plan.prioritySupport} onChange={handleChange} />
//             <Label>Priority Support</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <StyledCheckbox type="checkbox" name="ndrCallSetup" checked={plan.ndrCallSetup} onChange={handleChange} />
//             <Label>Free NDR Call Setup</Label>
//           </CheckboxGroup>
//         </CheckboxRow>

//         <StyledButton type="submit" disabled={loader}>
//           {loader ? <CircularProgress size={24} color="inherit" /> : id ? "Update Plan" : "Add Plan"}
//         </StyledButton>
//       </StyledForm>
//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };

// export default AddPlan;

// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   min-height: 100vh;
//   background: #f1f3f5;
// `;

// const StyledForm = styled.form`
//   background: #ffffff;
//   padding: 30px;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   width: 100%;
//   max-width: 600px;
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   font-weight: 600;
//   color: #343a40;
// `;

// const InputRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 16px;
//   margin-bottom: 15px;
// `;

// const InputGroup = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-weight: 500;
//   margin-bottom: 6px;
//   color: #495057;
// `;

// const StyledInput = styled.input`
//   padding: 10px 12px;
//   border: 1px solid #ced4da;
//   border-radius: 6px;
//   font-size: 14px;
//   transition: border 0.3s ease;

//   &:focus {
//     border-color: #339af0;
//     outline: none;
//   }
// `;

// const CheckboxRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 16px;
//   margin-bottom: 15px;
// `;

// const CheckboxGroup = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const StyledCheckbox = styled.input`
//   width: 18px;
//   height: 18px;
// `;

// const StyledButton = styled.button`
//   margin-top: 20px;
//   background: #339af0;
//   color: white;
//   font-weight: 600;
//   padding: 12px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: #1c7ed6;
//   }

//   &:disabled {
//     background: #74c0fc;
//     cursor: not-allowed;
//   }
// `;




import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff, updateUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const AddPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, response, error } = useSelector(state => state.user);

  const [plan, setPlan] = useState({
    name: '',
    price: '',
    baseRate: '',
    docketCharge: '',
    minCharge: '',
    odaCharge: '',
    appointmentDeliveries: '',
    integrations: false,
    whatsappUpdates: false,
    prioritySupport: false,
    ndrCallSetup: false,
    additionalUsers: '',
    isActive: false, // ✅ added here
  });

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === 'added' || status === 'updated') {
      navigate('/Admin/plans');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    if (id) {
      dispatch(updateUser(id, plan, "Plan"));
    } else {
      dispatch(addStuff(plan, "Plan"));
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitHandler}>
        <Title>{id ? "Update Plan ✏️" : "Add Plan 📜"}</Title>

        <InputRow>
          <InputGroup>
            <Label>Plan Name</Label>
            <StyledInput type="text" name="name" value={plan.name} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Price (₹)</Label>
            <StyledInput type="number" name="price" value={plan.price} onChange={handleChange} required />
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Base Rate (₹)</Label>
            <StyledInput type="number" name="baseRate" value={plan.baseRate} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Docket Charge (%)</Label>
            <StyledInput type="number" name="docketCharge" value={plan.docketCharge} onChange={handleChange} required />
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Minimum Charge (₹)</Label>
            <StyledInput type="number" name="minCharge" value={plan.minCharge} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>ODA Charge (₹)</Label>
            <StyledInput type="number" name="odaCharge" value={plan.odaCharge} onChange={handleChange} required />
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Appointment Deliveries (₹)</Label>
            <StyledInput type="number" name="appointmentDeliveries" value={plan.appointmentDeliveries} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Additional Users</Label>
            <StyledInput type="number" name="additionalUsers" value={plan.additionalUsers} onChange={handleChange} required />
          </InputGroup>
        </InputRow>

        <CheckboxRow>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="integrations" checked={plan.integrations} onChange={handleChange} />
            <Label>Integrations</Label>
          </CheckboxGroup>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="whatsappUpdates" checked={plan.whatsappUpdates} onChange={handleChange} />
            <Label>WhatsApp Updates</Label>
          </CheckboxGroup>
        </CheckboxRow>

        <CheckboxRow>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="prioritySupport" checked={plan.prioritySupport} onChange={handleChange} />
            <Label>Priority Support</Label>
          </CheckboxGroup>
          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="ndrCallSetup" checked={plan.ndrCallSetup} onChange={handleChange} />
            <Label>Free NDR Call Setup</Label>
          </CheckboxGroup>

          <CheckboxGroup>
            <StyledCheckbox type="checkbox" name="isActive" checked={plan.isActive} onChange={handleChange} />
            <Label>Is Active?</Label>
          </CheckboxGroup>
        </CheckboxRow>

        {/* ✅ Plan Active Status Toggle */}
        {/* <CheckboxRow>
          <CheckboxGroup>
            <StyledCheckbox
              type="checkbox"
              name="status"
              checked={plan.status}
              onChange={handleChange}
            />
            <Label>{plan.status ? "Plan is Active" : "Plan is Inactive"}</Label>
          </CheckboxGroup>
        </CheckboxRow> */}

        <StyledButton type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : id ? "Update Plan" : "Add Plan"}
        </StyledButton>
      </StyledForm>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default AddPlan;

// Styled Components

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: #f1f3f5;
`;

const StyledForm = styled.form`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: #343a40;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 15px;
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #495057;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #339af0;
    outline: none;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 15px;
`;

const CheckboxGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
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
