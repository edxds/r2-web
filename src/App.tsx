import { ReactComponent as ReactLogo } from '@r2/logo.svg';

export function App() {
  return (
    <div className="text-center">
      <header className="bg-gray-50 text-gray-800 p-4 min-h-screen flex flex-col items-center justify-center">
        <ReactLogo
          className="text-brand fill-current h-64 mb-8 animate-spin-slow"
          aria-label="React Logo"
        />
        <p className="text-xl mb-2">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-brand text-lg"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
