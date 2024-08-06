// src/components/Header.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from './Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TaskForm from './TaskForm';
const HeaderWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const NavLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}));

const Link = styled('a')(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
}));

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveTask = (task) => {
    console.log('Task saved:', task);
    handleCloseDialog();
  };

  return (
    <HeaderWrapper className='headerName'>
      <AppBar position="static">
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">
            Task Manager
          </Title>


        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TaskForm onSave={handleSaveTask} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </HeaderWrapper>
  );
};

export default Header;
