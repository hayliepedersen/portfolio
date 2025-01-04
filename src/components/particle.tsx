import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  size: number;
  left: number;
  delay: number;
}

const ParticleEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = (): Particle => ({
      id: Math.random(),
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 20,
    });

    // Create initial particles
    setParticles(Array.from({ length: 20 }, createParticle));

    // Periodically refresh particles
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-15),
        createParticle(),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="particleContainer">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;