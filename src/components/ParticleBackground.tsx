import React from "react";
import { ISourceOptions } from "tsparticles";
import Particles from "react-tsparticles";
import ParticlesItem from "./config/particles-config";

const ParticleBackground: React.FC = () => {
  return (
    <Particles
      id="particles"
      options={ParticlesItem}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
  );
};

export default ParticleBackground;
