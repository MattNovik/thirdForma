import './scss/index.scss';
import ThirdForm from './components/ThirdForm';

function App() {
  return (
    <div className="App">
      <ThirdForm jsonData={document.querySelector('#root').dataset.info} />
    </div>
  );
}

export default App;
