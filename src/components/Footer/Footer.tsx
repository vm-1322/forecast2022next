import React from 'react';

import { StyledFooter } from './FooterStyled';

import { IFooterProps } from '../../types';

const Footer: React.FC<IFooterProps> = ({ className }) => {
  return <StyledFooter className={className} />;
};

export default Footer;
