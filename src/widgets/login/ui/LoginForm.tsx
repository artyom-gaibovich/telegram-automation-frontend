import './LoginForm.scss';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '@entities/auth';
import { bem } from '@shared/libs';
import { Button, Input } from '@shared/ui';


const b = bem('login-form');

export const LoginForm = () => {

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const formik = useFormik({

    initialValues: {
      email: '',
      password: '',

    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required('Обязателен'),
      email: Yup.string().email('Не верный email').required('Обязателен'),

    }),

    onSubmit: values => {
      loginMutation.mutate(values);
    },

  });

  return (
    <div className={b()}>

      <form onSubmit={formik.handleSubmit}>
        <div className={b('container')}>
          <div>
            <label htmlFor="password">Парол</label>

            <Input
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}

            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>

            ) : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>

            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

          </div>
        </div>

        <Button variant="solid" color="primary"
                disabled={loginMutation.isPending}
                onClick={() => {
          formik.submitForm()
        }}
        >Войти</Button>

      </form>
    </div>

  );

};