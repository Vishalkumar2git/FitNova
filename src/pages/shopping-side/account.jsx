import { useState } from "react";
import { Box, Tabs, Tab, Paper, Container } from "@mui/material";
import accountImg from "../../assets/account.jpg";
import Address from "../../components/shopping-view/address";
import ShoppingOrders from "../../components/shopping-view/order";



function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function ShoppingAccount() {
  const [tabIndex, setTabIndex] = useState(0);


  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ height: 300, width: "100%", overflow: "hidden", position: "relative" }}>
        <img
          src={accountImg}
          alt="Account"
          style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange} 
            aria-label="Account Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab  label="Orders" />
            <Tab label="Address" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <ShoppingOrders/>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Address/>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
}

export default ShoppingAccount;
