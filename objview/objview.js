;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var init, load_obj, message, view_conf;

view_conf = {
  width: $('#view').width(),
  height: $('#view').height(),
  fov: Math.PI / 2,
  near: 1,
  far: 10000
};

message = function(msg) {
  return $('#messages').text(msg);
};

load_obj = function(cb) {
  var m, url;
  $('#messages').css({
    opacity: 1
  });
  m = window.location.hash.match(/url=([^&]*)/);
  if ((m != null) && (m[1] != null)) {
    url = m[1];
    $('#urlbox').val(m[1]);
  } else {
    message('No URL specified. Append #url=<something.obj> to address.');
    return;
  }
  message("Loading OBJ file...");
  url = "http://whateverorigin.org/get?url=" + (encodeURIComponent(url)) + "&callback=?";
  console.log(url);
  return $.ajax({
    url: url,
    dataType: "json",
    error: (function(e) {
      return message("Error loading file from " + url + " (" + e.status + " " + e.statusText + ")");
    }),
    success: function(data) {
      var mesh, object, scale;
      object = ((new THREE.OBJLoader()).parse(data.contents)).children[0];
      mesh = new THREE.SceneUtils.createMultiMaterialObject(object.geometry, [
        new THREE.MeshLambertMaterial({
          color: 0x00aaff
        }), new THREE.MeshBasicMaterial({
          color: 0x0013a6,
          transparent: true,
          wireframe: true,
          opacity: 0.2
        })
      ]);
      scale = 1 / mesh.children[0].geometry.boundingSphere.radius;
      mesh.scale = new THREE.Vector3(scale, scale, scale);
      return cb(mesh);
    }
  });
};

init = function(mesh) {
  var ambient_light, animate, camera, container, controls, grid, light, renderer, scene;
  container = $(document.body);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(view_conf.width, view_conf.height);
  $('#view').append(renderer.domElement);
  scene = new THREE.Scene();
  window.scene = scene;
  camera = new THREE.PerspectiveCamera(view_conf.fov, view_conf.width / view_conf.height, view_conf.near, view_conf.far);
  camera.position.z = 100;
  scene.add(camera);
  light = new THREE.PointLight(0xffffff);
  light.position = {
    x: 20,
    y: 70,
    z: 150
  };
  scene.add(light);
  ambient_light = new THREE.AmbientLight(0x282833);
  scene.add(ambient_light);
  grid = new THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(2, 2, 20, 20), [
    new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      opacity: 0.5,
      transparent: true,
      wireframe: true
    }), new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  ]);
  scene.add(grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2));
  scene.add(mesh);
  controls = new THREE.TrackballControls(camera);
  controls.panSpeed = 0.05;
  controls.noPan = false;
  controls.noZoom = false;
  message('Controls: Left mouse button: rotate, Right mouse button: pan, Wheel: zoom');
  $('#view canvas').on("click mousewheel", function() {
    return setTimeout((function() {
      return $('#messages').css({
        opacity: 0
      });
    }), 1);
  });
  animate = function() {
    renderer.render(scene, camera);
    controls.update();
    return requestAnimationFrame(animate);
  };
  return animate();
};

$(window).on({
  hashchange: function() {
    return load_obj(init);
  }
});

$(window).trigger('hashchange');

