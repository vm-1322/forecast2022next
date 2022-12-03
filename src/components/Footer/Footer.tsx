import React from 'react';

import { IFooterProps } from 'types';
import { StyledFooter } from './FooterStyled';

const Footer: React.FC<IFooterProps> = ({ className }) => {
  return <StyledFooter className={className} />;
};

export default Footer;
