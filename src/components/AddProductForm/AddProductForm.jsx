import {React,useState, useEffect,} from 'react'
import css from './AddProductForm.module.scss';
import './AddProductFormAnimation.scss';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { addProduct ,updateProduct} from '../../redux/userProducts/userProductsOperations';
import {useHistory,useParams, useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import imageDefault from '../../img/stubd.png';
import DB from '../../services/backend.service';
import Button from '@material-ui/core/Button'
  

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];
  
  var img;
  let showImage = true;
  
    
 function  AddProductForm () {
  
    const [FileImg, setFileImg] = useState('');
    const [ImageSource, setImageSource] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const rm = useRouteMatch();
    const { id } = params;

    const isAddMode = rm.path === "/add";
    const isEditMode = rm.path === "/edit/:id";

   const initialValues = {
       title: '',
       description: '',
       image: '',
       price: 0,
       sale: 0,
       saleEndDate: ''
   };

   const loadImg = (file) => {
     if( typeof(file) === 'string'){
       debugger
       img = file;
      
     }else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSource(reader.result)
      };
    }
   }

    if(isEditMode) {
      const handleProduct = (product) => {
        const data = product.val();

        for (let val in data) {
          initialValues[val] = data[val]
        }
        loadImg(initialValues.image);
      }
      DB.getProduct(id).on("value", handleProduct);
    }

    Yup.addMethod(Yup.mixed, 'imageDimensionCheck',
    function (message, minDimensionValue, maxDimensionValue) { 
    return this.test("image-width-height-check", message, async function (value) {
        debugger
        const { path, createError } = this;
        let result = false;

        if (typeof(value)==='object') {
          const imgDimensions = await imageWidthAndHeight(value);
          console.log(imgDimensions);
        
          if (imgDimensions.width < minDimensionValue || 
              imgDimensions.height < minDimensionValue || 
              imgDimensions.width > maxDimensionValue || 
              imgDimensions.height > maxDimensionValue
          ) {
            showImage = false;
            result = createError({
                      path,
                      message: `The file width/height should be between minDimensionValue - maxDimensionValue`
                    });
          }
          else {
            showImage = true;
            result = true;
          }
        }
        console.log(result);
        return result;
    });
  });
    




  const imageWidthAndHeight = (provideFile) => {
   
    if(typeof(provideFile) !== 'string'){

      const imgDimensions = { width: null, height: null };

      return new Promise(resolve => {
          const reader = new FileReader();
        
          reader.readAsDataURL(provideFile);
          reader.onload = function () {
              const img = new Image();
              img.src = reader.result;
        
              img.onload = function () {
            
                  imgDimensions.width = img.width;
                  imgDimensions.height = img.height;
    
                  resolve(imgDimensions);
              }
          };
      });
    }

  }


  const AddProdSchema = Yup.object().shape({
    image:Yup.mixed() 
    .required('You need to provide a file') 
    .imageDimensionCheck('test',500, 4000)
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
    title: Yup.string().required('Required *')
    .min(20, 'Min 20 symbols')
    .max(60, 'Max 60 symbols')
    .required('Required'),
    description:Yup.string().required('Required *')
    .max(200, 'Max 200 symbols'),
    price: Yup.number()
    .positive()
    .min(0,"more then 0")
    .max(99999999.99, 'Max 60 symbols')
    .required('Required *'),
    percentage:Yup.number() 
    .positive()
    .min(10)
    .max(90),
    saleEndDate: Yup.date()
    .min(new Date()+ 1)
    .notRequired()
    .when('percentage', {
    is: (val) => val && val > 0,
    then: Yup.date().required('Date is required.')
    })
  });

  function onSubmit( values, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      debugger
      createFormProduct(values, setSubmitting);
    } else {
      updateFormProduct(id, values, setSubmitting);
    }
  }

  function  createFormProduct(values, setSubmitting) {
    dispatch(addProduct(values))
  }

  function updateFormProduct( id, values, setSubmitting) {
    dispatch(updateProduct(id, values));
  }


    useEffect(() => {

      if (!FileImg) { return; }
      let reader = new FileReader();
      debugger;
      reader.readAsDataURL(FileImg);
      reader.onloadend = () => {
        setImageSource(reader.result)
        console.log(reader.result);
      };


    }, [FileImg, isAddMode]); 



 
      return (
          <div className={css.DailyCaloriesFormWrapper}>
          <h2 className={css.DailyCaloriesFormTitle}>
            Choose products
          </h2>
          <div>          
            <Button
            type='button'
            variant="contained"
            color="primary"
            onClick={() => history.goBack()}>
             Back
          </Button>
          </div>
          <Formik initialValues={initialValues} 
                  validationSchema={AddProdSchema} 
                  onSubmit={onSubmit}
                  enableReinitialize>
          {({values, setFieldValue, handleChange, handleSubmit, errors, enableReinitialize}) => 

          (
            <Form className={css.modalForm} onSubmit={handleSubmit} enableReinitialize={enableReinitialize}>
              <Field value={values.title}
                      onChange={handleChange}
                      name="title"
                      placeholder="product title"
                      type="text"/>
              <ErrorMessage name="title">
                {msg => <p className={css.notification}>{msg}</p>}
              </ErrorMessage>
              <input id="image" 
                     name="image" 
                     type="file" 
                     accept="image/*"
                     placeholder="choose file" 
                     onChange={(event) => {
                       setFieldValue("image", event.currentTarget.files[0]);
                       setFileImg(event.currentTarget.files[0])
                     }} />
               <ErrorMessage name="image">
                {errors => <p className={css.notification}>{errors["image"] ? errors["image"] : undefined}</p>}
              </ErrorMessage>
              <ErrorMessage name="image">
                {message => <p className={css.notification}>{message}</p>}
              </ErrorMessage>
              {isAddMode  &&
          <div>
          <img src={ImageSource  || imageDefault }
          alt={values.name}
           height={400}
            width={400}
            className="img-thumbnail mt-2"/>
            </div>
               } 
              { isEditMode 
              ? <div>
                  <img src={ ImageSource || img || imageDefault }
                  alt={values.name}
                  height={400}
                  width={400}
                  className="img-thumbnail mt-2"/>
                </div>
              : <></> 
              }
              <Field value={values.description}
                     onChange={handleChange}
                     placeholder="product description"
                     name="description"
                     type="text"
              />
              <ErrorMessage name="description">
                {msg => <p className={css.notification}>{msg}</p>}
              </ErrorMessage>
              <Field value={values.price}
                     onChange={handleChange}
                     name="price"
                     type="number"
                     placeholder="product price"
              />
              <ErrorMessage name="price">
                {msg => <p className={css.notification}>{msg}</p>}
              </ErrorMessage>
              <Field value={values.percentage}
                     onChange={handleChange}
                     name="percentage"
                     type="number"
                     placeholder="percentage % of sale "/>
              <ErrorMessage name="percentage">
                {msg => <p className={css.notification}>{msg}</p>}
              </ErrorMessage>
                <Field
                value={values.saleEndDate}
                onChange={handleChange}
                  name="saleEndDate"
                  format="yyy-dd-mm HH:MM:ss"
                  type="date"
                  placeholder="Date sale ends"
                />
                  <ErrorMessage name="saleEndDate">
                  {msg => <p className={css.notification}>{msg}</p>}
                </ErrorMessage>
          <Button type='submit' color="primary"  size="large" variant="contained" >
                         { id? 'Update Product' : 'Add Product'} 
              </Button>
            </Form>
          )}
        </Formik>
        </div>
      );
    } 
   export default AddProductForm;

              
