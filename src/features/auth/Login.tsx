import { useHistory } from 'react-router';

import { TextField } from '@r2/components/Fields';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as ForwardIcon } from '@r2/assets/icons/forward.svg';

export function Login() {
  const { goBack } = useHistory();

  return (
    <div className="min-h-screen flex justify-center sm:items-center sm:bg-gray-50">
      <main className="bg-white flex flex-col sm:max-w-md sm:rounded-xl sm:shadow-md sm:mb-16">
        <header className="p-6">
          <BackButton className="md:hidden mb-4" onClick={goBack} />
          <h1 className="text-brand text-4xl font-black">Entre com a sua conta do R2</h1>
        </header>
        <form className="mt-auto p-6">
          <section className="space-y-4">
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">E-mail ou nome de usuário</p>
              <TextField type="text" placeholder="eduardo@gmail.com" />
            </label>
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">Senha</p>
              <TextField type="password" placeholder="ilovemilkshakes123" />
            </label>
          </section>
          <Button type="submit" className="mt-6 w-full" color="primary" size="lg">
            <span>Entrar</span>
            <ForwardIcon className="fill-current icon-size" />
          </Button>
        </form>
      </main>
    </div>
  );
}
