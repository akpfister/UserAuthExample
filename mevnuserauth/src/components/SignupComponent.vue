<template>
  <div class="row justify-content-center">
      <div class="col-md-8">
        <div>
          <h1>Sign Up!</h1>
          <form @submit.prevent="addUser">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Email:</label>
                <input type="text" class="form-control" v-model="user.email">
              </div>
            </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Username:</label>
                  <input type="text" class="form-control" v-model="user.username">
                </div>
              </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password:</label>
                    <input type="password" class="form-control" v-model="user.password">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password (Confirm):</label>
                    <input type="password" class="form-control" v-model="confirmation">
                  </div>
                </div>
              </div><br />
              <div class="form-group">
                <button class="btn btn-primary">Login</button>
              </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {},
      confirmation: ""
    }
  },
  methods: {
    addUser() {
      if(this.user.password != this.confirmation) {
        //eslint-disable-next-line
        console.log("Passwords do no match");
        this.$router.push({ name: 'signup'});
      } else {
        //eslint-disable-next-line
        console.log(this.user);
        let uri = 'http://localhost:4000/user/signup';
        this.axios.post(uri, this.user).then(response => {
          //eslint-disable-next-line
          console.log(response.data);
          this.$router.push({ name: 'login'});
        });
      }
    }
  }
}
</script>
