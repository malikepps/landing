/**
 * Avatar Animation for Hero Section
 * Adapted from collective-landing project
 */

(function() {
  'use strict';

  // Avatar image URLs - using local images for better performance
  const avatarImages = [
    'avatar_1.jpg',
    'avatar_2.jpg',
    'avatar_3.jpg',
    'avatar_4.jpg',
    'avatar_5.jpg',
    'avatar_6.jpg',
    'avatar_7.jpg',
    'avatar_8.jpg',
    'avatar_9.jpg',
    'avatar_10.jpg',
    'avatar_11.jpg',
    'avatar_12.jpg',
    'avatar_13.jpg',
    'avatar_14.jpg',
    'avatar_15.jpg',
    'avatar_16.jpg',
    'avatar_17.jpg',
    'avatar_18.jpg',
    'avatar_19.jpg',
    'avatar_20.jpg',
    'avatar_21.jpg',
    'avatar_22.jpg',
    'avatar_23.jpg',
    'avatar_24.jpg',
    'avatar_25.jpg'
  ];

  // State
  let avatars = [];
  let animationIntervals = [];
  let avatarIdCounter = 0;
  let occupiedAreas = [];
  let animationContainer = null;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Helper functions
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getCubicBezier() {
    const p1 = randomBetween(0.2, 0.3);
    const p2 = randomBetween(0.62, 0.72);
    const p3 = randomBetween(0.51, 0.61);
    return `cubic-bezier(${p1}, ${p2}, ${p3}, 1)`;
  }

  function shouldHaveMetallicBorder(avatarId, groupIndex) {
    return avatarId === groupIndex;
  }

  function getBounceOffset(bounceDirection, size) {
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
  }

  function getRandomSettlingPoint(groupWidth, groupHeight) {
    const isMobile = windowWidth <= 768;
    const margin = Math.max(16, Math.min(150, windowWidth * 0.08));
    const padding = isMobile ? 8 : 16;

    const minCenterX = margin + groupWidth / 2;
    const maxCenterX = (windowWidth - margin) - groupWidth / 2;

    // Mobile: ONLY spawn avatars at the VERY BOTTOM of screen (below 85% height)
    // This ensures they're always below any button that would be centered on screen
    // Desktop: Keep them in the bottom area (75% to 90%)
    const bottomThirdMin = isMobile ? windowHeight * 0.85 : windowHeight * 0.75;
    const bottomThirdMax = isMobile ? windowHeight * 0.98 : windowHeight * 0.90;
    const minCenterY = Math.max(bottomThirdMin + groupHeight / 2, margin + groupHeight / 2);
    const maxCenterY = Math.min(bottomThirdMax - groupHeight / 2, windowHeight - margin - groupHeight / 2);

    // On mobile, we assume the button is in the top 70% of the screen
    // So we don't need an avoid radius if we only spawn below 85%
    const textAreaCenterX = windowWidth / 2;
    const textAreaCenterY = isMobile ? windowHeight * 0.4 : windowHeight / 2;
    // Mobile: No avoid radius needed since we're spawning way below the button area
    // Desktop: Large avoid radius to never overlap button area
    const textAvoidRadius = isMobile ? 0 : Math.min(400, windowHeight * 0.40);

    let attempts = 0;
    let centerX = minCenterX;
    let centerY = minCenterY;

    function intersects(a, b) {
      return !(
        a.x2 + padding < b.x1 ||
        a.x1 - padding > b.x2 ||
        a.y2 + padding < b.y1 ||
        a.y1 - padding > b.y2
      );
    }

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
  }

  function createAvatarGroup() {
    const isMobile = windowWidth <= 768;
    // Make avatars smaller on mobile to ensure they stay in the bottom area
    const baseAvatarSize = isMobile ? 
      Math.max(36, Math.min(56, 48 + (windowWidth / 768) * 8)) : 
      Math.max(48, Math.min(96, 64 + (windowWidth / 1920) * 32));
    const avatarsPerGroup = isMobile ? 6 : 5; // Mobile: 6 avatars (2 rows x 3 cols), Desktop: 5
    const groupId = avatarIdCounter;
    avatarIdCounter += avatarsPerGroup;

    let groupAvatarSize = baseAvatarSize;
    let spacing = groupAvatarSize;
    // Mobile: 2 rows x 3 columns (6 avatars), Desktop: square-ish grid
    const gridCols = isMobile ? 3 : Math.ceil(Math.sqrt(avatarsPerGroup));
    const gridRows = isMobile ? 2 : Math.ceil(avatarsPerGroup / gridCols);
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
    if (!settlingPoint) return null;

    const { centerX, centerY } = settlingPoint;

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const groupAvatars = [];

    for (let i = 0; i < avatarsPerGroup; i++) {
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
      const bounceDirection = Math.random() > 0.5 ? 'right' : 'left';
      const bounceOffset = getBounceOffset(bounceDirection, groupAvatarSize);

      groupAvatars.push({
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
        phase: 'waiting',
        groupIndex: groupId,
        opacity: 1,
        transform: `translate(${startX}px, ${startY}px) rotate(0deg)`,
        element: null
      });
    }

    const area = {
      groupId,
      x1: Math.max(0, centerX - gridWidth / 2),
      y1: Math.max(0, centerY - gridHeight / 2),
      x2: Math.min(windowWidth, centerX - gridWidth / 2 + gridWidth),
      y2: Math.min(windowHeight, centerY - gridHeight / 2 + gridHeight),
    };
    occupiedAreas.push(area);

    return groupAvatars;
  }

  function createAvatarElement(avatar) {
    const avatarEl = document.createElement('div');
    avatarEl.className = 'avatar-animation-item';
    if (shouldHaveMetallicBorder(avatar.id, avatar.groupIndex)) {
      avatarEl.classList.add('avatar-metallic-border');
    }

    avatarEl.style.position = 'absolute';
    avatarEl.style.left = '0px';
    avatarEl.style.top = '0px';
    avatarEl.style.width = `${avatar.size}px`;
    avatarEl.style.height = `${avatar.size}px`;
    avatarEl.style.overflow = 'hidden';
    avatarEl.style.borderRadius = '24%';
    avatarEl.style.display = 'flex';
    avatarEl.style.alignItems = 'center';
    avatarEl.style.justifyContent = 'center';
    avatarEl.style.backgroundColor = '#ddd';
    avatarEl.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    avatarEl.style.zIndex = '10';
    avatarEl.style.transform = avatar.transform;
    avatarEl.style.opacity = avatar.opacity;
    avatarEl.style.transition = 'none';
    avatarEl.style.willChange = 'transform, opacity';
    avatarEl.style.pointerEvents = 'none';

    const img = document.createElement('img');
    img.src = avatarImages[avatar.id % avatarImages.length];
    img.alt = 'avatar';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    // Lazy load avatars since they animate in from off-screen
    img.loading = 'lazy';

    avatarEl.appendChild(img);
    return avatarEl;
  }

  function animateGroup(groupAvatars) {
    groupAvatars.forEach((avatar) => {
      const avatarEl = createAvatarElement(avatar);
      avatar.element = avatarEl;
      animationContainer.appendChild(avatarEl);
      avatars.push(avatar);

      // Phase 1: Start bounce after initial delay
      setTimeout(() => {
        if (!avatar.element) return;
        avatar.phase = 'bouncing';
        avatar.transform = `translate(${avatar.bounceOffset.x}px, ${avatar.bounceOffset.y}px) rotate(${avatar.bounceOffset.rotate}deg)`;
        avatar.element.style.transition = `transform ${avatar.bounceDelay / 1000}s linear`;
        avatar.element.style.transform = avatar.transform;

        // Phase 2: Settle to final position
        setTimeout(() => {
          if (!avatar.element) return;
          avatar.phase = 'settling';
          avatar.transform = `translate(${avatar.finalPosition.x}px, ${avatar.finalPosition.y}px) rotate(0deg)`;
          avatar.element.style.transition = `transform ${avatar.destinationDelay / 1000}s ${getCubicBezier()}`;
          avatar.element.style.transform = avatar.transform;

          // Phase 3: Mark as complete
          setTimeout(() => {
            if (!avatar.element) return;
            avatar.phase = 'complete';
          }, avatar.destinationDelay);
        }, avatar.bounceDelay);
      }, avatar.initialDelay);
    });

    const maxSettleTime = Math.max(...groupAvatars.map(a =>
      a.initialDelay + a.bounceDelay + a.destinationDelay
    ));

    setTimeout(() => {
      groupAvatars.forEach(avatar => {
        if (!avatar.element) return;
        avatar.phase = 'fading';
        avatar.opacity = 0;
        avatar.element.style.transition = 'opacity 1s ease-out';
        avatar.element.style.opacity = '0';
      });

      setTimeout(() => {
        groupAvatars.forEach(avatar => {
          if (avatar.element && avatar.element.parentNode) {
            avatar.element.parentNode.removeChild(avatar.element);
          }
          const index = avatars.indexOf(avatar);
          if (index > -1) {
            avatars.splice(index, 1);
          }
        });

        const groupId = groupAvatars[0]?.groupIndex;
        occupiedAreas = occupiedAreas.filter(area => area.groupId !== groupId);
      }, 1000);
    }, maxSettleTime + 3000);
  }

  function startContinuousAnimation() {
    const isMobile = windowWidth <= 768;

    function createAndAnimateGroup() {
      const newGroup = createAvatarGroup();
      if (newGroup) {
        animateGroup(newGroup);
      }
    }

    if (isMobile) {
      createAndAnimateGroup();
      setTimeout(() => createAndAnimateGroup(), 1000);
      setTimeout(() => createAndAnimateGroup(), 2000);

      setTimeout(() => {
        const groupInterval = setInterval(createAndAnimateGroup, 4000);
        animationIntervals.push(groupInterval);
      }, 3000);
    } else {
      // Desktop: Reduced frequency - 8 seconds instead of 4 (50% fewer groups)
      createAndAnimateGroup();
      const groupInterval = setInterval(createAndAnimateGroup, 8000);
      animationIntervals.push(groupInterval);
    }
  }

  function handleResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  function cleanup() {
    animationIntervals.forEach(interval => clearInterval(interval));
    animationIntervals = [];
    avatars.forEach(avatar => {
      if (avatar.element && avatar.element.parentNode) {
        avatar.element.parentNode.removeChild(avatar.element);
      }
    });
    avatars = [];
    occupiedAreas = [];
  }

  function init() {
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .avatar-animation-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
      }

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
        background: linear-gradient(135deg, #F5D0FE 0%, #FAE8FF 50%, #F5D0FE 100%);
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
    `;
    document.head.appendChild(style);

    // Find the hero section and add animation container
    const heroSection = document.querySelector('.section_hero');
    if (!heroSection) {
      console.error('Hero section not found');
      return;
    }

    // Make hero section position relative if it isn't already
    const heroWrapper = heroSection.closest('.hero-wrapper');
    if (heroWrapper) {
      heroWrapper.style.position = 'relative';
    }

    animationContainer = document.createElement('div');
    animationContainer.className = 'avatar-animation-container';
    heroSection.appendChild(animationContainer);

    // Start animation
    window.addEventListener('resize', handleResize);
    startContinuousAnimation();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
})();

