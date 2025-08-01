import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RoomIcon from '@mui/icons-material/Room';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ScaleIcon from '@mui/icons-material/Scale';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ExpandLess, ExpandMore, MenuBook, Article } from '@mui/icons-material';
import { List, Collapse } from '@mui/material';
import Folder from '@mui/icons-material/Folder';
import Block from '@mui/icons-material/Block';
import SupportAgent from '@mui/icons-material/SupportAgent';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';





// ✅ SCROLLABLE SIDEBAR WRAPPER
const SidebarWrapper = styled.div`
  height: 89vh;
  overflow-y: auto;
`;

const SideBar = () => {
    const location = useLocation();
    const [openResource, setOpenResource] = React.useState(location.pathname.startsWith("/Admin/packageguide"));
    const handleResourceClick = () => {
        setOpenResource(!openResource);
    };
    return (
        
        <SidebarWrapper>
            
            {/* home sidebar */}
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                {/* customer sidebar */}
                <ListItemButton component={Link} to="/Admin/custs">
                    <ListItemIcon>
                        <PeopleIcon color={location.pathname.startsWith("/Admin/custs") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>

                {/* plan sidebar */}
                <ListItemButton component={Link} to="/Admin/plans">
                    <ListItemIcon>
                        <LocalOfferIcon color={location.pathname.startsWith("/Admin/plans") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Plans" />
                </ListItemButton>

                {/* company sidebar */}
                <ListItemButton component={Link} to="/Admin/couriercompanys">
                    <ListItemIcon>
                        <LocalShippingIcon color={location.pathname.startsWith("/Admin/couriercompanys") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Courier Companies" />
                </ListItemButton>

                {/* KYC */}
                <ListItemButton component={Link} to="/Admin/ShowKYC">
                    <ListItemIcon>
                        <PublicIcon color={location.pathname.startsWith("/Admin/ShowKYC") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="International KYC" />
                </ListItemButton>

                {/* NDR & Exception */}
                <ListItemButton component={Link} to="/Admin/ShowNDR&Exception">
                    <ListItemIcon>
                        <ReportProblemIcon color={location.pathname.startsWith("/Admin/ShowNDR&Exception") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="NDR & Exception" />
                </ListItemButton>

                {/* pickup point */}
                <ListItemButton component={Link} to="/Admin/pickuppoints">
                    <ListItemIcon>
                        <RoomIcon color={location.pathname.startsWith("/Admin/pickuppoints") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="PickUp Points" />
                </ListItemButton>

                {/* pickup request */}
                <ListItemButton component={Link} to="/Admin/pickurequest">
                    <ListItemIcon>
                        <Inventory2Icon color={location.pathname.startsWith("/Admin/pickurequest") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="PickUp Request" />
                </ListItemButton>

                {/* apointment related */}

                <ListItemButton component={Link} to="/Admin/ShowAppointments">
                    <ListItemIcon>
                        <EventAvailableIcon
                            color={location.pathname.startsWith("/Admin/ShowAppointments") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Delivery Appointment" />
                </ListItemButton>

                {/* weight reconciliation */}
                <ListItemButton component={Link} to="/Admin/ShowExtraWeight">
                    <ListItemIcon>
                        <ScaleIcon color={location.pathname.startsWith("/Admin/ShowExtraWeight") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Weight Reconciliation" />
                </ListItemButton>

                {/* rate calculator */}
                <ListItemButton component={Link} to="/Admin/ratecalculator">
                    <ListItemIcon>
                        <CalculateIcon color={location.pathname.startsWith("/Admin/ratecalculator") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Rate Calculator" />
                </ListItemButton>

                {/* courier rate side bar */}
                <ListItemButton component={Link} to="/Admin/courierrates">
                    <ListItemIcon>
                        <AttachMoneyIcon color={location.pathname.startsWith("/Admin/courierrates") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Company Rates" />
                </ListItemButton>

                {/* order side bar */}
                <ListItemButton component={Link} to="/Admin/orders">
                    <ListItemIcon>
                        <ShoppingCartIcon color={location.pathname.startsWith("/Admin/orders") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>

                {/* invoice side bar */}
                <ListItemButton component={Link} to="/Admin/invoices">
                    <ListItemIcon>
                        <ReceiptIcon color={location.pathname.startsWith("/Admin/invoices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Invoices" />
                </ListItemButton>

                {/* wallet side bar */}
                <ListItemButton component={Link} to="/Admin/walletsHistory">
                    <ListItemIcon>
                        <AccountBalanceWalletIcon
                            color={location.pathname.startsWith("/Admin/walletsHistory") ? 'primary' : 'inherit'}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Wallet" />
                </ListItemButton>

                {/* support ticket */}
                <ListItemButton component={Link} to="/Admin/ShowSupportTickets">
                    <ListItemIcon>
                        <SupportAgentIcon
                            color={location.pathname.startsWith("/Admin/ShowSupportTickets") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Customer Support" />
                </ListItemButton>



            </React.Fragment>

            {/* resorce center  */}

            <>
                <ListItemButton onClick={handleResourceClick}>
                    <ListItemIcon>
                        <MenuBook color={openResource ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Resource Center" />
                    {openResource ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openResource} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {/* Package Guide */}
                        <ListItemButton
                            component={Link}
                            to="/Admin/packageguide"
                            selected={location.pathname === "/Admin/packageguide"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <Article color={location.pathname === "/Admin/packageguide" ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary="Package Guide" />
                        </ListItemButton>

                        {/* Zone Matrix */}
                        <ListItemButton
                            component={Link}
                            to="/Admin/ZoneMatrix"
                            selected={location.pathname === "/Admin/ZoneMatrix"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <Folder color={location.pathname === "/Admin/ZoneMatrix" ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary="Zone Matrix" />
                        </ListItemButton>

                        {/* Prohibited Items */}
                        <ListItemButton
                            component={Link}
                            to="/Admin/ProhibitedItems"
                            selected={location.pathname === "/Admin/ProhibitedItems"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <Block color={location.pathname === "/Admin/ProhibitedItems" ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary="Prohibited Items" />
                        </ListItemButton>

                        {/* Escalation Matrix */}
                        <ListItemButton
                            component={Link}
                            to="/Admin/EscalationMatrixPage"
                            selected={location.pathname === "/Admin/EscalationMatrixPage"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <SupportAgent color={location.pathname === "/Admin/EscalationMatrixPage" ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary="Escalation Matrix" />
                        </ListItemButton>

                        {/* Transporter IDs */}
                        <ListItemButton
                            component={Link}
                            to="/Admin/TransporterIDs"
                            selected={location.pathname === "/Admin/TransporterIDs"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <ReceiptLongOutlined color={location.pathname === "/Admin/TransporterIDs" ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary="Transporter IDs" />
                        </ListItemButton>

                        {/* training videos */}

                        <ListItemButton
                            component={Link}
                            to="/Admin/TrainingVideos"
                            selected={location.pathname === "/Admin/TrainingVideos"}
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <VideoLibraryIcon color={location.pathname === "/Admin/TrainingVideos" ? 'primary' : 'inherit'} />
                            </ListItemIcon>

                            <ListItemText primary="Training Videos" />
                        </ListItemButton>
                        



                    </List>
                </Collapse>
            </>




            {/* <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment> */}
        </SidebarWrapper>
    );
};

export default SideBar;



