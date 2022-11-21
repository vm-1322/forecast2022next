import { Fragment } from 'react';

import Layout from '../components/Layout';
import LogIn from '../components/LogIn';

const SignUpPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <LogIn />
      </Layout>
    </Fragment>
  );
};

export default SignUpPage;
