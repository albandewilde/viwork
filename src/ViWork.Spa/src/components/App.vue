<template>
    <div id="app">
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                <router-link class="navbar-brand" to="/">ViWork</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="auth.isConnected">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/classes">Gestion des classes</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/students">Gestion des élèves</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/teachers">Gestion des professeurs</router-link>
                        </li>
                        <li class="nav-item" v-required-providers="['GitHub']">
                            <router-link class="nav-link" to="/github/following">Elèves suivis sur GitHub</router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav my-2 my-md-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ auth.email }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" to="/logout">Se déconnecter</router-link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="collapse navbar-collapse" id="navbarSupportedContent" v-else>

                  <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/test">Test</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">About</router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav my-2 my-md-0">
                      <li class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#ModalSignUp">
                          Inscription
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#ModalSignIn">
                          Connexion
                        </a>
                      </li>
                    </ul>
                <sign-in></sign-in>
                <sign-up></sign-up>
                </div>
                </div>
            </nav>

            <div class="progress" v-if="isLoading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
            </div>
        </header>

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
            state
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

a.router-link-active {
  font-weight: bold;
}
</style>

<style lang="scss">
@import "../styles/global.scss";
</style>