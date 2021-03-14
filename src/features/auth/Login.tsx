import { useHistory } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { TextField } from '@r2/components/Fields';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as Logo } from '@r2/assets/icons/logo-4.svg';
import { ReactComponent as ForwardIcon } from '@r2/assets/icons/forward.svg';

import { signIn } from './service';

export type LoginFormValues = {
  username: string;
  password: string;
};

export function Login() {
  const { goBack, replace } = useHistory();

  const { control, errors, formState, handleSubmit } = useForm<LoginFormValues>({
    mode: 'onChange',
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
    replace('/home');
  };

  const handleError = () => {
    window.alert('O login falhou!');
  };

  return (
    <div className="min-h-screen w-full flex justify-center sm:items-center bg-white">
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
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">E-mail ou nome de usuário</p>
              <Controller
                as={TextField}
                control={control}
                rules={{ required: true }}
                hasError={!!errors.username}
                name="username"
                placeholder="eduardo@gmail.com"
                defaultValue=""
              />
            </label>
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">Senha</p>
              <Controller
                as={TextField}
                control={control}
                rules={{ required: true }}
                hasError={!!errors.password}
                type="password"
                name="password"
                placeholder="ilovemilkshakes123"
                defaultValue=""
              />
            </label>
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
