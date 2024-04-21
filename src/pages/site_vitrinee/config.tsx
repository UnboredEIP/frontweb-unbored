import React from 'react';
import Main from '../../pages/site_vitrinee/main';
import Navbar from '../../pages/site_vitrinee/Navbar';

const SiteVitrine: React.FC = () => {
  return (
    <div className="gradient_background col-12">
      <Navbar />
      <div id="dddd">
        <Main />
      </div>
    </div>
  );
};

export default SiteVitrine;
