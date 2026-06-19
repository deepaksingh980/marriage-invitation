"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// 1. Procedural Swinging Temple Bell
interface TempleBellProps {
  position: [number, number, number];
  rotation: [number, number, number];
  swingSpeed?: number;
  swingRange?: number;
  delay?: number;
}

function TempleBell({
  position,
  rotation,
  swingSpeed = 1,
  swingRange = 0.1,
  delay = 0,
}: TempleBellProps) {
  const bellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bellRef.current) {
      const angle = Math.sin(state.clock.getElapsedTime() * swingSpeed + delay) * swingRange;
      bellRef.current.rotation.z = angle;
    }
  });

  return (
    <group ref={bellRef} position={position} rotation={rotation}>
      {/* Chain/Rope */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 2.5, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Bell Cap */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Bell Body */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.22, 0.4, 24, 1, false]} />
        <meshPhysicalMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* Clapper at bottom */}
      <mesh position={[0, -0.38, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#A68018" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// 2. Lord Ganesha Texture-Mapped 3D Plane
interface GaneshaPlaneProps {
  progress: number;
}

function GaneshaPlane({ progress }: GaneshaPlaneProps) {
  const texture = useTexture("/assets/ganesha.webp");
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate aspect ratio dynamically once texture loads
  const aspect = useMemo(() => {
    if (texture && texture.image) {
      const img = texture.image as any;
      if (img && img.width && img.height) {
        return img.width / img.height;
      }
    }
    return 0.85; // Fallback aspect ratio for Ganesha
  }, [texture]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      // 1. Continuous breathing scale loop
      const breathing = 1.0 + Math.sin(elapsed * 1.5) * 0.025;
      meshRef.current.scale.set(breathing, breathing, 1);

      // 2. Continuous drift/sway
      const swayX = Math.sin(elapsed * 0.8) * 0.05;
      const swayY = Math.cos(elapsed * 0.6) * 0.03;
      
      // 3. Mouse interaction (interpolated/lerp tilt and offset)
      const targetRotationY = state.pointer.x * 0.25;
      const targetRotationX = -state.pointer.y * 0.15;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY + swayX, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.1, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, swayY + state.pointer.y * 0.05, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.15, 0.05]} castShadow receiveShadow>
      <planeGeometry args={[1.5 * aspect, 1.5]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        alphaTest={0.001}
        roughness={0.2}
        metalness={0.1}
        opacity={progress}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 3. Living Photo Component (Multi-layered 3D Parallax card)
interface LivingPhotoProps {
  imagePath: string;
  name: string;
  borderColor: string;
  bgImagePath?: string;
  progress: number;
}

function LivingPhoto({
  imagePath,
  name,
  borderColor,
  bgImagePath = "/assets/palace.webp",
  progress,
}: LivingPhotoProps) {
  const cutoutTexture = useTexture(imagePath);
  const bgTexture = useTexture(bgImagePath);

  const groupRef = useRef<THREE.Group>(null);
  const bgMeshRef = useRef<THREE.Mesh>(null);
  const cutoutMeshRef = useRef<THREE.Mesh>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);

  // Aspect ratio calculations
  const cutoutAspect = useMemo(() => {
    if (cutoutTexture && cutoutTexture.image) {
      const img = cutoutTexture.image as any;
      if (img && img.width && img.height) {
        return img.width / img.height;
      }
    }
    return 0.75;
  }, [cutoutTexture]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const isGroom = name.toLowerCase() === "groom";
    // Unique phase offset for grooming vs bride floating to keep them organic
    const phaseOffset = isGroom ? 0 : Math.PI * 0.4;

    // 1. Slow drifting/floating motion (organic drift)
    const floatY = Math.sin(elapsed * 1.1 + phaseOffset) * 0.05;
    const floatX = Math.cos(elapsed * 0.8 + phaseOffset) * 0.03;
    const floatRotZ = Math.sin(elapsed * 0.6 + phaseOffset) * 0.02;

    if (groupRef.current) {
      // Perspective tilt rotation based on mouse coordinates
      const targetRotX = -state.pointer.y * 0.15;
      const targetRotY = state.pointer.x * 0.18;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, floatRotZ, 0.06);
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, floatX, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, 0.06);
    }

    // 2. Layered Parallax Differential Displacement
    if (cutoutMeshRef.current) {
      // Cutout translates more aggressively on mouse hover
      const targetCutoutX = state.pointer.x * 0.15;
      const targetCutoutY = state.pointer.y * 0.08;
      cutoutMeshRef.current.position.x = THREE.MathUtils.lerp(cutoutMeshRef.current.position.x, targetCutoutX, 0.08);
      cutoutMeshRef.current.position.y = THREE.MathUtils.lerp(cutoutMeshRef.current.position.y, targetCutoutY, 0.08);
      
      // Breathing effect on the cutout
      const breath = 1.0 + Math.sin(elapsed * 1.3 + phaseOffset) * 0.012;
      cutoutMeshRef.current.scale.set(breath, breath, 1);
    }

    if (bgMeshRef.current) {
      // Background frame translates minimally to enhance parallax separation depth
      const targetBgX = state.pointer.x * 0.04;
      const targetBgY = state.pointer.y * 0.02;
      bgMeshRef.current.position.x = THREE.MathUtils.lerp(bgMeshRef.current.position.x, targetBgX, 0.08);
      bgMeshRef.current.position.y = THREE.MathUtils.lerp(bgMeshRef.current.position.y, targetBgY, 0.08);
    }

    if (shadowMeshRef.current) {
      // Shadow translates in the OPPOSITE direction to simulate dynamic lighting shift
      const targetShadowX = -state.pointer.x * 0.12 - 0.03;
      const targetShadowY = -state.pointer.y * 0.06 - 0.04;
      shadowMeshRef.current.position.x = THREE.MathUtils.lerp(shadowMeshRef.current.position.x, targetShadowX, 0.08);
      shadowMeshRef.current.position.y = THREE.MathUtils.lerp(shadowMeshRef.current.position.y, targetShadowY, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Background Frame Layer (z = -0.05) */}
      <group ref={bgMeshRef} position={[0, 0, -0.05]}>
        {/* Outer Frame with Gold or Rose Gold Accent */}
        <mesh>
          <planeGeometry args={[1.55, 2.05]} />
          <meshStandardMaterial
            color={borderColor}
            roughness={0.15}
            metalness={0.9}
            transparent
            opacity={progress}
          />
        </mesh>
        
        {/* Inner Glassmorphic Palace Canvas */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.45, 1.95]} />
          <meshStandardMaterial
            map={bgTexture}
            color="#FFFDF9"
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={progress * 0.45} // Semi-opaque palace painting backdrop
          />
        </mesh>
        
        {/* Fine border trim */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[1.47, 1.97]} />
          <meshStandardMaterial
            color={borderColor}
            roughness={0.1}
            metalness={0.9}
            wireframe
            transparent
            opacity={progress}
          />
        </mesh>
      </group>

      {/* 2. Soft Dynamic Drop Shadow Layer (z = 0.05) */}
      <mesh ref={shadowMeshRef} position={[0, -0.05, 0.05]}>
        <planeGeometry args={[1.3 * cutoutAspect, 1.6]} />
        <meshBasicMaterial
          map={cutoutTexture}
          color="#3A2D22" // Dark brown shadow color
          transparent
          opacity={progress * 0.3}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Foreground Cutout Subject (z = 0.20) */}
      <mesh ref={cutoutMeshRef} position={[0, 0, 0.20]} castShadow>
        <planeGeometry args={[1.35 * cutoutAspect, 1.7]} />
        <meshStandardMaterial
          map={cutoutTexture}
          transparent={true}
          alphaTest={0.001}
          roughness={0.2}
          metalness={0.05}
          opacity={progress}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// 4. Palace Arches & Pillars environment
function PalaceEnvironment() {
  const creamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FAF7F2"),
    roughness: 0.4,
  }), []);

  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D4AF37"),
    metalness: 0.9,
    roughness: 0.15,
  }), []);

  const archMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#E8B04A"),
    metalness: 0.7,
    roughness: 0.2,
  }), []);

  // Floating Diyas
  const diyas = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6.5,
        -2.5 + Math.random() * 5,
        -0.8 - Math.random() * 2.0
      ),
      speed: Math.random() * 0.004 + 0.002,
      wobbleSpeed: Math.random() * 1.2 + 0.6,
      wobbleRange: Math.random() * 0.12 + 0.04,
      scale: Math.random() * 0.2 + 0.8,
    }));
  }, []);

  const diyaRefs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    diyas.forEach((diya, idx) => {
      const mesh = diyaRefs.current[idx];
      if (mesh) {
        diya.position.y += diya.speed;
        const sway = Math.sin(elapsed * diya.wobbleSpeed) * diya.wobbleRange;
        mesh.position.x = diya.position.x + sway;
        mesh.position.y = diya.position.y;
        
        if (diya.position.y > 3) {
          diya.position.y = -3.2;
          diya.position.x = (Math.random() - 0.5) * 6.5;
        }
      }
    });
  });

  return (
    <group>
      {/* Palace Arches */}
      <mesh position={[0, 1.2, -2.5]} rotation={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.06, 8, 48, Math.PI]} />
        <primitive object={archMaterial} />
      </mesh>
      <mesh position={[0, 1.6, -3.2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[4.2, 0.08, 8, 48, Math.PI]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Side Pillars */}
      {/* Front Left */}
      <group position={[-3.3, -1.2, -1.8]}>
        <mesh material={creamMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 4.4, 16]} />
        </mesh>
        <mesh position={[0, -2.1, 0]} material={goldMaterial}>
          <boxGeometry args={[0.38, 0.2, 0.38]} />
        </mesh>
        <mesh position={[0, 2.1, 0]} material={goldMaterial}>
          <boxGeometry args={[0.38, 0.16, 0.38]} />
        </mesh>
      </group>

      {/* Front Right */}
      <group position={[3.3, -1.2, -1.8]}>
        <mesh material={creamMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 4.4, 16]} />
        </mesh>
        <mesh position={[0, -2.1, 0]} material={goldMaterial}>
          <boxGeometry args={[0.38, 0.2, 0.38]} />
        </mesh>
        <mesh position={[0, 2.1, 0]} material={goldMaterial}>
          <boxGeometry args={[0.38, 0.16, 0.38]} />
        </mesh>
      </group>

      {/* Back Columns */}
      <group position={[-4.5, -1.0, -3.5]}>
        <mesh material={creamMaterial}>
          <cylinderGeometry args={[0.13, 0.13, 4.8, 16]} />
        </mesh>
        <mesh position={[0, 2.3, 0]} material={goldMaterial}>
          <boxGeometry args={[0.32, 0.14, 0.32]} />
        </mesh>
      </group>
      <group position={[4.5, -1.0, -3.5]}>
        <mesh material={creamMaterial}>
          <cylinderGeometry args={[0.13, 0.13, 4.8, 16]} />
        </mesh>
        <mesh position={[0, 2.3, 0]} material={goldMaterial}>
          <boxGeometry args={[0.32, 0.14, 0.32]} />
        </mesh>
      </group>

      {/* Floating Diyas */}
      {diyas.map((diya, i) => (
        <group
          key={diya.id}
          ref={(el) => {
            if (el) diyaRefs.current[i] = el;
          }}
          position={diya.position.toArray()}
          scale={[diya.scale, diya.scale, diya.scale]}
        >
          <mesh material={goldMaterial}>
            <cylinderGeometry args={[0.09, 0.05, 0.05, 12]} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <coneGeometry args={[0.024, 0.08, 8]} />
            <meshBasicMaterial color="#E8B04A" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
          </mesh>
          <pointLight position={[0, 0.08, 0]} intensity={0.15} distance={1.2} color="#E8B04A" />
        </group>
      ))}

      {/* Soft Clouds */}
      <group position={[0, -2.5, -4]}>
        <mesh position={[-1.8, 0, 0]} material={creamMaterial}>
          <sphereGeometry args={[1.2, 16, 16]} />
        </mesh>
        <mesh position={[1.8, 0, 0]} material={creamMaterial}>
          <sphereGeometry args={[1.2, 16, 16]} />
        </mesh>
        <mesh position={[0, 0.4, 0.3]} material={creamMaterial}>
          <sphereGeometry args={[1.5, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// 5. Falling Saffron & Gold Petals
interface SaffronPetalsProps {
  count?: number;
}

function SaffronPetals({ count = 45 }: SaffronPetalsProps) {
  const petals = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 10 + 2,
          (Math.random() - 0.5) * 8
        ),
        speed: Math.random() * 0.012 + 0.007,
        spinSpeed: (Math.random() - 0.5) * 0.015,
        swingSpeed: Math.random() * 1.5 + 0.7,
        swingRange: Math.random() * 0.35 + 0.15,
        scale: Math.random() * 0.06 + 0.04,
        color: i % 2 === 0 ? "#E8B04A" : "#D8A28C",
      });
    }
    return temp;
  }, [count]);

  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    petals.forEach((petal, idx) => {
      const mesh = meshRefs.current[idx];
      if (mesh) {
        petal.position.y -= petal.speed;
        const sway = Math.sin(elapsed * petal.swingSpeed) * petal.swingRange;
        mesh.position.x = petal.position.x + sway;
        mesh.position.y = petal.position.y;
        
        mesh.rotation.x += petal.spinSpeed;
        mesh.rotation.y += petal.spinSpeed * 1.2;
        
        if (petal.position.y < -5) {
          petal.position.y = 10;
          petal.position.x = (Math.random() - 0.5) * 15;
        }
      }
    });
  });

  return (
    <>
      {petals.map((petal, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={petal.position.toArray()}
          scale={[petal.scale, petal.scale * 1.2, petal.scale]}
        >
          <coneGeometry args={[1, 1.3, 4]} />
          <meshStandardMaterial
            color={petal.color}
            roughness={0.5}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

// 6. Floating Saffron Sparkles
interface DivineSparklesProps {
  count?: number;
}

function DivineSparkles({ count = 220 }: DivineSparklesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 20;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.025;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#E8B04A"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// 7. Dynamic Camera & Parallax reveal controller
function SceneController({ scrollProgress }: { scrollProgress: number }) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = size.width < 768;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Smooth cinematic zoom and pan in over 3 seconds
    const factor = Math.min(1.0, elapsed / 3.0);
    const easeFactor = factor * (2 - factor);
    
    const startZ = isMobile ? 10.0 : 7.2;
    const endZ = (isMobile ? 6.5 : 4.8) + scrollProgress * 1.5;
    const targetZ = startZ * (1 - easeFactor) + endZ * easeFactor;

    const startY = isMobile ? 2.8 : 2.2;
    const endY = (isMobile ? 0.8 : 0.3) - scrollProgress * 1.0;
    const targetY = startY * (1 - easeFactor) + endY * easeFactor;

    const startLookY = isMobile ? 1.4 : 1.0;
    const endLookY = (isMobile ? 0.35 : 0.0) - scrollProgress * 0.6;
    const targetLookY = startLookY * (1 - easeFactor) + endLookY * easeFactor;

    const parallaxX = mouse.current.x * 0.5;
    const parallaxY = mouse.current.y * 0.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    camera.lookAt(0, targetLookY, 0);
  });

  return null;
}

// 8. SceneContent Coordinator (Fading, layout adjustments & placement)
function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  const ganeshaGroupRef = useRef<THREE.Group>(null);
  const coupleGroupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  
  const { size } = useThree();
  const isMobile = size.width < 768;

  // Responsive adjustments for scale and positions
  const groomPos = useMemo(() => (isMobile ? [-0.55, -0.45, 0.3] : [-0.95, 0, 0.3]) as [number, number, number], [isMobile]);
  const bridePos = useMemo(() => (isMobile ? [0.55, 0.25, 0.3] : [0.95, 0, 0.3]) as [number, number, number], [isMobile]);
  const coupleScale = isMobile ? 0.72 : 1.0;
  const ganeshaScale = isMobile ? 0.85 : 1.05;

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Ganesha fade-in and hover
    if (ganeshaGroupRef.current) {
      const progress = Math.min(1.0, elapsed / 1.2);
      ganeshaGroupRef.current.position.y = 1.1 + Math.sin(elapsed * 1.0) * 0.06 - scrollProgress * 0.4;
      
      ganeshaGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => {
            m.transparent = true;
            m.opacity = progress;
          });
        }
      });
    }

    // Aura pulse glow
    if (auraRef.current) {
      const scale = (isMobile ? 1.3 : 1.6) + Math.sin(state.clock.getElapsedTime() * 1.6) * 0.08;
      auraRef.current.scale.set(scale, scale, 1);
    }

    // Couple fade-in and rise
    if (coupleGroupRef.current) {
      const delay = 1.2;
      const progress = Math.max(0.0, Math.min(1.0, (elapsed - delay) / 1.5));
      const ease = progress * (2 - progress); // ease-out
      
      // Rise to final position
      coupleGroupRef.current.position.y = -2.3 + ease * 0.7 - scrollProgress * 0.8;
      
      coupleGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => {
            m.transparent = true;
            m.opacity = progress;
          });
        }
      });
    }
  });

  return (
    <>
      {/* 3D Ganesha Image Plane */}
      <group ref={ganeshaGroupRef} position={[0, 1.1, 0]} scale={[ganeshaScale, ganeshaScale, ganeshaScale]}>
        {/* Soft Golden Aura backdrop */}
        <mesh ref={auraRef} position={[0, 0, -0.15]} scale={[1.6, 1.6, 1]}>
          <ringGeometry args={[0, 1.3, 64]} />
          <meshBasicMaterial
            color="#E8B04A"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        <GaneshaPlane progress={1.0} />
      </group>

      {/* Bride & Groom Couple Living Photos */}
      <group ref={coupleGroupRef} position={[0, -2.3, 0.4]} scale={[coupleScale, coupleScale, coupleScale]}>
        <group position={groomPos}>
          <LivingPhoto
            imagePath="/assets/groom.webp"
            name="Groom"
            borderColor="#D4B06A" // Gold Accent
            progress={1.0}
          />
        </group>
        <group position={bridePos}>
          <LivingPhoto
            imagePath="/assets/bride.webp"
            name="Bride"
            borderColor="#CFA18D" // Rose Gold Accent
            progress={1.0}
          />
        </group>
      </group>

      <PalaceEnvironment />
    </>
  );
}

