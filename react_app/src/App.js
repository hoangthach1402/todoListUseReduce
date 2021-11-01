import './App.css';
import {useReducer,useRef} from 'react'
function App() {

  const inputElm = useRef()
  const initial = {
 job:'',
 jobs:[]
  }

 const SET_JOB ='set_job'
 const ADD_JOB ='add_job'
 const DELETE_JOB ='delete_job'

const setJob =payload=>{
 return {
   type:SET_JOB,
   payload
 } 
}

const addJob =payload=>{
  return {
    type:ADD_JOB,
    payload,
  } 
}
const deleteJob =payload=>{
  return {
    type:DELETE_JOB,
    payload,
  } 
}
 
const reducer= (state,action)=>{
  let newState ;
  switch(action.type){
 
    case SET_JOB:
      newState = {
        ...state,
       job:action.payload, 
      }
      break ;
    case ADD_JOB:
      newState = {
        ...state,
        jobs:[...state.jobs, action.payload]
      }  
      break ;
      case DELETE_JOB:
      const  newJobs = [...state.jobs]
      newJobs.splice(action.payload,1);
      newState = {
        ...state,
        jobs:newJobs
        }
      break ;  
    default :
    throw new Error('invalid action')
  }
  console.log(newState);
  return newState 
}

const [state,dispatch] = useReducer(reducer,initial);

const {job,jobs} = state ; 
const handleSubmit =()=>{
  dispatch(addJob(job)) 
 dispatch(setJob(''))
 inputElm.current.focus()

}
const handleDelete =(index)=>{
  dispatch(deleteJob(index))
}
  return (
    <div className="App">
    <input
    ref={inputElm}
    value={job}
    onChange={(e)=>dispatch(setJob(e.target.value))}
    placeholder="enter you todo job" />
   
    <button onClick={handleSubmit}>Add</button>

    <ul>
   {jobs.map((job,index)=>(
     <li key={index}>{job} <span onClick={()=>handleDelete(index)}>X</span></li>
   ))}
    </ul>

    </div>
  );
}

export default App;
