import {useState, useRef, useEffect} from "react"
import {Country, State, City} from "country-state-city"
import MyContext from "./MyContext"


const MyProvider = ({children}) => {
const countries = useRef(Country.getAllCountries())

const [countrySelect, setCountrySelect] = useState({
    country: ``,
    flag: ``,
    countryCode: ``

})

const [states, setStates] = useState([])
const [stateSelect, setStateSelect] = useState({ state: ``, stateCode: ``})
const [cities, setCities] = useState([])
const [citySelect, setCitySelect]= useState(``)

const [location, setLocation] = useState(
    {latitude:"", longitude:""},
    );



const [data, setData] = useState({results: null, loading:true, error:null})
const API_KEY = process.env.REACT_APP_API_KEY;
//const URL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelect},${stateSelect.stateCode},${countrySelect.countryCode}&units=metric&appid=${API_KEY}`;
const URLFIRST = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
console.log(URLFIRST);



useEffect(() =>{
    fetch(URLFIRST)
    .then((Sally) => Sally.json())
    .then((results) => setData({ results, loading: false, error: null }))
    .catch((error) => setData({ results: null, loading: false, error }));
}, [URLFIRST])

useEffect(() => {
setStates(State.getStatesOfCountry(countrySelect.countryCode))
//setData({results: null, loading:true, error:null})
},[countrySelect])

useEffect(() => {
    setCities(City.getCitiesOfState(countrySelect.countryCode, stateSelect.stateCode))
    //setData({results: null, loading:true, error:null})
    },[countrySelect, stateSelect])

    /* useEffect(() => {
        fetch(URL)
          .then((Sally) => Sally.json())
          .then((results) => setData({ results, loading: false, error: null }))
          .catch((error) => setData({ results: null, loading: false, error }));
      }, [URL]);
 */
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({latitude:position.coords.latitude, longitude:position.coords.longitude})
          
        });
        
      }, []);


      return (
          
        <MyContext.Provider
          value={{
            countries,
            countrySelect,
            setCountrySelect,
            states,
            setStates,
            stateSelect,
            setStateSelect,
            cities,
            setCities,
            citySelect,
            setCitySelect,
            data,
          }}>
          {children}
        </MyContext.Provider>
        
      );
    };
    export default MyProvider;
    
    
    
    
    
    
    
    
    
    
    
    
    
    

   