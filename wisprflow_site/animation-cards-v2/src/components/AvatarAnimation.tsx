import React, { useEffect, useState } from 'react';

// Avatar Animation Interface
interface Avatar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  initialDelay: number;
  bounceDelay: number;
  destinationDelay: number;
  bounceDirection: 'left' | 'right';
  bounceOffset: { x: number; y: number; rotate: number };
  finalPosition: { x: number; y: number };
  phase: 'waiting' | 'bouncing' | 'settling' | 'complete' | 'fading';
  groupIndex: number;
  opacity: number;
  transform: string;
}

// Stock avatar image URLs
const avatarImages: string[] = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
  'https://randomuser.me/api/portraits/women/29.jpg',
  'https://randomuser.me/api/portraits/men/28.jpg',
  'https://randomuser.me/api/portraits/women/19.jpg',
  'https://randomuser.me/api/portraits/men/53.jpg',
  'https://randomuser.me/api/portraits/women/15.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/31.jpg',
  'https://randomuser.me/api/portraits/men/21.jpg',
  'https://randomuser.me/api/portraits/women/24.jpg',
  'https://randomuser.me/api/portraits/men/40.jpg',
  'https://randomuser.me/api/portraits/women/52.jpg',
  'https://randomuser.me/api/portraits/men/35.jpg'
];

