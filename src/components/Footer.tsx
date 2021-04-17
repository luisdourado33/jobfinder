import React from 'react';
import { Footer as Foot } from 'rsuite';
import { PALETTES } from '../theme';

const Footer = () => {
  return (
    <Foot
      style={{
        position: 'fixed',
        width: '100%',
        left: 0,
        bottom: 0,
        padding: 5,
        paddingLeft: 5,
        backgroundColor: PALETTES.dark,
        color: '#eee',
      }}>
      <h3>Job Finder - Todos os direitos reservados</h3>
    </Foot>
  );
};

export default Footer;
