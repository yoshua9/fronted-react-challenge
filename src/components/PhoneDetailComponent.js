import React from "react";
import "./PhoneDetailComponent.css";

class PhoneDetailComponent extends React.Component {

    render() {
        const phone = this.props.phone[0];
        if (phone == undefined) {
            return (
                <div className="details__outside">
                    <div className="details__container error-msg">
                        <div className="details-not-found--msg">No podemos mostrale ahora mismo la información que solicita. Por favor, regrese al listado y seleccione otro teléfono.</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="details__outside">
                <div className="details__container">

                    <div className="details__title-container">
                        <h2 className="phone__title">{phone.title}</h2>
                    </div>
                    <div className="phone__details-container">
                        <div className="phone__image-container">
                            <img className="phone__image" src={phone.image} alt={phone.title} />
                        </div>

                        <div className="more-details">
                            <div className="details__list-item">
                                <p className="details__key">Descripción: </p>
                                <p className="details__value">{phone.description}</p>
                            </div>
                            <ul className="details__list">
                                <li className="details__list-item plus"><span className="details__key plus">Color:</span> <span className="details__value">{phone.color}</span></li>
                                <li className="details__list-item plus"><span className="details__key plus">Sistema Operativo:</span> <span className="details__value">{phone.SO}</span></li>
                            </ul>
                            <div className="details__price-container">
                                <span className="details__key details__phone--price-key">Precio:</span>
                                <span className="details__phone--price">{phone.price} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default PhoneDetailComponent;