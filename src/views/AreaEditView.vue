<template>
  <div class="card">
    <div class="card-content">
      <h5>Editar área {{ $route.params.id }}</h5>
      <form class="col s12" @submit.prevent="saveArea()">
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
  name: 'AreaEdit',
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
      this.axios.get('/areas/' + id)
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
    saveArea() {
      this.axios.patch('/areas/'+this.$route.params.id, this.payload)
                .then((response) => {
                    // response.data;                    
                    console.log(response);
                    this.$router.push('/areas');
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