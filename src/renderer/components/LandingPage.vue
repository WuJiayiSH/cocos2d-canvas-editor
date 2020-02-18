<template>
    <el-container>
      <el-header>
          <editor-header @handleMessage="handleMessage" :message="boardcastMessage"></editor-header>
      </el-header>
      <el-container>
        <el-aside width="240px">
          <node-tree  @handleMessage="handleMessage" :message="boardcastMessage"></node-tree>
        </el-aside>
        <el-container>
          <el-main>
            <DIV  style="width:800px;height:450px;margin:0 auto" >
              <canvas id="gameCanvas" width=800 height=450 ></canvas>
            </DIV>
          </el-main>
          <el-footer></el-footer>
        </el-container>
        <el-aside width="400px">
          <node-panel v-if="vPanels.node" :message="boardcastMessage"></node-panel>
          <layer-panel v-if="vPanels.layer" :message="boardcastMessage"></layer-panel>
        </el-aside>
      </el-container>
    </el-container>
</template>


<script>
  import Global from './Global'
  import NodeTree from './LandingPage/NodeTree'
  import EditorHeader from './LandingPage/EditorHeader'
  import NodePanel from './Panels/NodePanel'
  import LayerPanel from './Panels/LayerPanel'
  let globalMessageId = 0
  export default {
    name: 'landing-page',
    components: { NodeTree, EditorHeader, NodePanel, LayerPanel },
    data () {
      return {
        boardcastMessage: '',
        vPanels: {
          node: false
        }
      }
    },
    methods: {
      handleMessage (message) {
        console.log('LandingPage recieved', message)
        let command = message.split(':')[0]
        if (command === 'updateSelectedNode') {
          if (Global.selectedNode) {
            this.vPanels.node = true
          }

          if (Global.selectedNode.label === 'Layer' || Global.selectedNode.label === 'LayerColor' || Global.selectedNode.label === 'LayerGradient') {
            this.vPanels.layer = true
          } else {
            this.vPanels.layer = false
          }
        }
        this.boardcastMessage = (globalMessageId++) + ':' + message
      }
    }
  }
</script>
<style>

  .el-header, .el-footer {
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
  line-height: 60px;
  }
  
  .el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: left;
  line-height: 30px;
  margin-left: 4px;
  }
  
  .el-main {
  background-color: #888888;
  color: #333;
  text-align: center;
  line-height: 160px;
  }
  
  body > .el-container {
  margin-bottom: 40px;
  }
  
  html,body,#app,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
  }

  
</style>