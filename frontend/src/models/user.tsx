import {create} from 'zustand';
import axios from 'axios';
import { redirect } from 'next/navigation';

type User = {
  data?:{
    email: string;
    fullname: string;
    token: string;
  } | null;
  loading:boolean;
};

type UserState = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  signup: (email:string,fullname:string,password:string) => Promise<void>;
  logout: () => void;
};

const useUserStore = create<UserState>((set) => ({
  user: {data:null,loading:false},

  login: async (username, password) => {

    return new Promise((res,rej)=>{
      set({user:{data:null,loading:true}});

      setTimeout(()=>{
        let data = {email:'hamza@gmail.com',fullname:'Hamza Tatheer',token:'12345'};
        set({user:{data,loading:false}})
        res();
      },4000);
    })

    // try {
    //   const response = await axios.post('/api/login', { username, password });

    //   if (response.status === 200) {
    //     const data = response.data;
    //     set({user:{data:data,loading:false}})
    //   } else {
    //     throw new Error('Login failed');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  },

  signup: async (email:string,fullname:string,password:string) => {

    set({user:{data:null,loading:true}});

    setTimeout(()=>{
      let data = {email:'hamza@gmail.com',fullname:'Hamza Tatheer',token:'12345'};
      set({user:{data,loading:false}})
      return Promise.resolve();
    },4000);

    // try {
    //   const response = await axios.post('/api/signup', user);

    //   if (response.status === 201) {
    //     const newUser = response.data;
    //     set({ user: newUser });
    //   } else {
    //     throw new Error('Signup failed');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  },

  logout: () => {
    set({ user: {data:null,loading:false} });
  },
}));

export default useUserStore;
