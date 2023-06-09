import axios from 'axios'
import { UserModule } from '~/types';

export const install: UserModule = ({ isClient, router }) => {
    if (isClient) {

        axios.interceptors.request.use(function (config) {
            
                if (!getToken() && config.url != "/login" ) {
                    router.push('/login')
                    return Promise.reject("Invalid Token");
                }

                return config;
            }, function (error) {
                return Promise.reject(error);
            });

        axios.interceptors.response.use(function (response) {
            if (response.status === 401) {
                router.push('/login')
                return Promise.reject("Unauthenticated");
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        router.beforeEach((to, from) => {

            if ((!getToken() && to.name != "Login" )) {
                return { name: 'Login' }
            }

            if(to.name == "home"){
                return { name: 'products' }
            }
        })
    }
}