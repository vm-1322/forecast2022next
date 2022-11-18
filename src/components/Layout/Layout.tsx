import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './LayoutStyled';

const Layout: React.FC = () => {
  return (
    <StyledLayout>
      <Header />
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