$('#urlbox').on({
  mouseenter: (function() {
    return $('#urlbox').focus();
  }),
  change: function() {
    return window.location.hash = "url=" + ($('#urlbox').val());
  }
});


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9rYW1pbGEvcHJvamVjdHMvb2Jqdmlldy9vYmp2aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSw4QkFBQTs7QUFBQSxDQUFBLEVBQ0ksTUFESjtDQUNJLENBQUEsR0FBQSxFQUFRO0NBQVIsQ0FDQSxJQUFBLENBQVE7Q0FEUixDQUVBLENBQUEsQ0FBVTtDQUZWLENBR0EsRUFBQTtDQUhBLENBSUEsQ0FBQSxFQUpBO0NBREosQ0FBQTs7QUFPQSxDQVBBLEVBT1UsSUFBVixFQUFXO0NBQVEsRUFBQSxDQUFBLEtBQUEsRUFBQTtDQUFUOztBQUVWLENBVEEsQ0FTVyxDQUFBLEtBQVgsQ0FBWTtDQUNSLEtBQUE7Q0FBQSxDQUFBLENBQUEsUUFBQTtDQUFtQixDQUFTLEVBQVQsR0FBQTtDQUFuQixHQUFBO0NBQUEsQ0FDQSxDQUFJLENBQW9CLENBQXBCLENBQU0sRUFBUyxLQUFmO0NBQ0osQ0FBQSxFQUFHLE9BQUEsR0FBSDtDQUNJLEVBQUEsQ0FBQTtDQUFBLEVBQ0EsQ0FBQSxLQUFBO0lBRkosRUFBQTtDQUlJLEdBQUEsR0FBQSxvREFBQTtDQUNBLFNBQUE7SUFQSjtDQUFBLENBUUEsS0FBQSxjQUFBO0NBUkEsQ0FTQSxDQUFBLFVBVEEsS0FTMEMsa0JBQW5DO0NBVFAsQ0FVQSxDQUFBLElBQU87Q0FDTixHQUFELEtBQUE7Q0FBTyxDQUFLLENBQUwsQ0FBQTtDQUFBLENBQW9CLEVBQVYsRUFBVixFQUFVO0NBQVYsQ0FBbUMsQ0FBQyxDQUFSLENBQUEsSUFBUztDQUFlLEVBQXlCLENBQXpCLEVBQUEsQ0FBVCxHQUFTLEdBQVQsYUFBUztDQUFqQixJQUFDO0NBQXBDLENBQTZILENBQUEsQ0FBVCxHQUFBLEVBQVU7Q0FDakgsU0FBQSxTQUFBO0NBQUEsRUFBUyxDQUFNLENBQUssQ0FBcEIsRUFBVSxDQUFLO0NBQWYsQ0FFZ0IsQ0FETCxDQUFYLENBQWdCLENBQWhCLEVBQVcsRUFB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LElBQUEsR0FBQTtDQUFmLEVBQVk7Q0F4RXpCLENBd0VBOztBQUNBLENBekVBLEtBeUVBLENBQUEsS0FBQTs7QUFFQSxDQTNFQSxDQTJFQSxPQUFBO0NBQWdCLENBQUEsQ0FBYSxNQUFBLENBQWI7Q0FBZ0IsSUFBQSxJQUFBLEVBQUE7Q0FBSixFQUFDO0NBQWIsQ0FBdUMsQ0FBUSxHQUFSLEdBQVE7Q0FBVSxFQUFpQixDQUF4QixFQUFNLEVBQVMsQ0FBYyxFQUE3QjtDQUFsRCxFQUErQztDQTNFL0QsQ0EyRUEiLCJzb3VyY2VzQ29udGVudCI6WyJ2aWV3X2NvbmYgPVxuICAgIHdpZHRoOiAgJCgnI3ZpZXcnKS53aWR0aCgpXG4gICAgaGVpZ2h0OiAkKCcjdmlldycpLmhlaWdodCgpXG4gICAgZm92OiAgTWF0aC5QSS8yXG4gICAgbmVhcjogMVxuICAgIGZhcjogIDEwMDAwXG5cbm1lc3NhZ2UgPSAobXNnKSAtPiAkKCcjbWVzc2FnZXMnKS50ZXh0IG1zZ1xuXG5sb2FkX29iaiA9IChjYikgLT5cbiAgICAkKCcjbWVzc2FnZXMnKS5jc3Mgb3BhY2l0eTogMVxuICAgIG0gPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCgvdXJsPShbXiZdKikvKVxuICAgIGlmIG0/IGFuZCBtWzFdP1xuICAgICAgICB1cmwgPSBtWzFdXG4gICAgICAgICQoJyN1cmxib3gnKS52YWwgbVsxXVxuICAgIGVsc2VcbiAgICAgICAgbWVzc2FnZSAnTm8gVVJMIHNwZWNpZmllZC4gQXBwZW5kICN1cmw9PHNvbWV0aGluZy5vYmo+IHRvIGFkZHJlc3MuJ1xuICAgICAgICByZXR1cm5cbiAgICBtZXNzYWdlIFwiTG9hZGluZyBPQkogZmlsZS4uLlwiXG4gICAgdXJsID0gXCJodHRwOi8vd2hhdGV2ZXJvcmlnaW4ub3JnL2dldD91cmw9I3tlbmNvZGVVUklDb21wb25lbnQgdXJsfSZjYWxsYmFjaz0/XCJcbiAgICBjb25zb2xlLmxvZyB1cmxcbiAgICAkLmFqYXggdXJsOiB1cmwsIGRhdGFUeXBlOiBcImpzb25cIiwgZXJyb3I6ICgoZSkgLT4gbWVzc2FnZSBcIkVycm9yIGxvYWRpbmcgZmlsZSBmcm9tICN7dXJsfSAoI3tlLnN0YXR1c30gI3tlLnN0YXR1c1RleHR9KVwiKSwgc3VjY2VzczogKGRhdGEpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSAoKG5ldyBUSFJFRS5PQkpMb2FkZXIoKSkucGFyc2UgZGF0YS5jb250ZW50cykuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ggPSBuZXcgVEhSRUUuU2NlbmVVdGlscy5jcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0IG9iamVjdC5nZW9tZXRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKGNvbG9yOiAweDAwYWFmZiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoY29sb3I6IDB4MDAxM2E2LCB0cmFuc3BhcmVudDogdHJ1ZSwgd2lyZWZyYW1lOiB0cnVlLCBvcGFjaXR5OiAwLjIpIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gMS9tZXNoLmNoaWxkcmVuWzBdLmdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlLnJhZGl1cyAgIyBub3JtYWxpemUgc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzIHNjYWxlLCBzY2FsZSwgc2NhbGVcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2IgbWVzaFxuXG5pbml0ID0gKG1lc2gpIC0+XG4gICAgY29udGFpbmVyID0gJChkb2N1bWVudC5ib2R5KVxuXG4gICAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSB2aWV3X2NvbmYud2lkdGgsIHZpZXdfY29uZi5oZWlnaHRcbiAgICAkKCcjdmlldycpLmFwcGVuZCByZW5kZXJlci5kb21FbGVtZW50XG5cbiAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgd2luZG93LnNjZW5lID0gc2NlbmUgICMgVE9ETyByZW1vdmUgbWUhXG5cbiAgICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgdmlld19jb25mLmZvdiwgdmlld19jb25mLndpZHRoL3ZpZXdfY29uZi5oZWlnaHQsIHZpZXdfY29uZi5uZWFyLCB2aWV3X2NvbmYuZmFyXG4gICAgY2FtZXJhLnBvc2l0aW9uLnogPSAxMDBcbiAgICBzY2VuZS5hZGQgY2FtZXJhXG5cbiAgICBsaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0IDB4ZmZmZmZmXG4gICAgbGlnaHQucG9zaXRpb24gPSB7IHg6IDIwLCB5OiA3MCwgejogMTUwIH1cbiAgICBzY2VuZS5hZGQgbGlnaHRcblxuICAgIGFtYmllbnRfbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0IDB4MjgyODMzXG4gICAgc2NlbmUuYWRkIGFtYmllbnRfbGlnaHRcblxuICAgIGdyaWQgPSBuZXcgVEhSRUUuU2NlbmVVdGlscy5jcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0IChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSAyLCAyLCAyMCwgMjApLFxuICAgICAgICAgICAgICAgICAgICBbKG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCBjb2xvcjogMHhhYWFhYWEsIG9wYWNpdHk6IDAuNSwgdHJhbnNwYXJlbnQ6IHRydWUsIHdpcmVmcmFtZTogdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAobmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsIGNvbG9yOiAweGZmZmZmZiwgb3BhY2l0eTogMC4zLCB0cmFuc3BhcmVudDogdHJ1ZSwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSldXG4gICAgc2NlbmUuYWRkIGdyaWQucm90YXRlT25BeGlzKChuZXcgVEhSRUUuVmVjdG9yMyAxLCAwLCAwKSwgTWF0aC5QSS8yKVxuXG4gICAgc2NlbmUuYWRkIG1lc2hcblxuICAgIGNvbnRyb2xzID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzIGNhbWVyYVxuICAgIGNvbnRyb2xzLnBhblNwZWVkID0gMC4wNVxuICAgIGNvbnRyb2xzLm5vUGFuID0gZmFsc2VcbiAgICBjb250cm9scy5ub1pvb20gPSBmYWxzZVxuXG4gICAgbWVzc2FnZSAnQ29udHJvbHM6IExlZnQgbW91c2UgYnV0dG9uOiByb3RhdGUsIFJpZ2h0IG1vdXNlIGJ1dHRvbjogcGFuLCBXaGVlbDogem9vbSdcbiAgICAkKCcjdmlldyBjYW52YXMnKS5vbiBcImNsaWNrIG1vdXNld2hlZWxcIiwgLT4gc2V0VGltZW91dCAoLT4gJCgnI21lc3NhZ2VzJykuY3NzIG9wYWNpdHk6IDApLCAxXG4gICAgYW5pbWF0ZSA9IC0+XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlciBzY2VuZSwgY2FtZXJhXG4gICAgICAgIGNvbnRyb2xzLnVwZGF0ZSgpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmltYXRlXG4gICAgYW5pbWF0ZSgpXG5cbiQod2luZG93KS5vbiBoYXNoY2hhbmdlOiAtPiBsb2FkX29iaiBpbml0XG4kKHdpbmRvdykudHJpZ2dlciAnaGFzaGNoYW5nZSdcblxuJCgnI3VybGJveCcpLm9uIG1vdXNlZW50ZXI6ICgtPiAkKCcjdXJsYm94JykuZm9jdXMoKSksIGNoYW5nZTogLT4gd2luZG93LmxvY2F0aW9uLmhhc2ggPSBcInVybD0jeyQoJyN1cmxib3gnKS52YWwoKX1cIlxuICAgICAgICAgICAgICAgIFxuIl19
;