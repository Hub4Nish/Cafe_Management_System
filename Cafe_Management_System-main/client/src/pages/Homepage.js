
import React,{useState,useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Col, Row } from 'antd';
import ItemList from "../components/ItemList";
import { Collection } from "mongoose";
import Column from "antd/lib/table/Column";
const Homepage = () => {
  const [itemsData,setItemsData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("Beverages");
  const categories = [
    {
      name:'Beverages',
    imageUrl :'https://static.vecteezy.com/system/resources/thumbnails/028/248/392/small_2x/soda-soft-drink-cup-with-straw-illustration-drink-object-icon-concept-disposable-plastic-beverage-cup-with-tube-for-soda-juice-coffee-tea-design-free-png.png'
  },
  {
    name:'Shakes',
    imageUrl :'https://thumbs.dreamstime.com/b/milk-shake-icon-logo-modern-line-style-high-quality-black-outline-pictogram-web-site-design-mobile-apps-vector-83853606.jpg'
  },
  {
    name:'Noodles',
    imageUrl:'https://t3.ftcdn.net/jpg/02/85/59/24/360_F_285592432_M3DaUTpVAct2YHBPgj9j2xZ4ziZMmc0y.jpg'
  },
  {
    name:'Sandwich',
    imageUrl:'https://png.pngtree.com/png-clipart/20230917/original/pngtree-line-icon-of-sandwich-sandwich-menu-logo-food-vector-illustration-png-image_12282276.png'
  }
  ]
  const dispatch = useDispatch();
  //useeffect
  useEffect(() => {
    const getAllItems =async () =>{
      try{
        dispatch({
          type:'SHOW_LOADING',
        });
        const {data} = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({
          type:'HIDE_LOADING',
       });
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  },[dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map(category => (
           <div key={category.name} className={`d-flex category 
           ${selectedCategory === category.name && "category-active"
           }`}
           onClick={()=>setSelectedCategory(category.name)}
           >
             <h4>{category.name}</h4>
              <img src={category.imageUrl} alt={category.name} height="40" width="60" />
           </div>
        ))}
      </div>
      <Row>
      {
        itemsData.filter(i => i.category === selectedCategory ).map(item => (
          <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item = {item}/>
          </Col>
          
        ))
      }
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
