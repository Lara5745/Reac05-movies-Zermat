import React, {useContext, useState, useEffect} from "react";

import { Card, Icon, Image ,Button } from "semantic-ui-react";

import FavsContext from "../context/FavsContext";

import Api from "../utils.js/Api";

import DetailMovie from "./DetailMovie";

const ItemMovie = ({Poster,Title,Year,imdbID,Movie}) => {
    const {favs, dispatchFavs} = useContext(FavsContext); //la constante es la misma que obtenemos de provider en app.js

    const [detail, setDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [titleFavs, setTitleFavs] = useState("");

    const clickShowDetail = (e) =>{
        console.log(e.target.id);
        Api.getMoviesDetail(e.target.id)
        .then((resp)=>{
            // console.log(resp.data);
            if(resp.data.Response==="True"){
                console.log(resp.data)
                setDetail(resp.data);
                setShowDetail(true);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    };

    useEffect(() => {
      const msg = getListIndex() > -1 ? "Remove Favs" : "Add to favs"; //ternario (condicional)
      setTitleFavs(msg);
    }, [favs])

    const getListIndex=()=>{ //funcion para validar si el elemento existe
      return favs.favslist.findIndex((item) => item.imdbID === imdbID); //retorna el imdbID
    };

    const clickFavs =()=>{
      const listIndex = getListIndex();

      if(listIndex===-1){
        console.log("ADD_FAVSLIST");
        dispatchFavs({
          type: "ADD_FAVSLIST",
          payload: Movie,
        });
      } else {
        console.log("DELETE_FAVSLIST");
        dispatchFavs({
          type: "DELETE_FAVSLIST",
          payload: listIndex,
        });
      }
    };

  return (
    <>
      <Card style={{width:"270px"}}>
        <Card.Content header={Title}/>
        <Card.Content style={{
            height:"300px",
            backgroundImage:`url(${Poster})`,
            backgroundSize:"cover",
        }}>
        </Card.Content>

        <Card.Content extra>
          <Button 
          animated="vertical"
          color="red"
          className="submit"
          id={imdbID}
          onClick={clickFavs}
          >
          <Button.Content visible>{titleFavs}</Button.Content>
          <Button.Content hidden>
            <Icon name="favorite"/>
          </Button.Content>
          </Button>

        {/* </Card.Content> */}

        {/* <Card.Content extra> */}
            <Button
            color="blue"
            floated="right"
            id={imdbID}
            onClick={clickShowDetail}>
                Details
            </Button>
        </Card.Content>
      </Card>

      <DetailMovie
      detail={detail}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      />
    </>
  );
};

export default ItemMovie;
