
export const initHotkeys = (canvas, canvasState) => {
    let lastsel = canvas.selection
    if (canvasState)
      console.log(canvasState.selection)

    canvas.on('mouse:down', function(opt) {
      var evt = opt.e;
      if (evt.button === 1 || evt.ctrlKey === true) {
        // console.log("pressed click + control")
        var target = canvas.findTarget(opt.e);
        if ((target.type === 'polyline' 
          || target.type === 'image'
          || target.type === 'textbox') && canvas.selection) {
          // console.log("found polyline or image")
          canvas.setActiveObject(target);
          // obj should be now either rect, text or null
      } 
      }
    });
    
    canvas.on('mouse:down', function(opt) {
        var evt = opt.e;
        if (evt.button === 1 || evt.altKey === true) {
          this.isDragging = true;
          lastsel = this.selection
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
      canvas.on('mouse:move', function(opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
      canvas.on('mouse:up', function(opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = lastsel;
        // this.selection = true;

      });


      canvas.on('mouse:wheel', function(opt) {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        // canvas.setZoom(zoom);
        // console.log(zoom, opt.e.offsetX, opt.e.offsetY)
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
          

}
