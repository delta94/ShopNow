import React,{Component} from 'react'
import { connect } from 'react-redux'
import ProductItem from '../../../common/ProductItem'
import {Link} from 'react-router-dom'

class ListCategory extends Component {
    render() {
        const { categories } = this.props; 
        const listCategory = categories.length ? (
            categories.map(category => {
                const path = "/category/" + category.id;
                return (
                    <Link to={path} style={{ textDecoration: 'none',color: "inherit" }}>
                        <ProductItem item={category}/>
                    </Link>
                )
            })
        ) : (
            <div>
                Loading ...
            </div>
        )
        return (
            <div className='category-section container'>
                <div className='category-header'>
                    Category
                </div>
                <div className='d-flex flex-wrap'>
                    {listCategory}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        categories: state.categoryReducer.categories
    }
}

export default connect(mapStatetoProps)(ListCategory)