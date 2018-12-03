<template>
    <div>
            <h1>This is the schema list page </h1>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="schemaId" label="ID" width="100"></el-table-column>
                <el-table-column prop="schemaName" label="Nom"></el-table-column>
                <el-table-column  prop="groupName" label="Groupe"></el-table-column>
                <el-table-column  prop="action" label="Action"></el-table-column>
            </el-table>
        
    </div>
</template>

<script>
import AuthService from '../../../services/AuthService'
import { state } from "../../../state"
import{ findByEmail} from '../../../api/userApi'
import { GetSchemaByIdAsync} from "../../../api/schemaApi"
  export default {
    data() {
      return {
          data: null,
      }
    },

    async mounted() {
        await this.getUserId();
        await this.refreshData(this.User.userId);
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

        async refreshData(userId){
            state.isLoading = true;
            this.data = await GetSchemaByIdAsync(userId);
            state.isLoading = false;
        }
    }

  };
</script>