<template>
    <div>
        <el-row>
            <h1>This is the ShareGroup page of <strong>{{data.groupName}}</strong>  <el-button type="danger" @click="deleteGroup()">Supprimer</el-button></h1>
        </el-row>
    </div>
</template>

<script>
import {getGroupData, deleteGroupAsync} from '../../../api/groupApi'
export default {
    data(){
        return{
            data: null,
        }
    },

    async mounted() {
        await this.refreshData()
    },

    methods: {
         async refreshData() {
            try {
                //state.isLoading = true;
                console.log( " " + this.$route.params.id)
                this.data = await getGroupData(this.$route.params.id);
            }
            catch (e) {
                console.error(e);
                state.exceptions.push(e);
            }
            finally {
                //state.isLoading = false;
            }
        },

        async deleteGroup() {
            this.groupId = this.$route.params.id;
            console.log(this.$route.params.id)
            await deleteGroupAsync(this.groupId);
            window.location = "/app/viwork/schemalist";
        }
    }
}
</script>
