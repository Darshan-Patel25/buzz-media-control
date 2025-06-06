import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery, TextField } from "@mui/material";
import StatBox from "components/StatBox";
import { Facebook, Twitter, Image } from "@mui/icons-material";
import Header from "components/Header";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "globalbackendurl";
import ServiceCard from "../../components/ServiceCard";


const postedPosts = [
  {
    content: "New update on our product launch! 🚀",
    description: "We're excited to introduce new features.",
    scheduledTime: "2025-04-02 10:30 AM",
    status: "Published",
    postId: "post123",
  },
  {
    content: "Join our upcoming webinar on AI advancements. 🤖",
    description: "Learn about the latest trends in artificial intelligence.",
    scheduledTime: "2025-04-05 03:00 PM",
    status: "Scheduled",
    postId: "post124",
  },
  {
    content: "Celebrating 1 year of success! 🎉",
    description: "Thank you all for your support!",
    scheduledTime: "2025-04-10 09:00 AM",
    status: "Published",
    postId: "post125",
  },
];

export default function Schedule() {
  const [post, setPost] = useState("");
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const [imageFile, setImageFile] = useState(null); // ✅ Fixed state for image upload

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Fetch trending hashtags
  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await axios.get(`${url}/api/comments/trending-hashtags`);
        setTrendingHashtags(response.data.hashtags || []);
      } catch (error) {
        console.error("Error fetching trending hashtags:", error);
      }
    };
    fetchTrendingHashtags();
  }, []);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Schedule Post
  const handleSchedulePost = async () => {
    if (!post.trim() || !scheduledTime) {
      alert("Please enter both a post and a valid date/time.");
      return;
    }

    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("Access token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/schedule/schedule-post`,
        { content: post, scheduledTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post scheduled successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error scheduling the post:", error);
      // alert("Failed to schedule the post.");
    }
  };

  // Optimize Post
  const handleOptimizePost = async () => {
    if (!post.trim()) {
      alert("Please enter a post to optimize.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Access token is missing.");
        return;
      }

      const response = await axios.post(
        `${url}/api/comments/correct`,
        { content: post },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPost(`${response.data.correctedTweet || post} ${response.data.hashtags || ""}`);
      alert("Post optimized and hashtags added!");
    } catch (error) {
      console.error("Error optimizing the post:", error);
      // alert("Failed to optimize the post.");
    }
  };

  // Direct Post with Image Upload
  const handleDirectPost = async () => {
    if (!post.trim()) {
      alert("Please enter a post.");
      return;
    }

    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("Access token is missing.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", post);
      if (imageFile) formData.append("image", imageFile);

      const response = await axios.post(`${url}/api/schedule/direct-post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post uploaded successfully!");
      console.log("Response:", response.data);
      setPost("");
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading post:", error);
      // alert("Failed to upload post.");
    }
  };

  return (
    <Box m="1rem 2rem">
      <Header title="Live GPS and Communication" />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{ "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" } }}
      >
        
       
          <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{ maxHeight: "320px", overflowY: "auto" }}
        >
         
          {postedPosts.length > 0 ? (
            postedPosts.map((post, index) => (
              <ServiceCard
                // key={index}
                // text={post.content}
                // description={post.description || "No description"}
                // date={post.scheduledTime || "N/A"}
                // status={post.status}
                // postId={post.postId}
                // // onResponse={(response) => handleChildResponse(response)}
              />
            ))
          ) : (
            <Typography>No posted posts available.</Typography>
          )}
        </Box>

       
        
      </Box>
    </Box>
  );
}
