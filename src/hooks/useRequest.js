import axios from 'axios'

const instance = axios.create({
    baseURL: '',
    timeout: 5000
})

instance.interceptors.request.use((config)=>{
    return config
})

instance.interceptors.response.use((response)=>{
    return response
}, reject=>{
    return Promise.reject(new Error(''))
})

const requestContentType = {
    post: "application/json",
    form: "application/x-www-form-urlencoded",
    upload: "multipart/form-data",
};

export default () => {
    return {
        get(url, data = {}, signal = null) {
            return instance({ url, params: data, method: "get", signal });
        },
        post(url, data = {}, signal = null, hideErr = false) {
            return instance({
                url,
                data,
                method: "post",
                headers: {
                    "Content-Type": requestContentType.post,
                    hideErr,
                },
                signal,
            });
        },
        form(url, data = {}, signal = null, hideErr = false) {
            return instance({
                url,
                data,
                method: "post",
                headers: {
                    "Content-Type": requestContentType.form,
                    hideErr,
                },
                signal,
            });
        },
        upload(url, file, signal = null, hideErr = false) {
            return instance({
                url,
                data: { file },
                method: "post",
                headers: {
                    "Content-Type": requestContentType.upload,
                    upload: true,
                },
                signal,
            });
        },
    }
}


