<template>
  <div class="row justify-content-center">
      <div class="col-md-8">
          <div class="card card-default">
              <div class="card-header">Profile Component</div>

              <div class="card-body">
                  {{ user.email }}
                  {{ user.username }}
                  {{ user.password }}
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    let uri = 'http://localhost:4000/user/profile';
    this.axios.get(uri).then(response => {
      this.user = response.data;
    });
  }
}
</script>
