import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import Profilelogo from '../components/assets/2289_SkVNQSBGQU1PIDEwMjgtMTE2.jpg';

const Sidebar = ({ open, onClose }) => {
  const list = () => (
    <div
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
      style={{ width: 250 }}
    >
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Avatar src={Profilelogo} alt="Profile" style={{ width: 60, height: 60, marginRight: 16 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold' }}>Shivani Mishra</span>
          <span>Developer</span>
        </div>
        <IconButton onClick={onClose} style={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {list()}
    </Drawer>
  );
};

export default Sidebar;
