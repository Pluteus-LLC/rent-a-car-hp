'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import {Suspense, useEffect, useRef} from 'react';
import * as THREE from 'three';

// テスラModel 3の3Dモデルを読み込む
function TeslaCar({
  modelPath,
  animationState
}: {
  modelPath: string;
  animationState: 'entering' | 'parked-right' | 'parked-center';
}) {
  const gltf = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  let animationStateLocal = animationState;

  // モデルのマテリアルを調整
  gltf.scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      // 白色の車体マテリアルを設定
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
          // デフォルトで白い車体
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

  // アニメーション
    // 例: 停車先は外部状態やpropsから決める
// const parkTarget = 'right' | 'center';
    const parkTargetRef = useRef<'right' | 'center'>('right'); // 例: 右に停車
    const startYaw = 180;

    useEffect(() => {
        // スタート地点 = 動作スタート地点 を一致させておく
        if (groupRef.current) {
            groupRef.current.position.set(0, 0, -20); // 左奥
            groupRef.current.rotation.set(0, startYaw, 0); // +x向き
        }
        timeRef.current = 0;
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // ---- パラメータ ----
        const total = 3;
        const split1 = 0.75;                // 直進
        const split2 = 0.01;              // その場旋回
        const split3 = 0.5;              // 前進（最終停車点へ）

        const yHeight = 0;

        // 終着(=停車)の候補を事前定義
        const parkPositions = {
            right:  new THREE.Vector3( 2, yHeight, 0),
            center: new THREE.Vector3( 0, yHeight, 0),
        } as const;
        // 2, yHeight, 0
        // アニメ内でも停車中でも常に同じ endPos を見る
        const endPos = parkPositions[parkTargetRef.current];

        // 経路点
        const startPos  = new THREE.Vector3(0, yHeight, -20); // 左奥
        const cornerPos = new THREE.Vector3(20, yHeight, 0); // 角
        // フェーズ3は cornerPos → endPos（=停車地点）へ

        const endYaw   = 240;           // +z 正面

        // Easing
        const easeOutCubic   = (t: number) => 1 - Math.pow(1 - t, 3);
        const easeInCubic = (t: number) => t * t * t * 6;
        // ダンピング係数
        const damp = (lambda: number) => 1 - Math.pow(1 - lambda, delta * 60);
        const posDamp = damp(0.12);

        const targetPosition = new THREE.Vector3();
        let targetRotationY = endYaw;

        if (animationStateLocal === 'entering') {
            timeRef.current += delta;
            const progress = Math.min(timeRef.current / total, 1);
            // フェーズ毎に分割して処理
            if (progress < split1) {
                const local = (progress) / split1;                 // 0→1
                const t = easeInCubic(Math.min(Math.max(local, 0), 1));
                targetPosition.lerpVectors(startPos, cornerPos, t);
                targetRotationY = startYaw;

            } else if (progress < split1 + split2) {
                // フェーズ2: 角でその場90°右回り (+π/2 → 0)
                targetPosition.copy(cornerPos); // 据え置き
                targetRotationY = endYaw;
            } else {
                // フェーズ3: 正面のまま 角 → endPos(=停車地点)
                const local = (progress - split1 - split2) / split3;
                const t = easeOutCubic(local);
                targetPosition.lerpVectors(cornerPos, endPos, t);
                targetRotationY = endYaw;
            }

            // 完了時に parked へ。ターゲットは同一(endPos)なので"もう一段階"が発生しない
            if (progress >= 1) {
                animationStateLocal = 'parked-right';
            }
        } else if (animationStateLocal === 'parked-right' || animationStateLocal === 'parked-center') {
            // 停車中も endPos を維持（固定の終了地点と同じ座標）
            targetPosition.copy(endPos);
            targetRotationY = endYaw;
            // timeRef はあえて触らない（別アニメ開始時だけリセット）
        } else {
            // 待機: スタート地点にいて +x 向き
            targetPosition.copy(startPos);
            targetRotationY = startYaw;
        }

        // スムーズ追従
        const obj = groupRef.current;
        obj.position.lerp(targetPosition, posDamp);
        obj.rotation.y = targetRotationY;
    });


    return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={0.01} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

function Scene({
  animationState
}: {
  animationState: 'entering' | 'parked-right' | 'parked-center';
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // カメラの位置をアニメーションに合わせて調整
  useFrame(() => {
    if (!cameraRef.current) return;

    const targetPosition = new THREE.Vector3(-2, 1.5, 5);
    let targetLookAt = new THREE.Vector3(2, 0, 0);

    if (animationState === 'parked-center') {
      // 中央に移動後は中央を見る
      targetLookAt = new THREE.Vector3(0, 0, 0);
    }

    cameraRef.current.position.lerp(targetPosition, 0.05);
    cameraRef.current.lookAt(targetLookAt);
  });

  return (
    <>
      {/* カメラ - モデルを見やすく */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.5, 0]} fov={50} />

      {/* カメラコントロール */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        target={[0, 0, 0]}
        minDistance={2}
        maxDistance={10}
        enabled={true}
      />

      {/* 照明 - シンプルで明るく */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 3, -5]} intensity={1} />
      <pointLight position={[0, 3, -3]} intensity={1.5} color="#ffffff" />

      {/* HDR環境マップ */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* テスラModel 3 */}
      <Suspense fallback={null}>
        <TeslaCar modelPath="/models/tesla-model-3.glb" animationState={animationState} />
      </Suspense>
    </>
  );
}

export default function TeslaScene({
  animationState = 'entering'
}: {
  animationState?: 'entering' | 'parked-right' | 'parked-center';
}) {
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
        <Scene animationState={animationState} />
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
