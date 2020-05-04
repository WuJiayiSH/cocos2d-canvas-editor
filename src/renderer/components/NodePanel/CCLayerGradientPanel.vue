<template>
  <el-collapse-item title="CCLayerGradient" name="CCLayerGradient" size="mini">
    <el-row class="panel-item">
      <el-col :span="7">
        <span>Start Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="start" show-alpha></el-color-picker>
      </el-col>
      <el-col :span="9">
        <span style="color:red">*Start color equals color</span>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>End Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="end" show-alpha></el-color-picker>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Vector</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="vector.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="vector.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCLayerGradient";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      start: "rgba(0,0,0,0)",
      end: "rgba(0,0,0,0)",
      vector: { x: 0, y: -1 }
    };
  },
  created() {
    this.syncProp();
  },
  watch: {
    message: function(message) {
      let command = message.split(":")[1];
      if (command === "selectedNodeChanged") {
        this.syncProp();
      }
    },
    start: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "start",
        value
      );
    },
    end: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "end",
        value
      );
    },
    vector: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "vector",
          value
        );
      },
      deep: true
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