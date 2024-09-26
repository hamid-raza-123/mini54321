import React from 'react';
import { useParams } from 'react-router-dom';
import { BusnissData, econimicData } from './CardData';  // Data sources
import SingleCards from './components/SingleCards';

const About = () => {
  const { id } = useParams();  // Get the id from the route params
  
  // Filter BusinessData and EconomicData based on the ID
  const filterData = BusnissData.filter((e) => e.id === parseInt(id));
  const Data = econimicData.filter((e) => e.id === parseInt(id));

  return (
    <>
      {/* Rendering Business Data */}
      {filterData.map((e, i) => {
        return (
          <SingleCards
            key={i}
            id={e.id}               // Pass the id here for saving in Firestore
            tittle={e.tiitle}
            roomtype={e.roomtype}
            price={e.price}
            image={e.image}
            desc={e.description}
          />
        );
      })}

      {/* Rendering Economic Data */}
      {Data.map((e, i) => {
        return (
          <SingleCards
            key={i}
            id={e.id}               // Pass the id here for saving in Firestore
            tittle={e.tiitle}
            roomtype={e.roomtype}
            price={e.price}
            image={e.image}
            desc={e.description}
          />
        );
      })}
    </>
  );
};

export default About;