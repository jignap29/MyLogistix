import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Grid, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <>
            {/* ✅ Header with Login & Sign Up */}
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        School Management System
                    </Typography>
                    <StyledLink to="/choose">
                        <Button  sx={{
                    backgroundColor: "#7E57C2",
                    color: "white",
                    "&:hover": { backgroundColor: "#673AB7" },
                    marginRight: "15px"
                }}>Login</Button>
                    </StyledLink>
                    <StyledLink to="/Adminregister">
                        <Button variant="contained" color="secondary" sx={{
                    backgroundColor: "#7E57C2",
                    color: "white",
                    "&:hover": { backgroundColor: "#673AB7" }
                }}>
                            Sign Up
                        </Button>
                    </StyledLink>
                </Toolbar>
            </StyledAppBar>

            <StyledContainer>
                <Grid container spacing={4} alignItems="center">
                    {/* ✅ Left Side - Image */}
                    <Grid item xs={12} md={6}>
                        <img src={Students} alt="students" style={{ width: '100%' }} />
                    </Grid>

                    {/* ✅ Right Side - Text & Buttons */}
                    <Grid item xs={12} md={6}>
                        <StyledBox>
                            <StyledTitle>Welcome to<br />School Management System</StyledTitle>
                            <StyledText>
                                Manage your school effortlessly! Organize classes, track attendance,
                                assess performance, and communicate seamlessly. Get started today.
                            </StyledText>
                            {/* <StyledButtonGroup> */}
                                {/* <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink> */}
                                {/* <StyledLink to="/chooseasguest"> */}
                                    {/* <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                    >
                                        Login as Guest
                                    </Button> */}
                                {/* </StyledLink>
                            </StyledButtonGroup>
                            <StyledText>
                                Don't have an account? <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
                                    Sign up
                                </Link>
                            </StyledText> */}
                        </StyledBox>
                    </Grid>
                </Grid>
            </StyledContainer>
        </>
    );
};

export default Homepage;

// ✅ Styled Components
const StyledAppBar = styled(AppBar)`
    background-color: #550080;
`;

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
`;

const StyledBox = styled(Box)`
    text-align: center;
    padding: 24px;
`;

const StyledTitle = styled.h1`
    font-size: 2.8rem;
    color: #252525;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledText = styled.p`
    color: #333;
    font-size: 1.1rem;
    margin-bottom: 20px;
`;

const StyledButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;
