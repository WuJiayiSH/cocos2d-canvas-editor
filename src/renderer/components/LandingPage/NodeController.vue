<template>
  <div
    class="controller"
    ref="controller"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @mouseup="mouseup"
  >
    <div class="anchorPoint" ref="anchorPoint"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Global from "../Global";
let interval = 0;
export default {
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function(message) {
      // console.log('resource-tree boardcastMessage changed', message)
      // let command = message.split(':')[1]
      // if (command === 'updateNodeController') {
      //   this.updateStyle()
      // } else if (command === 'selectedNodeChanged') {
      //   this.updateStyle()
      // }
    }
  },
  data() {
    return {
      dragging: false,
      originalLocationX: 0,
      originalLocationY: 0,
      originalNodeX: 0,
      originalNodeY: 0
    };
  },
  created() {
    interval = setInterval(() => {
      this.updateStyle();
    }, 50);
  },
  destroyed() {
    clearInterval(interval);
  },
  methods: {
    mousedown() {
      if (!Global.selectedNode) {
        return;
      }

      this.dragging = true;
      event.preventDefault();
      console.log("mousedown");
      let cc = window.cc;
      let pos = cc.getHTMLElementPosition(cc.canvas);
      let tx = event.pageX;
      let ty = event.pageY;
      let eglViewer = cc.EGLView.getInstance();
      let location = eglViewer.convertToLocationInView(tx, ty, pos);
      this.originalLocationX = location.x;
      this.originalLocationY = location.y;
      this.originalNodeX = Global.selectedNode.ref.getPositionX();
      this.originalNodeY = Global.selectedNode.ref.getPositionY();
    },
    mousemove() {
      if (this.dragging) {
        event.preventDefault();
        let cc = window.cc;
        let pos = cc.getHTMLElementPosition(cc.canvas);
        let tx = event.pageX;
        let ty = event.pageY;
        let eglViewer = cc.EGLView.getInstance();
        let location = eglViewer.convertToLocationInView(tx, ty, pos);
        if (Global.selectedNode) {
          Global.selectedNode.ref.setPosition(
            location.x - this.originalLocationX + this.originalNodeX,
            location.y - this.originalLocationY + this.originalNodeY
          );
        }
        this.updateStyle();
        this.$emit("handleMessage", "updateCCNodePanel");
      }
    },
    mouseup() {
      this.dragging = false;
      event.preventDefault();
      console.log("mouseup");
    },
    updateStyle() {
      if (!Global.selectedNode || !Global.selectedNode.ref) {
        return;
      }
      let cc = window.cc;
      let canvasRect = cc.getHTMLElementPosition(cc.canvas);
      let eglViewer = cc.EGLView.getInstance();
      let pixelRatio = eglViewer.getDevicePixelRatio();
      pixelRatio = (800 / canvasRect.width) * pixelRatio;
      let clippingRect = this.$refs.controller.parentNode.getBoundingClientRect();

      // draw ap
      let apPos = Global.selectedNode.ref.convertToWorldSpaceAR(cc.p(0, 0));
      apPos.x = apPos.x / pixelRatio + canvasRect.left - 1.5;
      apPos.y = canvasRect.height - apPos.y / pixelRatio + canvasRect.top - 1.5;

      if (apPos.x < clippingRect.x || apPos.y < clippingRect.y || apPos.x > clippingRect.right || apPos.y > clippingRect.bottom) {
        this.$refs.anchorPoint.style.display = "none";
      }else {
        this.$refs.anchorPoint.style.display = "";
        this.$refs.anchorPoint.style.left = apPos.x + "px";
        this.$refs.anchorPoint.style.top = apPos.y + "px";
        this.$refs.anchorPoint.style.width = 3 + "px";
        this.$refs.anchorPoint.style.height = 3 + "px";
      }
      
      // draw border
      let trans = Global.selectedNode.ref.nodeToWorldTransform();
      let contentSize = Global.selectedNode.ref.getContentSize();
      var boundingBox = cc.rect(0, 0, contentSize.width, contentSize.height);
      boundingBox = cc.RectApplyAffineTransform(boundingBox, trans);

      let width = boundingBox.width / pixelRatio;
      let height = boundingBox.height / pixelRatio;
      let left = boundingBox.x / pixelRatio + canvasRect.left;
      let top =
        canvasRect.height -
        (boundingBox.y + boundingBox.height) / pixelRatio +
        canvasRect.top;

      if (left < clippingRect.x) {
        width = width - (clippingRect.x - left);
        left = clippingRect.x;
      }
      if (top < clippingRect.y) {
        height = height - (clippingRect.y - top);
        top = clippingRect.y;
      }
      if (left + width > clippingRect.right) {
        width = clippingRect.right - left;
        if (width < 0) {
          width = 0;
        }
      }
      if (top + height > clippingRect.bottom) {
        height = clippingRect.bottom - top;
        if (height < 0) {
          height = 0;
        }
      }

      this.$refs.controller.style.width = width + "px";
      this.$refs.controller.style.height = height + "px";
      this.$refs.controller.style.left = left + "px";
      this.$refs.controller.style.top = top + "px";
    }
  }
};
</script>

<style scoped>
.controller {
  border: 1px solid #0f0;
  height: 0;
  width: 0;
  position: fixed;
  background-color: #666;
  opacity: 0.5;
  top: 0;
  left: 0;
}

.anchorPoint {
  background-color: #0f0;
  height: 4;
  width: 4;
  position: fixed;
  top: 0;
  left: 0;
}

.controller img {
  height: 100%;
  width: 100%;
}
</style>