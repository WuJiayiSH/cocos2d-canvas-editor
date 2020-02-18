<template>
  <el-collapse-item title="CCSprite" name="CCSprite">
    <el-row>
      <el-col :span="7">
        <span>File name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="file" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="color" show-alpha></el-color-picker>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="flip.x">Flip X</el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox v-model="flip.y">Flip Y</el-checkbox>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCSprite";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      color: "rgba(255,255,255,1)",
      flip: { x: false, y: false },
      file: ""
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
    color: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "color",
        value
      );
    },
    file: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "file",
        value
      );
    },
    flip: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "flip",
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
</style>