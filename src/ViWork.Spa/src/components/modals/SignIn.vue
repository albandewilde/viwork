<template>
<div>
        <el-col :offset="7">
            <el-button type="success" style="width: 40%" @click="login('GitHub')">
            <i class="fa fa-github" aria-hidden="true"></i> GitHub
            </el-button>
        </el-col>
        <el-col :offset="7">
            <el-button type="primary" style="width: 40%" @click="register('Base')">Se connecter via ViWork
            </el-button>
        </el-col>
        <el-col style="padding-top: 15px">
            <el-form ref="form" :model="form" label-width="175px">
            <el-form-item label="Adresse Email :">
                <el-input type="text" placeholder="Email" v-model="form.Email" size="medium" style="width: 75%;"></el-input>
            </el-form-item>
            <el-form-item label="Mot de passe :">
                <el-input type="password" placeholder="Mot de passe" v-model="form.Password" size="medium" style="width: 75%;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">Se Connecter</el-button>
            </el-form-item>
        </el-form>
        </el-col>
    </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'

export default {
    data() {
        return {
            endpoint: null,
            form: {
                Email: '',
                Password: ''
            }
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
            this.$router.replace('/about');
            dialogFormVisible: false;    
        },

        register(provider) {
            AuthService.register(provider);
            this.$router.replace('/');
        },

        onAuthenticated() {
            this.$router.replace('/');
        },

        async onSubmit() {

            // Google Chrome handles form validation based on type of the input, and presence of the "required" attribute.
            // However, it's not (yet) fully supported by all the web browsers.
            // Therefore, the code below handles validation but is very naive: a better validation is desirable.
            var errors = [];

            if (!this.form.FirstName) errors.push("Prénom")
            if (!this.form.LastName) errors.push("Nom")
            if (!this.form.Email) errors.push("Email")
            if (!this.form.Password) errors.push("Mot de passe")
            if (!this.form.ConfirmPassword) errors.push("Confirmez mot de passe")

            this.errors = errors;

            if (errors.length == 0) {
                try {
                    state.isLoading = true;

                    await register(this.form);

                    this.$router.replace('/');
                }
                catch (e) {
                    console.error(e);
                    state.exceptions.push(e);
                }
                finally {
                    state.isLoading = false;
                }
            }
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
