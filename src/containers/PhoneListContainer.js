import React from "react";
import "./PhoneListContainer.css";
import Spinner from "../components/Spinner"
import { connect } from "react-redux";
import { getPhones } from "../store/clientFetchReducer";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

class PhoneListContainer extends React.Component {

    componentDidMount() {
        this.props.getPhones()
    }

    renderPhones(phones) {
        return (
            <ul className="phone__list">{
                phones.map(
                    (phone, i) =>
                        this.renderPhoneItem(phone, i)
                )
            }
            </ul>);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        this.props.getPhones(selectedPage)
    }

    renderPhoneItem(phone, i) {
        return (
            <li className="phone__item-list" key={`${phone.name}${i}`}>
                <Link className="item-link" to={`/phones/${phone.id}`}>
                    <div className="phone__container">
                        <div className="phone__image--container">

                                <img className="phone__image" src={phone.image} alt={phone.title} />

                        </div>
                        <div className="phone__data">
                            <h2 className="phone__title-list">
                                <span className="phone__name">{phone.title}</span>
                            </h2>
                            <p className="phone__price">{phone.price} €</p>
                        </div>
                    </div>
                </Link>
            </li>
        )
    }

    render() {
        console.log(this.props.selected)
        if (this.props.isloading) {
            return (
                <Spinner />
            )
        } else {
            return (
                <div>
                    <div className="phone__list-container">{this.renderPhones(this.props.phones)}</div>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={this.props.selected}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isloading: state.clientFetch.loading,
        phones: state.clientFetch.phones,
        pageCount: state.clientFetch.pageCount,
        perPage: 4,
        selected: state.clientFetch.selected
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    getPhones: (offset) => {dispatch(getPhones(offset))},
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListContainer);