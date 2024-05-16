import { INITIAL_FORM, Form } from "@/services/constants/login";
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

const useLoginForm = () => {
    const router = useRouter();
    const [form, setForm] = useState<Form>(INITIAL_FORM)
    const [loading, setLoading] = useState(false);

    const inputHandler = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        let newForm: Form = {
            ...form,
            [name]: value
        }
        setForm(newForm)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (Object.values(form).includes('')) return;
        setLoading(true);
        const ok = true
        /* const { ok, data } = await login(form); */
        if (ok) {
            toast.info('Redirigiendo a la home...', {
                autoClose: 1000,
            });
            setTimeout(() => {
                router.push('/home');
            }, 1200);
        } else {
            toast.error('Datos incorrectos...');
        }
        setLoading(false);
    };

    return {
        form,
        loading,
        inputHandler,
        handleSubmit
    }
}

export default useLoginForm
