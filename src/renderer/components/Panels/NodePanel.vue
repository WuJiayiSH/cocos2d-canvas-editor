<template>

<div>
  <el-divider content-position="left">CCNode</el-divider>
  <el-row>
    <el-col :span="6"><span >Position</span></el-col>
    <el-col :span="1"><span >X</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="positionX" :precision="3" :step="0.1" ></el-input-number></el-col>
    <el-col :span="1"><span >Y</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="positionY" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="6"><span >Content Size</span></el-col>
    <el-col :span="1"><span >W</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="contentSizeW" :precision="3" :step="0.1" ></el-input-number></el-col>
    <el-col :span="1"><span >H</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="contentSizeH" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="6"><span >Anchor Point</span></el-col>
    <el-col :span="1"><span >X</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="anchorPointX" :precision="3" :step="0.1" ></el-input-number></el-col>
    <el-col :span="1"><span >Y</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="anchorPointY" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="6"><span >Scale</span></el-col>
    <el-col :span="1"><span >X</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="scaleX" :precision="3" :step="0.1" ></el-input-number></el-col>
    <el-col :span="1"><span >Y</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="scaleY" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="7"><span >Rotation</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="rotation" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="6"><span >Skew</span></el-col>
    <el-col :span="1"><span >X</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="skewX" :precision="3" :step="0.1" ></el-input-number></el-col>
    <el-col :span="1"><span >Y</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="skewY" :precision="3" :step="0.1" ></el-input-number></el-col>
  </el-row>

  <el-row>
    <el-col :span="7"><span >Tag</span></el-col>
    <el-col :span="8"><el-input-number size="mini" controls-position="right" v-model="tag" :step="1" ></el-input-number></el-col>
  </el-row>
</div>
</template>


<script>
  import Global from '../Global'
  export default {
    name: 'node-panel',
    props: {
      message: {
        type: String
      }
    },
    data () {
      return {
        positionX: 0,
        positionY: 0,
        contentSizeW: 0,
        contentSizeH: 0,
        anchorPointX: 0,
        anchorPointY: 0,
        scaleX: 0,
        scaleY: 0,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        tag: 0
      }
    },
    watch: {
      message: function (message) {
        console.log('node-panel boardcastMessage changed', message)
        let command = message.split(':')[1]
        if (command === 'updateSelectedNode') {
          this.handleUpdateSelectedNode()
        }
      },
      positionX: function (value) { Global.selectedNode.ref.setPositionX(value) },
      positionY: function (value) { Global.selectedNode.ref.setPositionY(value) },
      contentSizeW: function (value) { Global.selectedNode.ref.setContentSize(value, this.contentSizeH) },
      contentSizeH: function (value) { Global.selectedNode.ref.setContentSize(this.contentSizeW, value) },
      anchorPointX: function (value) { Global.selectedNode.ref.setAnchorPoint(value, this.anchorPointY) },
      anchorPointY: function (value) { Global.selectedNode.ref.setAnchorPoint(this.anchorPointX, value) },
      scaleX: function (value) { Global.selectedNode.ref.setScaleX(value) },
      scaleY: function (value) { Global.selectedNode.ref.setScaleY(value) },
      rotation: function (value) { Global.selectedNode.ref.setRotation(value) },
      skewX: function (value) { Global.selectedNode.ref.setSkewX(value) },
      skewY: function (value) { Global.selectedNode.ref.setSkewY(value) },
      tag: function (value) { Global.selectedNode.ref.setTag(value) }
    },
    methods: {
      handleUpdateSelectedNode () {
        if (!Global.selectedNode) {
          return
        }
        let node = Global.selectedNode.ref
        this.positionX = node.getPositionX()
        this.positionX = node.getPositionX()
        this.positionY = node.getPositionY()
        this.contentSizeW = node.getContentSize().width
        this.contentSizeH = node.getContentSize().height
        this.anchorPointX = node.getAnchorPoint().x
        this.anchorPointY = node.getAnchorPoint().y
        this.scaleX = node.getScaleX()
        this.scaleY = node.getScaleY()
        this.rotation = node.getRotation()
        this.skewX = node.getSkewX()
        this.skewY = node.getSkewY()
        this.tag = node.getTag()
      }
    }
  }
</script>
<style scoped>

  
  
</style>