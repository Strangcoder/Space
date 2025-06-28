function createMercury(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xFFFFFF, 1.2);
    pLight.position.set(0, -3, 7);
    scene.add(pLight);
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

    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Если модель загружена, вращаем её
        if (mercuryObject) {
            mercuryObject.rotation.y += 0.01;
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
createMercury('mercury', '../../image/mercury.glb');