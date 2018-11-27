<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
            <h1>This is the schema list page 1</h1>
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
  export default {
    data() {
      return {
        dialogVisible: false,
        name: null
      };
    },
  };
</script>