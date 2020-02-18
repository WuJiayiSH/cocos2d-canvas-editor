<template>
  <div>
    <el-button-group>
      <el-button size="mini" @click="handleClickNode">Node</el-button>
    </el-button-group>

    <el-dropdown @command="handleCommand">
      <el-button size="mini">
        Layer<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="layer">Layer</el-dropdown-item>
        <el-dropdown-item command="layerColor">LayerColor</el-dropdown-item>
        <el-dropdown-item command="layerGradient">LayerGradient</el-dropdown-item>
        <el-dropdown-item>ScrollView</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <el-button size="mini">
        Sprite<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Sprite</el-dropdown-item>
        <el-dropdown-item>Scale9Sprite</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <el-button size="mini">
        Label<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Label</el-dropdown-item>
        <el-dropdown-item>LabelBMFont</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <el-button size="mini">
        Menu<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Menu</el-dropdown-item>
        <el-dropdown-item>MenuItemImage</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <el-button size="mini">
        Misc<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>ControlButton</el-dropdown-item>
        <el-dropdown-item>ParticleSystem</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
  
    
</template>

<script>
export default {
  name: 'editor-header',
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function (message) {
      console.log('editor-header boardcastMessage changed', message)
    }
  },
  methods: {
    handleClickNode () {
      this.$emit('handleMessage', 'addNode')
    },
    handleCommand (command) {
      this.$emit('handleMessage', 'add' + command.slice(0, 1).toUpperCase() + command.slice(1))
    }
  }
}
</script>

<style scoped>
</style>
