import React, { Component } from 'react'
import '../../css/navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
import CartItem from '../Pages/cart/CartItem'
import * as constant from '../../constants/constants'
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import Logout from '../auth/Logout'
import SearchPopup from '../common/searchPopup'

class NavBar extends Component {

    constructor (props) {
        super(props)
        this.state = {
            loginOrSignup: 'login',
            searchResult: false,
            keyword: ''
        }
    }

    openSearchPopup = (e) => {
        const keyword = e.target.value;
        if(keyword.length > 0){
            this.setState({
                searchResult: true,
                keyword
            })
        }else {
            this.setState({
                searchResult: false
            })
        }
        
    }

    changeTab = () => {
        if(this.state.loginOrSignup === 'login'){
            this.setState({
                loginOrSignup: 'signup'
            })
        } else {
            this.setState({
                loginOrSignup: 'login'
            })
        }
        
    }

    getProductById (id) {
        const { products } = this.props;
        const product = products.find(product=> product._id == String(id))
        return product;
    }

    render() {
        const {user, carts, quantity, params} = this.props
        const {keyword} = this.state;
        let cart = carts.map(item => item = this.getProductById(item.product_id))
        const {searchResult} = this.state;
        return (
            <div className='navbar'>
                {
                    searchResult ? (
                        <SearchPopup keyword={keyword}/>
                    ) : (
                        <div></div>
                    )
                }
                <div className=' container'>
                    <div className='top-sticky row'>
                        <div className='left-top-sticky col-auto'>
                        {
                            Object.entries(user).length === 0 && user.constructor === Object ? (
                                <div></div>
                            ) : (
                                <Link to="/shop" target="blank" className='link-to-shop'>Your Shop</Link>
                            )
                        }
                        </div>
                        <ul className='navbar-list col-auto ml-auto'>
                            <li className='txt'>
                                <Popup
                                    trigger={
                                        <i className='fa i-shop'>&#xf0f3;</i>
                                    }
                                    position="bottom center"
                                    on="click"
                                >
                                    No notifications
                                </Popup>
                            </li>
                            <li className='ml-3'>
                                <i className="fa i-shop">&#xf059;</i>
                            </li>
                            {
                                Object.entries(user).length === 0 && user.constructor === Object ? (
                                    <Popup
                                        trigger={<li className='ml-3'>Login</li>}
                                        on="click"
                                        modal
                                    >
                                    {
                                        this.state.loginOrSignup === 'login' ? (
                                                <Login changeTab={this.changeTab}/>
                                            ) : (
                                                <SignUp changeTab={this.changeTab}/>
                                            )
                                    }
                                    </Popup>  
                                ) : (
                                    <Popup
                                        trigger={<li className='ml-3'>
                                                    <span className='mr-1'>
                                                        <i className='fa i-shop'>&#xf2bd;</i>
                                                    </span>
                                                    <span className='fa'>
                                                        {user.name}
                                                    </span>    
                                                </li>}
                                        on="hover"
                                    >
                                        <Logout/>
                                    </Popup>           
                                )
                            }
                            
                        </ul>
                    </div>
                    <div className='logo-search-cart row'>
                        <div className='logo col-3'>
                            <Link to="/">
                                <i className="fa i-shop">
                                    &#xf270;
                                </i>
                            </Link>
                        </div>
                        <form className='form-inline col-6 justify-content-between'>
                            <input onChange={this.openSearchPopup} className="form-search mr-sm-2" type="search" placeholder="Search by category, product" aria-label="Search" />
                            <button className="btn-search my-2 my-sm-0" type="submit">
                                <i className='fa fa-search'></i>
                            </button>
                        </form>
                        {
                            (params !== '/cart') ? (
                                <div className='logo-cart col-3'>
                                    <div>
                                        <Popup
                                            trigger={<i className="fa i-shop" id='cart-icon'>&#xf07a;</i>}
                                            position="bottom center"
                                            on="hover"
                                        >
                                            {
                                                quantity !== 0 ? cart.map((cartItem, index) => 
                                                {
                                                    return (
                                                            <div>
                                                                <CartItem type={constant.POP_UP} cartItem={cartItem} indexItem={index}/>
                                                            </div>
                                                        )
                                                }) : (
                                                    <div className="txt cart-txt d-flex justify-content-center">
                                                        No product in cart
                                                    </div>
                                                )
                                            }
                                            <Link className="go-to-cart d-flex justify-content-end p-1" to="/cart">
                                                <span className='txt-forward-cart'>Go to cart</span>
                                            </Link>
                                        </Popup>
                                        {
                                            quantity ? (
                                                <span className='badge badge-warning' id='lblCartCount'>
                                                    { quantity }
                                                </span>
                                            ) : (
                                                <span></span>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="col-3"></div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartReducer.cart,
        user: state.authReducer.user,
        products: state.productReducer.products,
        quantity: state.cartReducer.quantity
    }
}

export default connect(mapStateToProps)(NavBar)
