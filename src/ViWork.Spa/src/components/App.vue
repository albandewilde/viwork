<template>
    <div id="app">
        <el-container>
            <el-header style="padding: 0">
                <el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="orange" :router="true">
                    <el-menu-item index="/" class="brand"><img src="../../public/favicon.png" height="30" width="30"><span> ViWork</span></el-menu-item>
                    <el-menu-item index="/">Home</el-menu-item>
                    <el-menu-item index="/test">Test</el-menu-item>
                    <el-menu-item index="/about">About</el-menu-item>
                    
                    <el-submenu index="1" v-if="auth.isConnected">
                        <template slot="title"><i class="el-icon-setting"></i></template>
                        <el-menu-item index="/logout">Déconnexion</el-menu-item>
                    </el-submenu>
                    <router-link to="/app/viwork/schemalist" v-if="auth.isConnected">
                        <el-button type="warning" style="margin-top: 10px" index="/app/viwork/schemalist"><i class="el-icon-menu"></i> Lancer</el-button>
                    </router-link>

                    <el-submenu index="2" v-else>
                        <template slot="title">Connexion</template>
                        <el-menu-item @click="login('GitHub')"><el-button type="success">via GitHub</el-button></el-menu-item>
                        <el-menu-item @click="login('Base')"><el-button type="primary">via ViWork</el-button></el-menu-item>
                    </el-submenu>

                </el-menu>

                <div class="progress" v-if="isLoading">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                </div>
            </el-header>
            
            <el-main style="padding: 0">
                <main role="main">
                    <router-view class="child"></router-view>
                </main>
            </el-main>
        </el-container>
    </div>
</template>
<script>

import AuthService from '../services/AuthService'
import '../directives/requiredProviders'
import { state } from "../state"
import SignIn from './modals/SignIn.vue'
import SignUp from './modals/SignUp.vue'
import {Sprite} from 'pixi.js'
import {Renderer} from 'pixi.js'
import {Container} from 'pixi.js'
import {Stage} from 'pixi.js'

export default {
    data() {
        return {
            state,
            activeIndex: this.$route.path,
            dialogFormVisible: false,
            endpoint: null
        }
    },

    mounted() {
        AuthService.registerAuthenticatedCallback(() => this.onAuthenticated());
    },

    beforeDestroy() {
        AuthService.removeAuthenticatedCallback(() => this.onAuthenticated());
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      login(provider) {
            AuthService.login(provider);
        },

        onAuthenticated() {
            this.$router.replace('/');
        }
    },

    computed: {
        auth: () => AuthService,
        
        isLoading() {
            return this.state.isLoading;
        }
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