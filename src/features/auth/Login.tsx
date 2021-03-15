import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import * as z from 'zod';

import { notify } from '@r2/components/Notifications';
import { TextField } from '@r2/components/Fields';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as Logo } from '@r2/assets/icons/logo-4.svg';
import { ReactComponent as ForwardIcon } from '@r2/assets/icons/forward.svg';

import { signIn } from './service';

const formSchema = z.object({
  username: z.string().nonempty('Este campo é obrigatório'),
  password: z.string().nonempty('Este campo é obrigatório'),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export function Login() {
  const { goBack, replace } = useHistory();

  const { register, errors, formState, handleSubmit } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const { isValid } = formState;

  const client = useQueryClient();
  const signInMutation = useMutation(signIn, {
    onSuccess: () => handleSuccess(),
    onError: () => handleError(),
  });

  const onSubmit = (values: LoginFormValues) => {
    signInMutation.mutate(values);
  };

  const handleSuccess = async () => {
    await client.invalidateQueries('user');
    replace('/feed');
  };

  const handleError = () => {
    notify({
      title: 'Erro',
      body: 'O login falhou. Verifique suas credenciais e tente novamente.',
    });
  };

  return (
    <div className="flex flex-1 justify-center sm:items-center bg-white">
      <main className="w-full flex flex-col sm:max-w-md sm:mb-16">
        <header className="p-6">
          <BackButton className="md:hidden mb-4" onClick={goBack} />
          <div className="flex flex-col items-center space-y-2">
            <Logo />
            <h1 className="text-brand text-4xl font-black">Entrar</h1>
          </div>
        </header>
        <form className="mt-auto p-6" onSubmit={handleSubmit(onSubmit)}>
          <section className="space-y-4">
            <TextField
              ref={register()}
              label="E-mail ou nome de usuário"
              name="username"
              placeholder="-"
              error={errors.username}
            />
            <TextField
              ref={register()}
              label="Senha"
              name="password"
              type="password"
              placeholder="-"
              error={errors.password}
            />
          </section>
          <Button
            size="lg"
            type="submit"
            color="primary"
            className="mt-6 w-full"
            isLoading={signInMutation.isLoading}
            disabled={signInMutation.isLoading || !isValid}
          >
            <span>Entrar</span>
            <ForwardIcon className="fill-current icon-size" />
          </Button>
        </form>
      </main>
    </div>
  );
}
