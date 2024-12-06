// Styles
// import classes from '@/styles/Dashboard.module.css';

import { Space, Text } from '@mantine/core';

const DashboardFooter = () => {
  return (
    <Space mt="lg" style={{ color: 'var(--gray-400)' }}>
      <Text size="xs" style={{ color: 'var(--gray-500)' }}>
        <b>
          © <a href="https://gisat.cz/">Gisat</a> 2024
        </b>
      </Text>
      <Text size="xs">
        Developed by Gisat with support from the European Space Agency in the
        frame of the 3DFlus project (ESA/AO/1-10491/20/I-EF Activity No.
        1000029762)
      </Text>
    </Space>
  );
};

export default DashboardFooter;
