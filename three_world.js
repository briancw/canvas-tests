$(function () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  var planetGeometry = new THREE.SphereGeometry(4,20,20);

  //Load the planet textures
  var texture = THREE.ImageUtils.loadTexture("3d_images/planet.png");
  // var normalmap = THREE.ImageUtils.loadTexture("3d_images/normal-map-512.jpg");
  var specmap = THREE.ImageUtils.loadTexture("3d_images/water-map-512.jpg");

  var planetMaterial = new THREE.MeshPhongMaterial();
  planetMaterial.map = texture;

  // planetMaterial.specularMap = specmap;
  // planetMaterial.specular = new THREE.Color( 0xff0000 );
  // planetMaterial.shininess = 1;

  // planetMaterial.normalMap = normalmap;
  planetMaterial.normalScale.set(-0.3,-0.3);

  var planet = new THREE.Mesh(planetGeometry, planetMaterial);

  //here we allow the texture/normal/specular maps to wrap
  planet.material.map.wrapS = THREE.RepeatWrapping;
  planet.material.map.wrapT = THREE.RepeatWrapping;
  // planet.material.normalMap.wrapS = THREE.RepeatWrapping;
  // planet.material.normalMap.wrapT = THREE.RepeatWrapping;
  // planet.material.specularMap.wrapS = THREE.RepeatWrapping;
  // planet.material.specularMap.wrapT = THREE.RepeatWrapping;

  //here we repeat the texture/normal/specular maps twice along X
  planet.material.map.repeat.set( 2, 1);
  // planet.material.normalMap.repeat.set( 2, 1);
  // planet.material.specularMap.repeat.set( 2, 1);

  planet.position.x = 0;
  planet.position.y = 0;
  planet.position.z = 0;

  scene.add(planet);

  //Space background is a large sphere
  var spacetex = THREE.ImageUtils.loadTexture("3d_images/space.jpg");
  var spacesphereGeo = new THREE.SphereGeometry(20,20,20);
  var spacesphereMat = new THREE.MeshPhongMaterial();
  spacesphereMat.map = spacetex;

  var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);

  //spacesphere needs to be double sided as the camera is within the spacesphere
  spacesphere.material.side = THREE.DoubleSide;

  spacesphere.material.map.wrapS = THREE.RepeatWrapping;
  spacesphere.material.map.wrapT = THREE.RepeatWrapping;
  spacesphere.material.map.repeat.set( 5, 3);

  scene.add(spacesphere);

  //position camera
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -15;
  camera.lookAt(scene.position);

  //create two spotlights to illuminate the scene
  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( -80, 30, -30 );
  spotLight.intensity = 2;
  scene.add( spotLight );

  // var spotLight2 = new THREE.SpotLight( 0x5192e9 );
  // spotLight2.position.set( 40, -60, 30 );
  // spotLight2.intensity = 1.5;
  // scene.add( spotLight2 );

  $("#WebGL-output"). append(renderer.domElement);

  //call render loop once
  render();

  //render loop
  function render() {
    requestAnimationFrame(render);
    //rotate planet and spacesphere
    planet.rotation.y += 0.002;
    spacesphere.rotation.y += 0.001;
    renderer.render(scene, camera);
  };

});
