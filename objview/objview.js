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
  return $.ajax({
    url: url,
    error: (function() {
      return message("Error loading file from " + url);
    }),
    success: function(data) {
      var mesh, object, scale;
      object = ((new THREE.OBJLoader()).parse(data)).children[0];
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
    console.log("loading $('#urlbox').val()");
    return window.location.hash = "url=" + ($('#urlbox').val());
  }
});


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9rYW1pbGEvcHJvamVjdHMvb2Jqdmlldy9vYmp2aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSw4QkFBQTs7QUFBQSxDQUFBLEVBQ0ksTUFESjtDQUNJLENBQUEsR0FBQSxFQUFRO0NBQVIsQ0FDQSxJQUFBLENBQVE7Q0FEUixDQUVBLENBQUEsQ0FBVTtDQUZWLENBR0EsRUFBQTtDQUhBLENBSUEsQ0FBQSxFQUpBO0NBREosQ0FBQTs7QUFPQSxDQVBBLEVBT1UsSUFBVixFQUFXO0NBQVEsRUFBQSxDQUFBLEtBQUEsRUFBQTtDQUFUOztBQUVWLENBVEEsQ0FTVyxDQUFBLEtBQVgsQ0FBWTtDQUNSLEtBQUE7Q0FBQSxDQUFBLENBQUEsUUFBQTtDQUFtQixDQUFTLEVBQVQsR0FBQTtDQUFuQixHQUFBO0NBQUEsQ0FDQSxDQUFJLENBQW9CLENBQXBCLENBQU0sRUFBUyxLQUFmO0NBQ0osQ0FBQSxFQUFHLE9BQUEsR0FBSDtDQUNJLEVBQUEsQ0FBQTtDQUFBLEVBQ0EsQ0FBQSxLQUFBO0lBRkosRUFBQTtDQUlJLEdBQUEsR0FBQSxvREFBQTtDQUNBLFNBQUE7SUFQSjtDQUFBLENBUUEsS0FBQSxjQUFBO0NBQ0MsR0FBRCxLQUFBO0NBQU8sQ0FBSyxDQUFMLENBQUE7Q0FBQSxDQUFpQixDQUFDLENBQVIsQ0FBQSxJQUFRO0NBQVksRUFBeUIsSUFBbEMsTUFBQSxhQUFTO0NBQWIsSUFBQztDQUFsQixDQUF5RSxDQUFBLENBQVQsR0FBQSxFQUFVO0NBQzdELFNBQUEsU0FBQTtDQUFBLEVBQVMsQ0FBTSxDQUFLLENBQXBCLEVBQXVELENBQXhDO0NBQWYsQ0FFZ0IsQ0FETCxDQUFYLENBQWdCLENBQWhCLEVBQVcsRUFBZ0IsZUFBaEI7Q0FDaUIsR0FBTixDQUFLLElBQUwsVUFBQTtDQUEwQixDQUFPLEdBQVAsR0FBQSxFQUFBO0NBQWhDLENBQ00sRUFBQSxDQUFLLEtBREwsT0FDQTtD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QUEsQ0FBYSxNQUFBLENBQWI7Q0FBZ0IsSUFBQSxJQUFBLEVBQUE7Q0FBSixFQUFDO0NBQWIsQ0FBdUMsQ0FBUSxHQUFSLEdBQVE7Q0FBRyxFQUFBLENBQUEsR0FBTyxxQkFBUDtDQUFpRCxFQUFpQixDQUF4QixFQUFNLEVBQVMsQ0FBYyxFQUE3QjtDQUE1RixFQUErQztDQTFFL0QsQ0EwRUEiLCJzb3VyY2VzQ29udGVudCI6WyJ2aWV3X2NvbmYgPVxuICAgIHdpZHRoOiAgJCgnI3ZpZXcnKS53aWR0aCgpXG4gICAgaGVpZ2h0OiAkKCcjdmlldycpLmhlaWdodCgpXG4gICAgZm92OiAgTWF0aC5QSS8yXG4gICAgbmVhcjogMVxuICAgIGZhcjogIDEwMDAwXG5cbm1lc3NhZ2UgPSAobXNnKSAtPiAkKCcjbWVzc2FnZXMnKS50ZXh0IG1zZ1xuXG5sb2FkX29iaiA9IChjYikgLT5cbiAgICAkKCcjbWVzc2FnZXMnKS5jc3Mgb3BhY2l0eTogMVxuICAgIG0gPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCgvdXJsPShbXiZdKikvKVxuICAgIGlmIG0/IGFuZCBtWzFdP1xuICAgICAgICB1cmwgPSBtWzFdXG4gICAgICAgICQoJyN1cmxib3gnKS52YWwgbVsxXVxuICAgIGVsc2VcbiAgICAgICAgbWVzc2FnZSAnTm8gVVJMIHNwZWNpZmllZC4gQXBwZW5kICN1cmw9PHNvbWV0aGluZy5vYmo+IHRvIGFkZHJlc3MuJ1xuICAgICAgICByZXR1cm5cbiAgICBtZXNzYWdlIFwiTG9hZGluZyBPQkogZmlsZS4uLlwiXG4gICAgJC5hamF4IHVybDogdXJsLCBlcnJvcjogKC0+IG1lc3NhZ2UgXCJFcnJvciBsb2FkaW5nIGZpbGUgZnJvbSAje3VybH1cIiksIHN1Y2Nlc3M6IChkYXRhKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gKChuZXcgVEhSRUUuT0JKTG9hZGVyKCkpLnBhcnNlIGRhdGEpLmNoaWxkcmVuWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoID0gbmV3IFRIUkVFLlNjZW5lVXRpbHMuY3JlYXRlTXVsdGlNYXRlcmlhbE9iamVjdCBvYmplY3QuZ2VvbWV0cnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbChjb2xvcjogMHgwMGFhZmYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKGNvbG9yOiAweDAwMTNhNiwgdHJhbnNwYXJlbnQ6IHRydWUsIHdpcmVmcmFtZTogdHJ1ZSwgb3BhY2l0eTogMC4yKSBdXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IDEvbWVzaC5jaGlsZHJlblswXS5nZW9tZXRyeS5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgICMgbm9ybWFsaXplIHNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2guc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMyBzY2FsZSwgc2NhbGUsIHNjYWxlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNiIG1lc2hcblxuaW5pdCA9IChtZXNoKSAtPlxuICAgIGNvbnRhaW5lciA9ICQoZG9jdW1lbnQuYm9keSlcblxuICAgIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKVxuICAgIHJlbmRlcmVyLnNldFNpemUgdmlld19jb25mLndpZHRoLCB2aWV3X2NvbmYuaGVpZ2h0XG4gICAgJCgnI3ZpZXcnKS5hcHBlbmQgcmVuZGVyZXIuZG9tRWxlbWVudFxuXG4gICAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIHdpbmRvdy5zY2VuZSA9IHNjZW5lICAjIFRPRE8gcmVtb3ZlIG1lIVxuXG4gICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhIHZpZXdfY29uZi5mb3YsIHZpZXdfY29uZi53aWR0aC92aWV3X2NvbmYuaGVpZ2h0LCB2aWV3X2NvbmYubmVhciwgdmlld19jb25mLmZhclxuICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gMTAwXG4gICAgc2NlbmUuYWRkIGNhbWVyYVxuXG4gICAgbGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCAweGZmZmZmZlxuICAgIGxpZ2h0LnBvc2l0aW9uID0geyB4OiAyMCwgeTogNzAsIHo6IDE1MCB9XG4gICAgc2NlbmUuYWRkIGxpZ2h0XG5cbiAgICBhbWJpZW50X2xpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCAweDI4MjgzM1xuICAgIHNjZW5lLmFkZCBhbWJpZW50X2xpZ2h0XG5cbiAgICBncmlkID0gbmV3IFRIUkVFLlNjZW5lVXRpbHMuY3JlYXRlTXVsdGlNYXRlcmlhbE9iamVjdCAobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkgMiwgMiwgMjAsIDIwKSxcbiAgICAgICAgICAgICAgICAgICAgWyhuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwgY29sb3I6IDB4YWFhYWFhLCBvcGFjaXR5OiAwLjUsIHRyYW5zcGFyZW50OiB0cnVlLCB3aXJlZnJhbWU6IHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgKG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCBjb2xvcjogMHhmZmZmZmYsIG9wYWNpdHk6IDAuMywgdHJhbnNwYXJlbnQ6IHRydWUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUpXVxuICAgIHNjZW5lLmFkZCBncmlkLnJvdGF0ZU9uQXhpcygobmV3IFRIUkVFLlZlY3RvcjMgMSwgMCwgMCksIE1hdGguUEkvMilcblxuICAgIHNjZW5lLmFkZCBtZXNoXG5cbiAgICBjb250cm9scyA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyBjYW1lcmFcbiAgICBjb250cm9scy5wYW5TcGVlZCA9IDAuMDVcbiAgICBjb250cm9scy5ub1BhbiA9IGZhbHNlXG4gICAgY29udHJvbHMubm9ab29tID0gZmFsc2VcblxuICAgIG1lc3NhZ2UgJ0NvbnRyb2xzOiBMZWZ0IG1vdXNlIGJ1dHRvbjogcm90YXRlLCBSaWdodCBtb3VzZSBidXR0b246IHBhbiwgV2hlZWw6IHpvb20nXG4gICAgJCgnI3ZpZXcgY2FudmFzJykub24gXCJjbGljayBtb3VzZXdoZWVsXCIsIC0+IHNldFRpbWVvdXQgKC0+ICQoJyNtZXNzYWdlcycpLmNzcyBvcGFjaXR5OiAwKSwgMVxuICAgIGFuaW1hdGUgPSAtPlxuICAgICAgICByZW5kZXJlci5yZW5kZXIgc2NlbmUsIGNhbWVyYVxuICAgICAgICBjb250cm9scy51cGRhdGUoKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5pbWF0ZVxuICAgIGFuaW1hdGUoKVxuXG4kKHdpbmRvdykub24gaGFzaGNoYW5nZTogLT4gbG9hZF9vYmogaW5pdFxuJCh3aW5kb3cpLnRyaWdnZXIgJ2hhc2hjaGFuZ2UnXG5cbiMgJCgnI3VybGJveCcpLm9uIG1vdXNlZW50ZXI6ICgtPiAkKCcjdXJsYm94JykuZm9jdXMoKSksIDogLT4gY29uc29sZS5sb2cgXCJsb2FkaW5nICQoJyN1cmxib3gnKS52YWwoKVwiOyB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwidXJsPSN7JCgnI3VybGJveCcpLnZhbCgpfVwiXG4kKCcjdXJsYm94Jykub24gbW91c2VlbnRlcjogKC0+ICQoJyN1cmxib3gnKS5mb2N1cygpKSwgY2hhbmdlOiAtPiBjb25zb2xlLmxvZyBcImxvYWRpbmcgJCgnI3VybGJveCcpLnZhbCgpXCI7IHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gXCJ1cmw9I3skKCcjdXJsYm94JykudmFsKCl9XCJcbiAgICAgICAgICAgICAgICBcbiJdfQ==
;