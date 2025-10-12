'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF, Text } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 旗のコンポーネント
function Flag({ location, offsetX, offsetZ }: { location: string; offsetX: number; offsetZ: number }) {
  const flagRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!flagRef.current) return;
    // 旗を微かに揺らす
    const time = state.clock.getElapsedTime();
    if (flagRef.current.children[1]) {
      flagRef.current.children[1].rotation.y = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={flagRef} position={[offsetX, 0, offsetZ]}>
      {/* 旗竿 */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 旗の布 */}
      <group position={[0.8, 3.5, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 1]} />
          <meshStandardMaterial color="#ff6b35" side={THREE.DoubleSide} />
        </mesh>

        {/* 旗のテキスト */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {location}
        </Text>
      </group>

      {/* 旗竿の台座 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.3, 16]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}

// テスラModel 3の3Dモデル
function TeslaCar({
  modelPath,
}: {
  modelPath: string;
}) {
  const gltf = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // モデルのマテリアルを調整
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                // 車体の塗装
                if (mat.name.includes('paint') || mat.name.includes('body') || mat.name.includes('Paint') || mat.name.includes('Body')) {
                  mat.color = new THREE.Color('#ffffff');
                  mat.metalness = 0.95;
                  mat.roughness = 0.05;
                  mat.envMapIntensity = 2;
                }
                // ガラス
                else if (mat.name.includes('glass') || mat.name.includes('window') || mat.name.includes('Glass') || mat.name.includes('Window')) {
                  mat.transparent = true;
                  mat.opacity = 0.2;
                  mat.metalness = 0;
                  mat.roughness = 0;
                  mat.envMapIntensity = 1;
                }
                // タイヤ
                else if (mat.name.includes('tire') || mat.name.includes('Tire') || mat.name.includes('rubber') || mat.name.includes('Rubber')) {
                  mat.color = new THREE.Color('#1a1a1a');
                  mat.metalness = 0;
                  mat.roughness = 0.9;
                }
                // ホイール
                else if (mat.name.includes('wheel') || mat.name.includes('Wheel') || mat.name.includes('rim') || mat.name.includes('Rim')) {
                  mat.color = new THREE.Color('#c0c0c0');
                  mat.metalness = 0.9;
                  mat.roughness = 0.2;
                }
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color = new THREE.Color('#ffffff');
            mesh.material.metalness = 0.9;
            mesh.material.roughness = 0.1;
            mesh.material.envMapIntensity = 2;
          }
        }

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [gltf]);

  // 初期位置設定
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 320 * (Math.PI / 180), 0);
    }
    timeRef.current = 0;
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={0.01} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

// 車と旗を一緒に動かすコンポーネント
function MovingGroup({ location }: { location: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  useFrame((_state, delta) => {
    if (!groupRef.current || !isVisible) return;

    timeRef.current += delta;

    // 10秒で描画ストップ
    if (timeRef.current >= 10) {
      setIsVisible(false);
      return;
    }

    const progress = timeRef.current / 10;

    // 加速のためのeasing（だんだん速くなる）
    const easeInCubic = (t: number) => t * t * t * 2;
    const t = easeInCubic(progress);

    // スタート位置から終了位置へ移動
    const startPos = new THREE.Vector3(1, 0, 1);
    const endPos = new THREE.Vector3(30, 0, -30);
    const currentPos = new THREE.Vector3().lerpVectors(startPos, endPos, t);

    groupRef.current.position.copy(currentPos);
  });

  if (!isVisible) return null;

  // 車と旗の相対位置
  // 車は基準位置、旗は車の前方に配置
  const carOffsetX = 0;
  const carOffsetZ = 0;
  const flagOffsetX = 29; // 車の前方
  const flagOffsetZ = -31;

  return (
    <group ref={groupRef}>
      {/* 車 */}
      <group position={[carOffsetX, 0, carOffsetZ]}>
        <Suspense fallback={null}>
          <TeslaCar modelPath="/models/tesla-model-3.glb" />
        </Suspense>
      </group>

      {/* 旗（車の前方） */}
      <Suspense fallback={null}>
        <Flag location={location} offsetX={flagOffsetX} offsetZ={flagOffsetZ} />
      </Suspense>
    </group>
  );
}

function Scene({ location }: { location: string }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // カメラの位置 - 既存のTeslaSceneと同じ設定
  useFrame(() => {
    if (!cameraRef.current) return;
    const targetPosition = new THREE.Vector3(-2, 1.5, 5);
    const targetLookAt = new THREE.Vector3(0, 0, -5);

    cameraRef.current.position.lerp(targetPosition, 0.05);
    cameraRef.current.lookAt(targetLookAt);
  });

  return (
    <>
      {/* カメラ - 既存と同じ設定 */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={50} />

      {/* カメラコントロール */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0, 0, 0]}
        minDistance={2}
        maxDistance={10}
        enabled={false}
      />

      {/* 照明 - 既存のTeslaSceneと同じ設定 */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 3, -5]} intensity={1} />
      <pointLight position={[0, 3, -3]} intensity={1.5} color="#ffffff" />

      {/* HDR環境マップ */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* 車と旗を一緒に動かす */}
      <MovingGroup location={location} />
    </>
  );
}

export default function TeslaWithFlag({ location }: { location: string }) {
  return (
    <div className="w-full h-full bg-white relative">
      <Canvas
        style={{ height: '100%' }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#ffffff']} />
        <Scene location={location} />
      </Canvas>

      {/* CC BY 4.0 Attribution */}
      <div className="absolute bottom-1 right-1 text-[8px] text-gray-400 max-w-xs text-right leading-tight">
        <a
          href="https://sketchfab.com/3d-models/tesla-model-3-realistic-graphics-4cf4fa457fbe4f32808348d7b8a13939"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600"
        >
          Tesla Model 3 (Realistic Graphics)
        </a>
        {' '}by ChoochooLi Models on Sketchfab, accessed October 12, 2025. Modified: colors changed. Licensed under CC BY 4.0.
      </div>
    </div>
  );
}

useGLTF.preload('/models/tesla-model-3.glb');
