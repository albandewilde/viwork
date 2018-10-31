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

                    <div class="modal fade" id="ModalSignUp" tabindex="-1" role="dialog" aria-labelledby="ModalSignUpLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="ModalSignUpLabel">Inscription</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <button type="button" @click="login('GitHub')" class="btn btn-lg btn-block btn-primary">
                              <i class="fa fa-github" aria-hidden="true"></i>S'inscrire avec GitHub</button>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="modal fade" id="ModalSignIn" tabindex="-1" role="dialog" aria-labelledby="ModalSignInLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="ModalSignInLabel">Connexion</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            ...
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>


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

import AuthService from '../services/AuthService';
import '../directives/requiredProviders';
import { state } from '../state';

export default {
    data() {
        return {
            endpoint: null,
            state,
        };
    },

    mounted() {
      AuthService.registerAuthenticatedCallback(() => this.onAuthenticated());
    },

    beforeDestroy() {
      AuthService.removeAuthenticatedCallback(() => this.onAuthenticated());
    },

    methods: {
      login(provider) {
        AuthService.login(provider);
      },

      onAuthenticated() {
        this.$router.replace('/');
      },
    },

    computed: {
        auth: () => AuthService,
        isLoading() {
            return this.state.isLoading;
        },
    },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
