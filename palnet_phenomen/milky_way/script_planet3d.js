function createEarth(containerId, modelPath) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();

    const aspect = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    camera.position.z = 350;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // прозрачный фон
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Свет
    const aLight = new THREE.AmbientLight(0xffffff, 2.5); // мягкий заполняющий свет
    scene.add(aLight);

    const pLight = new THREE.PointLight(0xffffff, 10);
    pLight.position.set(10, 10, 10);
    scene.add(pLight);

    const dLight = new THREE.DirectionalLight(0xffffff, 3);
    dLight.position.set(50, 50, 100);
    scene.add(dLight);

    let earthObject = null;

    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        earthObject = gltf.scene;
        earthObject.rotation.x = Math.PI / 16;
        earthObject.scale.set(0.5, 0.5, 0.5);
        earthObject.position.set(0, 0, 0);
        scene.add(earthObject);
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    function animate() {
        requestAnimationFrame(animate);
        if (earthObject) {
            earthObject.rotation.y += 0.003;
        }
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

createEarth('milkyway', '../../image/milky_way.glb');
