// ============================================================
// SOLARDRONE — MAIN.JS
// Three.js drone scene + scroll storytelling + custom cursor
// ============================================================

(function () {
  'use strict';

  // --- DOM REFS ---
  const loader        = document.getElementById('loader');
  const cursorEl      = document.getElementById('cursor');
  const scrollSection = document.getElementById('scroll-section');
  const stickyFrame   = document.getElementById('sticky-frame');
  const progressFill  = document.querySelector('#progress-bar .fill');
  const dots          = document.querySelectorAll('.dot');
  const chapters      = document.querySelectorAll('.chapter');
  const scrollHint    = document.getElementById('scroll-hint');
  const thermalOv     = document.getElementById('thermal-overlay');
  const reportMock    = document.getElementById('report-mockup');
  const portalMock    = document.getElementById('portal-mockup');
  const canvas        = document.getElementById('drone-canvas');

  // --- STATE ---
  let scrollFrac    = 0;
  let chapter       = 0;
  let chapterFrac   = 0;
  let mouseX        = -100;
  let mouseY        = -100;
  let cursorX       = -100;
  let cursorY       = -100;
  let isHovering    = false;

  // --- THREE.JS SETUP ---
  const isMobile = window.innerWidth <= 768;

  let scene, camera, renderer, droneGroup;
  let propellers = { p1: null, p2: null, p3: null, p4: null };

  // Drone target positions per chapter (lerped)
  const droneTargets = [
    new THREE.Vector3(1.2, 0.8, 0),
    new THREE.Vector3(0, 0.5, 0),       // will be overridden by grid path
    new THREE.Vector3(0.4, 0.3, 0.5),
    new THREE.Vector3(3, 2.5, 3),
    new THREE.Vector3(4, 4, 4),
  ];
  const droneScales = [1, 1, 1, 0.65, 0.4];
  const droneRotY   = [-0.3, 0, 0, 0.2, 0.3];

  const cameraTargets = [
    new THREE.Vector3(2, 3, 5),
    new THREE.Vector3(0, 4.5, 4),
    new THREE.Vector3(1, 2, 3),
    new THREE.Vector3(1.5, 3, 5),
    new THREE.Vector3(2, 3.5, 6),
  ];
  const cameraLookTargets = [
    new THREE.Vector3(1.2, 0.8, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.4, 0.3, 0.5),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1.5, 0),
  ];

  // Grid waypoints for chapter 1 flight path
  const gridWaypoints = [
    new THREE.Vector3(-2, 0.5, -1.5),
    new THREE.Vector3(2, 0.5, -1.5),
    new THREE.Vector3(2, 0.5, -0.5),
    new THREE.Vector3(-2, 0.5, -0.5),
    new THREE.Vector3(-2, 0.5, 0.5),
    new THREE.Vector3(2, 0.5, 0.5),
  ];

  let currentDronePos    = new THREE.Vector3(1.2, 0.8, 0);
  let currentDroneScale  = 1;
  let currentDroneRotY   = -0.3;
  let currentCameraPos   = new THREE.Vector3(2, 3, 5);
  let currentCameraLook  = new THREE.Vector3(1.2, 0.8, 0);
  let droneOpacity       = 1;

  function initThree() {
    if (isMobile) {
      hideLoader();
      return;
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(42, getCanvasAspect(), 0.1, 100);
    camera.position.copy(currentCameraPos);
    camera.lookAt(currentCameraLook);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Lights
    const ambient = new THREE.AmbientLight(0xF5F0E8, 0.7);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xFFF3DC, 1.4);
    sun.position.set(4, 10, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xC17D3C, 0.25);
    fill.position.set(-5, 3, -3);
    scene.add(fill);

    // Load drone GLB
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('assets/drone/DJI-Mavic_3.glb', function (gltf) {
      var model = gltf.scene;

      // Measure the raw model
      var box = new THREE.Box3().setFromObject(model);
      var size = new THREE.Vector3();
      box.getSize(size);
      var center = new THREE.Vector3();
      box.getCenter(center);
      var maxDim = Math.max(size.x, size.y, size.z);
      var baseScale = 2.0 / maxDim;

      // Offset model so its center sits at (0,0,0) of the inner group
      model.position.set(-center.x, -center.y, -center.z);

      // Inner group holds the centered model at baseScale
      var innerGroup = new THREE.Group();
      innerGroup.scale.setScalar(baseScale);
      innerGroup.add(model);

      // Outer group is what we position/rotate/scale per chapter
      droneGroup = new THREE.Group();
      droneGroup.add(innerGroup);
      droneGroup.position.copy(currentDronePos);
      scene.add(droneGroup);

      // Find propellers by Chinese names
      model.traverse(function (child) {
        if (child.name === '桨叶1') propellers.p1 = child;
        if (child.name === '桨叶2') propellers.p2 = child;
        if (child.name === '桨叶3') propellers.p3 = child;
        if (child.name === '桨叶4') propellers.p4 = child;

        if (child.name === 'JT') {
          child.rotation.x = -0.15;
        }

        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      console.log('Drone loaded — raw size:', size, 'baseScale:', baseScale);

      hideLoader();
      renderer.setAnimationLoop(renderLoop);
    },
    undefined,
    function (err) {
      console.error('GLB load error:', err);
      hideLoader();
    });

    window.addEventListener('resize', onResize);
  }

  function getCanvasAspect() {
    return canvas.clientWidth / canvas.clientHeight;
  }

  function onResize() {
    if (!renderer) return;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = getCanvasAspect();
    camera.updateProjectionMatrix();
  }

  function hideLoader() {
    loader.classList.add('hidden');
    setTimeout(function () { loader.style.display = 'none'; }, 600);
  }

  // --- RENDER LOOP ---
  function renderLoop() {
    if (!droneGroup) return;

    // Propeller spin
    if (propellers.p1) propellers.p1.rotation.y += 0.35;
    if (propellers.p2) propellers.p2.rotation.y += 0.35;
    if (propellers.p3) propellers.p3.rotation.y -= 0.35;
    if (propellers.p4) propellers.p4.rotation.y -= 0.35;

    // Determine target drone position
    var targetPos;
    if (chapter === 1) {
      targetPos = getGridPosition(chapterFrac);
    } else {
      targetPos = droneTargets[chapter];
    }

    var targetScale = droneScales[chapter];
    var targetRotY  = droneRotY[chapter];
    var targetCamPos  = cameraTargets[chapter];
    var targetCamLook = cameraLookTargets[chapter];

    // Lerp drone
    currentDronePos.lerp(targetPos, 0.05);
    currentDroneScale += (targetScale - currentDroneScale) * 0.05;
    currentDroneRotY += (targetRotY - currentDroneRotY) * 0.05;

    // Hover float (always active)
    var now = Date.now();
    var floatY = Math.sin(now * 0.001) * 0.004;
    var floatZ = Math.sin(now * 0.0007) * 0.015;
    var floatX = Math.sin(now * 0.0009) * 0.01;

    droneGroup.position.set(
      currentDronePos.x,
      currentDronePos.y + floatY,
      currentDronePos.z
    );
    droneGroup.rotation.set(floatX, currentDroneRotY, floatZ);
    droneGroup.scale.setScalar(currentDroneScale);

    // Drone opacity for ch4
    var targetOpacity = chapter === 4 ? 0.3 : 1;
    droneOpacity += (targetOpacity - droneOpacity) * 0.05;
    droneGroup.traverse(function (child) {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = droneOpacity;
      }
    });

    // Lerp camera
    currentCameraPos.lerp(targetCamPos, 0.03);
    currentCameraLook.lerp(targetCamLook, 0.03);
    camera.position.copy(currentCameraPos);
    camera.lookAt(currentCameraLook);

    renderer.render(scene, camera);
  }

  // Grid path interpolation for ch1
  function getGridPosition(t) {
    var totalSegments = gridWaypoints.length - 1;
    var segFloat = t * totalSegments;
    var segIdx = Math.min(Math.floor(segFloat), totalSegments - 1);
    var segT = segFloat - segIdx;
    var a = gridWaypoints[segIdx];
    var b = gridWaypoints[segIdx + 1];
    return new THREE.Vector3().lerpVectors(a, b, segT);
  }

  // --- SCROLL LOGIC ---
  function onScroll() {
    var sectionRect = scrollSection.getBoundingClientRect();
    var sectionH    = scrollSection.offsetHeight;
    var winH        = window.innerHeight;

    scrollFrac = Math.max(0, Math.min(1, -sectionRect.top / (sectionH - winH)));

    chapter     = Math.min(4, Math.floor(scrollFrac * 5));
    chapterFrac = (scrollFrac * 5) - chapter;

    updateChapters();
    updateProgress();
    updateOverlays();
    updateScrollHint();
  }

  function updateChapters() {
    chapters.forEach(function (el) {
      var idx = parseInt(el.dataset.chapter, 10);
      if (idx === chapter) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  function updateProgress() {
    progressFill.style.height = (scrollFrac * 100) + '%';
    dots.forEach(function (dot) {
      var idx = parseInt(dot.dataset.ch, 10);
      if (idx === chapter) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function updateOverlays() {
    // Thermal overlay: visible in ch2
    if (chapter === 2) {
      thermalOv.style.opacity = Math.min(0.75, chapterFrac * 1.5);
    } else {
      thermalOv.style.opacity = '0';
    }

    // Report mockup: visible in ch3
    if (chapter === 3) {
      reportMock.classList.add('visible');
    } else {
      reportMock.classList.remove('visible');
    }

    // Portal mockup: visible in ch4
    if (chapter === 4) {
      portalMock.classList.add('visible');
    } else {
      portalMock.classList.remove('visible');
    }
  }

  function updateScrollHint() {
    if (scrollFrac > 0.05) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  }

  // --- CUSTOM CURSOR ---
  function initCursor() {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.tagName === 'INPUT' ||
          t.closest('button') || t.closest('a')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    });

    updateCursor();
  }

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursorEl.style.left = cursorX + 'px';
    cursorEl.style.top  = cursorY + 'px';

    if (isHovering) {
      cursorEl.classList.add('is-hover');
    } else {
      cursorEl.classList.remove('is-hover');
    }

    requestAnimationFrame(updateCursor);
  }

  // --- INIT ---
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  initCursor();
  initThree();

})();
