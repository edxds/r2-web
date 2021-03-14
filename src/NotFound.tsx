import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from './components/Button';

export function NotFound() {
  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <div
        className={clsx('max-w-screen-md mx-auto flex-1', 'flex flex-col justify-center', 'p-6')}
      >
        <div className="space-y-4 mb-16 md:mb-24">
          <h1 className="font-black text-4xl text-gray-800">Perdido?</h1>
          <p className="text-gray-600">Parece que essa página não existe. Hmmm... 🤔</p>
          <Button as={Link} to="/" color="primary" variant="text" className="w-max">
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
