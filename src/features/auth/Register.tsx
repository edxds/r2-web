import clsx from 'clsx';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

import { TextField } from '@r2/components/Fields';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as Logo } from '@r2/assets/icons/logo-4.svg';
import { ReactComponent as ForwardIcon } from '@r2/assets/icons/forward.svg';
import { ReactComponent as AddPhotoIcon } from '@r2/assets/icons/add-photo.svg';
import { notify } from '@r2/components/Notifications';

import { signUp } from './service';

const formSchema = z.object({
  username: z.string().nonempty('O nome de usuário é obrigatório'),
  email: z.string().nonempty().email('Isso não parece ser um e-mail válido'),
  password: z.string().min(6, 'A sua senha precisa ter no mínimo 6 dígitos'),
});

export type SignUpFormValues = z.infer<typeof formSchema>;

export function Register() {
  const { goBack, replace } = useHistory();

  const { register, errors, formState, handleSubmit } = useForm<SignUpFormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const { isValid } = formState;

  const client = useQueryClient();
  const { mutate: doSignUp, isLoading } = useMutation(signUp, {
    onSuccess: () => handleSuccess(),
    onError: (error: any) => handleError(error),
  });

  const handleSuccess = async () => {
    await client.invalidateQueries('user');
    replace('/home');
  };

  const handleError = (error: AxiosError) => {
    const title = 'Erro';
    let message = 'Oops, algo deu errado! Por favor, tente novamente';
    if (error.response?.status === 409 || error.response?.status === 400) {
      const errorMesage = error.response.data.message;
      errorMesage && (message = errorMesage);
    }

    notify({ title, body: message });
  };

  const onSubmit = (values: SignUpFormValues) => {
    if (isLoading) {
      return;
    }

    doSignUp(values);
  };

  return (
    <div className="flex flex-1 justify-center sm:items-center bg-white">
      <main className="w-full flex flex-col sm:max-w-md">
        <header className="p-6">
          <BackButton className="md:hidden mb-4" onClick={goBack} />
          <div className="flex flex-col items-center space-y-2">
            <Logo />
            <h1 className="text-brand text-4xl font-black">Criar conta</h1>
          </div>
        </header>
        <form className="p-6 flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            className={clsx(
              'bg-gray-200 text-gray-400',
              'flex items-center justify-center',
              'm-auto my-8 w-32 h-32 rounded-full',
              'outline-none focus:outline-none cursor-pointer',
            )}
            style={{ ['-webkit-tap-highlight-color' as any]: 'transparent' }}
          >
            <span className="sr-only">Adicionar foto de perfil</span>
            <AddPhotoIcon className="w-8 h-8 fill-current" />
            <input type="file" hidden />
          </label>
          <section className="space-y-4">
            <TextField
              ref={register}
              label="Nome de usuário"
              name="username"
              placeholder="-"
              error={errors.username}
            />
            <TextField
              ref={register}
              label="E-mail"
              name="email"
              type="email"
              placeholder="-"
              error={errors.email}
            />
            <TextField
              ref={register}
              label="Senha"
              name="password"
              type="password"
              placeholder="-"
              error={errors.password}
            />
          </section>
          <Button
            type="submit"
            className="mt-6 w-full"
            color="primary"
            size="lg"
            isLoading={isLoading}
            disabled={!isValid}
          >
            <span>Me juntar</span>
            <ForwardIcon className="fill-current icon-size" />
          </Button>
        </form>
      </main>
    </div>
  );
}
