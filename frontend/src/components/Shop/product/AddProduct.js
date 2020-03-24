import React, { Component } from 'react'
import '../../../css/addProduct.css'
import BackMenu from '../BackMenu'
import NavBar from '../Navbar'
import { connect } from 'react-redux'
import { categoryAction } from '../../../actions/categoryAction'
import { saveProductAction } from '../../../actions/productAction'
import {
    EMPTY_VALUE,
    WRONG_PHONE_FORMAT,
    MAX_PRICE,
    MAX_DISCOUNT,
    checkPhoneFormat
} from '../../../helpers/checkFormat'

class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            des: '',
            price: '',
            checkValidPrice: '',
            discount: '',
            checkDiscount: '',
            image: '',
            category_id: '',
            disableBtn: true
        }
    }

    componentDidMount() {
        this.props.loadCategory()
    }

    componentDidUpdate(prevState) {
        if(this.state !== prevState) {
            const {name, image, des, price, discount, category_id, disableBtn} = this.state
            if(
                name !== '' &&
                name !== EMPTY_VALUE &&
                image !== '' &&
                des !== '' &&
                des !== EMPTY_VALUE &&
                discount !== '' &&
                category_id !== '' &&
                price !== '' &&
                disableBtn 
            ) {
                this.setState({
                    disableBtn: false
                })
            }

            if((name === '' ||
                name === EMPTY_VALUE ||
                image === '' ||
                des === '' ||
                des === EMPTY_VALUE ||
                discount === '' ||
                category_id === '' ||
                price === '') &&
                !disableBtn
            ) {
                this.setState({
                    disableBtn: true
                })
            }
        }
    }

    handleNameChange = (e) => {
        if (e.target.value !== '') {
            this.setState({
                name: e.target.value
            })
        } else {
            this.setState({
                name: EMPTY_VALUE
            })
        }
    }

    handleDesChange = (e) => {
        if (e.target.value !== '') {
            this.setState({
                des: e.target.value
            })
        } else {
            this.setState({
                des: EMPTY_VALUE
            })
        }
    }

    triggUploadImg = () => {
        document.getElementById('upload-img-p').click()
    }

    uploadImg = (e) => {
        if (e.target.files[0].type === 'image/png' ||
            e.target.files[0].type === 'image/jpg' ||
            e.target.files[0].type === 'image/jpeg') {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({
                    image: reader.result
                });
            }
        } else {
            alert('this file is only supported jpg, png, jpeg file')
        }
    }

    handleDiscountChange = (e) => {
        if (checkPhoneFormat(e.target.value) !== WRONG_PHONE_FORMAT) {
            if (parseInt(e.target.value) <= MAX_DISCOUNT) {
                this.setState({
                    discount: e.target.value,
                    checkDiscount: ''
                })
            }
            if (parseInt(e.target.value) > MAX_DISCOUNT) {
                this.setState({
                    discount: MAX_DISCOUNT.toString(),
                    checkDiscount: ''
                })
            }
            if (e.target.value === '') {
                this.setState({
                    discount: '',
                    checkDiscount: EMPTY_VALUE
                })
            }
        }
    }

    handlePriceChange = (e) => {
        if (checkPhoneFormat(e.target.value) !== WRONG_PHONE_FORMAT) {
            if (parseInt(e.target.value) <= MAX_PRICE) {
                this.setState({
                    price: e.target.value,
                    checkValidPrice: ''
                })
            }
            if (parseInt(e.target.value) > MAX_PRICE) {
                this.setState({
                    price: MAX_PRICE.toString(),
                    checkValidPrice: ''
                })
            }
            if (e.target.value === '') {
                this.setState({
                    price: '',
                    checkValidPrice: EMPTY_VALUE
                })
            }
        }
    }

    selectCategory(id) {
        this.setState({
            category_id: id
        })
    }

    handleSave = () => {
        const { name, des, price, discount, image, category_id } = this.state
        const data = {
            name,
            description: des,
            price,
            discount,
            image,
            category_id,
            location: 'HaNoi',
            quantity: '100'
        }
        this.props.saveDate(data)
    }

    render() {
        const { listCategory } = this.props
        const { name, des, price, discount, checkValidPrice, checkDiscount, image, category_id } = this.state
        return (
            <div>
                <NavBar />
                <div className="app-seller">
                    <BackMenu />
                    <div className='add-product-page'>
                        <div className='add-product-container'>
                            <div className='add-product-header'>
                                <div id='add-product-header-txt'>Add a New Product</div>
                            </div>
                            <div className='ipn-common-seller mt-5 mb-3'>
                                <span className='ipn-label txt-title'>Product Name:</span>
                                <div className={name !== EMPTY_VALUE ? 'ipn-product-container' : 'ipn-product-container-error'}>
                                    <input
                                        className={name !== EMPTY_VALUE ? 'ipn-product-name' : 'ipn-product-name-error'}
                                        type="text"
                                        maxLength="120"
                                        onChange={this.handleNameChange}
                                    />
                                    <div className='ipn-prefix'>
                                        {
                                            name !== EMPTY_VALUE ? name.length + '/120' : '0/120'
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='ctg-select'>
                                <div className='mb-3 txt-title'>Please chose one category</div>
                                <ul className='ctg-select-ul'>
                                    {
                                        listCategory.map(ctg => {
                                            return (
                                                <li onClick={this.selectCategory.bind(this, ctg._id)}  
                                                    className={category_id === ctg._id ? 'ctg-select-list ctg-selected-list' : 'ctg-select-list'}>
                                                    <span>{ctg.name}</span>
                                                    <i className="fa">&#xf105;</i>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='add-product-des mt-3'>
                                <span className='ipn-label txt-title'>Product Description:</span>
                                <div className={des !== EMPTY_VALUE ? 'des-txt-area-div' : 'des-txt-area-div-error'}>
                                    <textarea
                                        maxLength='3000'
                                        onChange={this.handleDesChange}
                                        className={des !== EMPTY_VALUE ? 'des-txt-area' : 'des-txt-area-error'}
                                    />
                                </div>
                            </div>
                            <div className='ipn-prefix justify-content-end'>
                                {
                                    des !== EMPTY_VALUE ? des.length + '/3000' : '0/3000'
                                }
                            </div>
                            <div className='sale-info'>
                                <div className='mb-5 mt-5'>
                                    <h2 className='section-name'>Sale Informations</h2>
                                </div>
                                <div>
                                    <div className='ipn-common-seller mt-3'>
                                        <span className='ipn-label txt-title'>Price:</span>
                                        <div className={checkValidPrice !== EMPTY_VALUE ? 'ipn-product-container' : 'ipn-product-container-error'}>
                                            <div className='ipn-prefix'>
                                                $
                                            </div>
                                            <input
                                                className={checkValidPrice !== EMPTY_VALUE ? 'ipn-product-name' : 'ipn-product-name-error'}
                                                onChange={this.handlePriceChange}
                                                value={price}
                                            />
                                        </div>
                                    </div>
                                    <div className='ipn-common-seller mt-3'>
                                        <span className='ipn-label txt-title'>Discount:</span>
                                        <div className={checkDiscount !== EMPTY_VALUE ? 'ipn-product-container' : 'ipn-product-container-error'}>
                                            <div className='ipn-prefix'>
                                                %
                                            </div>
                                            <input
                                                className={checkDiscount !== EMPTY_VALUE ? 'ipn-product-name' : 'ipn-product-name-error'}
                                                onChange={this.handleDiscountChange}
                                                value={discount}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='media-management'>
                                <div className='mb-5 mt-5'>
                                    <h2 className='section-name'>Media Management</h2>
                                </div>
                                <div>
                                    <div className='ipn-common-seller mt-3'>
                                        <span className='ipn-label txt-title'>Product image:</span>
                                        {
                                            image !== '' ? (
                                                <div>
                                                    <img height='115px' width='115px' src={image}/>
                                                </div>
                                            ) : (
                                                <div>
                                                    
                                                </div>
                                            )
                                        }
                                        <div onClick={this.triggUploadImg} className='upload-img-div'>
                                            <div>
                                                <i className="fa fa-plus-img">&#xf055;</i>
                                            </div>
                                            <input id='upload-img-p' onChange={this.uploadImg} hidden type="file" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btn-function'>
                            <button className='btn-a btn-cancel mr-4'>Cancel</button>
                            <button onClick={this.handleSave} disabled={this.state.disableBtn} className='btn-a btn-confirm'>Save and Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.categoryReducer.listCategories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategory: () => dispatch(categoryAction()),
        saveDate: (data) => dispatch(saveProductAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)