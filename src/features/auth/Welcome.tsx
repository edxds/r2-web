import { Link } from 'react-router-dom';

import { Button } from '@r2/components/Button';
import jamelonLogoSrc from '@r2/assets/icons/logo-1.svg';

export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  return (
    <div className="flex flex-1 justify-center items-stretch md:items-center p-6">
      <div className="flex flex-1 flex-col space-y-6 md:mb-12 md:space-y-12 md:max-w-sm">
        <header className="flex flex-1 flex-col items-center justify-center space-y-6">
          <img src={jamelonLogoSrc} className="h-24 w-auto" alt="Logotipo do Jamelon" />
          <h1 className="text-4xl text-brand font-black">Boas-vindas!</h1>
        </header>
        <section className="flex flex-col items-stretch space-y-4">
          <Button as={Link} color="primary" to="/sign-up">
            Fazer cadastro
          </Button>
          <Button as={Link} color="primary" variant="flat" to="/sign-in">
            Continuar com senha
          </Button>
        </section>
      </div>
    </div>
  );
}
