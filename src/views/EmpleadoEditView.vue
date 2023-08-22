<template>
  <div class="card">
    <div class="card-content">
      <h5>Editar Empleado {{ $route.params.id }}</h5>
      <form class="col s12" @submit.prevent="saveEmpleado()">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" v-model="payload.name">
            <label for="name"> Nombre</label>
          </div>
        </div> 
        <div class="row" v-if="areas.length > 0">
            <div class="input-field col s12">
                <select v-model="payload.areasId">
                    <option value="0" disabled selected>Elija un Area</option>
                    <option v-for="(value, key) in areas" :key="key" :value="value.id">{{ value.name }}
                    </option>
                </select>
                <label>Area</label>
            </div>
        </div>
        <div class="row" v-if="types.length > 0">
            <div class="input-field col s12">
                <select v-model="payload.typesId">
                    <option value="0" disabled selected>Elija un Tipo</option>
                    <option v-for="(value, key) in types" :key="key" :value="value.id">{{ value.name }}
                    </option>
                </select>
                <label>Tipos</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="color" type="text" class="validate" v-model="payload.color">
                <label for="color"> Color</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="placa" type="text" class="validate" v-model="payload.placa">
                <label for="placa"> Placa</label>
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
  name: 'EmpleadoEdit',
  data() {
    return {   
      types: [],
      areas: [],   
      payload: {
          name: '',
          areasId: 0,
          typesId: 0,
          color: '',
          placa: ''                
      }
    }
  },
  methods: {
    getItem(){
      const id = this.$route.params.id;
      console.log(id);
      this.axios.get('/employees/' + id)
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
    saveEmpleado() {
      this.axios.patch('/employees/'+this.$route.params.id, this.payload)
                .then((response) => {
                    // response.data;                    
                    console.log(response);
                    this.$router.push('/empleados');
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },
    getAreas() {
        this.axios.get('/areas')
            .then((response) => {
                this.areas = response.data;
                setTimeout(function () {
                    var elems = document.querySelectorAll('select');
                    var select = M.FormSelect.init(elems);
                });
                console.log(response);
            });
    },
    getTipos() {
        this.axios.get('/types')
            .then((response) => {
                this.types = response.data;
                setTimeout(function () {
                    var elems = document.querySelectorAll('select');
                    var select = M.FormSelect.init(elems);
                });
                console.log(response);
            });
    },
  },
  created(){
    this.getItem();    
    this.getAreas();
    this.getTipos();  
  },
}
</script>