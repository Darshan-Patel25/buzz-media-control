import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import BarLabel from '../../components/BarGraph';
import {
  Box,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import Header from 'components/Header';
import { url } from 'globalbackendurl';

const ConnectPage = () => {

  const convertMetric = (value) => {
    if (typeof value === "string") {
      value = value.replace(/,/g, ""); // Remove commas
      if (value.endsWith("K")) {
        return parseFloat(value) * 1000;
      } else if (value.endsWith("M")) {
        return parseFloat(value) * 1000000;
      }
    }
    return parseFloat(value);
  };

  const [newPage, setNewPage] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState('');
  const [graphData, setGraphData] = useState([]);

  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [tweets, setTweets] = useState(0);

  useEffect(() => {
    fetchCompetitors();
  }, []);

  useEffect(() => {
    if (graphData.length > 0) {
      const latestData = graphData[graphData.length - 1];
      setFollowers(latestData.followers);
      setFollowings(latestData.followings);
      setTweets(latestData.tweets);
    }
  }, [graphData]);

  // Fetch competitors from the server
  const fetchCompetitors = async () => {
    const accessToken = Cookies.get('accessToken');
    // if (!accessToken) {
    //   alert('Authentication required.');
    //   return;
    // }

    try {
      const response = await fetch(`${url}/api/comments/getcompanies`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setCompetitors(result.competitorAnalysis || []);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error fetching competitors:', error);
      // alert('Failed to fetch competitors.');
    }
  };

  // Handle adding a new competitor
  const handleAddPage = async () => {
    if (!newPage.trim()) {
      alert('Please enter a valid page.');
      return;
    }

    const accessToken = Cookies.get('accessToken');
    // if (!accessToken) {
    //   alert('Authentication required.');
    //   return;
    // }

    try {
      const response = await fetch(`${url}/api/comments/competitor-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ competitorAnalysis: newPage }),
      });

      if (response.ok) {
        alert(`New competitor "${newPage}" added successfully!`);
        setNewPage('');
        fetchCompetitors(); // Refresh competitors list
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding new page:', error);
      // alert('Failed to add new page.');
    }
  };

  // Handle fetching competitor statistics
  const handleSubmitCompetitors = async () => {
    if (!selectedCompetitor) {
      alert('Please select a competitor.');
      return;
    }

    try {
      const response = await fetch(`${url}/api/comments/stas?username=${selectedCompetitor}`);
      const result = await response.json();

      if (response.ok) {
        const data = result.Graph.map((item) => ({
          date: item.date,
          followers: parseInt(convertMetric(item.followers)) || 0,
          followings: parseInt(convertMetric(item.followings)) || 0,
          tweets: parseInt(convertMetric(item.tweets)) || 0,
        }));
        setGraphData(data);
      } else {
        alert(`Error: ${result.error || 'Failed to fetch stats.'}`);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // alert('Failed to fetch stats.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        <Header title={'Competitor Analytics'} />
      </Typography>

      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Add New Page"
          value={newPage}
          style={{ width: "70rem" }}
          onChange={(e) => setNewPage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: '53px', fontSize: '15px' }}
          onClick={handleAddPage}
        >
          Add
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Select Competitor Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Competitor</InputLabel>
        <Select
          value={selectedCompetitor}
          onChange={(e) => setSelectedCompetitor(e.target.value)}
          label="Select Competitor"
        >
          {competitors.map((comp, index) => (
            <MenuItem key={index} value={comp}>
              {comp}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Competitor Button */}
      <Button variant="contained" color="primary" onClick={handleSubmitCompetitors}>
        Submit Selected Competitor
      </Button>

      {/* Graph Section */}
      <Typography variant="h5" mt={4} mb={2}>
        Engagement Trends
      </Typography>

      {graphData.length > 0 ? (
        <>
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Followers</Typography>
                  <Typography variant="h4" color="primary">
                    {followers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Followings</Typography>
                  <Typography variant="h4" color="secondary">
                    {followings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Tweets</Typography>
                  <Typography variant="h4" color="error">
                    {tweets}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <BarLabel graphData={graphData} />
        </>
      ) : (
        <Typography>No data available for engagement trends.</Typography>
      )}

      {/* Followers, Followings, and Tweets Display */}

    </Box>
  );
};

export default ConnectPage;