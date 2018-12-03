<template>
    <div>
            <h1>This is the schema list page </h1>
        
    </div>
</template>

<script>
import AuthService from '../../../services/AuthService'
import { state } from "../../../state"
import{ findByEmail} from '../../../api/userApi'
  export default {
    data() {
      return {
        
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
    }

  };
</script>