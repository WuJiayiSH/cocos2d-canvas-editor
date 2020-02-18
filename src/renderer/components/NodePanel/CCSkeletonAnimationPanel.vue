<template>
  <el-collapse-item title="CCSkeletonAnimation" name="CCSkeletonAnimation">
    <el-row>
      <el-col :span="7">
        <span>Json File</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.json" v-model="files[0]" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span>Atlas File</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.atlas" v-model="files[1]" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button @click="handleInit">Init</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Animation</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="idle" v-model="anim.name" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="anim.loop">Loop</el-checkbox>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button @click="handlePlay">Play</el-button>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCSkeletonAnimation";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      files: ["", ""],
      anim: ["", false]
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
    },
    handlePlay() {
      let node = Global.selectedNode.ref;
      node.setAnimation(0, this.anim.name, this.anim.loop);
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "anim",
        this.anim
      );
    },
    handleInit() {
      let node = Global.selectedNode.ref;
      node.removeAllChildren(true);
      node.initWithArgs(this.files[0], this.files[1], 1);
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "files",
        this.files
      );
    }
  }
};
</script>
<style scoped>
</style>