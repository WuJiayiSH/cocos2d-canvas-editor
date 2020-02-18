<template>
  <el-collapse-item title="CCLayer" name="CCLayer">
    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="touch">Touch Enabled</el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox v-model="mouse">Mouse Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="accelerometer">Accelerometer Enabled</el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox v-model="keyboard">Keyboard Enabled</el-checkbox>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCLayer";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      touch: false,
      mouse: false,
      accelerometer: false,
      keyboard: false
    };
  },
  created() {
    this.syncProp();
  },
  watch: {
    message: function(message) {
      // console.log('layer-panel boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "selectedNodeChanged") {
        this.syncProp();
      }
    },
    touch: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "touch",
        value
      );
    },
    mouse: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "mouse",
        value
      );
    },
    accelerometer: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "accelerometer",
        value
      );
    },
    keyboard: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "keyboard",
        value
      );
    }
  },
  methods: {
    syncProp() {
      if (!Global.selectedNode) {
        return;
      }
      let node = Global.selectedNode.ref;
      let cc = window.cc;
      let obj = cc.CanvasEditor.getParser(className).toObject(node);
      for (let key in obj) {
        this[key] = obj[key];
      }
    }
  }
};
</script>
<style scoped>
</style>