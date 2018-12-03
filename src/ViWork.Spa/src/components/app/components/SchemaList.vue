<template>
    <div>
            <h1>This is the schema list page </h1>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="schemaId" label="ID" width="100"></el-table-column>
                <el-table-column prop="schemaName" label="Nom"></el-table-column>
                <el-table-column  prop="groupName" label="Groupe"></el-table-column>
                <el-table-column prop="schemaId" label="Action">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="deleteSchema(scope.$index)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="deleteSchema($data[scope.$index])">Delete {{scope.$index}}</el-button>
                    </template>
                </el-table-column>
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
            console.log("je suis ok");
            this.data = await GetSchemaByIdAsync(userId);
            state.isLoading = false;
            console.log(this.data.length);
            // for(var i = 0; i < this.data.length; i++){
            //     this.data[i].push({action: '<el-button size="mini" type="danger" @click="deleteSchema(i.schemaId)">Delete {{i.schemaId}}</el-button>'})
            // };
            console.log(this.data);
        },

        async deleteSchema(daaata){
            console.log(daaata);
        }
    }

  };
</script>