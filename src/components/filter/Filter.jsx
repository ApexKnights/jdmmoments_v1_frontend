import React, { useContext, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/userContext'

const Filter = ({ prod, filterByProd, filterByPrice }) => {
    const { settings } = useContext(UserContext)
    const [dropdownprod, setDropDownProd] = useState(false)
    const [dropdownprice, setDropDownPrice] = useState(false)
    return (
        <div className="dropdown" style={{ background: settings.color }}>
            <div className="by-name">
                <h3 onClick={() => setDropDownProd(!dropdownprod)}>Filter By Products</h3>
                {
                    dropdownprod ? <div style={{ background: settings.color2 }} className="prods">
                        {
                            prod.map(p => (
                                <span style={{ background: settings.color }} onClick={() => filterByProd(p.catname)}>{p.catname}</span>
                            ))
                        }
                    </div> : null
                }

            </div>
            <div className="by-name">
                <h3 onClick={() => setDropDownPrice(true)}>Filter By Price</h3>
                {
                    dropdownprice ? <div style={{ background: settings.color2 }} className="prods">
                        {
                            prod.map(p => (
                                <span style={{ background: settings.color }} onClick={() => filterByPrice(p.price)}>{p.price}</span>
                            ))
                        }
                    </div> : null
                }

            </div>
            <div className="by-name">
                <h3 onClick={() => window.location.reload()}>Refresh</h3>
            </div>
        </div>



    )
}

export default Filter
