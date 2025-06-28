function createSun(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 1000);
    camera.position.z = 9;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 1.2);
    pLight.position.set(0, -3, 7);
    scene.add(pLight);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let sunObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        sunObject = gltf.scene;
        scene.add(sunObject);
        sunObject.scale.set(0.5, 0.5, 0.5);
        sunObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
        if (!sunObject) return;

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(sunObject, true); // true — для вложенных мешей

        if (intersects.length > 0) {
            window.location.href = '../palnet_phenomen/sun/sun.html'; // Заменить на нужную ссылку
        }
        });

    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (sunObject) {
            sunObject.rotation.y += 0.01;
        }

        controls.update(); // Обновление состояния OrbitControls
    }
    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

}
createSun('sun', '../image/sun.glb');

function createMercury(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 1.2);
    pLight.position.set(0, -3, 7);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mercuryObject = null;
    // Загрузка модели Меркурия
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        mercuryObject = gltf.scene;
        scene.add(mercuryObject);
        mercuryObject.scale.set(0.5, 0.5, 0.5);
        mercuryObject.position.set(0, 0, 0);
    });
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!mercuryObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(mercuryObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/mercury/mercury.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (mercuryObject) {
            mercuryObject.rotation.y += 0.08;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createMercury('mercury', '../image/mercury.glb');

function createVenus(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    camera.position.z = 50;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let venusObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        venusObject = gltf.scene;
        venusObject.traverse((child) => {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
            }
        });
        scene.add(venusObject);
        venusObject.scale.set(0.5, 0.5, 0.5);
        venusObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!venusObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(venusObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/venus/venus.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (venusObject) {
            venusObject.rotation.y -= 0.03;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createVenus('venus', '../image/venus.glb');

function createEarth(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    camera.position.z = 90;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/earth/earth.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.03;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createEarth('earth', '../image/earth.glb');


function createMars(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000);
    camera.position.z = 90;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/mars/mars.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.03;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createMars('mars', '../image/mars.glb');

function createJupiter(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(100, aspect, 0.1, 1000);
    camera.position.z = 93;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/jupiter/jupiter.html'; // Заменить на нужную ссылку
    }
    });

    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.02;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createJupiter('jupiter', '../image/jupiter.glb');

function createSaturn(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(110, aspect, 0.1, 1000);
    camera.position.z = 280;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        earthObject.rotation.x = Math.PI / 20;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/saturn/saturn.html'; // Заменить на нужную ссылку
    }
    });

    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.02;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createSaturn('saturn', '../image/saturn.glb');

function createUran(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(110, aspect, 0.1, 1000);
    camera.position.z = 95;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 5);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/uran/uran.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.02;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createUran('uran', '../image/uranus.glb');

function createNeptune(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(110, aspect, 0.1, 1000);
    camera.position.z = 90;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 6);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = '../palnet_phenomen/neptun/neptun.html'; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.02;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
createNeptune('neptune', '../image/neptune.glb');

function asteroid(container, modelPath,link) {
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(53, aspect, 0.1, 1000);
    camera.position.z = 2;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 6);
    pLight.position.set(5, 5, 10);
    scene.add(pLight);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let earthObject = null;  // Перемещаем сюда для доступа в анимации

    // Загрузка модели Солнца
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        scene.add(earthObject);
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);

    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Плавность
    controls.dampingFactor = 0.25; // Параметр плавности
    controls.screenSpacePanning = false;
    renderer.domElement.addEventListener('dblclick', function(event) {
    if (!earthObject) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(earthObject, true); // true — для вложенных мешей

    if (intersects.length > 0) {
        window.location.href = link; // Заменить на нужную ссылку
    }
    });
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (earthObject) {
            earthObject.rotation.y += 0.02;
        }

        controls.update();  // Обновление состояния OrbitControls
    }

    animate();
    window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

document.querySelectorAll('.planet').forEach(container => {
    asteroid(container, '../image/asteroid.glb',container.dataset.link);
});
