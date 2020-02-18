<template>
 <div>
   <el-tree :data="data" :props="defaultProps" ref="tree" @node-click="handleNodeClick" @node-contextmenu="handleNodeContextmenu"></el-tree>
  </div>
</template>

<script>
import Global from '../Global'
let id = 10000
export default {
  name: 'node-tree',
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function (message) {
      console.log('node-tree boardcastMessage changed', message)
      let command = message.split(':')[1]
      if (command === 'addNode') {
        this.addNodeByMessage(command)
      }

      if (command === 'addLayer') {
        this.addNodeByMessage(command)
      }

      if (command === 'addLayerColor') {
        this.addNodeByMessage(command)
      }

      if (command === 'addLayerGradient') {
        this.addNodeByMessage(command)
      }
    }
  },
  data () {
    return {
      data: [{
        id: 0,
        ref: null,
        label: 'Layer',
        children: []
      }],
      defaultProps: {
        children: 'children',
        ref: 'ref',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      if (this.checkRootLayer(data)) {
        Global.selectedNode = data
        this.$emit('handleMessage', 'updateSelectedNode')
      }
    },

    checkRootLayer (data) {
      if (!data) {
        return false
      }

      if (data.ref) {
        return true
      }

      let cc = window.cc
      let scene = cc.Director.getInstance().getRunningScene()
      if (!scene) {
        return false
      }

      let children = scene.getChildren()
      if (!children || !children.length) {
        return false
      }

      data.ref = children[0]
      children[0].setUserData(data.id)
      return true
    },

    addNodeByMessage (message) {
      let cc = window.cc
      let nodeName = message.substring(3)
      let node = this.$refs.tree.getCurrentNode()
      if (this.checkRootLayer(node)) {
        let ref = null
        let parent = node.ref
        if (message === 'addNode') {
          ref = cc.Node.create()
          parent.addChild(ref)
        }

        if (message === 'addLayer') {
          ref = cc.Layer.create()
          parent.addChild(ref)
        }

        if (message === 'addLayerColor') {
          ref = cc.LayerColor.create(cc.c4(32, 32, 64, 255))
          parent.addChild(ref)
        }

        if (message === 'addLayerGradient') {
          ref = cc.LayerGradient.create(cc.c4(64, 32, 32, 255), cc.c4(32, 64, 32, 255))
          parent.addChild(ref)
        }

        if (ref) {
          const child = { id: id++, label: nodeName, children: [], ref: ref }
          node.children.push(child)
        }
      }
    },

    handleNodeContextmenu (event, data, node, component) {
    }
  }
}
</script>

<style scoped>
  .tree_menu{
    position: fixed;
    display: block;
    z-index: 20000;
    background-color: #fff;
    padding:5px 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
   
    ul{
      margin:0;
      padding:0;
    }
    ul li{
      list-style: none;
      margin:0;
      padding:0 15px;
      font-size: 14px;
      line-height: 30px;
      cursor: pointer;
    }
    ul li:hover{
      background-color: #ebeef5
    }
  }
</style>
