import { Container } from '@mantine/core';

import { Logo } from '@/components/ui/logo';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Container fluid py="xs">
        <Logo
          href="/"
          src="/gisat.svg"
          ariaLabel="GISAT logo"
          // src='custom_path'
          alt="GISAT"
          width={98}
          height={24}
          expanded
          expandedText="COG Explorer"
        />
      </Container>
    </div>
  );
};

export default Header;
