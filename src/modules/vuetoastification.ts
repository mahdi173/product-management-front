import Toast, { PluginOptions } from "vue-toastification";
import { type UserModule } from '~/types'
import "vue-toastification/dist/index.css";


export const install: UserModule = ({ app }) => {
    const options: PluginOptions = {
        // You can set your default options here
    };
    app.use(Toast, options)
}