export default function AvatarAnimation() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [windowHeight, setWindowHeight] = useState(768);

  // Helper functions for animation
  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  const getCubicBezier = () => {
    const p1 = randomBetween(0.2, 0.3);
    const p2 = randomBetween(0.62, 0.72);
    const p3 = randomBetween(0.51, 0.61);
    return `cubic-bezier(${p1}, ${p2}, ${p3}, 1)`;
  };

  // Helper function to determine if an avatar should have a metallic border
  const shouldHaveMetallicBorder = (avatarId: number, groupIndex: number) => {
    return avatarId === groupIndex;
  };

  // Continuous overlapping avatar animation waves
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const animationIntervals: NodeJS.Timeout[] = [];
    let avatarIdCounter = 0;
    let occupiedAreas: { groupId: number; x1: number; y1: number; x2: number; y2: number }[] = [];

    const baseAvatarSize = Math.max(48, Math.min(96, 64 + (windowWidth / 1920) * 32));
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

    const getBounceOffset = (bounceDirection: 'left' | 'right', size: number) => {
      const edgeMargin = Math.max(12, Math.min(50, windowWidth * 0.04));
      const rightEdge = windowWidth - size - edgeMargin;
      const leftEdge = edgeMargin;
      const yPosition = randomBetween(0.4 * windowHeight, 0.6 * windowHeight);
      const rotation = randomBetween(-90, 90);

      return {
        x: bounceDirection === 'right' ? rightEdge : leftEdge,
        y: yPosition,
        rotate: rotation
      };
    };

    // Generate random settling point in the bottom third of the screen
    const getRandomSettlingPoint = (groupWidth: number, groupHeight: number) => {
      const isMobile = windowWidth <= 768;
      const margin = Math.max(16, Math.min(150, windowWidth * 0.08));
      const padding = isMobile ? 8 : 16;

      const minCenterX = margin + groupWidth / 2;
      const maxCenterX = (windowWidth - margin) - groupWidth / 2;

      const bottomThirdMin = windowHeight * (2 / 3);
      const bottomThirdMax = windowHeight - margin;
      const minCenterY = Math.max(bottomThirdMin + groupHeight / 2, margin + groupHeight / 2);
      const maxCenterY = bottomThirdMax - groupHeight / 2;

      const textAreaCenterX = windowWidth / 2;
      const textAreaCenterY = windowHeight / 2;
      const textAvoidRadius = isMobile ? Math.min(200, windowHeight * 0.15) : Math.min(300, windowHeight * 0.22);

      let attempts = 0;
      let centerX = minCenterX;
      let centerY = minCenterY;

      const intersects = (
        a: { x1: number; y1: number; x2: number; y2: number },
        b: { x1: number; y1: number; x2: number; y2: number }
      ) => {
        return !(
          a.x2 + padding < b.x1 ||
          a.x1 - padding > b.x2 ||
          a.y2 + padding < b.y1 ||
          a.y1 - padding > b.y2
        );
      };

      const safeMinCenterX = Math.min(minCenterX, Math.max(minCenterX, windowWidth / 2));
      const safeMaxCenterX = Math.max(maxCenterX, Math.min(maxCenterX, windowWidth / 2));
      const safeMinCenterY = Math.min(minCenterY, Math.max(minCenterY, windowHeight * 0.8));
      const safeMaxCenterY = Math.max(maxCenterY, Math.min(maxCenterY, windowHeight * 0.9));

      while (attempts < (isMobile ? 200 : 120)) {
        const minCX = minCenterX <= maxCenterX ? minCenterX : safeMinCenterX;
        const maxCX = minCenterX <= maxCenterX ? maxCenterX : safeMaxCenterX;
        const minCY = minCenterY <= maxCenterY ? minCenterY : safeMinCenterY;
        const maxCY = minCenterY <= maxCenterY ? maxCenterY : safeMaxCenterY;

        centerX = randomBetween(minCX, maxCX);
        centerY = randomBetween(minCY, maxCY);

        const distanceFromText = Math.sqrt(
          Math.pow(centerX - textAreaCenterX, 2) +
          Math.pow(centerY - textAreaCenterY, 2)
        );

        const candidate = {
          x1: centerX - groupWidth / 2,
          y1: centerY - groupHeight / 2,
          x2: centerX - groupWidth / 2 + groupWidth,
          y2: centerY - groupHeight / 2 + groupHeight,
        };

        const overlapsExisting = occupiedAreas.some((area) => intersects(candidate, area));

        if (distanceFromText >= textAvoidRadius && !overlapsExisting) break;
        attempts++;
      }

      if (attempts >= (isMobile ? 200 : 120)) return null;
      return { centerX, centerY };
    };

    // Create a single group of avatars
    const createAvatarGroup = (): Avatar[] | null => {
      const isMobile = windowWidth <= 768;
      const avatarsPerGroup = isMobile ? 9 : 5;
      const groupId = avatarIdCounter;
      avatarIdCounter += avatarsPerGroup;

      let groupAvatarSize = baseAvatarSize;
      let spacing = groupAvatarSize;
      const gridCols = Math.ceil(Math.sqrt(avatarsPerGroup));
      const gridRows = Math.ceil(avatarsPerGroup / gridCols);
      let gridWidth = (gridCols - 1) * spacing + groupAvatarSize;
      let gridHeight = (gridRows - 1) * spacing + groupAvatarSize;

      const margin = Math.max(16, Math.min(150, windowWidth * 0.08));
      const allowedWidth = (windowWidth - margin * 2);
      const allowedHeight = (windowHeight - margin) - (windowHeight * (2 / 3));
      const scaleFactor = Math.min(
        allowedWidth / gridWidth,
        allowedHeight / gridHeight,
        1
      );
      if (scaleFactor < 1) {
        groupAvatarSize = Math.max(36, groupAvatarSize * scaleFactor);
        spacing = groupAvatarSize;
        gridWidth = (gridCols - 1) * spacing + groupAvatarSize;
        gridHeight = (gridRows - 1) * spacing + groupAvatarSize;
      }

      const settlingPoint = getRandomSettlingPoint(gridWidth, gridHeight);
      if (!settlingPoint) {
        return null;
      }
      const { centerX, centerY } = settlingPoint;

      const groupAvatars = Array.from({ length: avatarsPerGroup }, (_, i) => {
        const startX = randomBetween(groupAvatarSize, Math.max(groupAvatarSize + 1, windowWidth - groupAvatarSize));
        const startY = -groupAvatarSize - 50;

        const col = i % gridCols;
        const row = Math.floor(i / gridCols);

        const innerGridWidth = (gridCols - 1) * spacing;
        const innerGridHeight = (gridRows - 1) * spacing;
        const finalX = centerX - innerGridWidth / 2 + col * spacing;
        const finalY = centerY - innerGridHeight / 2 + row * spacing;

        const initialDelay = randomBetween(0.25, 1) * 1000;
        const bounceDelay = randomBetween(1.5, 4.25) * 1000;
        const destinationDelay = 1.5 * bounceDelay;
        const bounceDirection: 'left' | 'right' = Math.random() > 0.5 ? 'right' : 'left';
        const bounceOffset = getBounceOffset(bounceDirection, groupAvatarSize);

        return {
          id: groupId + i,
          x: startX,
          y: startY,
          size: groupAvatarSize,
          color: colors[(groupId + i) % colors.length],
          initialDelay,
          bounceDelay,
          destinationDelay,
          bounceDirection,
          bounceOffset,
          finalPosition: { x: finalX, y: finalY },
          phase: 'waiting' as const,
          groupIndex: groupId,
          opacity: 1,
          transform: `translate(${startX}px, ${startY}px) rotate(0deg)`
        };
      });

      const area = {
        groupId,
        x1: Math.max(0, centerX - gridWidth / 2),
        y1: Math.max(0, centerY - gridHeight / 2),
        x2: Math.min(windowWidth, centerX - gridWidth / 2 + gridWidth),
        y2: Math.min(windowHeight, centerY - gridHeight / 2 + gridHeight),
      };
      occupiedAreas.push(area);

      return groupAvatars;
    };

    // Animate a single group
    const animateGroup = (groupAvatars: Avatar[]) => {
      setAvatars(prev => [...prev, ...groupAvatars]);

      groupAvatars.forEach((avatar) => {
        // Phase 1: Start bounce after initial delay
        setTimeout(() => {
          setAvatars(prev => prev.map(a =>
            a.id === avatar.id ? {
              ...a,
              phase: 'bouncing',
              transform: `translate(${avatar.bounceOffset.x}px, ${avatar.bounceOffset.y}px) rotate(${avatar.bounceOffset.rotate}deg)`
            } : a
          ));

          // Phase 2: Settle to final position
          setTimeout(() => {
            setAvatars(prev => prev.map(a =>
              a.id === avatar.id ? {
                ...a,
                phase: 'settling',
                transform: `translate(${avatar.finalPosition.x}px, ${avatar.finalPosition.y}px) rotate(0deg)`
              } : a
            ));

            // Phase 3: Mark as complete
            setTimeout(() => {
              setAvatars(prev => prev.map(a =>
                a.id === avatar.id ? { ...a, phase: 'complete' } : a
              ));
            }, avatar.destinationDelay);
          }, avatar.bounceDelay);
        }, avatar.initialDelay);
      });

      const maxSettleTime = Math.max(...groupAvatars.map(a =>
        a.initialDelay + a.bounceDelay + a.destinationDelay
      ));

      setTimeout(() => {
        setAvatars(prev => prev.map(a =>
          groupAvatars.some(ga => ga.id === a.id) ? { ...a, phase: 'fading', opacity: 0 } : a
        ));

        setTimeout(() => {
          setAvatars(prev => prev.filter(a => !groupAvatars.some(ga => ga.id === a.id)));
          const groupId = groupAvatars[0]?.groupIndex;
          occupiedAreas = occupiedAreas.filter(area => area.groupId !== groupId);
        }, 1000);
      }, maxSettleTime + 3000);
    };

    // Start continuous animation waves
    const startContinuousAnimation = () => {
      const isMobile = windowWidth <= 768;

      const createAndAnimateGroup = () => {
        const newGroup = createAvatarGroup();
        if (newGroup) {
          animateGroup(newGroup);
        }
      };

      if (isMobile) {
        createAndAnimateGroup();
        setTimeout(() => createAndAnimateGroup(), 1000);
        setTimeout(() => createAndAnimateGroup(), 2000);

        setTimeout(() => {
          const groupInterval = setInterval(createAndAnimateGroup, 4000);
          animationIntervals.push(groupInterval);
        }, 3000);
      } else {
        createAndAnimateGroup();
        const groupInterval = setInterval(createAndAnimateGroup, 4000);
        animationIntervals.push(groupInterval);
      }
    };

    startContinuousAnimation();

    return () => {
      animationIntervals.forEach(interval => clearInterval(interval));
    };
  }, [windowWidth, windowHeight]);

  return (
    <>
      <style>{`
        .avatar-metallic-border {
          position: relative;
        }
        
        .avatar-metallic-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24%;
          background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #ea580c 100%);
          z-index: 1;
          pointer-events: none;
        }
        
        .avatar-metallic-border img {
          position: relative;
          z-index: 2;
          width: calc(100% - 8px) !important;
          height: calc(100% - 8px) !important;
          margin: 4px;
          border-radius: 20%;
        }
      `}</style>

      {avatars.map(avatar => {
        let transition = 'none';
        if (avatar.phase === 'bouncing') {
          transition = `transform ${avatar.bounceDelay / 1000}s linear`;
        } else if (avatar.phase === 'settling') {
          transition = `transform ${avatar.destinationDelay / 1000}s ${getCubicBezier()}`;
        } else if (avatar.phase === 'fading') {
          transition = 'opacity 1s ease-out';
        }

        const hasMetallicBorder = shouldHaveMetallicBorder(avatar.id, avatar.groupIndex);

        return (
          <div
            key={avatar.id}
            className={hasMetallicBorder ? 'avatar-metallic-border' : ''}
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${avatar.size}px`,
              height: `${avatar.size}px`,
              overflow: 'hidden',
              borderRadius: '24%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
              transform: avatar.transform,
              opacity: avatar.opacity,
              transition,
              willChange: 'transform, opacity',
              pointerEvents: 'none'
            }}
          >
            <img
              src={avatarImages[avatar.id % avatarImages.length]}
              alt="avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              loading="eager"
            />
          </div>
        );
      })}
    </>
  );
}

