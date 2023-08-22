<template>
  <div class="card">
    <div class="card-content">
      <h5>Editar Tipo {{ $route.params.id }}</h5>
      <form class="col s12" @submit.prevent="saveTipo()">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" v-model="payload.name">
            <label for="name"> Nombre</label>
          </div>
        </div>      
        <div class="row">
          <div class="input-field col s12">
            <button class="btn waves-effect waves-light red" type="submit" name="action">Guardar
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TipoEdit',
  data() {
    return {      
      payload: {
        name: "",       
      }
    }
  },
  methods: {
    getItem(){
      const id = this.$route.params.id;
      console.log(id);
      this.axios.get('/tipos/' + id)
                .then((response) => {
                    this.payload = response.data;                    
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },    
    saveTipo() {
      this.axios.patch('/tipos/'+this.$route.params.id, this.payload)
                .then((response) => {
                    // response.data;                    
                    console.log(response);
                    this.$router.push('/tipos');
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },
    
  },
  created(){
    this.getItem();    
  }
}
</script>