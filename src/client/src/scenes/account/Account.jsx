import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '500px',
  padding: '2rem',
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  borderRadius: '8px',
});

const AccountPage = () => {
    const auth = useAuthUser();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchUser = async() => {
        await fetch(`/api/user/get/by/id/${auth.id}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUserData({
                ...userData,
                username: data.username,
                email: data.email
            })
        })
        .catch(error => {
            console.error("There was an error fetching the user details!", error);
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchUser()
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
        ...userData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdating(true);
        
        // Replace with your API endpoint
        // axios.put('/api/user/update', userData)
        //   .then(response => {
        //     setUpdating(false);
        //     alert('Account updated successfully!');
        //   })
        //   .catch(error => {
        //     console.error("There was an error updating the account!", error);
        //     setUpdating(false);
        //   });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <StyledContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Account
        </Typography>
        <StyledBox component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={userData.username}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={userData.confirmPassword}
                onChange={handleChange}
                />
            </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={updating}
            >
            {updating ? 'Updating...' : 'Update Account'}
            </Button>
        </StyledBox>
        </StyledContainer>
    );
    };

    export default AccountPage;
