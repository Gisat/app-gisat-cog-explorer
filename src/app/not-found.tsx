import { Container } from '@mantine/core';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import classes from '@/styles/NotFound.module.css';

const NotFoundPage = () => {
  return (
    <main className={classes.main}>
      <Container>
        <div className={classes.content}>
          <h1>404 - Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link href={paths.home.getHref()} replace>
            Go to Home
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
