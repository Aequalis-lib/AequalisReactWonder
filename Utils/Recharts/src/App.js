import './App.css';
import Charts from './components/Charts'

function App() {
  return (
    <div style={{display:'flex',width:'100%',height:'100vh',flexDirection:'column'}}>
      <span style={{textAlign:'center',fontWeight:'bold',fontSize:'2rem'}}>RECHARTS- A SAMPLE CHART WITH DIFFERENT COMPONENTS</span>
      <Charts/>
    </div>
  );
}

export default App;
