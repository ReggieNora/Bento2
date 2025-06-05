import { useRef, useEffect } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";

import "./CircularGallery.css";

interface CircularGalleryProps {
  items: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans",
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    const camera = new Camera(gl);
    const scene = new Transform();

    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    camera.position.z = 5;

    function resize() {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({
        aspect: container.clientWidth / container.clientHeight,
      });
    }

    const geometry = new Plane(gl);
    const items = createItems(gl, geometry, scene);
    
    function render() {
      requestAnimationFrame(render);
      items.forEach((item, i) => {
        item.mesh.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
        item.mesh.position.x = Math.cos(i * (Math.PI * 2) / items.length) * 2;
        item.mesh.position.y = Math.sin(i * (Math.PI * 2) / items.length) * 2;
      });
      renderer.render({ scene, camera });
    }

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeChild(gl.canvas);
      renderer.dispose();
    };
  }, [items]);

  return <div ref={containerRef} className="w-full h-full" />;
}