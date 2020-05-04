<template>
  <el-collapse-item title="CCControlSlider" name="CCControlSlider">
    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="enabled">Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>File name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="bg" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>File name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="progress" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>File name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="thumb" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Max</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="max" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
    <el-row class="panel-item">
      <el-col :span="7">
        <span>Min</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="min" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Value</span>
      </el-col>
      <el-col :span="17">
        <el-slider v-model="value" show-input input-size="mini" :max="max" :min="min" :step="0.01"></el-slider>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCControlSlider";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      max: 1,
      min: 0,
      value: 0,
      bg: "",
      progress: "",
      thumb: "",
      enabled: true
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
    min: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "min",
        value
      );
    },
    enabled: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "enabled",
        value
      );
    },
    max: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "max",
        value
      );
    },
    value: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "value",
        value
      );
    },
    bg: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "bg",
        value
      );
    },
    progress: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "progress",
        value
      );
    },
    thumb: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "thumb",
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