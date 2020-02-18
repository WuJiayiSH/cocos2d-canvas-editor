<template>
  <el-collapse-item title="Image" name="Image">
    <el-row>
      <el-col :span="3">
        <span>Width</span>
      </el-col>
      <el-col :span="9">
        <el-input-number controls-position="right" :disabled="true" size="mini" v-model="width"></el-input-number>
      </el-col>
      <el-col :span="3">
        <span>Height</span>
      </el-col>
      <el-col :span="9">
        <el-input-number controls-position="right" :disabled="true" size="mini" v-model="height"></el-input-number>
      </el-col>
    </el-row>

    <el-divider content-position="left">Preview</el-divider>

    <el-row>
      <el-col :span="24">
        <el-image :src="src" fit="fill"></el-image>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      src: "",
      width: 0,
      height: 0
    };
  },
  watch: {
    message: function(message) {
      // console.log('res-image-panel boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "selectedResourceChanged") {
        this.handleSelectedResourceChanged();
      }
    }
  },
  methods: {
    handleSelectedResourceChanged() {
      if (!Global.selectedResource) {
        return;
      }
      this.src = Global.selectedResource.path;
      let image = new Image();
      image.src = Global.selectedResource.path;
      image.onload = () => {
        this.width = image.width;
        this.height = image.height;
      };
    }
  }
};
</script>
<style scoped>
</style>