<template>
  <el-collapse-item title="CCLayerColor" name="CCLayerColor">
    <el-row class="panel-item">
      <el-col :span="7">
        <span>Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="color" show-alpha></el-color-picker>
      </el-col>
    </el-row>
    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="cascadeColor">Cascade Color Enabled</el-checkbox>
      </el-col>
    </el-row>
    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="cascadeOpacity">Cascade Opacity Enabled</el-checkbox>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCLayerColor";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      cascadeColor: false,
      cascadeOpacity: false,
      color: "rgba(19,206,102,0)"
    };
  },
  watch: {
    message: function(message) {
      // console.log('layer-panel boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "selectedNodeChanged") {
        this.syncProp();
      }
    },
    color: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "color",
        value
      );
    },
    cascadeOpacity: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "cascadeOpacity",
        value
      );
    },
    cascadeColor: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "cascadeColor",
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
.panel-item {margin-bottom: 2px;}
</style>