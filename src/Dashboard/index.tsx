import { Stack } from '@mui/material';
import DashboardPage from './components/Dashboard';
import { DashboardProvider } from './contexts/DashboardContexts';

const Dashboard=() => {
  return (
      <DashboardProvider>
        <Stack spacing={5}>
          <DashboardPage/>
        </Stack>
      </DashboardProvider>
  );
};

export default Dashboard;
