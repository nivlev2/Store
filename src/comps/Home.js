import React, { useState } from 'react';
import Header from './Header';
import ProductsList from './productsList';

function Home(props){
    let [sortQ,setSortQ] = useState('_id')
    let [searchQ,setSearchQ] = useState('')
    console.log(sortQ);
    return(
        <div>
            <Header setSearchQ={setSearchQ} setSortQ={setSortQ}/>
            <ProductsList sortQ={sortQ} searchQ={searchQ}/>
        </div> 
    )
}

export default Home