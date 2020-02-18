<template>
  <el-collapse-item title="CCParticleSystem" name="CCParticleSystem">
    <el-row>
      <el-col :span="12">
        <el-button @click="handlePlay">Play</el-button>
        <el-button @click="handleStop">Stop</el-button>
      </el-col>
    </el-row>
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
        <span>Mode</span>
      </el-col>
      <el-col :span="8">
        <el-dropdown @command="handleMode">
          <el-button size="mini">
            {{mode===0?'Gravity':'Radius'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">Gravity</el-dropdown-item>
            <el-dropdown-item command="1">Radius</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <span>Position Var</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="posVar.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="posVar.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Emit rate</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="emitRate" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Duration</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="dur" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span>Total Particles</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="total" :step="1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Life</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="life" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="lifeVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Start Size</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="startSize" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="startSizeVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span>End Size</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="endSize" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="endSizeVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Start Spin</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="startSpin" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="startSpinVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span>End Spin</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="endSpin" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="endSpinVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Angle</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="angle" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="angleVar" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <span>Gravity</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="gravity.x"
          :precision="3"
          :step="0.1"
          :disabled="mode!=0"
        ></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="gravity.y"
          :precision="3"
          :step="0.1"
          :disabled="mode!=0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Speed</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="speed" :precision="3" :step="0.1" :disabled="mode!=0"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="speedVar"
          :precision="3"
          :step="0.1"
          :disabled="mode!=0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Tangential Accel</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="tang" :precision="3" :step="0.1" :disabled="mode!=0"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="tangVar"
          :precision="3"
          :step="0.1"
          :disabled="mode!=0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Radial Accel</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="radial" :precision="3" :step="0.1" :disabled="mode!=0"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="radialVar"
          :precision="3"
          :step="0.1"
          :disabled="mode!=0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Start Radius</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="startRadius"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="startRadiusVar"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>End Radial</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="endRadius"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="endRadiusVar"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Rotate Per Second</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="rotate"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="rotateVar"
          :precision="3"
          :step="0.1"
          :disabled="mode==0"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Start Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="startColor" show-alpha></el-color-picker>
      </el-col>

      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="startColorVar" show-alpha></el-color-picker>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>End Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="endColor" show-alpha></el-color-picker>
      </el-col>

      <el-col :span="1">
        <span>±</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="endColorVar" show-alpha></el-color-picker>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="additive">Blend Additive</el-checkbox>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCParticleSystem";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      mode: 0,
      posVar: { x: 0, y: 0 },
      emitRate: 0,
      dur: 0,
      total: 0,
      life: 0,
      lifeVar: 0,
      startSize: 0,
      startSizeVar: 0,
      endSize: 0,
      endSizeVar: 0,
      startSpin: 0,
      startSpinVar: 0,
      endSpin: 0,
      endSpinVar: 0,
      angle: 0,
      angleVar: 0,
      gravity: { x: 0, y: 0 },
      speed: 0,
      speedVar: 0,
      tang: 0,
      tangVar: 0,
      radial: 0,
      radialVar: 0,
      startRadius: 0,
      startRadiusVar: 0,
      endRadius: 0,
      endRadiusVar: 0,
      rotate: 0,
      rotateVar: 0,
      startColor: "rgba(255,255,255,1)",
      startColorVar: "rgba(255,255,255,1)",
      endColor: "rgba(255,255,255,1)",
      endColorVar: "rgba(255,255,255,1)",
      additive: true,
      file: ""
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
    },
    posVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "posVar",
          value
        );
      },
      deep: true
    },
    emitRate: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "emitRate",
          value
        );
      }
    },
    dur: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "dur",
          value
        );
      }
    },
    total: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "total",
          value
        );
      }
    },
    life: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "life",
          value
        );
      }
    },
    lifeVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "lifeVar",
          value
        );
      }
    },
    startSize: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startSize",
          value
        );
      }
    },
    startSizeVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startSizeVar",
          value
        );
      }
    },
    endSize: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endSize",
          value
        );
      }
    },
    endSizeVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endSizeVar",
          value
        );
      }
    },
    startSpin: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startSpin",
          value
        );
      }
    },
    startSpinVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startSpinVar",
          value
        );
      }
    },
    endSpin: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endSpin",
          value
        );
      }
    },
    endSpinVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endSpinVar",
          value
        );
      }
    },
    angle: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "angle",
          value
        );
      }
    },
    angleVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "angleVar",
          value
        );
      }
    },
    gravity: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "gravity",
          value
        );
      },
      deep: true
    },
    speed: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "speed",
          value
        );
      }
    },
    speedVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "speedVar",
          value
        );
      }
    },
    tang: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "tang",
          value
        );
      }
    },
    tangVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "tangVar",
          value
        );
      }
    },
    radial: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "radial",
          value
        );
      }
    },
    radialVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "radialVar",
          value
        );
      }
    },
    startRadius: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startRadius",
          value
        );
      }
    },
    startRadiusVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startRadiusVar",
          value
        );
      }
    },
    endRadius: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endRadius",
          value
        );
      }
    },
    endRadiusVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endRadiusVar",
          value
        );
      }
    },
    rotate: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "rotate",
          value
        );
      }
    },
    rotateVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "rotateVar",
          value
        );
      }
    },
    startColor: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startColor",
          value
        );
      }
    },
    startColorVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "startColorVar",
          value
        );
      }
    },
    endColor: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endColor",
          value
        );
      }
    },
    endColorVar: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "endColorVar",
          value
        );
      }
    },
    additive: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "additive",
          value
        );
      }
    },
    file: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "file",
          value
        );
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
      Global.selectedNode.ref.resetSystem();
    },
    handleStop() {
      Global.selectedNode.ref.stopSystem();
    },
    handleMode(command) {
      this.mode = Number(command);
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "mode",
        this.mode
      );
    }
  }
};
</script>
<style scoped>
</style>