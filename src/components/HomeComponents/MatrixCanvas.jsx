import React, { useRef, useEffect } from 'react';
import styles from './MatrixCanvas.module.css';

const MatrixCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const chars = 'STALKEA.AI';
    const fontSize = 13;
    const charWidth = Math.floor(canvas.width / fontSize);
    const positions = Array(charWidth).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(4, 6, 7, 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      positions.forEach((pos, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 2 === 0 ? 'rgba(74, 55, 182, 0.9)' : 'rgba(171, 88, 244, 0.9)';
        ctx.fillText(char, fontSize * i, fontSize * pos);
        positions[i] = pos + 1;
        if (fontSize * positions[i] > canvas.height && Math.random() > 0.95) {
          positions[i] = 0;
        }
      });
    };

    const interval = setInterval(drawMatrix, 33);
    drawMatrix();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.matrixCanvas} />;
};

export default MatrixCanvas;