<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="4" class="text-center" >
        <h1>Welcome to Social blogs</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="4" class="text-center" >
        Please Login using Email/User id
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row class="justify-center">
              <v-col
                cols="4"
                md="4"
              >
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col
                cols="2"
                md="4"
              >
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
              >
                Log In
              </v-btn>
              </v-col>
            </v-row>
          </v-container>
  </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'LogIn',

    data: () => ({
      form: {
        email: ""
      },
      emailRules : {},
      valid: false
    }),
    methods: {
      async login() {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users?email=${this.form.email}`)
        if (result.status === 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]))
          this.$router.push({
            name: "posts",
            params: {
              userId: `${result.data[0].id}`
            }
          })
        }
      },
      mounted() {
        let user = localStorage.getItem("user-info");
        if(user) {
          console.log("hello", this);
        }
      }
    }
  }
</script>
