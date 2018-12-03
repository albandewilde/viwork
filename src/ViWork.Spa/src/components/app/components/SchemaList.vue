<template>
    <div>
            <h1>This is the schema list page </h1>
        <el-button type="success" @click="dialogVisible = true">Créer un schéma</el-button>

        <el-dialog title="Créer un schéma" :visible.sync="dialogVisible" width="30%">
            <el-form model="form" label-width="120px" size="medium">
                    <el-form-item label="Nom du schéma">
                        <el-input v-model="name" placeholder="Nom du schéma"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Annuler</el-button>
                <el-button type="primary" @click="createSchema()">Créer</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import AuthService from '../../../services/AuthService'
import { state } from "../../../state"
import{ findByEmail} from '../../../api/userApi'
import {createSchemaAsync} from "../../../api/schemaApi"
  export default {
    data() {
      return {
        dialogVisible: false,
        name: null,
        model: {
            SchemaName: null,
            UserId: null
        },
      }
    },

    async mounted() {
        await this.getUserId();
        //await this.refreshData(this.User.userId);
        console.log(this.User.userId);
    },

  
     computed: {
        auth: () => AuthService,
    },

    methods: {
        async getUserId(){
        try {
        this.User = await findByEmail(this.auth.email);
        }
        catch (e) {
                    console.error(e);
                    state.exceptions.push(e);
            }

    },
        async createSchema() {
            console.log(this.User.userId);
            console.log(this.name);
            this.model.SchemaName = this.name;
            this.model.UserId = this.User.userId;
            await createSchemaAsync(this.userId);
        }
    }

  };
</script>