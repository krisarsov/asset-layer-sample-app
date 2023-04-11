import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, Popover, Typography, Avatar, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from '../hooks/use-auth';
import toast from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      onClose?.();
      await signOut();
      router.push('/').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  if (!user?.handle) return <></>;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      variant='outlined'
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex'
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            height: 40,
            width: 40
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1
          }}
        >
          <Typography variant="body1">
            {user.handle}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Logout
              </Typography>
            )}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
