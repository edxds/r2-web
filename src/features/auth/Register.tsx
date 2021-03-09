import clsx from 'clsx';

import { TextField } from '@r2/components/Fields';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as ForwardIcon } from '@r2/assets/icons/forward.svg';
import { ReactComponent as AddPhotoIcon } from '@r2/assets/icons/add-photo.svg';

export function Register() {
  return (
    <div className="min-h-screen flex justify-center sm:items-center bg-white">
      <main className="flex flex-col sm:max-w-md">
        <header className="p-6">
          <BackButton className="md:hidden mb-4" />
          <h1 className="text-brand text-4xl font-black">Faça parte da comunidade R2</h1>
        </header>
        <form className="p-6 flex-1 flex flex-col">
          <label
            className={clsx(
              'bg-gray-200 text-gray-400',
              'flex items-center justify-center',
              'm-auto sm:my-8 w-32 h-32 rounded-full',
              'outline-none focus:outline-none cursor-pointer',
            )}
            style={{ ['-webkit-tap-highlight-color' as any]: 'transparent' }}
          >
            <span className="sr-only">Adicionar foto de perfil</span>
            <AddPhotoIcon className="w-8 h-8 fill-current" />
            <input type="file" hidden />
          </label>
          <section className="space-y-4">
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">Nome de usuário</p>
              <TextField type="text" placeholder="megantheestallionstan" />
            </label>
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">E-mail</p>
              <TextField type="email" placeholder="ana@gmail.com" />
            </label>
            <label className="flex flex-col space-y-2">
              <p className="text-base text-gray-800">Senha</p>
              <TextField type="password" placeholder="ImAHotGirl" />
            </label>
          </section>
          <Button type="submit" className="mt-6 w-full" color="primary" size="lg">
            <span>Me juntar</span>
            <ForwardIcon className="fill-current icon-size" />
          </Button>
        </form>
      </main>
    </div>
  );
}
