import React, { useState, useEffect, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { About } from './about';
// import { Image } from 'cloudinary-react';

function ClockDisplay({ isTicking, time, toggleTicker }) {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toString().padStart(2, '0');

  const containerStyles = isTicking ? 'shadow-2xl bg-gray-300 border border-gray-700' : 'bg-white';
  const timerStyles = isTicking ? 'text-gray-700' : 'text-gray-100';

  return (
    <div
      onClick={() => isTicking && time > 0 && toggleTicker()}
      className={`rounded-lg text-center my-2 ${containerStyles}`}
    >
      <div className={`text-7xl py-12 sm:py-24 ${timerStyles}`}>
          {minutes}:{seconds}
        </div>
      </div>
  );
}

function Clock({ isTicking, toggleTicker }) {
  const [time, setTime] = useState(600);

  useEffect(() => {
    if (isTicking && time > 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timeout);
    }
  });

  return <ClockDisplay time={time} isTicking={isTicking} toggleTicker={toggleTicker} />;
}

function ChessTimer() {
  const [isTicking, setIsTicking] = useState(true);
  const [paused, setPaused] = useState(true);

  return (
    <Fragment>
      <Clock isTicking={isTicking && !paused} toggleTicker={() => setIsTicking(!isTicking)} />
      <PauseButton toggle={() => setPaused(!paused)} text={paused ? 'play' : 'pause'} />
      <Clock isTicking={!isTicking && !paused} toggleTicker={() => setIsTicking(!isTicking)} />
    </Fragment>
  );
}

function PauseButton({ toggle, text }) {
  return (
    <div
      onClick={toggle}
      class="rounded-lg text-center bg-grey-100 my-2 uppercase tracking-wider font-semibold text-sm text-gray-700"
    >
      {text}
    </div>
  );
}

function Tab({ active, children, onClick }) {
  const activeClasses = active
    ? 'border-gray-500 bg-gray-100 border-l border-t border-r text-blue-700'
    : 'bg-gray-300 text-blue-500 hover:text-blue-800';
  return (
    <li className={`mr-1 ${active ? '-mb-px' : ''}`} onClick={onClick}>
      <div className={`inline-block rounded-t py-2 px-4 font-semibold ${activeClasses}`}>
        {children}
      </div>
    </li>
  );
}

function Setup() {
  return <h2 className="my-2 font-semibold text-2xl text-gray-700">Coming soon!</h2>;
}

function App() {
  const [activeTab, setActiveTab] = useState(window.location.hash);

  return (
    <div className="App bg-gray-100 px-6 h-screen">
      <header className="py-6 max-w-xl mx-auto">
        <nav className="navbar navbar-light">
          <ul className="flex border-b border-gray-500 mb-2">
            <Tab onClick={() => setActiveTab('#/setup')} active={activeTab === '#/setup'}>
              <Link to="/setup">Setup</Link>
            </Tab>
            <Tab onClick={() => setActiveTab('#/')} active={activeTab === '#/'}>
              <Link to="/">Play</Link>
            </Tab>
            <Tab onClick={() => setActiveTab('#/about')} active={activeTab === '#/about'}>
              <Link to="/about">About</Link>
            </Tab>
          </ul>
        </nav>
        <Route path="/about" component={About} />
        <Route path="/setup" component={Setup} />
        <Route exact={true} path="/" component={ChessTimer} />
      </header>
    </div>
  );
}

export default App;
