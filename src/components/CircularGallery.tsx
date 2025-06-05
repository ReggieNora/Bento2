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

    function createItems(gl: WebGLRenderingContext, geometry: Plane, scene: Transform) {
      return items.map((item) => {
        // Create texture from image
        const texture = new Texture(gl, {
          generateMipmaps: false,
        });

        // Load the image
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Add cross-origin handling
        img.src = item.image;
        img.onload = () => (texture.image = img);

        // Create shader program
        const program = new Program(gl, {
          vertex: `
            attribute vec2 uv;
            attribute vec3 position;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            varying vec2 vUv;

            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragment: `
            precision highp float;
            uniform sampler2D tMap;
            varying vec2 vUv;

            void main() {
              vec4 texture = texture2D(tMap, vUv);
              gl_FragColor = texture;
            }
          `,
          uniforms: {
            tMap: { value: texture },
          },
        });

        // Create mesh
        const mesh = new Mesh(gl, {
          geometry,
          program,
        });

        mesh.setParent(scene);
        mesh.scale.set(1, 1, 1);

        return { mesh, texture };
      });
    }

    const geometry = new Plane(gl);
    const galleryItems = createItems(gl, geometry, scene);
    
    function render() {
      requestAnimationFrame(render);
      galleryItems.forEach((item, i) => {
        item.mesh.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
        item.mesh.position.x = Math.cos(i * (Math.PI * 2) / galleryItems.length) * 2;
        item.mesh.position.y = Math.sin(i * (Math.PI * 2) / galleryItems.length) * 2;
      });
      renderer.render({ scene, camera });
    }

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [items]);

  return <div ref={containerRef} className="w-full h-full" />;
}