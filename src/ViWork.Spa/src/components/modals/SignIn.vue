<template>
<div id="signin">
    
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
                            <button type="button" @click="login('GitHub')" class="btn btn-lg btn-block btn-primary">
                <i class="fa fa-github" aria-hidden="true"></i> Se connecter via GitHub</button>
            <button type="button" @click="login('Base')" class="btn btn-lg btn-block btn-default">Se connecter via ViWork</button>
                          </div>
                          <!--div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div-->
                        </div>
                      </div>
                    </div>
</div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'

export default {
    data() {
        return {
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
        login(provider) {
            AuthService.login(provider);
        },

        onAuthenticated() {
            this.$router.replace('/');
        }
    }
}
</script>

<style lang="scss">
iframe {
  width: 100%;
  height: 600px;
}
</style>
