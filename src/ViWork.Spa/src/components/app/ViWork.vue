<template>
    <div>
        <el-container>
            <el-aside>
                <el-menu :default-active="activeIndex" :default-openeds="['1']" :router="true" style="padding-top: 20px">
                    <h5 style="margin-left: 25px">Mes Documents</h5>
                    <el-menu-item index="schemalist">
                        <i class="el-icon-document"></i>
                        <span>Mes schémas</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-share"></i>
                        <span>Partagés avec moi</span>
                        </template>
                        <el-menu-item-group title="Schémas de :">
                            <el-menu-item index="shareuser">Baptiste</el-menu-item>
                            <el-menu-item index="shareuser">Alban</el-menu-item>
                            <el-menu-item index="shareuser">Mam's</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Mes groupes :" v-for="i of data" :key="i.classId">
                             
                            <el-menu-item index="sharegroup">{{i.GroupName}}</el-menu-item>
                           
                            <el-menu-item @click="dialogVisible = true"><el-button type="primary" @click="dialogVisible = true">Nouveau groupe</el-button></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

        <el-dialog title="Créer un groupe" :visible.sync="dialogVisible" width="30%">
                <el-form model="form" label-width="120px" size="medium">
                    <el-form-item label="Nom du groupe">
                        <el-input v-model="name" placeholder="Nom du groupe"></el-input>
                    </el-form-item>
                    <el-form-item label="Ajouter des personnes">
                        <el-input v-model="idUser" placeholder="Personnes à ajouter"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Annuler</el-button>
                <el-button type="primary" @click="createGroup()">Créer</el-button>
            </span>
        </el-dialog>

        <el-main>
            <main role="main">
                <router-view class="child"></router-view>
            </main>
        </el-main>
        </el-container>
          {{User}}
    </div>
  
</template>

<script>
import AuthService from '../../services/AuthService'
import {createGroupAsync, getGroupListAsync} from '../../api/groupApi'
import { state } from "../../state"
import{ findByEmail} from '../../api/userApi'

export default {
    data() {
        return {
            page: this.$route.path,
            activeIndex: null,
            dialogVisible: false,
            model: {},
            name: null,
            User:[],
            data: [],
            email: null,
         
        }
    },
     async mounted() {
        console.log(this.auth.email)
         this.User = this.getUserId();
        await this.refreshData(this.User.userId);
        console.log(this.User);
    },

  
     computed: {
        auth: () => AuthService,
    },

    async created() {
        var splitvar = this.page.split("/");
        this.activeIndex = splitvar[3];
    },

    methods: {
        async getUserId(){
        try{
        await findByEmail(this.auth.email);
        }
        catch (e) {
                    console.error(e);
                    state.exceptions.push(e);
            }

    },
        async onSubmit(event) {
            event.preventDefault();

            // Google Chrome handles form validation based on type of the input, and presence of the "required" attribute.
            // However, it's not (yet) fully supported by all the web browsers.
            // Therefore, the code below handles validation but is very naive: a better validation is desirable.
            var errors = [];

            console.log(this.form);

            if (!this.Form.name) errors.push("Nom du groupe")

            this.errors = errors;

            if (errors.length == 0) {
                try {
                    state.isLoading = true;

                    await createGroupAsync(this.Form)
                    this.$router.replace('app/viwork/schemalist');
                }
                catch (e) {
                    console.error(e);
                    state.exceptions.push(e);
                }
                finally {
                    state.isLoading = false;
                }
            }
        },

        async refreshData() {
            try {
                state.isLoading = true;
                this.data = await getGroupListAsync();
            }
            catch (e) {
                console.error(e);
                state.exceptions.push(e);
            }
            finally {
                state.isLoading = false;
            }
        },

        async createGroup() {
            this.model.name = this.name;
            this.model.user = this.idUser;
            await createGroupAsync(this.model);
            this.dialogVisible = false;
        },
    }

   
}
</script>

