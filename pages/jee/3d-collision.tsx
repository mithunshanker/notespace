// pages/collision.js
import { useState } from 'react';

const Collision = () => {
  const [velocity1, setVelocity1] = useState({ x: 0, y: 0, z: 0 });
  const [velocity2, setVelocity2] = useState({ x: 0, y: 0, z: 0 });
  const [probability, setProbability] = useState(null);

  const calculateProbability = () => {
    // Calculate the relative velocity vector
    const relativeVelocity = {
      x: velocity1.x - velocity2.x,
      y: velocity1.y - velocity2.y,
      z: velocity1.z - velocity2.z,
    };

    // Calculate the magnitude of the relative velocity vector
    const relativeSpeed = Math.sqrt(
      relativeVelocity.x ** 2 + relativeVelocity.y ** 2 + relativeVelocity.z ** 2
    );

    // Define a collision threshold (e.g., if relative speed > 0.1, consider a collision)
    const collisionThreshold = 0.1;

    const probability = relativeSpeed > collisionThreshold ? 1 : 0;

    setProbability(probability);
  };

  return (
    <div>
      <h1>Collision Probability Calculator (3D)</h1>
      <label>
        Velocity of Body 1 (x, y, z):
        <input
          type="number"
          value={velocity1.x}
          onChange={(e) => setVelocity1({ ...velocity1, x: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          value={velocity1.y}
          onChange={(e) => setVelocity1({ ...velocity1, y: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          value={velocity1.z}
          onChange={(e) => setVelocity1({ ...velocity1, z: parseFloat(e.target.value) })}
        />
      </label>
      <label>
        Velocity of Body 2 (x, y, z):
        <input
          type="number"
          value={velocity2.x}
          onChange={(e) => setVelocity2({ ...velocity2, x: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          value={velocity2.y}
          onChange={(e) => setVelocity2({ ...velocity2, y: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          value={velocity2.z}
          onChange={(e) => setVelocity2({ ...velocity2, z: parseFloat(e.target.value) })}
        />
      </label>
      <button onClick={calculateProbability}>Calculate Probability</button>
      {probability !== null && (
        <p>
          The probability of collision is {probability.toFixed(2)}.
        </p>
      )}
    </div>
  );
};

export default Collision;
