import { Fragment } from 'react';

import Layout from '../components/Layout';
import SignUp from '../components/SignUp';

const SignUpPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <SignUp />
      </Layout>
    </Fragment>
  );
};

export default SignUpPage;
