import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Book as BookIcon, LibraryBooks as LibraryBooksIcon, Assignment as AssignmentIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { useSpring, animated } from '@react-spring/web';
import './Dashboard.css'; // Import custom CSS

function Dashboard() {
  const [stats, setStats] = useState({});
  const [monthlyBorrows, setMonthlyBorrows] = useState([]);

  const pieData = [
    { name: 'Available', value: stats.availableBooks || 0 },
    { name: 'Borrowed', value: stats.borrowedBooks || 0 },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  useEffect(() => {
    axios.get('https://library-backend-9f7k.onrender.com/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));

    axios.get('https://library-backend-9f7k.onrender.com/transactions')
      .then((res) => setMonthlyBorrows(res.data))
      .catch((err) => console.error(err));
  }, []);

  const monthlyBorrowsData = monthlyBorrows.reduce((acc, transaction) => {
    const month = new Date(transaction.borrow_date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});

  const barData = Object.keys(monthlyBorrowsData).map(month => ({
    month,
    borrows: monthlyBorrowsData[month],
  }));

  const backgroundAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={backgroundAnimation} className="dashboard-background">
      <Container maxWidth="lg">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom className="dashboard-title">Library Dashboard</Typography>
          <Grid container spacing={3}>
            {/* Total Books */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#0088FE' }}>
                      <LibraryBooksIcon />
                    </Avatar>
                  }
                  title="Total Books"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <Typography variant="h4" className="dashboard-stat">{stats.totalBooks}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Available Books */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#00C49F' }}>
                      <BookIcon />
                    </Avatar>
                  }
                  title="Available Books"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <Typography variant="h4" className="dashboard-stat">{stats.availableBooks}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Borrowed Books */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#FFBB28' }}>
                      <AssignmentIcon />
                    </Avatar>
                  }
                  title="Borrowed Books"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <Typography variant="h4" className="dashboard-stat">{stats.borrowedBooks}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Active Transactions */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#FF8042' }}>
                      <TrendingUpIcon />
                    </Avatar>
                  }
                  title="Active Transactions"
                  className="card-header"
                />
                <CardContent className="card-content">
                  <Typography variant="h4" className="dashboard-stat">{stats.activeTransactions}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box mt={5} className="chart-container">
          <Typography variant="h6" gutterBottom className="chart-title">Book Availability</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box mt={5} className="chart-container">
          <Typography variant="h6" gutterBottom className="chart-title">Monthly Borrows</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrows" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </animated.div>
  );
}

export default Dashboard;