// Parent 3D Canvas wrapper
interface Scene3DProps {
  scrollProgress?: number;
}

export default function Scene3D({ scrollProgress = 0 }: Scene3DProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 7.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent" as any]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.9} color="#FFFFFF" />
        
        <spotLight
          position={[5, 10, 4]}
          angle={0.4}
          penumbra={1}
          intensity={1.8}
          color="#E8B04A"
          castShadow
        />

        <directionalLight
          position={[-5, 5, 4]}
          intensity={0.7}
          color="#FFFDF9"
        />

        <directionalLight
          position={[0, -5, 0]}
          intensity={0.3}
          color="#F8F1E7"
        />

        {/* Scene Content wrapped in Suspense for async texture stream */}
        <React.Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} />
        </React.Suspense>

        {/* Hanging swinging temple bells */}
        <TempleBell position={[-2.4, 0.8, 0.2]} rotation={[0, 0, 0]} swingSpeed={0.8} swingRange={0.06} delay={0} />
        <TempleBell position={[2.4, 0.8, 0.2]} rotation={[0, 0, 0]} swingSpeed={0.9} swingRange={0.06} delay={Math.PI * 0.5} />
        <TempleBell position={[-3.6, 1.4, -1]} rotation={[0, 0, 0]} swingSpeed={0.6} swingRange={0.04} delay={Math.PI * 0.2} />
        <TempleBell position={[3.6, 1.4, -1]} rotation={[0, 0, 0]} swingSpeed={0.7} swingRange={0.04} delay={Math.PI * 0.7} />

        {/* Particles */}
        <DivineSparkles count={150} />
        <SaffronPetals count={35} />

        {/* Camera controller */}
        <SceneController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
