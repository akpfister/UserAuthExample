<template>
  <div class="row justify-content-center">
      <div class="col-md-8">
        <div>
          <h1>Users</h1>
            <table class="table table-hover">
                <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id">
                      <td>{{ user.email }}</td>
                      <td>{{ user.username }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    let uri = 'http://localhost:4000/user';
    this.axios.get(uri).then(response => {
      this.users = response.data;
    });
  }
}
</script>
