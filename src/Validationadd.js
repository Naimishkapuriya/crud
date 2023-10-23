import * as Yup from 'yup'

export const Validationadd = Yup.object({
    firstName: Yup.string().min(3).required("Please Enter name"),
    lastName: Yup.string().min(3).required("Please Enter name"),
    email: Yup.string().min(3).required("Please Enter email")
})