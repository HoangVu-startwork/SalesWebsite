import {useHistory } from 'react-router-dom'
import React, {useState ,useEffect} from 'react'
import Axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';
import "./thongtin.css"
import {Link, useParams} from "react-router-dom";

const Thongtin = () => {
    const [thangpho, setthanhpho] = useState("");

    const [data, setData] = useState([]);

    const [data_huyen, setData_huyen] = useState([]);

    const {id_thanhpho} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get(`http://localhost:5090/diachi`);
                setData(res.data);
            }catch (err){
                console.log(err);
            }
        };
        fetchData();
    }, [])


    useEffect(() => {
      const fetchData1 = async () => {
          try {
              const res = await Axios.get(`http://localhost:5090/diachi/${data.id_thanhpho}`);
              setData_huyen(res.data);
          }catch (err){
              console.log(err);
          }
      };
      fetchData1();
  }, [data.id_thanhpho])
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState('');
  const [st, setSt] = useState([]);

  useEffect( () => {
    const getcountry = async() => {
      const rescountry = await fetch(`http://localhost:5090/diachi`);
      const rescon = await rescountry.json();
      setCountry(await rescon);
    }
    getcountry()
  }, []);


  const handlecountry = (event) => {
    const getcountryid = event.target.value;
    setCountryid(getcountryid)
  }


  useEffect( () =>{
    const getstate = async () => {
      const resstate = await fetch(`http://localhost:5090/diachi/${countryid}`)
      const resst = resstate.json();
      setSt(await resst)
    }
    getstate()
  }, [countryid])

  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5090/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].id);
      }
    });
  }, []);
  const [log, setLoginStatus1] = useState("");
  const [tengoinho, tengoinhoset] = useState("");
  const [sonha, sonhaset] = useState("");
  const themdiachi = async () => {
    if(!setLoginStatus){
            toast('??i???n v??o ?? tr???ng name', {
          icon: '??????',
          iconTheme: {
              primary: '#0a0',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #713200',
              padding: '5px 10px',
              background: '#edbf61',
              // minWidth: '300px'
            }
        });
      }Axios.post("http://localhost:5090/thongtindiachi",{
      id: loginStatus,
      tengoinho: tengoinho,
      thanhpho: countryid,
      quan: thangpho,
      sonha: sonha,
    }).then((response) => {
      if(response.data.message){
        toast(response.data.message, {
          icon: '',
          iconTheme: {
              primary: '#0a0',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #713200',
              padding: '5px 10px',
              background: '#edbf61',
              // minWidth: '300px'
            }
        });
      }
  });
  }
  // Ho?? ????n 
  
  // th??m h??nh ???nh
  // const [userInfo, setuserInfo] = useState({
  //   file:[]
  // });
  //   const handleInputChange = (event) => {
  //     setuserInfo({
  //       ...userInfo,
  //       file:event.target.files[0],
  //     })
  // }

  // const [tenok, sethuyen] = useState("");

  // const [isSucces, setSuccess] = useState(null);
  // const submit = async() => {
  //   const formdata = new FormData();
  //   formdata.append('avatar', userInfo.file);
  //   formdata.append("ten", tenok);
  //   axios.post('http://localhost:5090/imageupload', formdata,{
  //     headers: { 'Content-Type': 'multipart/form-data'},
  //   }).then(res => {
  //     console.warn(res);
  //     if(res.data.success === 1){
  //       setSuccess("Image upload successfully");
  //     }
  //   })
  // }
  return (
    <div className='formdiachi'>

        {/* <div className='formdesign'>
        {isSucces !== null ? <h4> {isSucces} </h4> :null }
          <div className='from-row'>
            <label className='text-white'>Select Image : </label>
            <input type="file" className='form-control' name="upload_file" onChange={handleInputChange}/>
            
          </div>
          <input type="text" value={tenok} onChange={(e) => sethuyen(e.target.value)}/>
          <div className='form-row'>
            <button type="submit" className='btn btn-dark' onClick={()=>submit()}>Save</button>
          </div>
        </div> */}
        {/* dia ch??? */}
        <input type="text" className='tengoinho' placeholder='?????t t??n gi???i nh??? (V?? d??? : Nh?? ho???c t??n c??ng ty)'  onChange={(e) => {tengoinhoset(e.target.value)}}/>
          <select onChange={(e) => handlecountry(e)}>
            <option disabled>Ch???n t???nh /Th??nh ph??? (*)</option>
            <option className='ok'>Ch???n t???nh /Th??nh ph??? (*)</option>
            {country.map((getcon, index) => (
                  <option key={index} value={getcon.tenthanhpho}>{getcon.tenthanhpho}</option>
          ))}
        </select>
        <h2>{thangpho}</h2>
        <select onChange={(e) => setthanhpho(e.target.value)}>
            <option disabled>Ch???n Qu???n / Huy???n (*)</option>
            <option className='ok'>Ch???n Qu???n / Huy???n (*)</option>
            {st.map((getst, index) => (
                  <option key={index} value={getst.tenhuyen}>{getst.tenhuyen}</option>
                  
        ))}
        </select> 
        <input type="text" className='tengoinho' placeholder='Nh???p s??? ???????ng' onChange={(e) => {sonhaset(e.target.value)}}/>
       

            <button type="submit" className='thaydoidiachi' onClick={()=>themdiachi()}>L??u ?????a ch???</button>
            <Toaster
                  position="top-right"
                  reverseOrder={false}
              />
    </div>
  )
}

export default Thongtin;