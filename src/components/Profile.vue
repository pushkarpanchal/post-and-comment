<template>
  <div>
    <v-row class="justify-center mt-4">
      <v-col
        cols="6"
        md="6" 
      >
      <v-text-field
        label="Title"
        v-model="newPostTitle"
      ></v-text-field></v-col>
    </v-row>
    <v-row class="justify-center">
    <v-col
        cols="6"
        md="6"
      >
        <v-textarea
          solo
          name="input-3-1"
          label="description"
          v-model="newPostBody"
        ></v-textarea>
        <v-btn
          color="success"
          class="mr-4"
          @click="post(userId)"
        >Post</v-btn>
        <v-btn
          color="primary"
          class="mr-4"
          @click="logout"
        >Logout</v-btn>
      </v-col>
    </v-row>
    <v-list class="mx-auto"
    max-width="500">
      <h3>Posts</h3>
      <v-list-item-group 
          v-for="(item) in userData"
          :key="item.id">
        <v-list-item
        >
          {{ item.title }}
        </v-list-item>
        <v-list-item
        >
          {{ item.body }}
        </v-list-item>
        <hr>
      </v-list-item-group>
    </v-list>
    <div>
      <v-list class="mx-auto"
    max-width="500">
      <h3>Comment</h3>

    <v-row class="justify-center mt-1">
      <v-col
      >
      <v-text-field
        label="Name"
        v-model="commentUserName"
        require
      ></v-text-field></v-col>
    </v-row>
    <v-row class="justify-center mt-1">
      <v-col 
      >
      <v-text-field
        label="Email"
        v-model="commentUserEmail"
        require
      ></v-text-field></v-col>
    </v-row>
    <v-row class="justify-center">
    <v-col
      >
        <v-textarea
          solo
          name="input-1-1"
          label="description"
          v-model="commentBody"
        ></v-textarea>
        <v-btn
          color="success"
          class="mr-4"
          @click="commentNew(userId)"
        >Comment</v-btn>
      </v-col>
    </v-row>
      <v-list-item-group 
          v-for="(item) in comments"
          :key="item.id">
        <v-list-item
        >
          {{ item.nmae }}
        </v-list-item>
        <v-list-item
        >
          {{ item.body }}
        </v-list-item>
        <hr>
      </v-list-item-group>
    </v-list>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
export default {
  name: "Profile",
  data: () => ({
   userData: "",
   userId: "",
   newPostBody: "",
   newPostTitle: "",
   comments: "",
   commentUserName: "",
   commentUserEmail: "",
   commentBody: ""
   }),
  methods:{
     async getPosts(id){
       let data = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
       if (data.status === 200) {
        this.userData = data.data;
        this.userId = data.data[0].userId
       }
     },
     async getComments(id) {
      let data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
       if (data.status === 200) {
        this.comments = data.data;
       }
     },
     async post(id) {
       let response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
         body: {
          title: this.newPostTitle,
          body: this.newPostBody,
          userId: id,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
       })
        console.log(response);
       if (response.status === 201) {
       let newPost = response.data.body
       this.userData = [...this.userData, newPost] 
       }
     },
     async commentNew() {

     },
     logout() {
       localStorage.removeItem("mytime");
       this.$router.replace("/")
     }
  },
  mounted: function() {
      const obj = JSON.parse(localStorage.getItem("user-info"));
      this.getPosts(obj.id);
      this.getComments(obj.id)
  }
}
</script>