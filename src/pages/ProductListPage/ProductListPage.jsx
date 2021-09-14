
import React,{useEffect,Fragment } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getProducts } from '../../redux/userProducts/userProductsOperations';
import ProductItem from '../../components/ProductItem/ProductItem'
import Loader from '../../components/shared/Loader';
import DB from '../../services/backend.service'
import Decoration from '../../components/Decoration';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const ProductListPage = () => {

  const dispatch = useDispatch();
    const history = useHistory();
    const {products} = useSelector(state => state.userProduct)
    const {loading} = useSelector(state => state)


    useEffect(() => {
        const dataHandler = (items) => {
            let products = [];

            items.forEach(item => {
                let key = item.key;
                let data = item.val()
                
                products.push({
                    id: key,
                    ...data
                })
            });

            dispatch(getProducts(products));
        };

        DB.getAll().on('value', dataHandler);
        
        return () => DB.getAll().off('value', dataHandler);
    },[]);

    const generateProductsList = () => {
      if(products.length === 0) return <h2>choose product</h2>;

      return products.map(product => <ProductItem key={product.id} product={product}></ProductItem>)
    
  }

  return (
    <Fragment>
      <Decoration/>
              <div >
                  <AddCircleOutlineIcon style={{ color: '#669c54',fontSize: 54}} onClick={() => history.push('/add')}>Add New Product</AddCircleOutlineIcon>
              </div>
              { loading? <Loader>Loading...</Loader> : generateProductsList()}
      </Fragment>
  )
  }

export default ProductListPage;
