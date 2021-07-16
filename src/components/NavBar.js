import React, {useState,useContext} from "react";
import { Link } from "react-router-dom";

import { Menu, Segment,Button,Icon } from "semantic-ui-react";

import MoviesContext from "../context/MoviesContext";

const NavBar = ({fetchData,name}) => {
  const {movies,dispatchMovies} = useContext(MoviesContext);

  const [inputTitle, setInputTitle] = useState("");

  const inputHandler=(e)=>{
    const {value}=e.target;
    setInputTitle(value);
  };

  const onClickHandler=()=>{
    dispatchMovies({
      type: "TITULO",
      payload:inputTitle,
  });
    fetchData(inputTitle);
  }

  return (
    <>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item>
            <h1>App Movies</h1>
          </Menu.Item>

          <Menu.Item 
          position="right" 
          as={Link} to="/"
          name="Movies List" 
          active={name==="home"}
          />

          <Menu.Item 
          as={Link} 
          to="/favs" 
          name="Favs List" 
          active={name==="favorites"}
          />
          
          {name === "home" &&(
         
          <Menu.Item>
            <div class="ui action input">
              <input
                type="text"
                placeholder="Search..."
                onChange={inputHandler}
              />
              <Button
                  animated="vertical"
                  color="green"
                  className="submit"
                  type="submit"
                  onClick={onClickHandler}
                >
                  <Button.Content visible>Search</Button.Content>
                  <Button.Content hidden>
                    <Icon name="search" />
                  </Button.Content>
                </Button>
            </div>
          </Menu.Item>
         )}
         </Menu>
      </Segment>
    </>
  );
};

export default NavBar;
