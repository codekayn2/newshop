import * as React from "react";
import {Link} from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => (
    <div className="cart cart--empty">
        <h2>Кошик порожній <span>😕</span></h2>
        <p>Найімовірніше, ви нічого не замовили...
            <br/>
            Щоб замовити генератор, перейдіть на головну сторінку .
        </p>
        <img src={cartEmptyImg} alt="Empty cart"/>
        <Link to="/" className="button button--black">
            <span>Вернутися назад</span>
        </Link>
    </div>
)

export default CartEmpty;
