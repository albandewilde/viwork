<template>
    <div id="app">
            <el-row class="navbarcolor">
                <el-col :span="4"><div class="grid-content"></div></el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="orange" :router="true">
                            <el-menu-item index="/" class="brand"><img src="../../public/favicon.png" height="30" width="30"><span> ViWork</span></el-menu-item>
                            <el-menu-item index="/">Home</el-menu-item>
                            <el-menu-item index="/test">Test</el-menu-item>
                            <el-menu-item index="/about">About</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>

                <el-col :span="6" v-if="auth.isConnected">
                    <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="orange" :router="true">
                        <el-submenu index="1">
                            <template slot="title">{{auth.email}}</template>
                            <el-menu-item index="/logout">Déconnexion</el-menu-item>
                        </el-submenu>
                            <router-link to="/app/viwork/schemalist">
                                <el-button type="warning" style="margin-top: 10px" index="/app/viwork/schemalist">Lancer</el-button>
                            </router-link>
                    </el-menu>
                </el-col>

                <el-col :span="4" v-else>
                        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="orange">
                            <el-menu-item index="0" @click="dialogFormVisible = true">Connexion</el-menu-item>
                        </el-menu>
                </el-col>
            </el-row>

            <el-dialog width="30%" top="5vh" :show-close="false" :visible.sync="dialogFormVisible" >
                <el-tabs type="card" :stretch="true" @tab-click="handleClick" style="margin-top: -60px; margin-right: -20px; margin-left: -20px">
                    <el-tab-pane label="Connexion"><sign-in></sign-in></el-tab-pane>
                    <el-tab-pane label="Inscription"><sign-up></sign-up></el-tab-pane>
                </el-tabs>
            </el-dialog>

<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>

            <!--div class="progress" v-if="isLoading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
            </div>
        </header-->

        <main role="main" class="p-3 p-md-4 p-lg-5">
            <router-view class="child"></router-view>
        </main>
    </div>
</template>
<script>

import AuthService from '../services/AuthService'
import '../directives/requiredProviders'
import { state } from "../state"
import SignIn from './modals/SignIn.vue'
import SignUp from './modals/SignUp.vue'




export default {
    data() {
        return {
            
            state,
            activeIndex: this.$route.path,
            activeIndex2: 0,
            dialogFormVisible: false,
            form: {},
        }
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },

    computed: {
        auth: () => AuthService,
        
        isLoading() {
            return this.state.isLoading;
        }
    },

    components: {
        SignIn,
        SignUp
    }
}
</script>

<style lang="scss" scoped>
.progress {
  margin: 0px;
  padding: 0px;
  height: 5px;
}

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.navbarcolor{
    background-color: #545c64;
}

</style>

<style lang="scss">
@import "../styles/global.scss";
</style>