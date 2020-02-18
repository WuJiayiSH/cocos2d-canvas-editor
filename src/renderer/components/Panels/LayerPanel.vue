<template>

<div>
  <el-divider content-position="left">CCLayer</el-divider>

  <el-row>
    <el-col :span="12"><el-checkbox v-model="touchEnabled">Touch enabled</el-checkbox></el-col>
    <el-col :span="12"><el-checkbox v-model="mouseEnabled">Mouse enabled</el-checkbox></el-col>
  </el-row>

  <el-row>
    <el-col :span="12"><el-checkbox v-model="accelerometerEnabled">Accelerometer enabled</el-checkbox></el-col>
    <el-col :span="12"><el-checkbox v-model="keyboardEnabled">Keyboard enabled</el-checkbox></el-col>
  </el-row>
</div>
</template>


<script>
  import Global from '../Global'
  export default {
    name: 'layer-panel',
    props: {
      message: {
        type: String
      }
    },
    data () {
      return {
        touchEnabled: false,
        mouseEnabled: false,
        accelerometerEnabled: false,
        keyboardEnabled: false
      }
    },
    watch: {
      message: function (message) {
        console.log('layer-panel boardcastMessage changed', message)
        let command = message.split(':')[1]
        if (command === 'updateSelectedNode') {
          this.handleUpdateSelectedNode()
        }
      }
    },
    methods: {
      handleUpdateSelectedNode () {
        if (!Global.selectedNode) {
          return
        }
        let node = Global.selectedNode.ref
        this.touchEnabled = node.isTouchEnabled()
        this.mouseEnabled = node.isMouseEnabled()
        this.accelerometerEnabled = node.isAccelerometerEnabled()
        this.keyboardEnabled = node.isKeyboardEnabled()
      }
    }
  }
</script>
<style scoped>

  
  
</style>