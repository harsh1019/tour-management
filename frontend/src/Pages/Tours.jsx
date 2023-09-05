import React, {useState, useEffect} from 'react'
import CommonSection from '../shared/CommonSection'
import "../styles/tour.css";


import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import NewsLetter from "./../shared/NewsLetter";
import { Container, Row,Col, Pagination } from 'reactstrap';
import useFetch from '../hooks/usefetch';
import {BASE_URL} from "../utils/config";


const Tours = () => {
   
  const [pageCount, setPageCount] = useState(0);
  const [page,setPage] = useState(0);
  
  const {data: tours, loading,error} = useFetch(`${BASE_URL}/tours?page=${page}`);
  const {data: tourCount} = useFetch(`${BASE_URL}/tours/search/getTourCount`);
   
  useEffect(() => {
    // later u backend to use page count
    const pages =  Math.ceil(tourCount/8);
    setPageCount(pages);
    window.scrollTo(0,0);
  },[page,tourCount,tours]);

  return <>
    <CommonSection title={"All Tours"} />
    <section>
      <Container>
        <Row>
          <SearchBar/>
        </Row>
      </Container>
    </section>

    <section className='pt-0'>
       
       {loading && <h4 className='text-center pt-5'>Loading.........</h4>}
       {error && <h4 className='text-center pt-5'>{error}</h4>} 
      <Container>
      {
        !loading && !error && <Row>
          {
            tours?.map(tour => <Col className='mb-4' lg='3' key={tour._id}><TourCard  tour={tour}/></Col>)
          }
        
         <Col lg='12'>
         <Pagination className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
          {[...Array(pageCount).keys()].map(number => (
             <span key={number} onClick={() => setPage(number)}
              className={page === number ? 'active__page' : ''}
             >
              {number+1}
             </span>
          ))}
         </Pagination>
         </Col>
        </Row>
      }
      </Container>
    </section>
    <NewsLetter/>
  </>
}

export default Tours